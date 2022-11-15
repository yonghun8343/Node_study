var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/login", (req, res) => {
  const id = "testid";
  const pw = "testpw";
  console.log(req.body); // POST로 보낸 데이터는 해당 객체에 저장 됩니다.
  if (id === req.body.id && pw === req.body.pw) {
    res.end("success");
  } else {
    res.end("fail");
  }
});

module.exports = router;
