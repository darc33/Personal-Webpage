import fetch from 'node-fetch';
import he from 'he';

export const getPostsFromWordPress = async () => {
    try {
        const response = await fetch('https://public-api.wordpress.com/wp/v2/sites/darc337234.wordpress.com/posts?per_page=5');
        
        if (!response.ok) {
            throw new Error('Error fetching posts from WordPress');
        }

        const posts = await response.json();


        const formattedPosts = posts.map(post => ({
            title: he.decode(post.title.rendered), //decoded title
            date: new Date(post.date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            }), // Format: "January 31, 2024"
            link: post.link,
            image: post.jetpack_featured_media_url || 'default-image-url.jpg', // Featured Image
        }));

        return formattedPosts;
    } catch (err) {
        throw new Error('Error fetching posts from WordPress: ' + err.message);
    }
};
