const express = require("express");
const router = express.Router();
const cntr = require("../../../controllers/users");
const guard = require("../../../helpers/guard");

router.post("/signup", cntr.signup);
router.post("/login", cntr.login);
router.post("/logout", guard, cntr.logout);

module.exports = router;
