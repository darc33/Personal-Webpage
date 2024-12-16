import { getBooksData, countGenres,  } from "../services/booksServices.js";
import { getPostsFromWordPress } from "../services/BlogServices.js";

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

export const getLatestPosts = async (req, res) => {
    try {
        const posts = await getPostsFromWordPress(); // Get the last 5 posts from the service
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};