const router = require("express").Router();
const assetsController = require("../../controller/assetController");


router.route("/database")
    .post(assetsController.create);

module.exports = router;
