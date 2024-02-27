const itemInstance = require("../models/itemInstance");
const asyncHandler = require("express-async-handler");

// Display list of all iteminstances.
exports.iteminstance_list = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: iteminstance list");
});

// Display detail page for a specific iteminstance.
exports.iteminstance_detail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: iteminstance detail: ${req.params.id}`);
});

// Display iteminstance create form on GET.
exports.iteminstance_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: iteminstance create GET");
});

// Handle iteminstance create on POST.
exports.iteminstance_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: iteminstance create POST");
});

// Display iteminstance delete form on GET.
exports.iteminstance_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: iteminstance delete GET");
});

// Handle iteminstance delete on POST.
exports.iteminstance_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: iteminstance delete POST");
});

// Display iteminstance update form on GET.
exports.iteminstance_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: iteminstance update GET");
});

// Handle iteminstance update on POST.
exports.iteminstance_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: iteminstance update POST");
});
