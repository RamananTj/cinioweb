import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import SceneRenderer from "./SceneRenderer";
import {getScenesByChapterId, getCinematicConfigBySceneId,} from "../services/sceneService";

function CinematicScene() {
    const { chapterId } = useParams();

    const [configs, setConfigs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let cancelled = false;

        async function loadReader() {
            setLoading(true);
            setError("");

            try {
                const scenes = await getScenesByChapterId(chapterId);

                const orderedScenes = [...scenes].sort(
                    (a, b) => a.sceneOrder - b.sceneOrder           // a=3 b=1 a-b=2 => positive result number - switch the b to a and viceversa.  a=1 b=3 a-b=-2  => negative result  places a before b. a==b stays unchanged.  
                );

                const results = await Promise.all(
                    orderedScenes.map(async (scene) => {
                        const config = await getCinematicConfigBySceneId(scene.id);
                        return config;
                    })
                );

                if (!cancelled) {
                    setConfigs(results.filter(Boolean));
                }
            } catch (err) {
                if (!cancelled) {
                    setError(err.message || "Unable to load the cinematic reader.");
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

    return (
        <main className="cinematic-reader">
            {configs.map((config) => (
                <SceneRenderer
                    key={config.scene.id}
                    config={config}
                />
            ))}
        </main>
    );
}

export default CinematicScene;
