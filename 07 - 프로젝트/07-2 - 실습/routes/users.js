const express = require("express");
const { sendMail, randomNumber } = require("../functions/mail");
const asyncSQL = require("../functions/db");

const router = express.Router();

/* GET users listing. */
router.get("/", (req, res) => {
  res.send("respond with a resource");
});

router.post("/auth_mail", async (req, res) => {
  const userEmail = req.body.email;
  const rnd = randomNumber();

  await asyncSQL(
    `INSERT INTO auth (a_email, a_digit) VALUES ("${userEmail}", "${rnd}")`
  );
  await sendMail(userEmail, rnd);
  res.status(201).json({
    status: "success",
    message: "성공되었습니다.",
  });
});

// 경로는 다음과 같습니다.
// localhost:3000/users/auth_valid
router.get("/auth_valid", async (req, res) => {
  const { email, digit } = req.query;
  await asyncSQL(
    `SELECT a_id, a_digit FROM auth WHERE a_email = "${email}" AND a_is_used = 0 ORDER BY a_id DESC LIMIT 1`
  ).then(async (rows) => {
    if (digit.toString() === rows[0].a_digit.toString()) {
      await asyncSQL(
        `UPDATE auth SET a_is_used = 1 WHERE a_id = ${rows[0].a_id}`
      );
      res.status(200).json({
        status: "success",
        message: "일치 합니다.",
      });
    } else {
      res.status(200).json({
        status: "fail",
        message: "일치하지 않습니다.",
      });
    }
  });
});

router.post("/register", (req, res) => {});

module.exports = router;
