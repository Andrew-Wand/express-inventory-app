const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ItemInstanceSchema = new Schema({
  item: [{ type: Schema.Types.ObjectId, required: true, ref: "Item" }],
  stock: { type: Number, required: true },
});

// Virtual for book's URL
ItemInstanceSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/catalog/iteminstance/${this._id}`;
});

// Export model
module.exports = mongoose.model("ItemInstanceSchema", ItemInstanceSchema);
