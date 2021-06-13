const express = require("express");
const router = express.Router();
const cntr = require("../../../controllers/users");
const guard = require("../../../helpers/guard");
const upload = require("../../../helpers/upload");

router.get("/current", guard, cntr.getCurrent);
router.get("/verify/:verificationToken", cntr.verify);
router.post("/verify", cntr.repeatEmailVerify);
router.patch("/:id/subscription", guard, cntr.update);
router.post("/signup", cntr.signup);
router.post("/login", cntr.login);
router.post("/logout", cntr.logout);
router.patch("/avatars", guard, upload.single("avatar"), cntr.avatars);

module.exports = router;
