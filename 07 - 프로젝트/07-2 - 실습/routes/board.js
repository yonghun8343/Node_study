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

  asyncSQL(
    `SELECT 
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
        // 여러개의 값을 처리를 할 필요가 있음.
        // 10개에 대한 데이터를 json안에다가 넣어 주어야 되죠 왜냐 rows = []
        // 우다다다 넣는 방법
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
