const express = require('express');
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
app.post('/fetch', (req, res) => {
    const url = req.body.url;

    if (!url) {
        return res.send('Please provide a URL.');
    }

    // Send an HTML response with an iframe
    res.send(`
        <h1>Website Content</h1>
        <iframe src="${url}" style="width: 100%; height: 100vh;" frameborder="0"></iframe>
        <br>
        <a href="/">Go Back</a>
    `);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
