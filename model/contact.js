const { Schema, model, SchemaTypes } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
      min: 2,
      max: 18,
    },
    email: String,
    phone: {
      type: String,
      max: 18,
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: "user",
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    features: {
      type: Array,
      set: (data) => (!data ? [] : data),
    },
  },
  {
    versionKey: false,
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret._id;
        return ret;
      },
    },
    toObject: { virtuals: true },
  }
);

contactSchema.virtual("virtualGlory").get(function () {
  return `Can be given to the glory of Óðinn if his name is ${this.name}`;
});
contactSchema.plugin(mongoosePaginate);
const Contact = model("contact", contactSchema);

module.exports = Contact;
