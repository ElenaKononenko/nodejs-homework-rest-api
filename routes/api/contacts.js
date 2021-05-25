const express = require("express");
const router = express.Router();
const { validationCreateContact, validationUpdateCat } = require("./validate");
const Contacts = require("../../model/index");

router.use((req, res, next) => {
  console.log(req.url);
  next();
});

router.get("/", async (req, res, next) => {
  try {
    const contacts = await Contacts.listContacts();
    return res.json({ status: "success", code: 200, data: { contacts } });
  } catch (e) {
    next(e);
  }

  next();
});

router.get("/:id", async (req, res, next) => {
  try {
    const contact = await Contacts.getContactById(req.params.id);
    if (contact) {
      return res.json({ status: "success", code: 200, data: { contact } });
    }
    return res.json({ status: "error", code: 404, message: "Not found" });
  } catch (e) {
    next(e);
  }
});

router.post("/", validationCreateContact, async (req, res, next) => {
  try {
    if (!req.body.name || !req.body.email || !req.body.phone) {
      return res.status(201).json({ message: "missing required name field" });
    }
    const contact = await Contacts.addContact(req.body);
    return res.status(201).json({
      status: "success",
      code: 201,
      data: { contact },
    });
  } catch (e) {
    next(e);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const contact = await Contacts.removeContact(req.params.id);
    if (contact) {
      return res.json({
        status: "success",
        code: 200,
        message: "contact deleted",
        data: { contact },
      });
    }
    return res.json({ status: "error", code: 404, message: "Not found" });
  } catch (e) {
    next(e);
  }
});

router.patch("/:id", validationUpdateCat, async (req, res, next) => {
  try {
    console.log(req.body);
    if (JSON.stringify(req.body) == "{}") {
      console.log("req.body", req.body);
      return res.status(201).json({ message: "missing field" });
    }

    const updated = await Contacts.updateContact(req.params.id, req.body);

    if (updated) {
      return res.json({
        status: "success",
        code: 200,
        message: "contact updated.",
        data: { updated },
      });
    }
    return res
      .status(404)
      .json({ status: "error", code: 404, message: "Not found." });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
