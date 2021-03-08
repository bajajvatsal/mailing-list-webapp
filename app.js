var express = require("express");
var mysql = require("mysql");
var bodyParser = require("body-parser");
var app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "<Enter the name of the database>",
  password: "<Enter the MySQL database password>",
});
connection.connect(function (err) {
  if (err) throw err;
  console.log("MySQL Database Connected!");
});
app.get("/", function (req, res) {
  // Find count of users in DB
  var q = "SELECT COUNT(*) AS count FROM users";
  connection.query(q, function (err, results) {
    if (err) throw err;
    var count = results[0].count;
    res.render("home", { count: count });
  });
});

app.post("/register", function (req, res) {
  var person = {
    email: req.body.email,
  };
  connection.query("INSERT INTO users SET ?", person, function (err, result) {
    if (err) throw err;
    res.redirect("/");
  });
});

app.listen(1111, function () {
  console.log("Server running on 1111!");
});
