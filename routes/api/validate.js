const Joi = require("joi");
const mongoose = require("mongoose");
//    "phone validate": "(123) 123-1234",
const schemaCreateContact = Joi.object({
  name: Joi.string().trim().min(2).max(18).required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(/[(][0-9]{3}[)] [0-9]{3}-[0-9]{4}/)
    .max(18)
    .required(),
  features: Joi.array().optional(),
  favorite: Joi.boolean().optional(),
});

const schemaUpdateContact = Joi.object({
  name: Joi.string().trim().min(2).max(18).optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string()
    .pattern(/^[0-9]+$/)

    .max(18)
    .optional(),
  features: Joi.array().optional(),
  favorite: Joi.boolean().optional(),
}).min(1);

const schemaUpdateStatus = Joi.object({
  favorite: Joi.boolean().required(),
});

const validate = async (schema, req, next) => {
  try {
    await schema.validateAsync(req);
    next();
  } catch (err) {
    next({
      status: 400,
      message: err.message.replace(/"/g, ""),
    });
  }
};

module.exports = {
  validationCreateContact: (req, res, next) => {
    return validate(schemaCreateContact, req.body, next);
  },
  validationUpdate: (req, res, next) => {
    return validate(schemaUpdateContact, req.body, next);
  },
  validationUpdateStatus: (req, res, next) => {
    return validate(schemaUpdateStatus, req.body, next);
  },
  validateMongoId: (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return next({
        status: 400,
        message: "Invalid ObjectId",
      });
    }

    next();
  },
};
