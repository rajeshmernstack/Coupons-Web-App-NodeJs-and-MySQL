const connection = require("../config");

const addExtension = (req, res) => {
    let data = {
        ext_name: req.body.ext_name,
        ext_url_path: req.body.ext_url_path,
        ext_install_url: req.body.ext_install_url,
        ext_uninstall_url: req.body.ext_uninstall_url
    }
    console.log(data)

    connection.query(`INSERT INTO extensions SET ?`, data, (error, results, fields) => {
        if(error) 
            res.json({success: false, err: error});
        else
            res.json({success: true});
  
    })
}

const deleteExtension = (req, res) => {
    let eid = req.query.eid;
    console.log(eid)
    
    connection.query(`DELETE FROM extensions WHERE ext_id = '${eid}'`, (error, results)  => {
        if(error)
            res.json({success: false, error: error});
        else
            res.json({success: true});
    })
}
const getAllExtensions = (req, res) => {
    connection.query("SELECT * FROM extensions", (error, results, fields) => {
        if(error)
            res.json({success: false})
        else 
            res.json({ success: true, count: results.length, data: results})
    });
}


module.exports = {
    addExtension,
    getAllExtensions,
    deleteExtension
}