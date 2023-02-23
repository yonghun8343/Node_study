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
  let { page, count } = req.query;
  if (!uid) {
    res.status(400).end();
  }
  if (!count) {
    count = 10;
  }
  if (!page || page < 1) {
    page = 0;
  }

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
    LIMIT ${page * count}, ${count}`,
    // LIMIT a   -> a 개수 만큼만 들고 오겠다.
    // LIMIT a , b -> a부터 b개만큼 들고 오겠다.
    // page 0 count 10 -> 0, 10
    // page 1 count 10 -> 10, 10
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

// 게시글 하나만 조회(댓글 보기에 사용)
router.get("/get/board/:bid", (req, res) => {
  const { bid } = req.params;

  asyncSQL(
    `
    SELECT
      b.b_id as bid,
      u.u_nick as nick,
      b.b_content as content,
      b.b_date as date
    FROM board b JOIN user u
    ON b.b_uid = u.u_id
    WHERE b.b_id = "${bid}"
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
      } else if (rows.length > 0) {
        res.status(200).json({
          status: "success",
          // content: rows,
          bid: rows[0].bid,
          nick: rows[0].nick,
          content: rows[0].content,
          date: rows[0].date,
        });
      } else {
        res.status(200).json({
          status: "fail",
          message: "데이터가 없습니다.",
        });
      }
    }
  );
});

router.get("/get/count/:uid", (req, res) => {
  const { uid } = req.params;
  if (!uid) res.status(400).end();

  asyncSQL(
    `
    SELECT
      COUNT (b_id) as count
    FROM board
    WHERE b_uid = ${uid};
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
          count: rows[0].count,
        });
      }
    }
  );
});

module.exports = router;
