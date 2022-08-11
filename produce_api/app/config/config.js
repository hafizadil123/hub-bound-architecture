var connection = require('mysql2-promise')();

connection.configure({
  "host": "localhost",
  "user": "root",
  "password": "(gh@$5GH#)hj",
  "database": "produce_locator"
});

module.exports = connection;
