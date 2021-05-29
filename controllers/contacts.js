const Contacts = require("../repositories/contacts");
const getAll = async (req, res, next) => {
  try {
    const contacts = await Contacts.listContacts();
    return res.json({ status: "success", code: 200, data: { contacts } });
  } catch (e) {
    next(e);
  }

  next();
};

const getById = async (req, res, next) => {
  try {
    const contact = await Contacts.getContactById(req.params.id);
    if (contact) {
      return res.json({ status: "success", code: 200, data: { contact } });
    }
    return res.json({ status: "error", code: 404, message: "Not found" });
  } catch (e) {
    next(e);
  }
};

const create = async (req, res, next) => {
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
};

const remove = async (req, res, next) => {
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
};

const update = async (req, res, next) => {
  try {
    console.log(req.body);
    if (JSON.stringify(req.body) === "{}") {
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
};

module.exports = {
  getAll,
  create,
  update,
  remove,
  getById,
};
