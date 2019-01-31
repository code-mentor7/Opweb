let express = require('express');
let app = express();
let report = require('../models/report');
const fs = require("fs");
const mime = require('mime');
const path = require('path');

app.get('/api/get/report/:client_id', function(req, res) {
  const client_id = req.params.client_id;
  report.getReportWithClientId(client_id, function (err, rows, fields) {
    if(rows.length > 0) {
      res.send(rows);
    } else {
      res.send(null);
    }
  })
});

app.get('/api/get/reports', function(req, res) {
  report.getAllReport(function(err, rows, fields) {
    if (err) throw err;
    res.send(rows);
  })
});

app.get('/api/report/:report_id_num', function(req, res) {
  const id = req.params.report_id_num;
  report.getReportWithId(id, function(err, rows, fields) {
    if (err) throw err;
    if (!rows[0].report_blob) {
      res.send(null);
    } else {
      const data = rows[0].report_blob;
      const outputfile = "public/" + rows[0].report_name;
      const buf = new Buffer(data, "binary");
      fs.open(outputfile, 'w', function (err, file) {
        if (err) throw err;
        fs.writeFileSync(outputfile, buf);
        fs.close(file, (err) => {
          if (err) throw err;
        });
      });
      let mimetype = mime.lookup(outputfile);

      res.setHeader('Content-disposition', 'attachment; filename=' + rows[0].report_name);
      res.setHeader('Content-type', mimetype);
      let filestream = fs.createReadStream(outputfile);
      filestream.pipe(res);
    }
  });
});

module.exports = app;
