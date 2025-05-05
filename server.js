// server.js
const path = require('path');
const express = require('express');

const app = express();

app.use(express.static(path.join(__dirname, 'web-build')));  // Serve static files

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'web-build', 'index.html'));  // Serve index.html
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
