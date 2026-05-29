const express = require('express');
const app = express();

app.use(express.json());

const sequelize = require('./modules/db');
require('./modules/pelicula.model');

//rutas
const peliculasRouter = require('./routes/peliculas.routes');
app.use('/peliculas', peliculasRouter);

sequelize.sync().then(() => {
    console.log('Base de datos conectada')
});

app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});