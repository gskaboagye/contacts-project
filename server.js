const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongodb = require('./db/connect');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/contacts', require('./routes/contacts'));

app.get('/', (req, res) => {
  res.send('Contacts API is running');
});

mongodb.initDb((err) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }
});