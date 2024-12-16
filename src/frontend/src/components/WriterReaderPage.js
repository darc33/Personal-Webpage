import React, { useState, useEffect } from 'react';
import "./WriterReaderPage.css";
import SpiderChart from './WriterReaderSpiderChart';
import BooksShelf from './WriterReaderBookshelf';
import BlogPostsPage from './WriterReaderBlogPost';

const WriterReaderPage = () => {
    const [genreData, setGenreData] = useState([]);
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/books/genres');
                const result = await response.json();

                // Format genre data
                const formattedGenreData = Object.entries(result.genreCounts).map(([genre, value]) => ({
                    genre,
                    value,
                }));

                setGenreData(formattedGenreData); // Update genres
                setBooks(result.books); // Update books
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);
    return (
        <div className='writerreader-container'>
            <div className="books-spiderChart">
                <SpiderChart data={genreData}/>
            </div>
            <div className="books-bookshelf">
                <BooksShelf books={books}/>
            </div>
            <div className="books-posts">
                <BlogPostsPage />
            </div>
        </div>

    );
};

export default WriterReaderPage;