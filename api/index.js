const axios = require('axios');
const https = require('https');
const { URL } = require('url');

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).send('Method Not Allowed');
    }

    const url = req.body.url;

    if (!url) {
        return res.status(400).send('Please provide a URL.');
    }

    try {
        // Create an HTTPS agent that ignores SSL certificate errors
        const agent = new https.Agent({  
            rejectUnauthorized: false // Ignore SSL certificate errors
        });

        // Fetch the HTML content using axios with the custom agent
        const response = await axios.get(url, { httpsAgent: agent });
        
        const baseUrl = new URL(url).origin;

        // Modify the HTML content to fix relative URLs
        let htmlContent = response.data
            .replace(/(href=")(?!http)([^"]*)/g, `$1${baseUrl}/$2`) // Fix href links
            .replace(/(src=")(?!http)([^"]*)/g, `$1${baseUrl}/$2`); // Fix src links

        res.setHeader('Content-Type', 'text/html');
        res.send(htmlContent);
    } catch (error) {
        console.error('Error fetching the URL:', error);
        res.status(500).send('Error fetching the URL: ' + error.message);
    }
};
