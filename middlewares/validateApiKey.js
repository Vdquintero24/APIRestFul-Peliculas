// src/middlewares/validateApiKey.js
require('dotenv').config();

const validarApiKey = (req, res, next) => {
  const claveEnviada = req.headers['x-api-key'] || req.query.api_key;
  const claveValida  = process.env.API_KEY;

  if (!claveEnviada) {
    return res.status(401).json({
      error:   'No autorizado',
      mensaje: 'Se requiere una API Key. Envíala en el header "x-api-key" o como parámetro "?api_key=".',
    });
  }

  if (claveEnviada !== claveValida) {
    return res.status(403).json({
      error:   'Prohibido',
      mensaje: 'La API Key proporcionada no es válida.',
    });
  }

  next();
};

module.exports = validarApiKey;
