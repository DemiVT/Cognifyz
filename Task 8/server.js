const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const redis = require('redis');
const client = redis.createClient();
const cron = require('node-cron');

app.use(bodyParser.json());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.get('/cache', (req, res) => {
    client.get('data', (err, data) => {
        if (err) throw err;
        if (data) {
            res.send(data);
        } else {
            res.send('No data found');
        }
    });
});

cron.schedule('*/1 * * * *', () => {
    client.set('data', JSON.stringify({ time: new Date() }));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
