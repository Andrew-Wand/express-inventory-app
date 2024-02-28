const Brand = require("../models/brand");
const Item = require("../models/item");
const asyncHandler = require("express-async-handler");

// Display list of all items.
exports.brand_list = asyncHandler(async (req, res, next) => {
  const allBrands = await Brand.find({}, "name").sort({ name: 1 }).exec();

  res.render("brand_list", {
    title: "All Tennis Racket Brands",
    brand_list: allBrands,
  });
});

// Display detail page for a specific brand.
exports.brand_detail = asyncHandler(async (req, res, next) => {
  const [brand, itemsInBrand] = await Promise.all([
    Brand.findById(req.params.id).exec(),
    Item.find({ brand: req.params.id }, "title description").exec(),
  ]);

  if (brand === null) {
    const err = new Error("Brand not found");
    err.status = 404;
    return next(err);
  }

  res.render("brand_detail", {
    title: "Brand Detail",
    brand: brand,
    brand_items: itemsInBrand,
  });
});

// Display brand create form on GET.
exports.brand_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: brand create GET");
});

// Handle brand create on POST.
exports.brand_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: brand create POST");
});

// Display brand delete form on GET.
exports.brand_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: brand delete GET");
});

// Handle brand delete on POST.
exports.brand_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: brand delete POST");
});

// Display brand update form on GET.
exports.brand_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: brand update GET");
});

// Handle brand update on POST.
exports.brand_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: brand update POST");
});
