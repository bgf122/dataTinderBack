const express = require('express');
const path = require('path');

const app = express();

// Static folder 
app.use(express.static(path.join(__dirname, 'public')))

app.use('/api/programs', require('./routes/api/programs'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => `App running on port ${PORT}`);