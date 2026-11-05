import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import SceneRenderer from "./SceneRenderer";
import {
    getChapterById,
    getStoryBeats
} from "../services/sceneService";

import "../components/cinematic/CinematicScene.css";
import GlobalErrorPage from "../GlobalErrorPage";
import CommonLoader from "../components/CommonLoader";

function CinematicScene() {
    const { chapterId } = useParams();

    const [chapter, setChapter] = useState(null);
    const [beats, setBeats] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let cancelled = false;

        async function loadReader() {
            setLoading(true);
            setError("");
            setChapter(null);
            setBeats([]);
            setCurrentIndex(0);

            try {
                const [chapterData, analysis] = await Promise.all([             //analysis - gets chapterSummary and beats as response
                    getChapterById(chapterId),
                    getStoryBeats(chapterId)
                ]);

                if (!cancelled) {
                    setChapter(chapterData);

                    const orderedBeats = [...analysis.beats].sort(      //analysis.beats alone sorted 
                        (a, b) => a.beatOrder - b.beatOrder         // a=3 b=1 a-b=2 => positive result number - switch the b to a and viceversa.  a=1 b=3 a-b=-2  => negative result  places a before b. a==b stays unchanged.  
                    );

                    setBeats(orderedBeats);                         //analysis.beats alone - set into beats
                }
            } catch (err) {
                if (!cancelled) {
                    setError(
                        err.message || "Unable to prepare the cinematic reader."
                    );
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        }

        loadReader();

        return () => {
            cancelled = true;
        };
    }, [chapterId]);

    function goNext() {
        setCurrentIndex(index =>
            Math.min(index + 1, beats.length - 1)
        );
    }

    function goPrevious() {
        setCurrentIndex(index =>
            Math.max(index - 1, 0)
        );
    }

    useEffect(() => {
        function handleKeyDown(event) {
            if (event.key === "ArrowRight") {
                goNext();
            }

            if (event.key === "ArrowLeft") {
                goPrevious();
            }
        }

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [beats.length]);

    if (loading) {
        return (
            <main className="page-message">
                <h2>Preparing your cinematic experience...</h2>
                {/*<p>Analyzing chapter and identifying story beats.</p> */}
                <CommonLoader message="Analyzing chapter and identifying story beats." />;
            </main>
        );
    }

    if (error) {
        return (
            <main className="page-container">
                <p className="error-message">{error}</p>
                {/*<Link to="/books">Back to books</Link>*/}
                <GlobalErrorPage />
            </main>
        );
    }

    if (beats.length === 0) {
        return (
            <main className="page-container">
                <h1>No story beats found</h1>
                <p>Unable to identify story beats in this chapter.</p>
                <Link to="/books">Back to books</Link>
            </main>
        );
    }

    const currentBeat = beats[currentIndex];

    return (
        <main className="cinematic-reader">

            <SceneRenderer
                key={`${chapterId}-${currentBeat.beatOrder}`}
                beat={currentBeat}
                chapterTitle={chapter?.title}
                showChapterTitle={currentIndex === 0}
            />

            <button
                className="scene-navigation scene-navigation-left"
                onClick={goPrevious}
                disabled={currentIndex === 0}
                aria-label="Previous beat"
                title="Previous beat (←)"
            />

            <button
                className="scene-navigation scene-navigation-right"
                onClick={goNext}
                disabled={currentIndex === beats.length - 1}
                aria-label="Next beat"
                title="Next beat (→)"
            />

            <div className="scene-progress">
                <span>
                    {String(currentIndex + 1).padStart(2, "0")}
                </span>

                <div className="scene-progress-track">
                    <div
                        className="scene-progress-fill"
                        style={{
                            width: `${((currentIndex + 1) / beats.length) * 100}%`
                        }}
                    />
                </div>

                <span>
                    {String(beats.length).padStart(2, "0")}
                </span>
            </div>
        </main>
    );
}

export default CinematicScene;