//import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import CinematicScene from "./pages/CinematicScene";
import BooksPage from "./pages/BooksPage";
import ChaptersPage from "./pages/ChaptersPage";
import Navbar from "./components/Navbar";

function App() {  
    return (
        <BrowserRouter>
            <Navbar />

            <Routes>
                <Route path="/" element={ <Navigate to="/books" replace/>} />
                <Route path="/books" element={<BooksPage />} />
                <Route path="/books/:bookId/chapters" element={<ChaptersPage />} />
                <Route path="/reader/:chapterId" element={<CinematicScene />} />
                <Route path="*" element={<Navigate to="/books" replace />} />   //path = * means catch all routes  - If a user types a broken or non-existent URL like /dashboard, /profiles, or /xyz, none of the top routes match. The router falls back to path="*", which immediately redirects them back to /books using the replace logic. //instead of this redirect - Custom 404 Pages might be used
            </Routes>
        </BrowserRouter>
    );
}

export default App;
