const express = require("express");
const path = require("path");

const app = express();
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

var cors = require("cors");
const bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
app.use(cookieParser());

app.use(cors());

// support parsing of application/json type post data
app.use(bodyParser.json());
const connection = require("./config");

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: false }));
const extRouter = require("./routes/extRouter");
const codeRouter = require("./routes/codeRouter");

app.use("/api/extension", extRouter);
app.use("/api/code", codeRouter);
app.get("/admin", (req, res) => {
  if (req.cookies["role"] == "admin") {
    res.render("admin/index");
  } else {
    res.redirect("/");
  }
});
app.post("/admin/login", (req, res) => {
  console.log(req.body);
  let username = req.body.username;
  let password = req.body.password;

  connection.query(
    `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`,
    (error, results, fields) => {
      if (error) res.json({ success: false });
      else {
        console.log(results.length);
        if (results.length == 1) {
          res.cookie("role", "admin");
          res.json({ success: true });
        } else {
          res.json({ success: false, message: "No user found" });
        }
      }
    }
  );
});

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/admin/extensions", (req, res) => {
  if (req.cookies["role"] == "admin") {
    res.render("admin/extensions");
  } else {
    res.redirect("/");
  }
});

app.get("/admin/codes", (req, res) => {
  res.render("admin/codes");
});
app.get("/:url_path/install", (req, res) => {
  let ext_url_path = req.params.url_path;
  connection.query(
    `SELECT ext_install_url FROM extensions WHERE ext_url_path = '${ext_url_path}'`,
    (error, results, fields) => {
      console.log(results);
      res.redirect(results[0].ext_install_url);
    }
  );
});

app.get("/:url_path/uninstall", (req, res) => {
  let ext_url_path = req.params.url_path;
  connection.query(
    `SELECT ext_uninstall_url FROM extensions WHERE ext_url_path = '${ext_url_path}'`,
    (error, results, fields) => {
      console.log(results);
      res.redirect(results[0].ext_uninstall_url);
    }
  );
});

const port = process.env.PORT || 8080;
// const host = process.env.HOST || 'localhost';

app.listen(port);
