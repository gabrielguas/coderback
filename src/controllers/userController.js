import Cart from "../models/cart.model.js"

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
  }

};

export default userController;
