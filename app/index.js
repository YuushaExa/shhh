// api/proxy.js

export default async function handler(req, res) {
    const { method, headers, body } = req;
    const targetUrl = req.query.url; // Get the target URL from query parameters

    if (!targetUrl) {
        return res.status(400).json({ error: 'Missing target URL' });
    }

    try {
        const response = await fetch(targetUrl, {
            method,
            headers: {
                ...headers,
                host: new URL(targetUrl).host, // Set the host header to the target URL
            },
            body: method === 'POST' ? body : undefined,
        });

        const data = await response.text();
        res.status(response.status).send(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching the target URL' });
    }
}

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

module.exports = app;
