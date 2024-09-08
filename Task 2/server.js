const express = require('express');
const app = express();
const port = 3000;
const ejs = require('ejs');

app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/submit', (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        res.send("Error: All fields are required.");
    } else {
        res.send(`Received: ${name} with email ${email}`);
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
