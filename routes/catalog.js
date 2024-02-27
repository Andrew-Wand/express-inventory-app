const express = require("express");
const router = express.Router();

// Require controller modules
const item_controller = require("../controllers/itemController");
const brand_controller = require("../controllers/brandController");
const category_controller = require("../controllers/categoryController");
const iteminstance_controller = require("../controllers/itemInstanceController");

// ITEM ROUTERS //

// GET catalog home page.
router.get("/", item_controller.index);

// GET request for creating a Tennis Item. NOTE This must come before oroutes that display Item (uses id).
router.get("/item/create", item_controller.item_create_get);

// POST request for creating Book.
router.post("/item/create", item_controller.item_create_post);

// GET request to delete item.
router.get("/item/:id/delete", item_controller.item_delete_get);

// POST request to delete item.
router.post("/item/:id/delete", item_controller.item_delete_post);

// GET request to update item.
router.get("/item/:id/update", item_controller.item_update_get);

// POST request to update item.
router.post("/item/:id/update", item_controller.item_update_post);

// GET request for one item.
router.get("/item/:id", item_controller.item_detail);

// GET request for list of all item items.
router.get("/items", item_controller.item_list);

/// brand ROUTES ///

// GET request to update brand.
router.get("/brand/:id/update", brand_controller.brand_update_get);

// POST request to update brand.
router.post("/brand/:id/update", brand_controller.brand_update_post);

// GET request for one brand.
router.get("/brand/:id", brand_controller.brand_detail);

// GET request for list of all brand.
router.get("/brands", brand_controller.brand_list);
/// category ROUTES ///

// GET request to update category.
router.get("/category/:id/update", category_controller.category_update_get);

// POST request to update category.
router.post("/category/:id/update", category_controller.category_update_post);

// GET request for one category.
router.get("/category/:id", category_controller.category_detail);

// GET request for list of all category.
router.get("/categories", category_controller.category_list);

/// iteminstance ROUTES ///

// GET request for creating a iteminstance. NOTE This must come before route that displays iteminstance (uses id).
router.get(
  "/iteminstance/create",
  iteminstance_controller.iteminstance_create_get
);

// POST request for creating iteminstance.
router.post(
  "/iteminstance/create",
  iteminstance_controller.iteminstance_create_post
);

// GET request to delete iteminstance.
router.get(
  "/iteminstance/:id/delete",
  iteminstance_controller.iteminstance_delete_get
);

// POST request to delete iteminstance.
router.post(
  "/iteminstance/:id/delete",
  iteminstance_controller.iteminstance_delete_post
);

// GET request to update iteminstance.
router.get(
  "/iteminstance/:id/update",
  iteminstance_controller.iteminstance_update_get
);

// POST request to update iteminstance.
router.post(
  "/iteminstance/:id/update",
  iteminstance_controller.iteminstance_update_post
);

// GET request for one iteminstance.
router.get("/iteminstance/:id", iteminstance_controller.iteminstance_detail);

// GET request for list of all iteminstance.
router.get("/iteminstances", iteminstance_controller.iteminstance_list);

module.exports = router;
