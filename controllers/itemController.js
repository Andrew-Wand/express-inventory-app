const Item = require("../models/item");
const Brand = require("../models/brand");
const Category = require("../models/category");
const ItemInstance = require("../models/itemInstance");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.index = asyncHandler(async (req, res, next) => {
  const [numItems, numItemInstances, numBrands, numCategories] =
    await Promise.all([
      Item.countDocuments({}).exec(),
      ItemInstance.countDocuments({}).exec(),
      Brand.countDocuments({}).exec(),
      Category.countDocuments({}).exec(),
    ]);

  res.render("index", {
    title: "Tennis Racket Stock Home",
    item_count: numItems,
    item_instance_count: numItemInstances,
    brand_count: numBrands,
    categories_count: numCategories,
  });
});

// Display list of all items.
exports.item_list = asyncHandler(async (req, res, next) => {
  const allItems = await Item.find({}, "title price")
    .sort({ title: 1 })
    .populate("price")
    .exec();

  res.render("item_list", { title: "All Tennis Rackets", item_list: allItems });
});

// Display detail page for a specific book.
exports.item_detail = asyncHandler(async (req, res, next) => {
  // Get details of books, book instances for specific book
  const [item, itemInstances] = await Promise.all([
    Item.findById(req.params.id).populate("category").populate("brand").exec(),
    ItemInstance.find({ item: req.params.id }).exec(),
  ]);

  if (item === null) {
    // No results.
    const err = new Error("Item not found");
    err.status = 404;
    return next(err);
  }

  res.render("item_detail", {
    title: item.title,
    item: item,
    item_instances: itemInstances,
  });
});

// Display book create form on GET.
exports.item_create_get = asyncHandler(async (req, res, next) => {
  // Get all authors and genres, which we can use for adding to our book.
  const [allBrands, allCategories] = await Promise.all([
    Brand.find().sort({ name: 1 }).exec(),
    Category.find().sort({ name: 1 }).exec(),
  ]);

  res.render("item_form", {
    title: "Create Tennis Item",
    brands: allBrands,
    categories: allCategories,
  });
});

// Handle book create on POST.
exports.item_create_post = [
  // Convert the genre to an array.
  (req, res, next) => {
    if (!Array.isArray(req.body.genre)) {
      req.body.genre =
        typeof req.body.genre === "undefined" ? [] : [req.body.genre];
    }
    next();
  },

  // Validate and sanitize fields.
  body("title", "Title must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("brand", "Brand must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("description", "Description must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("category.*").escape(),
  body("price", "Price must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  // Process request after validation and sanitization.

  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a Book object with escaped and trimmed data.
    const item = new Item({
      title: req.body.title,
      description: req.body.description,
      brand: req.body.brand,
      category: req.body.category,
      price: req.body.price,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/error messages.

      // Get all authors and genres, which we can use for adding to our book.
      const [allBrands, allCategories] = await Promise.all([
        Brand.find().sort({ name: 1 }).exec(),
        Category.find().sort({ name: 1 }).exec(),
      ]);

      res.render("item_form", {
        title: "Create Item",
        brands: allBrands,
        categories: allCategories,
        item: item,
        errors: errors.array(),
      });
    } else {
      // Data from form is valid. Save book.
      await item.save();
      res.redirect(item.url);
    }
  }),
];

// Display item delete form on GET.
exports.item_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: item delete GET");
});

// Handle item delete on POST.
exports.item_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: item delete POST");
});

// Display item update form on GET.
exports.item_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: item update GET");
});

// Handle item update on POST.
exports.item_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: item update POST");
});
