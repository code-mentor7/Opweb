let express = require('express');
let app = express();

let user = require('../models/user');

app.post('/api/user/login', function (req, res) {
  const data = req.body;
  user.loginUser(data.email, data.password, function(err, rows, fields) {
    if(rows.length === 1) { // user exists
      user.sendResponse(rows, res);
    } else { // user not exists
      user.sendResponse(rows, res)
    }
  })
});

app.get('/api/get/users/:user_id', function(req, res) {
  const user_id = req.params.user_id;
  user.findAll(user_id,function(err, rows, fields) {
    if (err) throw err;
    res.send({'data': rows});
  })
});

app.put('/api/update/user/:user_id', function(req, res) {
  const user_id = req.params.user_id;
  const data = req.body;
  user.findUser(user_id, function(err, rows, fields) {
    if(rows.length === 1) {
      user.updateUser(user_id, data, function(err, rows, fields) {
        if (err) throw err;
        user.findUser(user_id, function(err, row, fields) {
          if (err) throw err;
          res.send(row[0])
        })
      })
    } else {
      res.send(null);
    }
  })
});

app.post('/api/user/signup', function(req, res) {
  data = req.body;
  user.signUp(data, function(err, rows, fields) {
    if (err) throw err;
    res.send({status: 'success'});
  });
});

// app.post('/adduser', function(req, res, next) {
//
// 	var data = req.body;
// 	user.findByUsername(data.username, function(err, rows, fields) {
// 		if(rows.length === 1) {
// 			user.sendResponse(false, res);
// 		} else {
// 			user.encrypt(data, function(err, hash) {
// 				data = {
// 					username: data.username,
// 					hashedpassword: hash
// 				};
// 				user.addUser(data, function(err, info) {
// 					if(err) throw err;
// 					console.log(info);
// 					user.sendResponse(true, res);
// 				});
// 			});
// 		};
// 	});
// });

module.exports = app;
