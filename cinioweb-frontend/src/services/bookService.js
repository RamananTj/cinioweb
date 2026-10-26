import { apiRequest } from "./api"

export function getBooks() {
    return apiRequest("/books");
}

export function addBook(book) {
    return apiRequest("/books", {
        method: "POST",
        body: JSON.stringify(book),
    });
}