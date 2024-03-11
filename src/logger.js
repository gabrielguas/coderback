import winston from "winston";

const levels = {
  debug: 0,
  http: 1,
  info: 2,
  warning: 3,
  error: 4,
  fatal: 5,
};

// colores para los niveles de l log
const colors = {
  debug: "blue",
  http: "green",
  info: "cyan",
  warning: "yellow",
  error: "red",
  fatal: "magenta",
};

const loggerTransports = [
  new winston.transports.Console({
    level: "debug",
    format: winston.format.combine(
      winston.format.colorize({ all: true }),
      winston.format.simple()
    ),
    silent: process.env.MODE === "production", // para que no loguee en consola
  })
];

if (process.env.MODE === "production") {
  loggerTransports.push(new winston.transports.File({
    filename: "errors.log",
    level: "error",
  }));
}

const logger = winston.createLogger({
  levels: levels,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(
      (info) =>
        `${info.timestamp} [${info.level.toUpperCase()}]: ${info.message}`
    )
  ),
  transports: loggerTransports
});


export default logger