const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  res.json([{ id: 3, content: "hello3" }]);
});

router.delete("/", (req, res) => {
  res.json([{ id: 1, content: "hello" }]);
});

module.exports = router;
