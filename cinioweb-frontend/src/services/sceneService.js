const Api_Base_Url = "http://localhost:8080/api";

export async function getCinematicConfigBySceneId(sceneId) {

    const response = await fetch(
        `${Api_Base_Url}/cinematic-configs/scene/${sceneId}`
    );

    if (!response)
        throw new Error("Failed to fetch cinematic configuration");

    return await response.json();
}
