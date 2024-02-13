// SessionController.js
import passport from "passport";


const sessionController = {
  registerUser: async (req, res) => {
    passport.authenticate('register', { failureRedirect: '/api/session/fail-register' })(req, res, () => {
      console.log("Registrando usuario: ");
      res.status(201).send({ status: "success", message: "Usuario creado con éxito!" });
    });
  },

  loginUser: async (req, res) => {
    passport.authenticate('login', { failureRedirect: '/api/session/fail-login' })(req, res, () => {
      console.log("Usuario encontrado para el login: ");
      const user = req.user;
      console.log(user);
    
      req.session.user = {
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        age: user.age,
        rol: user.rol,
      };
    
      res.send({
        status: "success",
        payload: req.session.user,
        message: "Login realizado!!",
      });
    });
  },

  githubLogin: async (req, res) => {
    passport.authenticate('github', { scope: ['user:email'] })(req, res);
  },

  githubLoginCallback: async (req, res) => {
    passport.authenticate('github', { failureRedirect: '/github/error' })(req, res, () => {
      const user = req.user;
      req.session.user = {
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        age: 18, // Establece la edad a 18 por defecto
        rol: user.rol,
      };
      res.redirect("/users"); // Redirecciona después del inicio de sesión con éxito
    });
  },

  logoutUser: async (req, res) => {
    req.session.destroy((error) => {
      if (error) {
        console.error("Error al destruir la sesión: " + error);
        res.status(500).json({
          error: "Error logout",
          msg: "Error al cerrar la sesión",
        });
      } else {
        console.log(req.session);
        res.json({
          success: true,
          msg: "Sesión cerrada correctamente",
        });
      }
    });
  },

  failRegister: async (req, res) => {
    res.status(401).send({error: "Error en el proceso de registro"});
  },

  failLogin: async (req, res) => {
    res.status(401).send({error: "Error en el proceso de login"});
  }
};

export default sessionController;
