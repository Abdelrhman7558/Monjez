const https = require('https');

const token = 'AQXuq7U3hqE32XhrBZPFyD3A1mshmLFGklFBYEPHJ8X2XjeT_fr6rZixxQ8KqZJSbuwSl6SfQ5_VQSus_m5dlVzZTCxPe5oCBrxF7cjWcVwfg_BpWODSereYThW-QVS-Q0hRQv5ks0ZgBNHW5z0bUnIQPrDoTFfRmIC2NgfAcRiAZdKM18YP-cHeJVEHyL3saQkHoKBh37p2wnV6i9oTcAb7gGNzjUbC52f5S3WIJfAZm2XoYWoMLBvux0xy2t9FklBa8sXRAXYHIBquYVJhMKJIlGgPCmQokguOE-m2MX44iwCc1ghRJV8P9yTO0GBndLhfTLBO-3MEPQ3zt_wRZnAtnt9_Sg';

const options = {
    hostname: 'api.linkedin.com',
    path: '/v2/me',
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${token}`,
        'X-Restli-Protocol-Version': '2.0.0'
    }
};

const req = https.request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => {
        data += chunk;
    });
    res.on('end', () => {
        console.log(data);
    });
});

req.on('error', (e) => {
    console.error(e);
});

req.end();
