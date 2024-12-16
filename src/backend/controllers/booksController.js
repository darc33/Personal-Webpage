import { getBooksData, countGenres } from "../services/booksServices.js";

export const getGenreCounts = (req, res) => {
    try{
        const books = getBooksData();
        const counts = countGenres(books);
        res.status(200).json({ genreCounts: counts, books });
    } 
    catch (err) {
        res.status(500).json({ error: err.message});
    }
};