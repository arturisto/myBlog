//utils
const getPreviewImageUrl = require("../utils/getPreviewImageUrl");

const express = require("express");
const router = express.Router();
const Blogpost = require("../models/blogpost");

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
      limit: 3,
      order: [["publishedAt", "DESC"]],
    });

    const blogEntiresWithPreviewURLs = getPreviewImageUrl(blogEntries);
    res.status(200).json({ posts: blogEntiresWithPreviewURLs });
  } catch (error) {
    console.log(error);
  }
});

router.post("/getEntriesByType", async (req, res) => {
  
  const frontEndType = req.body.body.entryType;
  const pageNumber = req.body.body.pageNumber
  //if entrie type is local then show local posts, otherwise abroad posts
  const entrieType = frontEndType === "local" ? "L" : "W";
  try {
    const blogEntries = await Blogpost.findAll(
      {
        where: { entryType: entrieType },
        order: [["publishedAt", "DESC"]],
      },
    );
    const reducedBlogEntries = blogEntries.slice(pageNumber*5-5,(pageNumber*5))
    const blogEntiresWithPreviewURLs = getPreviewImageUrl(reducedBlogEntries);
    const maxEntries = blogEntries.length

    res.status(200).json({ entries: blogEntiresWithPreviewURLs, maxEntries:maxEntries });
  } catch (error) {
    console.log(error);
    res.status(404).json({ err: error });
  }
});

module.exports = router;
