import express from "express";
import mongoDBConnection from "./config/database.js";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import { allowInsecurePrototypeAccess } from "@handlebars/allow-prototype-access";
import Handlebars from "handlebars";
import viewRouter from './routes/views.routes.js'
import viewRoutesUsers from './routes/users.views.router.js'
import githubLoginViewRouter from "./routes/github-views.router.js"
import sessionRouter from "./routes/session.router.js"
import passport from "passport";
import initializePassport from "./config/passport.config.js";
import session from "express-session";
import FileStore from "session-file-store";
import MongoStore from "connect-mongo";
import { configEnv } from "./config/config.js";
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

const fileStore = FileStore(session);

app.use(
  session({
    //Usando -> session-file-store
    //store: new fileStore({ path: "./sessions", ttl: 15, retries: 0}),

    // Usando connect-mongo
    store: MongoStore.create({
      mongoUrl: `mongodb+srv://${configEnv.DB_USER}:${configEnv.DB_PASS}@${configEnv.DB_CLUSTER}/${configEnv.DB_NAME}?retryWrites=true&w=majority`,
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
      ttl: 10 * 60,
    }),
    secret: configEnv.COOKIE_SECRET,
    resave: false, // guarda en memoria, no es necesario porque va a estar en un archivo
    saveUninitialized: true, // lo guarda al crear la session
  })
);
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


app.listen(configEnv.PORT, () => {
  console.log(`Servidor escuchando en el puerto ${configEnv.PORT}`);
});

mongoDBConnection();