import express from 'express';
import logger from "../logger.js"

const router = express.Router();

// Prueba para cada cada uno de los errores
router.get('/', (req, res) => {
  logger.debug('Mensaje de debug');
  logger.http('Mensaje de http');
  logger.info('Mensaje de info');
  logger.warning('Mensaje de warning');
  logger.error('Mensaje de error');
  logger.fatal('Mensaje de fatal');
  res.send('Prueba de logger completada');
});

export default router;
