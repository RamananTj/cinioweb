
export const API_BASE_URL = "http://localhost:8080/api";

export async function apiRequest(url, options = {}) {
    const response = await fetch(`${API_BASE_URL}${url}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...options.headers,
        },
    });

    if (!response.ok) {
        const message = await response.text();
        throw new Error(message || `Request failed: ${response.status}`);
    }

    if (response.status === 204) {   //204 http status means - response recieved but there is no body in it.
        return null;
    }

    return response.json();
}
