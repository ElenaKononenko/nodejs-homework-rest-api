const Joi = require("joi");

const schemaCreateContact = Joi.object({
  name: Joi.string().trim().min(2).max(18).required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(/^[0-9]+$/)
    .min(7)
    .max(11)
    .required(),
});

const schemaUpdateContact = Joi.object({
  name: Joi.string().trim().min(2).max(18).optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string()
    .pattern(/^[0-9]+$/)
    .min(7)
    .max(11)
    .optional(),
}).min(1);

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
  validationUpdateCat: (req, res, next) => {
    return validate(schemaUpdateContact, req.body, next);
  },
};
