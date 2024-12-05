const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', async (req, res) => {
    const url = req.query.url;

    if (!url) {
        return res.send('Please provide a URL as a query parameter, e.g., /?url=https://example.com');
    }

    try {
        const response = await axios.get(url);
        res.send(response.data);
    } catch (error) {
        res.status(500).send('Error fetching the URL: ' + error.message);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

module.exports = app;
