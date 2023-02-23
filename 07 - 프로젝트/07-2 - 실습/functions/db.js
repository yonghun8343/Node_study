const mariadb = require("mariadb/callback");

function asyncSQL(sql, callback) {
  console.log(sql);
  const conn = mariadb.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    port: process.env.dbport,
    database: process.env.database,
    // SELECT COUNT를 했을 때 숫자로 받는 법
    supportBigNumbers: true,
    bigNumberStrings: true,
  });

  conn.query(sql, (err, rows) => {
    console.log(rows);
    callback(err, rows);
    conn.end();
  });
}

// async function asyncSQL(sql) {
//   const conn = await mariadb.createConnection({
//     host: process.env.host,
//     user: "root",
//     password: "root",
//     port: process.env.dbport,
//     database: process.env.database,
//   });

//   try {
//     const res = await conn.query(sql);
//     return res;
//   } catch (error) {
//     console.log(error);
//     throw new Error("에러가 발생 했습니다.");
//   } finally {
//     conn.end();
//   }
// }

module.exports = asyncSQL;
