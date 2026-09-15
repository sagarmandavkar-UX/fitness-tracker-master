require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { POST } = require('./Chatbot');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/api/chat', POST);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
