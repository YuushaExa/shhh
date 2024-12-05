const puppeteer = require('puppeteer');

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
        // Launch Puppeteer
        const browser = await puppeteer.launch({
            headless: true, // Run in headless mode
            args: ['--no-sandbox', '--disable-setuid-sandbox'], // Required for Vercel
        });
        const page = await browser.newPage();

        // Navigate to the provided URL
        await page.goto(url, { waitUntil: 'networkidle2' });

        // Get the content of the page
        const content = await page.content();

        // Close the browser
        await browser.close();

        // Send the content back to the client
        res.setHeader('Content-Type', 'text/html');
        res.send(content);
    } catch (error) {
        console.error('Error fetching the URL:', error);
        res.status(500).send('Error fetching the URL: ' + error.message);
    }
};
