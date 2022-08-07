"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var router = express.Router();
const { protect, adminProtect } = require('../middlewares/auth');
const { getProducts, getProductById } = require('../controllers/productsControl');
router.get("/home", (req, res) => {
    res.status(201).render("index", {
        title: "Home",
        token: req.cookies.Token,
        uid: req.cookies.Uid,
        user: req.cookies.Username,
        Type: req.cookies.Type || "none",
    });
});
router.get("/register", (req, res) => {
    res.status(201).render("register", {
        title: "Register",
        token: req.cookies.Token,
        uid: req.cookies.Uid,
        user: req.cookies.Username,
        Type: req.cookies.Type || "none",
    });
});
router.get("/login", (req, res) => {
    res.status(201).render("login", {
        title: "Login",
        token: req.cookies.Token,
        uid: req.cookies.Uid,
        user: req.cookies.Username,
        Type: req.cookies.Type || "none",
    });
});
router.get("/cart", (req, res) => {
    res.status(201).render("login", {
        title: "Login",
        token: req.cookies.Token,
        uid: req.cookies.Uid,
        user: req.cookies.Username,
        Type: req.cookies.Type || "none",
    });
});
router.get("/purchase", (req, res) => {
    res.status(201).render("addtocart", {
        title: "Purchase",
        token: req.cookies.Token,
        uid: req.cookies.Uid,
        user: req.cookies.Username,
        Type: req.cookies.Type || "none",
    });
});
router.get("/newproduct", adminProtect, (req, res) => {
    res.status(201).render("newproduct", {
        title: "newproduct",
        "product": [],
        token: req.cookies.Token,
        uid: req.cookies.Uid,
        user: req.cookies.Username,
        Type: req.cookies.Type || "none",
    });
});
// router.get('/api/products/edit/:id', adminProtect, (req: Request, res: Response) => {
//    res.status(201).render("productInfo", {
//       title: "Update Product",
//       "productId": req.params.id,
//       token: req.cookies.Token,
//       uid: req.cookies.Uid,
//       user: req.cookies.Username,
//       Type: req.cookies.Type || "none",
//    });
// })
router.get('/api/products/edit/:id', adminProtect, getProductById);
module.exports = router;
