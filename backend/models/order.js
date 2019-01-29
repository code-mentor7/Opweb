let db = require('../database');

module.exports.getAllOrder = function(callback) {
  db.query("SELECT * FROM orders", callback);
};
