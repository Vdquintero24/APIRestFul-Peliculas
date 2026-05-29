import express from 'express';
import sequelize from './database.js';
import Venta from './model/venta.js';

const app = express();
app.use(express.json());

// Inicialización asíncrona de la base de datos
try {
await sequelize.authenticate();
console.log('Conexión con PostgreSQL establecida correctamente.');
await sequelize.sync(); // Crea la tabla en la nube si no existe
} catch (error) {
console.error('Error al inicializar la base de datos:', error);
}

// --- CRUD BÁSICO ---
app.get('/ventas', async (req, res) => {
const ventas = await Venta.findAll();
res.json(ventas);
});
app.get('/ventas/:id', async (req, res) => {
const venta = await Venta.findByPk(req.params.id);
venta ? res.json(venta) : res.status(404).json({ error: 'No encontrado' });
});
app.post('/ventas', async (req, res) => {
const nuevaVenta = await Venta.create(req.body);
res.status(201).json(nuevaVenta);
});
app.put('/ventas/:id', async (req, res) => {
const venta = await Venta.findByPk(req.params.id);
if (venta) {
await venta.update(req.body);
res.json(venta);
} else {
res.status(404).json({ error: 'No encontrado' });
}
});
app.delete('/ventas/:id', async (req, res) => {
const borrado = await Venta.destroy({ where: { id: req.params.id } });
res.json({ eliminado: !!borrado });
});
// --- CONSULTAS ESPECÍFICAS ---
app.get('/ventas/estadisticas/mayor', async (req, res) => {
const venta = await Venta.findOne({ order: [['importe', 'DESC']] });
res.json(venta);
});
app.get('/ventas/estadisticas/menor', async (req, res) => {
const venta = await Venta.findOne({ order: [['importe', 'ASC']] });
res.json(venta);
});
app.get('/ventas/sucursal/:nombre', async (req, res) => {
const ventas = await Venta.findAll({ where: { sucursal: req.params.nombre } });
res.json(ventas);
});
app.get('/ventas/orden/fecha', async (req, res) => {
const ventas = await Venta.findAll({ order: [['fecha', 'ASC']] });
res.json(ventas);
});

app.get('/', async (req, res) => {
res.send('API funcionando ...');
});

app.get('/saludo', async (req, res) => {
res.send('Saludo desde API ...');
});

app.get('/bienvenido', async (req, res) => {
res.send('Bienvenidos desde la API ...');
});


app.listen(process.env.PORT | 3001, () => console.log('API lista en http://localhost:3000'));
