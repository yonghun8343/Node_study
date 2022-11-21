const mariadb = require("mariadb/callback");

// callback을 변수의 마지막에 넣어 해당 결과값을 callback으로 반환한다고 선언 해 줍니다.
function asyncSQL(sql, callback) {
  const conn = mariadb.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    port: process.env.dbport,
    database: process.env.database,
  });

  conn.query(sql, (err, rows) => {
    // 아래의 callback에서 결과값을 반환 합니다.
    callback(err, rows);
    conn.end();
  });
}

// 해당 프로젝트 코드에는 해당 주석을 삭제 하였으나 여기에는 남겨 두겠습니다.
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
