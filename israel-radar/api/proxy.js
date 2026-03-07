export default async function handler(req, res) {
    // 1. Set generous CORS headers just in case
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    // Respond immediately to OPTIONS preflight requests
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    try {
        // 2. Fetch directly from the Official Oref API
        const response = await fetch('https://www.oref.org.il/WarningMessages/alert/alerts.json', {
            method: 'GET',
            headers: {
                // We mimic a standard browser to prevent Oref's WAF (Web Application Firewall) from blocking us
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'application/json, text/plain, */*',
                'Referer': 'https://www.oref.org.il/',
                'X-Requested-With': 'XMLHttpRequest'
            }
        });

        if (!response.ok) {
            throw new Error(`Oref responded with status: ${response.status}`);
        }

        // 3. Process the Response
        const textData = await response.text();
        
        // If the response is empty (no active alerts), return an empty string gracefully
        if (!textData || textData.trim() === '') {
            return res.status(200).send('');
        }
        
        // Otherwise, parse and forward the JSON payload
        const jsonData = JSON.parse(textData);
        return res.status(200).json(jsonData);

    } catch (error) {
        console.error('Proxy Error:', error);
        return res.status(500).json({ error: 'Failed to fetch Oref data', details: error.message });
    }
}
