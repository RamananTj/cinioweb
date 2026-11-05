const SERVER_URL = "http://localhost:8080";

const API_BASE_URL = `${SERVER_URL}/api`;

export async function generateBeatBackground(beat) {
    const response = await fetch(`${API_BASE_URL}/assets/background`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            beatOrder: beat.beatOrder,
            action: beat.action,
            emotionalShift: beat.emotionalShift,
            location: beat.location,
            timeContext: beat.timeContext
        })
    });

    if (!response.ok) {
        const error = await response.text();

        throw new Error(
            error || "Unable to generate the cinematic background."
        );
    }

    return response.json();
}