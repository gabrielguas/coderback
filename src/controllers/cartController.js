// cartController.js
import TicketController from "./ticketController.js";
import Cart from "../models/cart.model.js";
import Product from "../controllers/productController.js";
import { transporter } from "../config/mailer.config.js";

const cartController = {
  addToCart: async (req, res) => {
    try {
      const userId = req.session.user._id;
      const productId = req.params.productId;
      let cart = await Cart.findOne({ userId });
      if (!cart) {
        cart = new Cart({ userId, products: [] });
      }
      const existingProductIndex = cart.products.findIndex(
        (product) => String(product.productId) === String(productId)
      );
      if (existingProductIndex !== -1) {
        cart.products[existingProductIndex].quantity++;
      } else {
        cart.products.push({ productId, quantity: 1 });
      }
      await cart.save();

      res
        .status(200)
        .json({ message: "Producto agregado al carrito con éxito" });
    } catch (error) {
      console.error("Error al agregar el producto al carrito:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  },

  // Método para vaciar el carrito
  clearCart: async (req, res) => {
    try {
      const userId = req.session.user._id;

      const cart = await Cart.findOne({ userId });

      if (cart) {
        cart.products = [];
        await cart.save();
        res.status(200).json({ message: "Carrito vaciado exitosamente" });
      } else {
        res.status(404).json({ message: "El carrito está vacío" });
      }
    } catch (error) {
      console.error("Error al vaciar el carrito:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  },

  checkout: async (req, res) => {
    try {
      const userId = req.session.user._id;
      const cart = await Cart.findOne({ userId });

      // Verificar el stock de cada producto en el carrito y ajustar la cantidad si es necesario
      for (const item of cart.products) {
        const productId = String(item.productId);
        const product = await Product.getProductByIdFunction(productId);
        if (!product || product.stock < item.quantity) {
          item.quantity = product.stock > 0 ? product.stock : 0;
        }
      }

      const totalAmount = await cartController.calculateTotalAmount(cart);

      if (cart.products.length === 0) {
        return res
          .status(404)
          .json({ message: "No hay productos disponibles en el carrito" });
      }

      const ticketData = {
        code: generateTicketCode(),
        purchase_datetime: new Date(),
        amount: totalAmount,
        purchaser: userId,
      };
      const createdTicket = await TicketController.createTicket(ticketData);

      transporter.sendMail(
        {
          from: "guasgabriel22@gmail.com",
          to: "guasgabriel22@gmail.com",
          subject: "TEST",
          text: "TEST",
        },
        (error, info) => {
          if (error) {
            console.error("Error al enviar el correo electrónico:", error);
          } else {
            console.log("Correo electrónico enviado:", info.response);
          }
        }
      );
      res
        .status(201)
        .json({
          message: "Su compra ha sido exitosa, el total a pagar es de: ",
          totalAmount,
        });
      res.redirect("/");
    } catch (error) {
      console.error("Error al procesar el checkout:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  },
  calculateTotalAmount: async (cart) => {
    let totalAmount = 0;

    // Recorre los productos en el carrito
    for (const item of cart.products) {
      const product = await Product.getProductByIdFunction(
        String(item.productId)
      );

      if (product && product.stock >= item.quantity) {
        totalAmount += product.price * item.quantity;
      }
    }

    return totalAmount;
  },
};

function generateTicketCode(length = 8) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let code = "";

  for (let i = 0; i < length; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return code;
}

export default cartController;
