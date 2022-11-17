import express from "express";

const router = express.Router();

/* GET users listing. */
router.get("/", (req, res) => {
  res.send("respond with a resource");
});

router.post("/register", (req, res) => {});

module.exports = router;
