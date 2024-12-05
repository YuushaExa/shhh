const express = require('express');
const request = require('request');
const app = express();
const PORT = 3000;

// Proxy route
app.get('/proxy', (req, res) => {
    const url = 'https://danbooru.donmai.us/posts?tags=money'; // The website you want to load
    request(url).pipe(res);
});

// Serve the HTML page with the iframe pointing to the proxy
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Iframe Example</title>
        </head>
        <body>
            <h1>Website Loaded in Iframe</h1>
            <iframe src="/proxy" width="600" height="400" style="border: none;"></iframe>
        </body>
        </html>
    `);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
