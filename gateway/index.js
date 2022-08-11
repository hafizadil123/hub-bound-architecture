const express = require('express');
const cors = require('cors');
const proxy = require('express-http-proxy');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/uber-eats', proxy('http://localhost:8001'))
app.use('/produce-api', proxy('http://localhost:9000'))

app.listen(8000, () => {
    console.log('Gateway is Listening to Port 8000')
})