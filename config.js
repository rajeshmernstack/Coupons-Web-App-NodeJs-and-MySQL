const mysql = require('mysql');

const connection = mysql.createConnection({
    host: "db-mysql-nyc1-couponcodes-do-user-14505695-0.b.db.ondigitalocean.com:25060",
    user: "doadmin",
    password: "AVNS_DEm2tytOF9ib7NpFWJZ",
    database: "defaultdb"
})

connection.connect(function(err){
    if(err) throw err;
    console.log("Successfully Connected");

});



module.exports = connection;