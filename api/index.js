const axios = require('axios');
const { URL } = require('url');

module.exports = async (req, res) => {
    // Check if the request method is POST
    if (req.method !== 'POST') {
        return res.status(405).send('Method Not Allowed');
    }

    const url = req.body.url;

    if (!url) {
        return res.status(400).send('Please provide a URL.');
    }

    try {
        // Fetch the HTML content using axios
        const response = await axios.get(url);
        
        // Get the base URL for resolving relative links
        const baseUrl = new URL(url).origin;

        // Modify the HTML content to fix relative URLs
        let htmlContent = response.data
            .replace(/(href=")(?!http)([^"]*)/g, `$1${baseUrl}/$2`) // Fix href links
            .replace(/(src=")(?!http)([^"]*)/g, `$1${baseUrl}/$2`); // Fix src links

        // Set the content type to text/html and send the response
        res.setHeader('Content-Type', 'text/html');
        res.send(htmlContent);
    } catch (error) {
        console.error('Error fetching the URL:', error);
        res.status(500).send('Error fetching the URL: ' + error.message);
    }
};
