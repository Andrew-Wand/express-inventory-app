const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BrandSchema = new Schema({
  name: { type: String, required: true, minLength: 3, maxLength: 100 },
});

// Virtual for book's URL
BrandSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/catalog/brand/${this._id}`;
});

// Export model
module.exports = mongoose.model("Brand", BrandSchema);
