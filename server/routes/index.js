const express = require('express');
const router = express.Router();
const blogRoute = require('./blogRoutes');
const userActions = require("./userActions");

router.use("/blog",blogRoute);
router.use("/user",userActions);

module.exports = router;
