"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Products = require("../models/products");
const UserInformation = require("../models/usersInfo");
const asyncHandler = require("express-async-handler");
const { newInput } = require("../utils");
const getProducts = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allProducts = yield Products.find();
    res.status(201).render("market", {
        title: "All Product",
        products: [...allProducts],
        token: req.cookies.Token,
        uid: req.cookies.Uid,
        user: req.cookies.Username,
        Type: req.cookies.Type || "none",
    });
}));
const addToCart = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.cookies.Uid;
        const { name, Quantity } = req.body;
        const fetchUser = yield UserInformation.find({ Uid: userId });
        const user = fetchUser[0];
        const productSelected = yield Products.find({ _id: name });
        if (user && productSelected.length > 0) {
            const { price } = productSelected[0];
            const productPrice = Number(price.split("$")[1]);
            const discount = Number(price.split("$")[1]) * Quantity * 0.15;
            const actualPrice = user.User === true ? (productPrice * Quantity) : (productPrice * Quantity) - discount;
            const cart = {
                imageUrl: productSelected[0].imageUrl,
                Name: productSelected[0].name,
                Quantity: Quantity,
                Price: price,
                "Total Price": actualPrice,
            };
            if (user.User) {
                const selectedUserProducts = yield UserInformation.updateOne({ Uid: userId }, {
                    $push: {
                        cart: cart,
                    },
                });
            }
            else if (user.Agent) {
                const selectedUserProducts = yield UserInformation.updateOne({ Uid: userId }, {
                    $push: {
                        cart: cart,
                    },
                });
            }
            res.status(201).render("404", {
                title: "Added",
                message: `Successfully added to Cart`,
                token: req.cookies.Token,
                uid: req.cookies.Uid,
                user: req.cookies.Username,
                Type: req.cookies.Type || "none",
            });
        }
    }
    catch (err) {
        res.status(404).render("404", {
            title: "Not found",
            message: `Something went wrong... Try again or contact administrator`,
            token: req.cookies.Token,
            uid: req.cookies.Uid,
            user: req.cookies.Username,
            Type: req.cookies.Type || "none",
        });
    }
}));
const searchProducts = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { srch } = req.body;
    const allPrds = yield Products.find({ type: srch });
    const items = yield Products.find();
    const allItems = items.filter((p) => p.name.includes(srch));
    res.status(201).render("market", {
        title: "All Product",
        products: [...allPrds, ...allItems],
        token: req.cookies.Token,
        uid: req.cookies.Uid,
        user: req.cookies.Username,
        Type: req.cookies.Type || "none",
    });
}));
const purchaseProducts = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).render("purchase", {
        title: "Purchase Item",
        token: req.cookies.Token,
        uid: req.cookies.Uid,
        user: req.cookies.Username,
        Type: req.cookies.Type || "none",
    });
}));
const getProductById = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield Products.findById(req.params.id);
        res.status(201).render("productInfo", {
            title: "New Product",
            products: [product],
            token: req.cookies.Token,
            uid: req.cookies.Uid,
            user: req.cookies.Username,
            Type: req.cookies.Type || "none",
        });
    }
    catch (error) {
        res.status(404);
        throw new Error(`Product with id ${req.params.id} not found`);
    }
}));
const addNewProduct = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    yield newInput().validateAsync({
        imageUrl: body.imageUrl,
        name: body.name,
        Quantity: body.Quantity,
        Description: body.Description,
        price: body.price,
        size: body.size,
        type: body.type,
    });
    const input = {
        imageUrl: body.imageUrl,
        name: body.name,
        Quantity: body.Quantity,
        Description: body.Description,
        price: `$${body.price}`,
        size: body.size.toUpperCase(),
        type: body.type,
        "Amount Earned": 0,
    };
    const addInput = yield Products.create(input);
    res.status(201).render("newproduct", {
        title: "New Product",
        product: [addInput],
        token: req.cookies.Token,
        uid: req.cookies.Uid,
        user: req.cookies.Username,
        Type: req.cookies.Type || "none",
    });
}));
const updateProduct = asyncHandler((req, res, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const theProduct = yield Products.findById(id);
        const input = {
            imageUrl: body.imageUrl || theProduct.imageUrl,
            name: body.name || theProduct.name,
            Quantity: body.Quantity || theProduct.Quantity,
            Description: body.Description || theProduct.Description,
            price: `$${body.price}` || theProduct.price,
            size: body.size.toUpperCase() || theProduct.size,
            type: body.type || theProduct.type,
            "Amount Earned": theProduct["Amount Earned"],
        };
        const updInput = yield Products.findByIdAndUpdate(id, input, {
            new: true,
        });
        res.status(201).render("productInfo", {
            title: "New Product",
            products: [updInput],
            token: req.cookies.Token,
            uid: req.cookies.Uid,
            user: req.cookies.Username,
            Type: req.cookies.Type || "none",
        });
    }
    catch (error) {
        res.status(404);
        throw new Error(`Product with id ${id} not found or invalid field(s) parameter`);
    }
}));
const deleteProduct = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const product = yield Products.findById(id);
        yield product.remove();
        res.status(201);
        res.render("404", {
            title: "Successful",
            message: `${product.name} with id ${id} has been removed`,
            token: req.cookies.Token,
            uid: req.cookies.Uid,
            user: req.cookies.Username,
            Type: req.cookies.Type || "none",
        });
    }
    catch (error) {
        res.status(404);
        throw new Error(`Product with id ${id} not found`);
    }
}));
module.exports = {
    getProductById,
    getProducts,
    addNewProduct,
    updateProduct,
    deleteProduct,
    purchaseProducts,
    addToCart,
    searchProducts,
};
