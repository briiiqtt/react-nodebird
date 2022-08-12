const express = require("express");

const { Post, User } = require("../models");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      where: { id: lastId },
      limit: 10,
      offset: 0,
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: User,
        },
      ],
    });
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
