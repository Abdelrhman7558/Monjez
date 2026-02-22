const https = require('https');

const token = 'AQV7OuW10CPF2sjilkvMKvfzA86pYxIkt26ugBGbFwRLgDEYXwpMcmidykw6x1VnmyE0mFFseDiAueDCFtw4mv3StUFHicYzdLTUiS3qGO4jkISi8ZbKUMzArzl9cPcHzSIATnWW8rdyfepGHXY7JDvTOjjxBRpQaPEZAQbl-G-WdMdS3KaDWeb0COGAAcasRQSgx7rQpz9aERuMH7Su475ot3su_VHDFqsM8fbzUgwLBfInu5MUm1AxequLKludqhBjDKMB-7MDhMhRJvVm4KIexA9cNbtWBusEyXlRh-Y-EXYWAhMmWSgaJKMg2mXUdheFyoSMA_D81zhl5nUcwrrFfITbLw';

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
