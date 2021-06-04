const express = require("express");
const router = express.Router();
const cntr = require("../../../controllers/users");
const guard = require("../../../helpers/guard");

router.patch("/:id/subscription", guard, cntr.update);
router.post("/signup", cntr.signup);
router.post("/login", cntr.login);
router.post("/logout", cntr.logout);
module.exports = router;
