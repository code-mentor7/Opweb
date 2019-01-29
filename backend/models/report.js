let db = require('../database');


module.exports.getReportWithClientId = function(client_id, callback) {
  db.query("SELECT report_id_num, report_name, client_id FROM reports WHERE client_id = '" + client_id + "'", callback);
};

module.exports.getAllReport = function(callback) {
  db.query("SELECT report_id_num, report_name, client_id FROM reports", callback);
};

module.exports.getReportWithId = function(report_id, callback) {
  db.query("SELECT report_blob, report_name FROM reports WHERE report_id_num = '" + report_id + "'", callback);
};

module.exports.sendResponse = function(data, res) {
  if(data.length > 0) {
    res.send({'data': data});
  } else {
    res.send({'data': null});
  }
};
