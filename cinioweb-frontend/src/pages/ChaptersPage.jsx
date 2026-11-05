
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import EntityForm from "../components/EntityForm";
import { getBooks } from "../services/bookService";
import {addChapter, getChaptersByBookId, } from "../services/chapterService";
import GlobalErrorPage from "../GlobalErrorPage";
import CommonLoader from "../components/CommonLoader";

function ChaptersPage() {
    const { bookId } = useParams();  //path variable from frontend url can be used using useParams  - BooksPages.jsx /books/${bookId}/chapter -> get assigned to Router route path - from that useParams retrieve value
    const navigate = useNavigate();

    const [book, setBook] = useState(null);
    const [chapters, setChapters] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    useEffect(() => {
        let cancelled = false;

        async function fetchPage() {
            setLoading(true);

            try {
                const [books, chapterData] = await Promise.all([        // Promise.all is used to run multiple asynchronous operations concurrently (at the same time) and wait for all of them to finish before moving forward. //destructuring 
                    getBooks(),
                    getChaptersByBookId(bookId),
                ]);

                if (cancelled) return;

                const selectedBook = books.find(
                    (item) => String(item.id) === String(bookId)
                );

                setBook(selectedBook || null);

                setChapters(
                    [...chapterData].sort(
                        (a, b) => a.chapterOrder - b.chapterOrder
                    )
                );

                setError("");
            } catch (err) {
                if (!cancelled) {
                    setError(err.message || "Unable to load chapters.");
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        }

        fetchPage();

        return () => {
            cancelled = true;
        };
    }, [bookId]);



    async function handleAddChapter(chapterData) {
        try {
            await addChapter({
                ...chapterData,
                book: { id: Number(bookId) },
            });

            setShowForm(false);

            // Refresh the current chapter list.
            const chapterDataList = await getChaptersByBookId(bookId);

            setChapters(
                [...chapterDataList].sort(
                    (a, b) => a.chapterOrder - b.chapterOrder
                )
            );

            setError("");
        } catch (err) {
            setError(err.message || "Unable to add chapter.");
        }
    }


    if (loading) {
        return <p className="page-message">Loading chapters...</p>;
        //return <CommonLoader message="Loading chapters..." />;
    }

    return (
        <main className="page-container">
            <p className="breadcrumb">
                <Link to="/books">Books</Link>
                <span> / </span>
                <span>{book?.title || "Chapters"}</span>
            </p>

            <section className="page-heading">
                <div>
                    <p className="eyebrow">THE STORY CONTINUES</p>
                    <h1>{book?.title || "Chapters"}</h1>
                    <p>
                        {chapters.length} chapter
                        {chapters.length === 1 ? "" : "s"}
                    </p>
                </div>

                <button className="button button-primary" onClick={() => setShowForm(true)}>
                    + Add Chapter
                </button>
            </section>

            {error && <p className="error-message">
                        {error}
                        <GlobalErrorPage />
                       </p>
            }

            {chapters.length === 0 ? (
                <div className="empty-state">
                    <h2>No chapters yet</h2>
                    <p>Add the first chapter to this book.</p>
                </div>
            ) : (
                <section className="chapter-list">
                    {chapters.map((chapter) => (
                        <button
                            className="chapter-card"
                            key={chapter.id}
                            onClick={() =>
                                navigate(`/reader/${chapter.id}`)
                            }
                        >
                            <span className="chapter-number">
                                {String(chapter.chapterOrder).padStart(2, "0")}
                            </span>

                            <span className="chapter-details">
                                <strong>{chapter.title}</strong>
                                <small>
                                    Open chapter in cinematic reader
                                </small>
                            </span>

                            <span className="chapter-arrow">↗</span>
                        </button>
                    ))}
                </section>
            )}

            {showForm && (
                <EntityForm
                    entityType="chapter"
                    onSubmit={handleAddChapter}
                    onClose={() => setShowForm(false)}
                />
            )}
        </main>
    );
}

export default ChaptersPage;
