const express = require("express");
const path = require('path');

const app = express();
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'public')));

var cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors());

// support parsing of application/json type post data
app.use(bodyParser.json());
const connection = require("./config");

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));
const userRouter = require('./routes/userRouter');
const extRouter = require('./routes/extRouter');
const codeRouter = require("./routes/codeRouter");

app.use("/user", userRouter);
app.use("/api/extension", extRouter);
app.use("/api/code", codeRouter)
app.get("/admin", (req, res) => {
  res.render("admin/index")
});
app.get("/admin/extensions", (req, res) => {
  res.render("admin/extensions")
})

app.get("/admin/codes", (req, res) => {
  res.render("admin/codes")
})
app.get("/:url_path/install", (req, res) => {
  let ext_url_path = req.params.url_path;
  connection.query(`SELECT ext_install_url FROM extensions WHERE ext_url_path = '${ext_url_path}'`, (error, results, fields) => {
    console.log(results)
    res.redirect(results[0].ext_install_url)
  })
})

app.get("/:url_path/uninstall", (req, res) => {
  let ext_url_path = req.params.url_path;
  connection.query(`SELECT ext_uninstall_url FROM extensions WHERE ext_url_path = '${ext_url_path}'`, (error, results, fields) => {
    console.log(results)
    res.redirect(results[0].ext_uninstall_url)
  })
})

app.listen(3000);
