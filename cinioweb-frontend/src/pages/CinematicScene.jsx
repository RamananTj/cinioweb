
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import SceneRenderer from "./SceneRenderer";
import {getScenesByChapterId, getCinematicConfigBySceneId,} from "../services/sceneService";

import "../components/cinematic/CinematicScene.css";

function CinematicScene() {
    const { chapterId } = useParams();

    const [configs, setConfigs] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let cancelled = false;

        async function loadReader() {
            setLoading(true);
            setError("");
            setCurrentIndex(0);

            try {
                const scenes = await getScenesByChapterId(chapterId);

                const orderedScenes = [...scenes].sort(
                    (a, b) => a.sceneOrder - b.sceneOrder           // a=3 b=1 a-b=2 => positive result number - switch the b to a and viceversa.  a=1 b=3 a-b=-2  => negative result  places a before b. a==b stays unchanged.  
                );

                const results = await Promise.all(
                    orderedScenes.map((scene) =>
                        getCinematicConfigBySceneId(scene.id)
                    )
                );

                if (!cancelled) {
                    setConfigs(results.filter(Boolean));
                }
            } catch (err) {
                if (!cancelled) {
                    setError( err.message || "Unable to load the cinematic reader.");
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
        setCurrentIndex((index) =>
            Math.min(index + 1, configs.length - 1)
        );
    }

    function goPrevious() {
        setCurrentIndex((index) =>
            Math.max(index - 1, 0)
        );
    }

    // Keyboard navigation
    useEffect(() => {
        function handleKeyDown(event) {
            if (event.key === "ArrowRight") {
                setCurrentIndex((index) =>
                    Math.min(index + 1, configs.length - 1)
                );
            }

            if (event.key === "ArrowLeft") {
                setCurrentIndex((index) =>
                    Math.max(index - 1, 0)
                );
            }
        }

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [configs.length]);

    if (loading) {
        return <p className="page-message">Preparing your story...</p>;
    }

    if (error) {
        return (
            <main className="page-container">
                <p className="error-message">{error}</p>
                <Link to="/books">Back to books</Link>
            </main>
        );
    }

    if (configs.length === 0) {
        return (
            <main className="page-container">
                <h1>No cinematic scenes yet</h1>
                <p>
                    This chapter has no scenes with available cinematic configurations.
                </p>
                <Link to="/books">Back to books</Link>
            </main>
        );
    }

    const currentConfig = configs[currentIndex];

    return (
        <main className="cinematic-reader">
            <SceneRenderer
                key={currentConfig.scene.id}
                config={currentConfig}
                showChapterTitle={currentIndex === 0}  //when index is 0 alone true get passed
            />

            {/* Left navigation area */}
            <button
                className="scene-navigation scene-navigation-left"
                onClick={goPrevious}
                disabled={currentIndex === 0}
                aria-label="Previous scene"
                title="Previous scene (←)"
            >
                {/*<span>‹</span>*/}
            </button>

            {/* Right navigation area */}
            <button
                className="scene-navigation scene-navigation-right"
                onClick={goNext}
                disabled={currentIndex === configs.length - 1}
                aria-label="Next scene"
                title="Next scene (→)"
            >
                {/*<span>›</span>*/}
            </button>

            {/* Scene progress */}
            <div className="scene-progress">
                <span>
                    {String(currentIndex + 1).padStart(2, "0")}
                </span>

                <div className="scene-progress-track">
                    <div
                        className="scene-progress-fill"
                        style={{
                            width: `${((currentIndex + 1) / configs.length) * 100
                                }%`,
                        }}
                    />
                </div>

                <span>
                    {String(configs.length).padStart(2, "0")}
                </span>
            </div>
        </main>
    );
}

export default CinematicScene;
