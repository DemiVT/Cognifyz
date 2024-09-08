const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let items = [];

app.get('/api/items', (req, res) => {
    res.json(items);
});

app.post('/api/items', (req, res) => {
    const newItem = req.body;
    items.push(newItem);
    res.status(201).json(newItem);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
