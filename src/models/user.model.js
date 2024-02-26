// userModel.js

import mongoose from "mongoose";
import cartModel from "./cart.model.js" // Asegúrate de importar el modelo de carrito

const collection = "users";
const validRoles = ["usuario", "admin"];

const schema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  rol: {
    type: String,
    enum: validRoles,
    default: "usuario",
  },
  email: {
    type: String,
    unique: true,
  },
  age: Number,
  password: String,
  loggedBy: String,
  cart: { type: mongoose.Schema.Types.ObjectId, ref: "carts" }, // Referencia al carrito
});

// Middleware para crear un carrito al crear un usuario
schema.pre("save", async function (next) {
  try {
    // Si el usuario no tiene un carrito, créalo
    if (!this.cart) {
      const newCart = await cartModel.create({ userId: this._id });
      this.cart = newCart._id;
    }
    next();
  } catch (error) {
    next(error);
  }
});

const userModel = mongoose.model(collection, schema);

export default userModel;
