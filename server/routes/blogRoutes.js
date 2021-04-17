//utils
const getPreviewImageUrl = require("../utils/getPreviewImageUrl");
const filterByTags = require("../utils/filterByTags");

const express = require("express");
const router = express.Router();
const Blogpost = require("../models/blogpost");
const Tags = require("../models/tags");
const Subscribers = require("../models/subscribers");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

async function getAll() {
  try {
    const alldata = await Blogpost.findAll();
    console.log("alldata", alldata);
  } catch (error) {
    console.log("error:", error);
  }
}
//get
router.post("/", (req, res) => {
  getAll();
});
//add ite

router.get("/getlatest", async (req, res) => {
  try {
    const blogEntries = await Blogpost.findAll({
      where: {
        publishedAt: {
          [Op.ne]: null,
        },
      },
      limit: 3,
      order: [["publishedAt", "DESC"]],
    });
    const blogEntiresWithPreviewURLs = getPreviewImageUrl(blogEntries);
    return res.status(200).json({ posts: blogEntiresWithPreviewURLs });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: error });
  }
});

router.post("/getEntriesByType", async (req, res) => {
  const frontEndType = req.body.body.entryType;
  const pageNumber = req.body.body.pageNumber;
  const tags = req.body.body.tags;
  //if entrie type is local then show local posts, otherwise abroad posts
  const entrieType = frontEndType === "local" ? "L" : "W";

  try {
    const entriesToFilter = await Blogpost.findAll({
      where: { entryType: entrieType },
      order: [["publishedAt", "DESC"]],
    });
    const blogEntries = tags
      ? filterByTags(tags, entriesToFilter)
      : entriesToFilter;

    const reducedBlogEntries = blogEntries.slice(
      pageNumber * 5 - 5,
      pageNumber * 5
    );
    const blogEntiresWithPreviewURLs = getPreviewImageUrl(reducedBlogEntries);
    const maxEntries = blogEntries.length;

    res.status(200).json({
      msg: "ok",
      entries: blogEntiresWithPreviewURLs,
      maxEntries: maxEntries,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ msg: error });
  }
});

router.get("/getnewentry", async (req, res) => {
  try {
    const blogId = req.query.blogId;
    const blogEntry = await Blogpost.findOne({ where: { id: blogId } });
    res.status(200).json({ msg: "success", body: blogEntry });
  } catch (error) {
    console.log(error);
    res.status(404).json({ msg: error });
  }
});

router.post("/subscribe", async (req, res) => {
  const userEmail = req.body.email;
  try {
    const reply = await Subscribers.create({
      email: userEmail,
    });
    res.status(200).json({ msg: "ok" });
  } catch (error) {
    console.log("error", error);
    res.status(403).json({ msg: error });
  }
});

module.exports = router;
