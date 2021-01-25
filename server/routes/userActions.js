//libraries
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const path = require("path");
const fs = require("fs");

//functions
const imageUploader = require("../utils/imageUploader");
const uploadImage = require("../utils/saveImageLocaly");

//models
const User = require("../models/user");
const Blogpost = require("../models/blogpost");

//constuns
const router = express.Router();

const verifyJWT = (req, res, next) => {

  const token = req.headers["x-access-token"];
  if (!token) {
    res.status(403).json({ msg: "unautharized" });
  } else {
    jwt.verify(token, process.env["JWT_SECRET"], (err, decoded) => {
      if (err) {
        res.status(403).json({ msg: "unautharized " });
      } else {
        req.userId = decoded.id;
        next();
      }
    });
  }
};

//routes
router.post("/blogmanage/uploadimage", verifyJWT, async (req, res) => {
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

router.post("/blogmanage/savenewentry", verifyJWT, async (req, res) => {
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

    try {
      Blogpost.create({
        title: blogTitle,
        metatitle: "meta",
        content: newEntry,
        createdAt: new Date(),
        tags: req.body.tags,
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

router.post("/blogmanage/updateentry", verifyJWT, async (req, res) => {
  const blogId = req.body.id;
  const entryToUpdate = req.body.entryToUpdate;
  const title = req.body.title;
  const tags = req.body.tags;

  try {
    await Blogpost.update(
      { title: title, content: entryToUpdate, tags: tags },
      { where: { id: blogId } }
    );

    res.status(200).json({ msg: "success" });
  } catch (error) {
    console.log(error);
  }
});
router.get("/blogmanage/getnewentry", verifyJWT, async (req, res) => {
  try {
    const blogId = req.query.blogId;
    const blogEntry = await Blogpost.findOne({ where: { id: blogId } });
    res.status(200).json({ msg: "success", body: blogEntry });
  } catch (error) {
    console.log(error);
  }
});

router.get("/blogmanage/getAllPosts", verifyJWT, async (req, res) => {
  try {
    const allEntries = await Blogpost.findAll();
    res.status(200).json({ msg: "success", body: allEntries });
  } catch (error) {
    res.status(400).json({ msg: error });
  }
});

router.post("/blogmanage/deleteEntries", verifyJWT, async (req, res) => {
  try {
    await Blogpost.destroy({ where: { id: req.body } });
    res.status(200).json({ msg: "success" });
  } catch (error) {
    res.status(404).json({ msg: error });
  }
});

router.post("/blogmanage/publishEntries", verifyJWT, async (req, res) => {
  try {
    await Blogpost.update({ published: true }, { where: { id: req.body } });
    res.status(200).json({ msg: "success" });
  } catch (error) {
    res.status(404).json({ msg: error });
  }
});

router.post("/blogmanage/unPublishEntries", verifyJWT, async (req, res) => {
  try {
    await Blogpost.update({ published: false }, { where: { id: req.body } });

    res.status(200).json({ msg: "success" });
  } catch (error) {
    console.log("error");
    res.status(404).json({ msg: error });
  }
});



router.post("/login", async (req, res) => {
  const userName = req.body.username;
  const pass = req.body.password;
  try {
    const user = await User.findOne({
      where: { username: userName },
    });
    if (!user) {
      res.status(404).json({ msg: "user or password is wrong", auth: false });
    }

    const hash = user.password;
    bcrypt
      .compare(pass, hash)
      .then((result) => {
        if (result) {
          req.session.user = user.username;
          const id = user.id;
          const options = {
            expiresIn: "1d",
          };
          const token = jwt.sign({ id }, process.env["JWT_SECRET"], options);
          req.session.token = token;
          return res.status(200).json({ auth: true, token: token });
        } else {
          res
            .status(404)
            .json({ msg: "user or password is wrong", auth: false });
        }
      })
      .catch((error) => {
        console.log("error", error);
        res.status(404).json({ msg: "user or password is wrong", auth: false });
      });
  } catch (error) {
    console.log("error", error);
  }
});

router.post("/signup", verifyJWT, async (req, res) => {
  console.log("body", req.body);
  const newUser = {
    name: req.body.name,
    username: req.body.username,
    password: req.body.password,
  };

  bcrypt.genSalt(10, (err, salt) =>
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      //save pass to hash
      //newUser.password = hash;
      //save user
      console.log(newUser);
      try {
        User.create({
          name: newUser.name,
          username: newUser.username,
          password: hash,
        }).then((response) => console.log(response));
      } catch (error) {
        console.log(error);
      }

      console.log(hash);
    })
  );

  //ELSE statement ends here

  return "hi";
});

router.post("/isLogin",verifyJWT, async (req, res) => {

  
  return res.status(200).json({ auth: true });
});


module.exports = router;
