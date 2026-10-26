
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EntityForm from "../components/EntityForm";
import { getBooks, addBook } from "../services/bookService";

function BooksPage() {
    const [books, setBooks] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const navigate = useNavigate();   

     useEffect(() => {
         let cancelled = false;

         async function fetchBooks() {
             try {
                 const data = await getBooks();

                 if (!cancelled) {
                     setBooks(data);
                     setError("");
                 }
             } catch (err) {
                 if (!cancelled) {
                     setError(err.message || "Unable to load books.");
                 }
             } finally {
                 if (!cancelled) {
                     setLoading(false);
                 }
             }
         }

         fetchBooks();

         return () => {
             cancelled = true;
         };
    }, []);


    async function loadBooks() {
        try {
            setError("");
            const data = await getBooks();
            setBooks(data);
        } catch (err) {
            setError(err.message || "Unable to load books.");
        }
    }

    async function handleAddBook(book) {
        await addBook(book);
        await loadBooks();
    }

    if (loading) {
        return <p className="page-message">Loading books...</p>;
    }

    return (
        <main className="page-container">
            <section className="page-heading">
                <div>
                    <p className="eyebrow">YOUR LIBRARY</p>
                    <h1>Books</h1>
                    <p>Choose a story and enter its world.</p>
                </div>

                <button
                    className="button button-primary"
                    onClick={() => setShowForm(true)}
                >
                    + Add Book
                </button>
            </section>

            {error && <p className="error-message">{error}</p>}

            {books.length === 0 ? (
                <div className="empty-state">
                    <h2>Your library starts here</h2>
                    <p>Add your first book to begin.</p>
                </div>
            ) : (
                <section className="book-grid">
                    {books.map((book) => (
                        <button
                            className="book-card"
                            key={book.id}
                            onClick={() =>
                                navigate(`/books/${book.id}/chapters`)
                            }
                        >
                            <span className="book-card-mark">
                                CW
                            </span>

                            <h2>{book.title}</h2>

                            <p className="book-author">
                                {book.author || "Unknown author"}
                            </p>

                            <p className="book-description">
                                {book.description ||
                                    "Open this book to explore its chapters."}
                            </p>

                            <span className="card-link">
                                View chapters ?
                            </span>
                        </button>
                    ))}
                </section>
            )}

            {showForm && (
                <EntityForm
                    entityType="book"
                    onSubmit={handleAddBook}
                    onClose={() => setShowForm(false)}
                />
            )}
        </main>
    );
}

export default BooksPage;
