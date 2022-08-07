var express = require("express");
var router = express.Router();
import { Request, Response } from "express";
const {
  getProducts,
  getProductById,
  addNewProduct,
  updateProduct,
  deleteProduct,
  purchaseProducts,
  addToCart,
  searchProducts,
} = require("../controllers/productsControl");
const { deleteCartProduct, deleteAllCartProduct, buyProducts, clearCart } = require("../controllers/usercontroller");
const { protect, adminProtect } = require("../middlewares/auth");


router.route("/").get(getProducts).post(protect, addNewProduct);
router.route("/purchase").get(purchaseProducts);
router
  .route("/:id")
  .get(protect, getProductById)
  .delete(protect, deleteProduct);
router.post("/cart/:id", protect, addToCart);

router.post("/name", searchProducts);
router.post("/buy/all", buyProducts);

router.delete("/delprd/delete", protect, deleteCartProduct);
router.delete("/delprd/all", protect, deleteAllCartProduct);

router.get("/clear/clearcart/:ref", protect, clearCart);
router.put("/update/:id", adminProtect, (req: Request, res: Response) => {
  updateProduct(req, res, req.params.id);
});

module.exports = router;
