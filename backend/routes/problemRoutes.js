const express = require("express");
const router = express.Router();
const {
  generateContest,
  addQuestion,
} = require("../controllers/problemController.js");

router.get("/contest", generateContest);
router.post("/add", addQuestion);
module.exports = router;
