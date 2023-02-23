const express = require("express");
const asyncSQL = require("../functions/db");

const router = express.Router();

// 프로필 조회
// 이름, 닉네임, 팔로워, 팔로잉
router.get("/get/:uid", (req, res) => {
  const { uid } = req.params;
  const { getId } = req.query;
  if (!uid || !getId) {
    res.status(400).end();
  }

  asyncSQL(
    `
    SELECT
      u_nick,
      u_name
    FROM user
    WHERE u_id = ${uid};
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
        asyncSQL(
          `
          SELECT
            COUNT ( f_er ) as follower
          FROM follow
          WHERE f_ing = ${uid};
        `,
          (err1, rows1) => {
            if (err1) {
              res.status(500).json({
                status: "fail",
                message: "서버에서 에러가 발생 하였습니다.",
              });
              if (process.env.NODE_ENV === "development") {
                console.error(err1);
              }
            } else {
              asyncSQL(
                `
                SELECT
                  COUNT(f_ing) as following
                FROM follow
                WHERE f_er = ${uid};
              `,
                (err2, rows2) => {
                  if (err2) {
                    res.status(500).json({
                      status: "fail",
                      message: "서버에서 에러가 발생 하였습니다.",
                    });
                    if (process.env.NODE_ENV === "development") {
                      console.error(err2);
                    }
                  } else {
                    asyncSQL(
                      `
                      SELECT
                        f_id
                      FROM follow
                      WHERE f_er = ${uid} AND f_ing = ${getId};
                    `,
                      (err3, rows3) => {
                        if (err3) {
                          res.status(500).json({
                            status: "fail",
                            message: "서버에서 에러가 발생 하였습니다.",
                          });
                          if (process.env.NODE_ENV === "development") {
                            console.error(err2);
                          }
                        } else if (rows3.length > 0) {
                          res.status(200).json({
                            status: "success",
                            info: {
                              name: rows[0].u_name,
                              nick: rows[0].u_nick,
                              follower: rows1[0].follower,
                              following: rows2[0].following,
                              isFollow: true,
                            },
                          });
                        } else {
                          res.status(200).json({
                            status: "success",
                            info: {
                              name: rows[0].u_name,
                              nick: rows[0].u_nick,
                              follower: rows1[0].follower,
                              following: rows2[0].following,
                              isFolloow: false,
                            },
                          });
                        }
                      }
                    );
                  }
                }
              );
            }
          }
        );
      } else {
        res.status(200).json({
          status: "fail",
          message: "사용자가 존재하지 않습니다.",
        });
      }
    }
  );
});

// 팔로워 조회
// 한번에 10개 씩, 페이징
router.get("/follower/:uid", (req, res) => {
  const { uid } = req.params;
  let { page, count } = req.query;
  if (!uid) res.status(400).end();
  if (!page) page = 0;
  if (!count) count = 10;

  asyncSQL(
    `
    SELECT
      u.u_id,
      u.u_nick
    FROM follow f JOIN user u
    ON f.f_er = u.u_id
    WHERE f_ing = ${uid}
    ORDER BY u.u_nick
    LIMIT ${page * count}, ${count};
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
          follower: rows,
        });
      }
    }
  );
});

// 팔로잉 조회
router.get("/following/:uid", (req, res) => {
  const { uid } = req.params;
  let { page, count } = req.query;
  if (!uid) res.status(400).end();
  if (!page) page = 0;
  if (!count) count = 10;

  asyncSQL(
    `
    SELECT
      u.u_id,
      u.u_nick
    FROM follow f JOIN user u
    ON f.f_ing = u.u_id
    WHERE f_er = ${uid}
    ORDER BY u.u_nick
    LIMIT ${page * count}, ${count}
  `,
    (err, rows) => {
      if (err) {
        res.status(500).json({
          status: "fail",
          message: "서버에서 에러가 발생하였습니다.",
        });
        if (process.env.NODE_ENV === "development") {
          console.error(err);
        }
      } else {
        res.status(200).json({
          status: "success",
          following: rows,
        });
      }
    }
  );
});

// 팔로우 하기
// 내가 팔로우 -> ing
router.post("/follow", (req, res) => {
  const { follower, following } = req.body;
  if (!follower || !following) res.status(400).end();

  asyncSQL(
    `
      SELECT
        f_id
      FROM follow
      WHERE f_er = ${follower} 
        AND f_ing = ${following};
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
      } else if (rows.length === 0) {
        asyncSQL(
          `
            INSERT INTO 
              follow (f_er, f_ing)
            VALUES
              ("${follower}", ${following})
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
                message: "성공되었습니다.",
              });
            }
          }
        );
      } else {
        res.status(200).json({
          status: "fail",
          message: "이미 팔로우 입니다.",
        });
      }
    }
  );
});

// 팔로우 취소
router.delete("/unfollow", (req, res) => {
  const { follower, following } = req.query;
  if (!follower || !following) res.status(400).end();

  asyncSQL(
    `
    DELETE
    FROM follow
    WHERE f_er = ${follower} AND f_ing = ${following};
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
