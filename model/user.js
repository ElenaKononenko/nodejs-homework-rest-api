const { Schema, model } = require("mongoose");
const { Subscription } = require("../helpers/constants");
const { v4: uuid } = require("uuid");
const bcrypt = require("bcryptjs");
const gr = require("gravatar");
const SALT_WORK_FACTOR = 10;

const userSchema = new Schema({
  password: {
    type: String,
    required: [true, "Password is required"],
    validate(value) {
      const re = /^.{6,}$/;
      return re.test(value);
    },
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    validate(value) {
      const re = /\S+@\S+\.\S+/g;
      return re.test(String(value).toLowerCase());
    },
  },
  subscription: {
    type: String,
    enum: [Subscription.PRO, Subscription.STARTER, Subscription.BUSINESS],
    default: Subscription.STARTER,
  },
  token: { type: String, default: null },
  avatar: {
    type: String,
    default: function () {
      return gr.url(this.email, { s: "250" }, true);
    },
  },
  verify: {
    type: Boolean,
    default: false,
  },
  verifyToken: {
    type: String,
    required: [true, "Verify token is required"],
    default: uuid(),
  },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

userSchema.methods.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = model("user", userSchema);

module.exports = User;
