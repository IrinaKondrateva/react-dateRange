const express = require('express');
const cors = require('cors');
const app = express();
const axios = require('axios');

const PORT = 5000;

app.get('/date', cors(), async (req, res) => {
  const result = await axios.get(`https://yandex.com/time/sync.json?geo=213`);
  res.send(JSON.stringify(result.data.time));
});

app.listen(PORT, () =>
  console.log(`Listening on port ${PORT}!`)
);