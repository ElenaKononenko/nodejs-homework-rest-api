const express = require("express");
const router = express.Router();
const cntr = require("../../controllers/contacts");
const {
  validationCreateContact,
  validationUpdate,
  validationUpdateStatus,
  validateMongoId,
} = require("./validate");

router.use((req, res, next) => {
  console.log(req.url);
  next();
});

// router.get("/", cntr.getAll);
// router.get("/:id", cntr.getById);
// router.post("/", validationCreateContact, cntr.create);
// router.delete("/:id", cntr.remove);
// router.patch("/:id", validationUpdate, cntr.update);
// router.patch("/:id/favorite", validationUpdateStatus, cntr.update);

router.get("/", cntr.getAll).post("/", validationCreateContact, cntr.create);

router
  .get("/:id", validateMongoId, cntr.getById)
  .delete("/:id", validateMongoId, cntr.remove)
  .patch("/:id", validateMongoId, validationUpdate, cntr.update);

router.patch("/:id/favorite", validationUpdateStatus, cntr.update);

module.exports = router;
