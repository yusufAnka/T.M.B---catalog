"use strict";
const user = require("mongoose");
const userSchema = user.Schema({
    username: {
        type: String,
        required: [true, "Please add a name"],
    },
    email: {
        type: String,
        required: [true, "Please add an email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please add a password"],
    },
    phone: {
        type: String,
        required: [true, "Please add your phone number"],
    },
    balance: {
        type: Number,
        required: [true, "Show user balance information"],
    },
    products: {
        type: Array,
        required: [true, "Products must have at least one item"],
    },
    cart: {
        type: [
            {
                imageUrl: String,
                Name: String,
                Quantity: Number,
                Price: String,
                "Total Price": Number,
            },
        ],
        required: [true, "Save to Cart"],
    },
    prevTransactions: {
        type: Array,
        required: [true, "Products must have at least one item"],
    },
    User: {
        type: Boolean,
        required: [true, "Regular User"],
    },
    Agent: {
        type: Boolean,
        required: [true, "Agent"],
    },
    Admin: {
        type: Boolean,
        required: [true, "Admin"],
    },
    isBanned: {
        type: Boolean,
        required: [true, "Is the user banned?"],
    },
});
module.exports = user.model("User", userSchema);
