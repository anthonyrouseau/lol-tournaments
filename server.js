const express = require('express');
const bodyParser = require('body-parser');
require('./mongoose/config.js');
const api = require('./routes/api');


const app = express();

app.use(bodyParser.json());

app.use('/api',api);

const port = process.env.PORT || 80;

app.get('/', (req,res) => res.send('server up'));


app.listen(port, () => console.log(`server listening on port ${port}`));
