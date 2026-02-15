
const http = require('http');

const data = JSON.stringify({
    message: 'Hello',
    history: []
});

const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/chat',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
};

const req = http.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    let responseData = '';

    res.on('data', (chunk) => {
        responseData += chunk;
    });

    res.on('end', () => {
        console.log('Response Body:');
        try {
            console.log(JSON.parse(responseData));
        } catch (e) {
            console.log(responseData);
        }
    });
});

req.on('error', (error) => {
    console.error(`Problem with request: ${error.message}`);
});

req.write(data);
req.end();
