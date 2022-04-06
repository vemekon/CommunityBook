const Joi = require("joi");

const userSchema = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  email: Joi.string().email().lowercase().min(2).max(30).required(),

  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
});
const loginSchema = Joi.object({
  email: Joi.string().email().lowercase().min(2).max(30).required(),

  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
});

module.exports = {
  userSchema,
  loginSchema,
};
