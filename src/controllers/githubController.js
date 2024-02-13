// githubController.js

const githubController = {
  showLoginPage: (req, res) => {
    res.render("github-login");
  },
  showErrorPage: (req, res) => {
    res.render("error", { error: "No se pudo autenticar usando GitHub!" });
  },
};

export default githubController;
