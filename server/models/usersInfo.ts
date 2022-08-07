const usersBasicData = require("mongoose");

const usersSchema = usersBasicData.Schema({
  Uid: {
    type: String,
    required: [true, "Please add reference Id"],
  },
  username: {
    type: String,
    required: [true, "Please add a name"],
  },
  email: {
    type: String,
    required: [true, "Please add an email"],
    unique: true,
  },
  phone: {
    type: String,
    required: [true, "Please add your phone number"],
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
  isBanned: {
    type: Boolean,
    required: [true, "Is the user banned?"],
  },
});

module.exports = usersBasicData.model("UserInformation", usersSchema);
