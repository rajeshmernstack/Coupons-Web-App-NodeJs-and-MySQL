const mysql = require('mysql');

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "couponcodes"
})

connection.connect(function(err){
    if(err) throw err;
    console.log("Successfully Connected");

});



module.exports = connection;