const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/formData', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Define a schema and model
const dataSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String
});
const Data = mongoose.model('Data', dataSchema);

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Routes
app.post('/api/data', async (req, res) => {
  const newData = new Data(req.body);
  try {
    await newData.save();
    res.status(201).send(newData);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.get('/api/data', async (req, res) => {
  try {
    const data = await Data.find();
    res.status(200).send(data);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.put('/api/data/:id', async (req, res) => {
  try {
    const updatedData = await Data.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).send(updatedData);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.delete('/api/data/:id', async (req, res) => {
  try {
    await Data.findByIdAndDelete(req.params.id);
    res.status(200).send('Data deleted');
  } catch (err) {
    res.status(400).send(err);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
