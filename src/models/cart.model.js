import { Schema, model } from "mongoose";

const cartSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  products: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: "products",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
      },
    },
  ],
  total: {
    type: Number,
    required: true,
    default: 0,
  },
  totalProducts: {
    type: Number,
    default: 0,
  },
});

const cartModel = model("carts", cartSchema);

export default cartModel;
