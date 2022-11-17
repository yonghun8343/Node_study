import mariadb from "mariadb";

async function asyncSQL(sql) {
  const conn = await mariadb.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    port: process.env.port,
    database: process.env.database,
  });

  try {
    const res = await conn.query(sql);
    return res;
  } catch (error) {
    throw new Error("에러가 발생 했습니다.");
  } finally {
    conn.end();
  }
}

export default asyncSQL;
