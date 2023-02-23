const express = require("express");
const asyncSQL = require("../functions/db");

const router = express.Router();

// 댓글 조회
// 페이징 처리
router.get("/get/:bid", (req, res) => {
  const { bid } = req.params;
  let { page, count } = req.query;
  if (!bid) {
    res.status(400).end();
  }
  if (!count) {
    count = 10;
  }
  if (!page || page < 1) {
    page = 0;
  }

  asyncSQL(
    `
    SELECT
      c.c_id as cid,
      u.u_id as uid,
      u.u_nick as nick,
      c.c_content as content,
      c.c_date as date
    FROM comment c JOIN user u
    ON c.c_uid = u.u_id
    WHERE c_bid = "${bid}"
    ORDER BY c.c_date DESC
    LIMIT ${page * count}, ${count}
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

router.get("/get/user/:uid", (req, res) => {
  const { uid } = req.params;
  let { page, count } = req.query;
  if (!uid) res.status(400).end();
  if (!page) page = 0;
  if (!count) count = 5;

  asyncSQL(
    `
    SELECT
      c.c_id as cid,
      u.u_id as uid,
      u.u_nick as nick,
      c.c_content as content,
      c.c_date as date
    FROM comment c JOIN user u
    ON c.c_uid = u.u_id
    WHERE c.c_uid = "${uid}"
    ORDER BY c.c_date DESC
    LIMIT ${page * count}, ${count}
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

// 댓글 작성
router.post("/write", (req, res) => {
  const { userId, content, bid } = req.body;
  if (!userId || !content || !bid) {
    res.status(400).end();
  }

  asyncSQL(
    `
    INSERT INTO comment (c_content, c_uid, c_bid) VALUES ("${content}", "${userId}", "${bid}")
  `,
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
          cid: `${rows.insertId}`,
        });
      }
    }
  );
});

// 댓글 수정
// -> 어느 댓글인지 알기 위해서 commId
// 사용자를 확인 (본인 일치)
// -> 본인 일치 확인하기 위해서 userId
router.put("/fix/:cid", (req, res) => {
  const { cid } = req.params;
  const { userId, content } = req.body;

  // 본인 확인
  asyncSQL(
    `SELECT
      c_uid
    FROM comment
    WHERE c_id = ${cid}
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
        if (rows[0].c_uid === Number(userId)) {
          asyncSQL(
            `
            UPDATE comment SET c_content = "${content}"
            WHERE c_id = "${cid}"
          `,
            (err1) => {
              if (err1) {
                res.status(500).json({
                  status: "fail",
                  message: "서버에서 에러가 발생 하였습니다.",
                });
                if (process.env.NODE_ENV === "development") {
                  console.error(err1);
                }
              } else {
                res.status(200).json({
                  status: "success",
                  message: "성공적으로 바뀌었습니다.",
                });
              }
            }
          );
        } else {
          res.status(403).end();
        }
      } else {
        res.status(403).end();
      }
    }
  );
  // 댓글 수정
});

// 댓글 삭제
// 어떤 댓글인지 알아야됨 -> cId
// 쓴 사람이 지운건지? -> uId
router.delete("/delete/:cid", (req, res) => {
  const { cid } = req.params;
  const { uid } = req.query;
  if (!cid || !uid) {
    res.status(400).end();
  }

  asyncSQL(
    `
    SELECT
      c_uid
    FROM comment
    WHERE c_id = ${cid};
  `,
    (err, rows) => {
      if (err) {
        res.status(500).json({
          status: "fail",
          message: "서버에서 에러가 발생 했습니다.",
        });
        if (process.env.NODE_ENV === "development") {
          console.error(err);
        }
      } else if (rows.length > 0) {
        if (rows[0].c_uid === Number(uid)) {
          asyncSQL(
            `
            DELETE FROM comment WHERE c_id = "${cid}";
          `,
            (err1) => {
              if (err1) {
                res.status(500).json({
                  status: "fail",
                  message: "서버에서 에러가 발생 했습니다.",
                });
                if (process.env.NODE_ENV === "development") {
                  console.error(err1);
                }
              } else {
                res.status(200).json({
                  status: "success",
                  message: "성공적으로 바뀌었습니다.",
                });
              }
            }
          );
        }
      } else {
        res.status(403).end();
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
      COUNT (c_id) as count
    FROM comment
    WHERE c_uid = ${uid};
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
