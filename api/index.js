const express = require('express');
const puppeteer = require('puppeteer');
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
        // Launch Puppeteer and open a new page
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        // Navigate to the provided URL
        await page.goto(url, { waitUntil: 'networkidle2' });

        // Get the content of the page
        const content = await page.content();

        // Close the browser
        await browser.close();

        // Send the content back to the client
        res.send(content);
    } catch (error) {
        res.status(500).send('Error fetching the URL: ' + error.message);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
