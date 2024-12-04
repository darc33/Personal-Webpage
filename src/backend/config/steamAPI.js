import fetch from 'node-fetch';

/* Helper to construct query string from an object */
const buildQueryString = (params) => {
    return Object.entries(params)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');
};

const steamAPI = async (url, params) => {
    const queryString = buildQueryString(params);
    const fullUrl = `https://api.steampowered.com/${url}?${queryString}`;
    const response = await fetch(fullUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
};

export default steamAPI;
