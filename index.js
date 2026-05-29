const express = require('express');
const app = express();
process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION:', err);
});

process.on('unhandledRejection', (err) => {
  console.error('UNHANDLED REJECTION:', err);
});

app.use(express.json());

const sequelize = require("./db");
require('./modules/pelicula.model');

// Rutas
const peliculasRouter = require('./routes/peliculas.routes');
app.use('/peliculas', peliculasRouter);

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('API de películas funcionando');
});

sequelize.sync().then(() => {
    console.log('Base de datos conectada');

    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
        console.log(`Servidor corriendo en puerto ${PORT}`);
    });
});
sequelize.sync()
  .then(() => {
    console.log('Base de datos conectada');

    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en puerto ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('ERROR EN SEQUELIZE:');
    console.error(error);
  });