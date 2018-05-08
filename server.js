
const express = require('express');

var router = express.Router();
var bodyParser = require('body-parser')
const app = express();
const port = process.env.PORT || 5000;

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.listen(port, () => console.log(`Listening on port ${port}`));


//database stuff

var sql = require('mssql');

var config = {
    server: 'mssql6.gear.host',
    database: 'webstoregaby',
    user: 'webstoregaby',
    password: 'Oy4WnQbc_N~3',
};

app.use(bodyParser.json());

app.get('/fabricitem', function(req, res, next){
    var dbConn = new sql.Connection(config);
    dbConn.connect().then(function () {

        var request = new sql.Request(dbConn);
        request.query("select * from Item I, ItemLocation IL where IL.deptId = 1 and I.itemId = IL.itemId;").then(function (recordSet) {
            console.log(recordSet);
            res.send(JSON.stringify(recordSet));
            dbConn.close();
        }).catch(function (err) {
            console.log(err);
            dbConn.close();
        });
    }).catch(function (err) {
        console.log(err);
    });
})

app.get('/handcraftitem', function(req, res, next){
  var dbConn = new sql.Connection(config);
  dbConn.connect().then(function () {

      var request = new sql.Request(dbConn);
      request.query("select * from Item I, ItemLocation IL where IL.deptId = 2 and I.itemId = IL.itemId;").then(function (recordSet) {
          console.log(recordSet);
          res.send(JSON.stringify(recordSet));
          dbConn.close();
      }).catch(function (err) {
          console.log(err);
          dbConn.close();
      });
  }).catch(function (err) {
      console.log(err);
  });
})


app.post('/newcustomer', function(req, res, next){
  var dbConn = new sql.Connection(config);
  dbConn.connect().then(function () {
      var transaction = new sql.Transaction(dbConn);
      transaction.begin().then(function () {
          let name = req.body.name;
          let email = req.body.email;
          let password = req.body.password;
          var request = new sql.Request(transaction);
          request.query(`insert into Customer (name , email, password) values('${name}','${email}', '${password}')`)
      .then(function () {
              transaction.commit().then(function (recordSet) {
                  dbConn.close();
              }).catch(function (err) {
                  console.log("Error in Transaction Commit " + err);
                  dbConn.close();
              });
          }).catch(function (err) {
              console.log("Error in Transaction Begin " + err);
              dbConn.close();
          });
           
      }).catch(function (err) {
          console.log(err);
          dbConn.close();
      });
  }).catch(function (err) {
      console.log(err);
  });
})

app.post('/login', function(req, res, next){
  var dbConn = new sql.Connection(config);
  dbConn.connect().then(function () {
      var transaction = new sql.Transaction(dbConn);
      transaction.begin().then(function () {
          let email = req.body.email;
          let password = req.body.password;
          var request = new sql.Request(transaction);
          request.query(`Select * from Customer where email='${email}' and password='${password}'`)
      .then(function (recordSet) {
              if(Object.keys(recordSet).length===1){
                console.log("signed in");
              }
              res.send(JSON.stringify(recordSet));
              dbConn.close();
          });
      }).catch(function (err) {
          console.log(err);
          dbConn.close();
      });
  }).catch(function (err) {
      console.log(err);
  });
})

