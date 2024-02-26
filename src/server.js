import express from "express";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import { allowInsecurePrototypeAccess } from "@handlebars/allow-prototype-access";
import Handlebars from "handlebars";
import viewRouter from './routes/views.routes.js'
import viewRoutesUsers from './routes/users.views.router.js'
import githubLoginViewRouter from "./routes/github-views.router.js"
import sessionRouter from "./routes/session.router.js"
import cartRouter from "./routes/cart.router.js"
import passport from "passport";
import initializePassport from "./config/passport.config.js";
import { configEnv } from "./config/config.js";
import MongoSingleton from "./config/mongodb-singleton.js";
import sessionConfig from "./config/sessionConfig.js";
const app = express();

//JSON settings
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Engine
app.engine(
  "hbs",
  handlebars.engine({
    extname: "hbs",
    defaultLayout: "main",
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    helpers: {
      // Función de ayuda para codificar objetos a JSON
      json: function (context) {
        return JSON.stringify(context);
      },
    },
  })
);

// Seteo el motor

app.set("view engine", "hbs");
app.set("views", `${__dirname}/views`);

// Public
app.use(express.static(__dirname + "/public"));

// Configuracion de Session
app.use(sessionConfig);


// Middleware de passport
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

// Views
app.use("/", viewRouter);
app.use('/users', viewRoutesUsers);
app.use("/github", githubLoginViewRouter);

// API
app.use("/api/session", sessionRouter);
app.use("/api/cart", cartRouter);

app.listen(configEnv.PORT, () => {
  console.log(`Servidor escuchando en el puerto ${configEnv.PORT}`);
});


// Levantamos instancia Mongo
const mongoInstance = async () => {
  try {
      await MongoSingleton.getInstance()
  } catch (error) {
      console.error(error);
  }
}
mongoInstance();