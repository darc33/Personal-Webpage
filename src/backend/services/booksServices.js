import readJSONFile from "../utils/fileReader.js";

export const getBooksData = () => {
    const books = readJSONFile('books.json');
    if (!Array.isArray(books)) {
        throw new Error("Invalid data format: Expected an array of books");
    }
    return books; // Returns all books
};

export const countGenres = (books) => {

    const genreCount = books.reduce((acc, book) => {
        if (book.Genre) {
            const genres = book.Genre.split(',').map((g) => g.trim()); //Split genres with comma
            genres.forEach((genre) => {
                acc[genre] = (acc[genre] || 0) + 1;
            });
        }        
        return acc;
    }, {});
    return genreCount;
};