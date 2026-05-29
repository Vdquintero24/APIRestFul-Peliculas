// src/modules/peliculas/pelicula.model.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Pelicula = sequelize.define('Pelicula', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'El título no puede estar vacío' },
    },
  },
  director: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'El director no puede estar vacío' },
    },
  },
  anio: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isInt: { msg: 'El año debe ser un número entero' },
      min:   { args: [1888], msg: 'El año mínimo es 1888' },
    },
  },
  genero: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'El género no puede estar vacío' },
    },
  },
  sinopsis: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  duracion: {
    type: DataTypes.INTEGER, // en minutos
    allowNull: true,
    validate: {
      isInt: { msg: 'La duración debe ser un número entero (minutos)' },
      min:   { args: [1], msg: 'La duración mínima es 1 minuto' },
    },
  },
}, {
  tableName: 'peliculas',
  timestamps: true,
});

module.exports = Pelicula;
