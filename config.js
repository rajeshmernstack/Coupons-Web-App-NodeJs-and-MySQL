const mysql = require('mysql');
const fs = require('fs');

const connection = mysql.createConnection({
    host: "db-mysql-nyc1-couponcodes-do-user-14505695-0.b.db.ondigitalocean.com",
    user: "doadmin",
    password: "AVNS_DEm2tytOF9ib7NpFWJZ",
    database: "defaultdb",
    port: 25060,
    ssl  : {
        ca : fs.readFileSync(__dirname + '/ca-certificate.crt')
      }
})

connection.connect(function(err){
    if(err) throw err;
    console.log("Successfully Connected");

});



module.exports = connection;