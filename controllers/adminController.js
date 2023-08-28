const connection = require("../config");

const adminLogin = (req, res) => {
    if(req.body.username && req.body.body) {
        let username = req.body.username;
        let password = req.body.password;

        connection.query(`SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`, (error, results, fields) => {
            if(error)
                res.json({success: false});
            else
            res.cookie('role', 'admin');
            res.json({success: true});
        })
    } 
}

module.exports = {
    adminLogin
}