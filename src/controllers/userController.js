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
};

export default userController;
