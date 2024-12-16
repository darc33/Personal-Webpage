import { countGenres } from "../services/booksServices.js";

export const getGenreCounts = (req, res) => {
    try{
        const counts = countGenres();
        res.status(200).json(counts);
    } 
    catch (err) {
        res.status(500).json({ error: err.message});
    }
};