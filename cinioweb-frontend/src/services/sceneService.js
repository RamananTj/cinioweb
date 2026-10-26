const Api_Base_Url = "http://localhost:8080/api";

export async function getCinematicConfigBySceneId(sceneId) {

    const response = await fetch(
        `${Api_Base_Url}/cinematic-configs/scene/${sceneId}`
    );

    if (!response)
        throw new Error(`Failed to fetch cinematic configuration HTTP ${response.status}`);

    return await response.json();
}

//currently working 
export async function getScenesByChapterId(chapterId) {
    const response = await fetch(
        `${Api_Base_Url}/scenes/chapter/${chapterId}`
    );

    if (!response)
        throw new Error(`Failed to fetch chapter scenes: HTTP ${response.status}`);

    return await response.json();
}
