const express = require("express");
const router = express.Router();

const {
  getProducts,
  newProduct,
  getSingProduct,
  updateProduct,
  deleteProduct,
  getAdminProducts,
} = require("../controllers/productControllers");

const { isAuthenticatedUser, authorizedRoles } = require("../middleware/auth");

router.route("/products").get(getProducts);

router.route("/products/:id").get(getSingProduct);

// Admin
router
  .route("/admin/products/new")
  .post(isAuthenticatedUser, authorizedRoles("admin"), newProduct);

router
  .route("/admin/products/:id")
  .put(isAuthenticatedUser, authorizedRoles("admin"), updateProduct)
  .delete(isAuthenticatedUser, authorizedRoles("admin"), deleteProduct);

router
  .route("/admin/products")
  .get(isAuthenticatedUser, authorizedRoles("admin"), getAdminProducts);

module.exports = router;
