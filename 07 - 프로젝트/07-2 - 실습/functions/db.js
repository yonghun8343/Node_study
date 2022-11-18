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


// 저장용
// CREATE TABLE `hscampus`.`auth` (
//   `a_id` INT NOT NULL AUTO_INCREMENT,
//   `a_email` VARCHAR(255) NOT NULL,
//   `a_digit` INT(11) NOT NULL,
//   `a_dae` TIMESTAMP NULL DEFAULT current_timestamp,
//   PRIMARY KEY (`a_id`))
// ENGINE = InnoDB
// DEFAULT CHARACTER SET = utf8;
