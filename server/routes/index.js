const express = require('express');
const router = express.Router();
const blogRoute = require('./blogRoutes')
const blogRoute2 = require('./blogRoutes2')

router.route("/blog",blogRoute);

router.use("/blog2", blogRoute2);

module.exports = router;
