var express = require('express');
var app = express();

app.use(express.static('dist'));

var loggedIn = false;

// Mock login
app.post('/login', function (req, res) {
  loggedIn = true;
  res.status(200).send({id: 'mock'});
});

// Reject /archive POST request with 401 status code
app.post('/archive', function (req, res) {
  if (!loggedIn) {
    res.status(401).send({id: 'mock'});
  } else {
    loggedIn = false; // revert to login (for demo)
    res.status(200).send({id: 'mock'});
  }
});

var server = app.listen(3000, function () {
  console.log('Login Modal app listening at http://localhost:%s', server.address().port);
});
