var express = require("express");
const proces = require("process");
const logger = require("../functions/logger");
var router = express.Router();

logger.log({
  level: "info",
  message: "로그 함수로 레벨을 지정하고 메세지를 남길 수 있다.",
});

logger.info("레벨은 info입니다. 메세지만 출력");

logger.error("레벨이 error, 메시지만 출력");

logger.debug("이것은 디버그입니다.");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

module.exports = router;
