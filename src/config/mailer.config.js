import { configEnv } from "../config/config.js";
import nodemailer from "nodemailer";
import { v4 } from "uuid";
// Configuración de nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: configEnv.USER_MAILER,
    pass: configEnv.PASS_MAILER,
  },
});

// Verificamos conexion con gmail
const checkConnection = transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
    console.log(
      "No se ha podido establecer la conexión con el servidor de correo"
    );
  } else {
    console.log("Server is ready to take our messages");
  }
});
const tempDBmails = {};
const mailOptionstoReset = {
  from: "guasgabriel22@gmail.com",
  subject: "Reset password",
};
const sendEmailToResetPassword = (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).send("No se ha entregado el mail");
    }
    const token = v4();
    const link = ` http://localhost:8080/api/email/reset-password/${token}`;
    tempDBmails[token] = {
      email,
      expirationTime: new Date(Date.now() + 60 * 60 * 1000),
    };
    mailOptionstoReset.to = email;
    mailOptionstoReset.html = `Para resetear tu contraseña segui el link: <a href=${link}>click aquí </a>`;

    transporter.sendMail(mailOptionstoReset, (error, info) => {
      if (error) {
        res.status(500).send({ message: "error", paload: error });
      }

      console.log("mensaje enviado: ", info.messageId);
      res.send({ message: "Success", payload: info });
    });
  } catch (error) {
    res
      .status(500)
      .send({ error: error, message: "No se pudo enviar el correo" });
  }
};

const resetPassword = (req, res) => {
  const token = req.params.token;
  const email = tempDBmails[token];
  console.log(email);

  const now = new Date();
  const expirationTime = email?.expirationTime;

  if (now > expirationTime || !expirationTime) {
    delete tempDBmails[token];
    console.log("Expiration time completed");
    return res.redirect("/send-email-to-reset");
  }
  res.send("el tiempo no terminó para resetear la password");
};
export {
  transporter,
  checkConnection,
  sendEmailToResetPassword,
  resetPassword,
};
