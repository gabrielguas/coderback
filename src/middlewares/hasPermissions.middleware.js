const hasPermissions = (requiredRole) => {
    return (req, res, next) => {
      if (!req.session || !req.session.user || !req.session.user.rol) {
        // Si no hay sesión o el usuario no tiene un rol definido en la sesión, denegar el acceso
        return res.status(401).json({ error: "No estas autorizado para ver esta parte de la página 😢🤞" });
      }
  
      const userRole = req.session.user.rol;
      if (userRole !== requiredRole) {
        return res.status(403).json({ error: "No tiene permisos suficientes para acceder a esta parte de la página" });
      }
      next();
    };
  };
  
  export default hasPermissions;
  