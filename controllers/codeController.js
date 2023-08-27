const connection = require("../config");
const getExtensionCodes = (req, res) => {
    let ext_id =  req.params.extid
    // console.log(ext_id)
    connection.query(`SELECT * FROM codes INNER JOIN extensions USING(ext_id) WHERE ext_id = ${ext_id}`, (error, results, fields) => {
        if(error)
            res.json({success: false})
        else
            res.json({success: true, count: results.length, data: results})
    });
}

const deleteCode = (req, res) => {
    let code = req.query.code;
    console.log(code)
    
    connection.query(`DELETE FROM codes WHERE code_id = '${code}'`, (error, results)  => {
        console.log(error)
        if(error)
            res.json({success: false, error: error});
        else
            res.json({success: true});
    })
}


const addCode = (req, res) => {
    let data = {
        code: req.body.code,
        description: req.body.description,
        ext_id: req.body.ext_id,
    }
    console.log(data)

    connection.query(`INSERT INTO codes SET ?`, data, (error, results, fields) => {
        if(error) 
            res.json({success: false});
        else
            res.json({success: true});
  
    })
}

module.exports = {
    getExtensionCodes,
    deleteCode,
    addCode
}