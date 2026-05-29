const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});

app.use(express.json());

const sequelize = require("./db");
require('./peliculas-api-clean validación por token (JWT)/modules/pelicula.model');

//rutas
const peliculasRouter = require('./routes/peliculas.routes');
app.use('/peliculas', peliculasRouter);

sequelize.sync().then(() => {
    console.log('Base de datos conectada')
});

app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});