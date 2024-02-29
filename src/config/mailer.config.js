import { configEnv } from "../config/config.js";
import nodemailer from 'nodemailer';
// Configuración de nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
      user: configEnv.USER_MAILER,
      pass: configEnv.PASS_MAILER
    }
  });

  // Verificamos conexion con gmail
  const checkConnection = transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
      console.log("No se ha podido establecer la conexión con el servidor de correo");
    } else {
      console.log('Server is ready to take our messages');
    }
  })

  export { transporter, checkConnection }