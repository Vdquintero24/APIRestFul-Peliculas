const Pelicula = require('../modules/peliculas/pelicula.model');

const obtenerTodas = async () => {
  return await Pelicula.findAll({
    order: [['createdAt', 'DESC']],
  });
};

const obtenerPorId = async (id) => {
  const pelicula = await Pelicula.findByPk(id);
  if (!pelicula) {
    const error = new Error(`Película con id ${id} no encontrada`);
    error.status = 404;
    throw error;
  }
  return pelicula;
};

const crear = async (datos) => {
  const { titulo, director, anio, genero, sinopsis, duracion } = datos;

  if (!titulo || !director || !anio || !genero) {
    const error = new Error('Los campos titulo, director, anio y genero son obligatorios');
    error.status = 400;
    throw error;
  }

  return await Pelicula.create({ titulo, director, anio, genero, sinopsis, duracion });
};

const actualizar = async (id, datos) => {
  const pelicula = await obtenerPorId(id);
  const { titulo, director, anio, genero, sinopsis, duracion } = datos;
  await pelicula.update({ titulo, director, anio, genero, sinopsis, duracion });
  return pelicula;
};

const eliminar = async (id) => {
  const pelicula = await obtenerPorId(id);
  await pelicula.destroy();
  return { mensaje: `Película "${pelicula.titulo}" eliminada correctamente` };
};

module.exports = {
  obtenerTodas,
  obtenerPorId,
  crear,
  actualizar,
  eliminar,
};
