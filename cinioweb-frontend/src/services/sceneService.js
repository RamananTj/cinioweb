const Api_Base_Url = "http://localhost:8080/api";

export async function getCinematicConfigBySceneId(sceneId) {

    const response = await fetch(
        `${Api_Base_Url}/cinematic-configs/scene/${sceneId}`
    );

    if (!response.ok)
        throw new Error(`Failed to fetch cinematic configuration HTTP ${response.status}`);

    return await response.json();
}

//currently working 
export async function getScenesByChapterId(chapterId) {
    const response = await fetch(
        `${Api_Base_Url}/scenes/chapter/${chapterId}`
    );

    if (!response.ok)
        throw new Error(`Failed to fetch chapter scenes: HTTP ${response.status}`);

    return await response.json();
}

export async function getChapterById(chapterId) {
    const response = await fetch(
        `${Api_Base_Url}/chapters/${chapterId}`
    );

    if (!response.ok) {
        throw new Error(
            `Failed to fetch chapter: HTTP ${response.status}`
        );
    }

    return response.json();
}

export async function getStoryBeats(chapterId) {
    const response = await fetch(
        `${Api_Base_Url}/chapters/${chapterId}/story-beats`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        }
    );

    if (!response.ok) {
        throw new Error(
            `Failed to analyze chapter: HTTP ${response.status}`
        );
    }

    return response.json();
}