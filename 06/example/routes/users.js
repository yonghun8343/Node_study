var express = require("express");
var router = express.Router();
// const mariadb = require("mariadb/callback");
// const pool = mariadb.createPool({
//   host: process.env.host, // localhost
//   user: process.env.user,
//   password: process.env.password,
//   port: process.env.port,
//   database: process.env.database,
//   connectionLimit: process.env.connectionLimit,
// });

// pool.query(`SELECT * FROM user;`, (err, results, metadata) => {
//   console.log(err);
//   console.log(results);
//   console.log(metadata);
// });

// const conn = mariadb.createConnection({
//   host: "127.0.0.1", // localhost
//   user: "root",
//   password: "root",
//   port: "3306",
//   database: "hscampus",
// });

// conn.query(`SELECT * FROM user;`, (err, rows) => {
//   console.log(err);
//   console.log(rows);
// });

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

module.exports = router;
