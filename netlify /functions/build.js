const axios = require('axios');

exports.handler = async (event, context) => {
  // Hanya izinkan metode POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ status: false, message: 'Method not allowed' })
    };
  }

  try {
    const { url, email, name } = JSON.parse(event.body);
    const apiKey = 'bagus'; // API key dari service external

    if (!url || !email || !name) {
      return {
        statusCode: 400,
        body: JSON.stringify({ status: false, message: 'Missing required parameters.' })
      };
    }

    const apiURL = `https://web2apk-cg.zone.id/tools/web2app?apikey=${apiKey}&url=${encodeURIComponent(url)}&email=${encodeURIComponent(email)}&name=${encodeURIComponent(name)}`;

    const { data } = await axios.get(apiURL, { timeout: 300000 });
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(data)
    };
  } catch (err) {
    console.error('Error:', err.message);
    
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        status: false, 
        message: err.message || 'Internal server error' 
      })
    };
  }
};
