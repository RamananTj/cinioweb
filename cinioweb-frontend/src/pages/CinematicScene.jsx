import { useEffect, useState } from "react";
import { getCinematicConfigBySceneId } from "../services/sceneService";
import SceneRenderer from "./SceneRenderer";

function CinematicScene() {
    const [config, setConfig] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getCinematicConfigBySceneId(1)      //get data from backend using getCinematicConfigBySceneId function from sceneService
            .then(data => {
                setConfig(data);
            })
            .catch(error => {
                console.error(error);
                setError(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading)
        return <div>Loading cinematic scene..</div>;

    if (error)
        return <div>Error: {error}</div>;

    return <SceneRenderer config={config} />
}

export default CinematicScene;