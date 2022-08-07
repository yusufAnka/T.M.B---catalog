"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
const { userLogin, registerUser, logoutUser, getUsers, getAgents, getCartItems, getAgentItems, getTransactions } = require("../controllers/usercontroller");
const { protect, adminProtect } = require('../middlewares/auth');
/* GET users listing. */
router.get("/users", adminProtect, getUsers);
router.get("/agents", adminProtect, getAgents);
router.route("/login").post(userLogin);
router.get("/cart", protect, getCartItems);
router.get("/products", protect, getAgentItems);
router.get("/orders", protect, getTransactions);
router.route("/register").post(registerUser);
router.get("/logout", protect, logoutUser);
module.exports = router;
