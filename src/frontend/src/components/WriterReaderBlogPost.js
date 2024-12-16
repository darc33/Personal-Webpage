import React, { useState, useEffect } from 'react';
import './WriterReaderBlogPost.css';

const BlogPostsPage = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {

            try {
                const response = await fetch('http://localhost:5000/api/books/posts');
                if (!response.ok) {
                    throw new Error('Error fetching posts');
                }
                const posts = await response.json();
                setPosts(posts);
            } catch (error) {
                console.error('Error al cargar las entradas:', error);
            }
        };

        fetchPosts();
    }, []);

    return (
        <div>
            <h3 className="blog-posts-title">Blog posts</h3>
            <div className="blog-posts-container">

                {posts.map(post => (
                    <div
                        className="blog-post-card"
                        key={post.id}
                        style={{ backgroundImage: `url(${post.image})` }}
                    >
                        <div className="post-info">
                            <h3
                                className="post-title"
                                onClick={() => window.open(post.link, '_blank')}
                            >
                                {post.title}
                            </h3>
                            <p className="post-date">{post.date}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BlogPostsPage;
