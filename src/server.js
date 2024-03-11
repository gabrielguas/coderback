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
import { getProducts } from "./controllers/mockingProductsController.js"
import passport from "passport";
import initializePassport from "./config/passport.config.js";
import { configEnv } from "./config/config.js";
import MongoSingleton from "./config/mongodb-singleton.js";
import sessionConfig from "./config/sessionConfig.js";
import viewRouterAdmin from "./routes/admin.views.router.js";
import http from 'http';
import { Server as SocketServer } from 'socket.io';
import productRouter from "./routes/product.router.js";
import { checkConnection } from "./config/mailer.config.js";
import loggerController from './controllers/loggerController.js'
const app = express();
const httpServer = http.createServer(app);
const socketServer = new SocketServer(httpServer);

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
app.use('/admin', viewRouterAdmin);
app.use("/github", githubLoginViewRouter);
app.use("/mockingproducts", getProducts); // Lo hago lo más sencillo, al ser sólo muestra supongo que no va a ser necesario para el final
app.use("/loggerTest", loggerController);

// API
app.use("/api/session", sessionRouter);
app.use("/api/cart", cartRouter);
app.use("/api/products",productRouter)


httpServer.listen(configEnv.PORT, () => {
  console.log(`Servidor escuchando en el puerto ${configEnv.PORT}`);
});


// Manejar conexiones de websocket
socketServer.on('connection', (socket) => {
  console.log('Cliente conectado');

  // Manejar mensajes del cliente
  socket.on('mensaje', (mensaje) => {
    console.log('Mensaje recibido:', mensaje);

    // Enviar una respuesta al cliente
    socket.emit('respuesta', 'Hemos recibido su consulta, nos comunicaremos a la brevedad');
  });
});

// Levantamos instancia Mongo
const mongoInstance = async () => {
  try {
    await MongoSingleton.getInstance()
  } catch (error) {
    console.error(error);
  }
}

// Valido la conexión con el servicio de mail

checkConnection
mongoInstance();