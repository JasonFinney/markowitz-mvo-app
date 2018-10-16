const router = require("express").Router();
const inputRoutes = require("./inputs");

// Book routes
router.use("/inputs", inputRoutes);

module.exports = router;