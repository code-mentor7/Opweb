let express = require('express');
let app = express();
let loan = require('../models/loan');

app.get('/api/get/loan/:client_id', function(req, res) {
  const client_id = req.params.client_id;
  loan.getLoanWithClientId(client_id, function(err, rows, fields) {
    if (rows.length > 0) {
      res.send(rows);
    } else {
      res.send(null);
    }
  })
});

app.get('/api/get/loans', function(req, res) {
  loan.getAllLoan(function(err, rows, fields) {
    if (err) throw err;
    res.send(rows);
  })
});

app.post('/api/add/loan', function(req, res) {
  const data = req.body;
  loan.addLoan(data, function(err, rows, fields) {
    if (err) throw err;
    if (data.client_id === 'ADMIN') {
      loan.getAllLoan(function(err, rows, fields) {
        if (err) throw err;
        res.send(rows);
      })
    } else {
      loan.getLoanWithClientId(data.client_id, function(err, rows, fields) {
        if (rows.length > 0) {
          res.send(rows);
        } else {
          res.send(null);
        }
      })
    }
  })
});

app.get('/api/get/inventories', function(req, res) {
  loan.getInventories(function(err, rows, fields) {
    if (err) throw err;
    res.send(rows);
  })
});

app.post('/api/stock/inventory/:inventory_id', function(req, res) {
  const inventory_id = req.params.inventory_id;
  const data = req.body;
  loan.updateInventory(inventory_id, data, function(err, rows, fields) {
    if (err) throw err;
    loan.getInventoryById(inventory_id, function(err, rows, fields) {
      if (rows.length === 1) {
        res.send(rows[0]);
      } else {
        res.send(null);
      }
    })
  });
});

module.exports = app;
