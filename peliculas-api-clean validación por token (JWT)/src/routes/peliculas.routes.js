const { Router }
= require('express');
const peliculasService = require('../services/peliculas.service');
const validarToken
= require('../middlewares/validateToken');
const router = Router();
router.use(validarToken);
router.get('/', async (req, res) => {
try {
const peliculas = await peliculasService.obtenerTodas();
res.status(200).json({ total: peliculas.length, data: peliculas });
} catch (error) {
res.status(error.status || 500).json({ error: error.message });
}
});
router.get('/:id', async (req, res) => {
try {
const pelicula = await peliculasService.obtenerPorId(req.params.id);
res.status(200).json({ data: pelicula });
} catch (error) {
res.status(error.status || 500).json({ error: error.message });
}
});

router.post('/', async (req, res) => {
try {
const nueva = await peliculasService.crear(req.body);
res.status(201).json({ mensaje: 'Película creada exitosamente', data:
nueva });
} catch (error) {
res.status(error.status || 500).json({ error: error.message });
}
});
router.put('/:id', async (req, res) => {
try {
const actualizada = await peliculasService.actualizar(req.params.id,
req.body);
res.status(200).json({ mensaje: 'Película actualizada exitosamente',
data: actualizada });
} catch (error) {
res.status(error.status || 500).json({ error: error.message });
}
});
router.delete('/:id', async (req, res) => {
try {
const resultado = await peliculasService.eliminar(req.params.id);
res.status(200).json(resultado);
} catch (error) {
res.status(error.status || 500).json({ error: error.message });
}
});
module.exports = router;