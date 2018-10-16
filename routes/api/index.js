const router = require("express").Router();
const inputRoutes = require("./input");

// Book routes
router.use("/inputs", inputRoutes);

module.exports = router;