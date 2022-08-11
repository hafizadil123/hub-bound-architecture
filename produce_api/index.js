const express = require("express");
var bodyParser = require('body-parser');
var jwt = require("jsonwebtoken");
var path = require('path');
var fileUpload = require('express-fileupload');
const cors = require("cors");
var app = express();
var path = require('path');
let router = express.Router();

// set the view engine to ejs
app.set('views', './app/views/');
app.set('view engine', 'ejs');

// const whitelist = ['*', "https://dev.hubbound.com"];
// const corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }

let corsOptions = {
  origin: '*'
};
app.use(cors(corsOptions));

// create application/json parser
var jsonParser = app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

process.env.SECRET_KEY = "thisismysecretkey"
process.env.CRYPT_KEY = "mysecretkey"
process.env.upload = "https://api.hubbound.com/";
process.env.upload_local = "http://localhost:9000/";
process.env.EMAIL_FROM = "info@hubbound.com";
process.env.EMAIL_NAME = "Hub Bound";
process.env.WEB_URL = "https://dev.hubbound.com";
process.env.MANDRILL_API_KEY = "mmgnt2xExLKaAbX5vq8zuw";

const port = process.env.port || 9000;

//routes of website
require('./app/routes/auth_routes')(app);

app.listen(port, () => {
  console.log("Started application on port %d", port)
});