// src/middlewares/logger.js

const logger = (req, res, next) => {
  const inicio    = Date.now();
  const timestamp = new Date().toISOString();

  res.on('finish', () => {
    const duracion = Date.now() - inicio;
    const color    = statusColor(res.statusCode);
    console.log(
      `[${timestamp}] ${req.method.padEnd(7)} ${res.statusCode} ${color}${req.originalUrl}\x1b[0m — ${duracion}ms`
    );
  });

  next();
};

const statusColor = (code) => {
  if (code >= 500) return '\x1b[31m'; // Rojo    – error servidor
  if (code >= 400) return '\x1b[33m'; // Amarillo – error cliente
  if (code >= 300) return '\x1b[36m'; // Cyan    – redirección
  if (code >= 200) return '\x1b[32m'; // Verde   – éxito
  return '\x1b[0m';
};

module.exports = logger;
