import Cart from "../models/cart.model.js"
import UserRepository from "../repositories/userRepository.js";
import mongoose from "mongoose";
const userController = {
  showLoginPage: (req, res) => {
    // Verificar si el usuario está autenticado
    if (req.session.user) {
      // Si el usuario está logueado, redirigirlo a otra página, como su perfil
      res.redirect("/");
      return;
    }

    // Si el usuario no está logueado, renderizar la vista de login
    res.render("login");
  },

  showRegisterPage: (req, res) => {
    // Verificar si el usuario está autenticado
    if (req.session.user) {
      // Si el usuario está logueado, redirigirlo a otra página, como su perfil
      res.redirect("/");
      return;
    }

    // Si el usuario no está logueado, renderizar la vista de registro
    res.render("register");
  },

  showProfilePage: (req, res) => {

    res.render("profile", { user: req.session.user });
  },
  showCartPage: async (req, res) => {
    try {
      const userId = req.session.user._id;
      const cart = await Cart.findOne({ userId }).populate('products.productId');
      console.log(cart);
      res.render("cart", { cart });
    } catch (error) {
      console.error("Error al obtener el carrito del usuario:", error);
      res.status(500).send("Error interno del servidor");
    }
  },
  showChatPage: (req, res) => {
    if (!req.session.user) {
      res.redirect("/login");
      return;
    }
    res.render("chat", { user: req.session.user });
  },


  showAddProduct: (req, res) => {
    const userId = req.session.user._id;
    res.render('agregar-producto-premium', { userId });
  },



  upgradeToPremium: async (req, res) => {
    try {
      const userRepository = new UserRepository();

      // Obtener el ID del usuario que se va a actualizar desde los parámetros de la ruta
      const userId = req.params.uid;

      // Verificar si el ID es un ObjectId válido
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).send("ID de usuario inválido");
      }

      // Verificar si el usuario existe
      const existingUser = await userRepository.getUserById(userId);
      if (!existingUser) {
        return res.status(404).send("Usuario no encontrado");
      }

      // Verificar el rol actual del usuario
      if (existingUser.rol === "usuario") {
        // Si el usuario es "usuario", cambiar su rol a "premium"
        existingUser.rol = "premium";
      } else if (existingUser.rol === "premium") {
        // Si el usuario es "premium", cambiar su rol a "usuario"
        existingUser.rol = "usuario";
      }

      // Actualizar el rol del usuario en la base de datos
      await userRepository.updateUser(userId, existingUser);

      // Devolver una respuesta exitosa
      res.status(200).send(`Rol del usuario actualizado exitosamente. Nuevo rol: ${existingUser.rol} . Debes cerrar sesión para ver el cambio`);
    } catch (error) {
      console.error("Error al actualizar el rol del usuario:", error);
      res.status(500).send("Error interno del servidor");
    }
  }

}

export default userController;
