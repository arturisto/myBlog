const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Blogpost = require("../models/blogpost");
const imageUploader = require("../utils/imageUploader");
const uploadImage = require("../utils/saveImageLocaly");
const fs = require("fs");

const path = require("path");

router.post("/blogmanage/uploadimage", async (req, res) => {
  const imgUpload = uploadImage.single("image");
  imgUpload(req, res, function (err) {
    if (err) {
      return res.status(422).send({
        errors: [{ title: "Image Upload Error", detail: err.message }],
      });
    }
    const httpPath = "http://localhost:8000";
    const newPath = req.file.path.replace("D:", httpPath);
    const resp = res.json({ imageUrl: newPath });
    return resp;
  });
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      where: { username: req.body.username, password: req.body.password },
    });
    console.log(user);
    return res.status(200).json({ msg: "success" });
  } catch {
    res.status(404).json({ msg: "user not found" });
  }
});

router.post("/blogmanage/savenewentry", async (req, res) => {
  const blogTitle = req.body.title;
  let newEntry = req.body.newBlogEntry;

  try {
    const uplaodedImagesUrls = await imageUploader(blogTitle);
    uplaodedImagesUrls.forEach((image) => {
      if (image.status === "rejected") {
        //if one item is erroneous fail the entire proccss and return the error
        const reason = image.reason.code;
        const statusCode = image.reason.statusCode;
        return res.status(statusCode).json({ msg: reason });
      }
    });

    //replace old URLs for new ones
    uplaodedImagesUrls.forEach((urlItem) => {
      const oldUrl = urlItem.value[0];
      const newUrl = urlItem.value[1];
      newEntry = newEntry.replace(oldUrl, newUrl);
    });

    //save blogPost to DB
    const data = {
      title: blogTitle,
      metatitle: "meta",
      content: newEntry,
      createdAt: new Date(),
    };
    const { title, metatitle, content, createdAt } = data;
    try {
      Blogpost.create({
        title,
        metatitle,
        content,
        createdAt,
      }).then(() => {});
    } catch (error) {
      console.log(error);
      return res.status(404).json({ msg: error });
    }

    //clear temp folder
    const relativePath = "./utils/temp";
    const absolutePath = path.resolve(relativePath);

    const files = fs.readdirSync(absolutePath);
    files.forEach((file) => {
      const fileToUnlink = path.join(absolutePath, file);
      fs.unlink(fileToUnlink, (err) => {
        if (err) throw err;
      });
    });

    return res.status(200).json({ msg: "ok" });
  } catch (error) {
    res.status(404).json({ msg: error });
    console.log("error", error);
  }
});

router.post("/blogmanage/updateentry", async (req, res) => {
  const blogId = req.body.id;
  const entryToUpdate = req.body.entryToUpdate;
  const title = req.body.title;

  try {
    await Blogpost.update(
      { title: title, content: entryToUpdate },
      { where: { id: blogId } }
    );

    res.status(200).json({ msg: "success" });
  } catch (error) {
    console.log(error);
  }
});
router.get("/blogmanage/getnewentry", async (req, res) => {
  try {
    const blogId = req.query.blogId;
    const blogEntry = await Blogpost.findOne({ where: { id: blogId } });
    res.status(200).json({ msg: "success", body: blogEntry });
  } catch (error) {
    console.log(error);
  }
});

router.get("/blogmanage/getAllPosts", async (req, res) => {
  try {
    const allEntries = await Blogpost.findAll();
    res.status(200).json({ msg: "success", body: allEntries });
  } catch (error) {
    res.status(400).json({ msg: error });
  }
});

router.post("/blogmanage/deleteEntries", async (req, res) => {
  try {
    await Blogpost.destroy({ where: { id: req.body } });
    res.status(200).json({ msg: "success" });
  } catch (error) {
    res.status(404).json({ msg: error });
  }
});

router.post("/blogmanage/publishEntries", async (req, res) => {
  try {
    await Blogpost.update({ published: true }, { where: { id: req.body } });
    res.status(200).json({ msg: "success" });
  } catch (error) {
    res.status(404).json({ msg: error });
  }
});

router.post("/blogmanage/unPublishEntries", async (req, res) => {
  try {
    await Blogpost.update({ published: false }, { where: { id: req.body } });

    res.status(200).json({ msg: "success" });
  } catch (error) {
    console.log("error");
    res.status(404).json({ msg: error });
  }
});
module.exports = router;
