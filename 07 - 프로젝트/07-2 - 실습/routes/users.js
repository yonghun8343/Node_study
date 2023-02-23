const express = require("express");
const { sendMail, randomNumber } = require("../functions/mail");
const asyncSQL = require("../functions/db");
const { encrypt } = require("../functions/encrypt");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("respond with a resource");
});

router.post("/auth_mail", (req, res) => {
  const { email } = req.body;
  const rnd = randomNumber();

  asyncSQL(
    `INSERT INTO auth (a_email, a_digit) VALUES ("${email}", "${rnd}");`,
    (err, rows) => {
      if (err || rows.affectedRows < 1) {
        res.status(500).json({
          status: "fail",
          message: "서버에서 에러가 발생 했습니다.",
        });
      } else {
        sendMail(email, rnd, (err1) => {
          if (err1) {
            res.status(500).json({
              status: "fail",
              message: "서버에서 에러가 발생 하였습니다.",
            });
          } else {
            res.status(201).json({
              status: "success",
              message: "성공되었습니다.",
            });
          }
        });
      }
    }
  );
});

router.get("/auth_valid", (req, res) => {
  const { email, digit } = req.query;
  asyncSQL(
    `SELECT a_id, a_digit FROM auth WHERE a_email = "${email}" AND a_is_used = 0 ORDER BY a_id DESC LIMIT 1`,
    (err, rows) => {
      console.log(rows);
      if (err || rows.length < 1) {
        res
          .status(500)
          .json({ status: "fail", message: "서버에서 오류가 발생했습니다." });
      } else if (digit.toString() === rows[0].a_digit.toString()) {
        asyncSQL(
          `UPDATE auth SET a_is_used = 1 WHERE a_id = ${rows[0].a_id}`,
          (err1, rows1) => {
            if (err1 || rows1.affectedRows < 1) {
              res.status(500).json({
                status: "fail",
                message: "서버에서 에러가 발생했습니다.",
              });
            } else {
              res.status(200).json({
                status: "success",
                message: "일치합니다.",
              });
            }
          }
        );
      } else {
        res.status(200).json({ status: "fail", message: "일치하지 않습니다." });
      }
    }
  );
});

// 동일한 이메일이 있을때 가입 X

router.post("/register", (req, res) => {
  const { email, pwd, nick, name } = req.body;
  const encryptPwd = encrypt(pwd);

  asyncSQL(
    `SELECT u_email FROM user WHERE u_email = "${email}"`,
    (err, rows) => {
      if (err) {
        console.log("1번 select");
        console.log(err);
        res.status(500).json({
          status: "fail",
          message: "서버에서 에러가 발생 하였습니다.",
        });
      } else if (rows.length > 0) {
        res.status(200).json({
          status: "fail",
          message: "이미 가입된 이메일이 있습니다.",
        });
      } else {
        asyncSQL(
          `INSERT INTO user (u_email, u_pwd, u_name, u_nick) VALUES ("${email}", "${encryptPwd}", "${name}", "${nick}");`,
          (err1, rows1) => {
            if (err1 || rows1.affectedRows < 1) {
              console.log("2번 select");
              console.log(err1);
              res.status(500).json({
                status: "fail",
                message: "서버에서 에러가 발생 하였습니다.",
              });
            } else {
              res.status(201).json({
                status: "success",
                message: "성공되었습니다.",
              });
            }
          }
        );
      }
    }
  );
});

router.post("/login", (req, res) => {
  const { email, pwd } = req.body;
  const encryptPwd = encrypt(pwd);

  asyncSQL(
    `SELECT u_id, u_pwd, u_name, u_nick FROM user WHERE u_email = "${email}";`,
    (err, rows) => {
      if (err) {
        res.status(500).json({
          status: "fail",
          message: "서버에서 에러가 발생 하였습니다.",
        });
      } else if (rows.length > 0) {
        if (rows[0].u_pwd === encryptPwd) {
          res.status(200).json({
            status: "success",
            message: "로그인 성공",
            info: {
              id: rows[0].u_id,
              name: rows[0].u_name,
              nick: rows[0].u_nick,
            },
          });
        } else {
          res.status(200).json({
            status: "fail",
            message: "비밀번호를 찾을 수 없습니다.",
          });
        }
      } else {
        res.status(200).json({
          status: "fail",
          message: "이메일을 찾을 수 없습니다.",
        });
      }
    }
  );
});

// 비밀번호 변경하기.
// 1. 에러가 발생 할 때
// 2. 기존 비밀번호랑 일치하는지
// 3. 이메일을 찾을 수 없을 때
router.put("/changePwd", (req, res) => {
  const { email, pwd } = req.body;
  if (!email || !pwd) {
    res.status(400).json({
      status: "fail",
    });
  }
  const encryptPwd = encrypt(pwd);

  asyncSQL(`SELECT u_pwd FROM user WHERE u_email = "${email}"`, (err, rows) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        status: "fail",
        message: "서버에서 에러가 발생 하였습니다.",
      });
    }
    if (rows.length > 0) {
      if (encryptPwd === rows[0].u_pwd) {
        res.status(200).json({
          status: "fail",
          message: "기존 비밀번호와 일치 합니다.",
        });
      } else {
        asyncSQL(
          `UPDATE user SET u_pwd = "${encryptPwd}" WHERE u_email = "${email}"`,
          (err1, rows1) => {
            if (err1) {
              console.log(err1);
              res.status(500).json({
                status: "fail",
                message: "서버에서 에러가 발생 하였습니다.",
              });
            } else if (rows1.affectedRows > 0) {
              res.status(200).json({
                status: "success",
                message: "성공적으로 바뀌었습니다.",
              });
            } else {
              res.status(200).json({
                status: "fail",
                message: "이메일을 찾을 수 없습니다.",
              });
            }
          }
        );
      }
    } else {
      res.status(200).json({
        status: "fail",
        message: "이메일을 찾을 수 없습니다.",
      });
    }
  });
});

// 닉네임 수정
router.put("/changeNick", (req, res) => {
  const { uid, nick } = req.body;
  if (!uid || !nick) res.status(400).end();

  asyncSQL(
    `
    UPDATE
      user
    SET
      u_nick = "${nick}"
    WHERE u_id = ${uid};
  `,
    (err) => {
      if (err) {
        res.status(500).json({
          status: "fail",
          message: "서버에서 에러가 발생 했습니다.",
        });
        if (process.env.NODE_ENV === "development") {
          console.error(err);
        }
      } else {
        res.status(200).json({
          status: "success",
          message: "성공되었습니다.",
        });
      }
    }
  );
});

module.exports = router;
