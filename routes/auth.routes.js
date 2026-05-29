const { Router } = require('express');
const jwt = require('jsonwebtoken');
const router = Router();
// Usuario de prueba
const USUARIO = {
username: 'admin',
password: '12345'
};
// POST /login
router.post('/login', (req, res) => {
const { username, password } = req.body;
if (
username !== USUARIO.username ||
password !== USUARIO.password
) {
return res.status(401).json({
error: 'Credenciales incorrectas'
});
}
const token = jwt.sign(
{
username: USUARIO.username
},
process.env.JWT_SECRET,
{
expiresIn: '1h'
}
);
res.status(200).json({
mensaje: 'Login exitoso',
token
});
});
module.exports = router;