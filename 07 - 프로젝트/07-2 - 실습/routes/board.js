const express = require("express");
const asyncSQL = require("../functions/db");

const router = express.Router();

router.post("/write", (req, res) => {
  const { userId, content } = req.body;
  if (!userId || !content) {
    res.status(400).end();
  }

  asyncSQL(
    `INSERT INTO board (b_content, b_uid) VALUES ("${content}", "${userId}")`,
    (err, rows) => {
      if (err || rows.affectedRows < 1) {
        res.status(500).json({
          status: "fail",
          message: "서버에서 에러가 발생 했습니다.",
        });
        if (process.env.NODE_ENV === "development") {
          console.error(err);
        }
      } else {
        res.status(201).json({
          status: "success",
          message: "성공되었습니다.",
          bid: `${rows.insertId}`,
        });
      }
    }
  );
});

// 특정 사용자의 글 조회
// select 사용자 닉네임 + 게시판 글 + 생성일자
// http://localhost:3000/boadrd/get?id=1
// http://localhost:3000/boadrd/get/1
router.get("/get/:uid", (req, res) => {
  const { uid } = req.params;
  // 여기 count 추가 안함

  asyncSQL(
    `SELECT 
      b.b_id as bid,
      a.u_nick as nick,
      b.b_content as content,
      b.b_date as date
    FROM board b JOIN user a
    ON b.b_uid = a.u_id
    WHERE b_uid = "${uid}"
    ORDER BY b_date DESC
    LIMIT 10`,
    (err, rows) => {
      if (err) {
        res.status(500).json({
          status: "fail",
          message: "서버에서 에러가 발생 하였습니다.",
        });
        if (process.env.NODE_ENV === "development") {
          console.error(err);
        }
      } else {
        res.status(200).json({
          status: "success",
          content: rows,
        });
      }
    }
  );
});

// 팔로워 글 조회
router.get("/get/follow/:uid", (req, res) => {
  // const uid = req.params.uid
  const { uid } = req.params;
  // let count = req.query.count;
  let { count } = req.query;
  if (!uid) {
    res.status(400).end();
  }
  if (!count) {
    count = 10;
  }

  // 삼항연산자
  // let count = !req.query.count ? 10 : req.query.count;

  asyncSQL(
    `SELECT
      b.b_id as bid,
      a.u_nick as nick,
      b.b_content as content,
      b.b_date  as date
    FROM board b JOIN user a
    ON b.b_uid = a.u_id
    WHERE b.b_uid IN (
      SELECT 
        f_ing 
      FROM follow
      WHERE f_er = "${uid}"
    )
    ORDER BY b.b_date DESC
    LIMIT ${count};
    `,
    (err, rows) => {
      if (err) {
        res.status(500).json({
          status: "fail",
          message: "서버에서 에러가 발생 하였습니다.",
        });
        if (process.env.NODE_ENV === "development") {
          console.error(err);
        }
      } else {
        res.status(200).json({
          status: "success",
          content: rows,
        });
      }
    }
  );
});

// 내가 지금 팔로잉 한 사람이 없으면
// 글이 0개 이것은 어떻게 할 것인가?
router.get("/get/any", (req, res) => {
  const { count } = req.query;
  console.log(count);

  asyncSQL(
    `
    SELECT
      b.b_id as bid,
      a.u_nick as nick,
      b.b_content as content,
      b.b_date as date
    FROM board b JOIN user a
    ON b.b_uid = a.u_id
    ORDER BY b_date DESC
    LIMIT ${count};
  `,
    (err, rows) => {
      if (err) {
        res.status(500).json({
          status: "fail",
          message: "서버에서 에러가 발생 하였습니다.",
        });
        if (process.env.NODE_ENV === "development") {
          console.error(err);
        }
      } else {
        console.log("1111");
        console.log(rows);
        res.status(200).json({
          status: "success",
          content: rows,
        });
      }
    }
  );
});

module.exports = router;
