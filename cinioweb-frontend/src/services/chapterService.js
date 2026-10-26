import { apiRequest } from "./api";

export function getChaptersByBookId(bookId) {
    return apiRequest(`/chapters/book/${bookId}`);
}

export function addChapter(chapter) {
    return apiRequest("/chapters", {
        method: "POST",
        body: JSON.stringify(chapter),
    });
}