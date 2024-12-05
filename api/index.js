const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true }));

// Serve the HTML form
app.get('/', (req, res) => {
    res.send(`
        <form action="/fetch" method="POST">
            <label for="url">Enter URL:</label>
            <input type="text" id="url" name="url" required>
            <button type="submit">Fetch</button>
        </form>
    `);
});

// Handle form submission
app.post('/fetch', async (req, res) => {
    const url = req.body.url;

    if (!url) {
        return res.send('Please provide a URL.');
    }

    try {
        const response = await axios.get(url);
        // Set the content type based on the response
        res.set('Content-Type', response.headers['content-type']);
        res.send(response.data);
    } catch (error) {
        res.status(500).send('Error fetching the URL: ' + error.message);
    }
});

// Proxy requests for resources
app.get('/proxy/*', async (req, res) => {
    const originalUrl = req.params[0];
    const fullUrl = `http://${originalUrl}`;

    try {
        const response = await axios.get(fullUrl);
        res.set('Content-Type', response.headers['content-type']);
        res.send(response.data);
    } catch (error) {
        res.status(500).send('Error fetching the resource: ' + error.message);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
