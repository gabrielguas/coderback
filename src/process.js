import { Command } from "commander";

const program = new Command();

program
  .option("-d", "Varaible para debug", false)
  .option("-p <port>", "Puerto del servidor", 9090)
  .option("--mode <mode>", "Modo de trabajo: development o production", "development") // Cambiado para aceptar "development" o "production"
  .requiredOption(
    "-u <user>",
    "Usuario que va a utilizar el aplicativo.",
    "No se ha declarado un usuario."
  );
  
program.parse();

const options = program.opts();

if (options.mode === 'development') {
  console.log('Ejecutando en modo "development"');
} else if (options.mode === 'production') {
  console.log('Ejecutando en modo "production"');
}

process.on("exit", (code) => {
  console.log("Este codigo se ejecuta antes de salir del proceso.");
  console.log("Codigo de salida del proceso: " + code);
});

process.on("uncaughtException", (exception) => {
  console.log("Esta exception no fue capturada, o controlada.");
  console.log(`Exception no capturada: ${exception}`);
});

process.on("message", (message) => {
  console.log(
    "Este codigo se ejecutará cuando reciba un mensaje de otro proceso."
  );
  console.log(`Mensaje recibido: ${message}`);
});

export default program;
