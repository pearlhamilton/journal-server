const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const entryRoutes = require('./controllers/entries');
const searchRoutes = require('./controllers/searches');
app.use('/entries', entryRoutes);
app.use('/searches', searchRoutes);

app.get('/', (req, res) => {
    res.send('Hello there!');
});




module.exports = app;
