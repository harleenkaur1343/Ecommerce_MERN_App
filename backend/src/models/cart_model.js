import mongoose from "mongoose";

const cartItemsSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Products",
    required: true,
  },
  qty: {
    type: Number,
    required: true,
    min: 1,
  },
});

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      refs: "Users",
      required: true,
      unique: true,
    },
    items: [cartItemsSchema],
  }, //check brackets here
  { timestamps: true }
);

export default mongoose.model("Cart",cartSchema);