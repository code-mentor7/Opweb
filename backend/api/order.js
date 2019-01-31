let express = require('express');
let app = express();
let order = require('../models/order');

app.get('/api/get/orders', function(req, res) {
  order.getAllOrder(function(err, rows, fields) {
    if (err) throw err;
    res.send(rows);
  })
});

module.exports = app;
