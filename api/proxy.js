export default async function handler(req, res) {
    // Set generous CORS headers
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    try {
        // Fetch from Tzofar (Bypasses the Oref military firewall blocking Vercel)
        const response = await fetch('https://api.tzevaadom.co.il/notifications', {
            method: 'GET',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Tzofar responded with status: ${response.status}`);
        }

        const textData = await response.text();
        
        if (!textData || textData.trim() === '') {
            return res.status(200).send('');
        }
        
        const jsonData = JSON.parse(textData);
        return res.status(200).json(jsonData);

    } catch (error) {
        console.error('Proxy Error:', error);
        return res.status(500).json({ error: 'Failed to fetch Tzofar data', details: error.message });
    }
}
