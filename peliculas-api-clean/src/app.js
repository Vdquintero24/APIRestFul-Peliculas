require('dotenv').config();
const express   = require('express');
const sequelize = require('./config/database');
const logger    = require('./middlewares/logger');

require('./modules/peliculas/pelicula.model');

const peliculasRoutes = require('./routes/peliculas.routes');

const app  = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

app.use('/peliculas', peliculasRoutes);

app.get('/', (req, res) => {
  res.json({
    nombre:  'Películas API',
    version: '1.0.0',
    endpoints: {
      'GET    /peliculas':     'Listar todas las películas',
      'GET    /peliculas/:id': 'Obtener una película por ID',
      'POST   /peliculas':     'Crear una nueva película',
      'PUT    /peliculas/:id': 'Actualizar una película',
      'DELETE /peliculas/:id': 'Eliminar una película',
    },
    autenticacion: 'Enviar API Key en el header "x-api-key" o como query param "?api_key="',
  });
});

app.use((req, res) => {
  res.status(404).json({ error: `Ruta ${req.method} ${req.originalUrl} no encontrada` });
});

app.use((err, req, res, next) => {
  console.error('❌ Error inesperado:', err);
  res.status(500).json({ error: 'Error interno del servidor' });
});

const iniciar = async () => {
  try {
    await sequelize.authenticate();
    console.log(' Conexión a SQLite establecida correctamente');

    await sequelize.sync({ force: false });
    console.log(' Modelos sincronizados con la base de datos');

    app.listen(PORT, () => {
      console.log(` Servidor corriendo en http://localhost:${PORT}`);
      console.log(` API Key activa: ${process.env.API_KEY}`);
    });
  } catch (error) {
    console.error(' Error al iniciar la aplicación:', error);
    process.exit(1);
  }
};

iniciar();
