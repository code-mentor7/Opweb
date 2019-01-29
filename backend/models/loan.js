let db = require('../database');


module.exports.getLoanWithClientId = function(client_id, callback) {
  db.query("SELECT * FROM loans WHERE client_id = '" + client_id + "'", callback);
};

module.exports.getAllLoan = function(callback) {
  db.query("SELECT * FROM loans", callback);
};

module.exports.addLoan = function(data, callback) {
	db.query("INSERT INTO loans SET ?", data, callback);
};

module.exports.getInventoryById = function(inventory_id, callback) {
  db.query("SELECT * FROM stock_inventory WHERE inventory_id_num = '" + inventory_id + "'", callback);
};

module.exports.getInventories = function (callback) {
  db.query("SELECT * FROM stock_inventory", callback)
};

module.exports.updateInventory = function(inventory_id, data, callback) {
  db.query("UPDATE stock_inventory SET " +
    "quantity = '" + data.quantity + "' " +
    "WHERE inventory_id_num = '" + inventory_id + "'", callback)
};
