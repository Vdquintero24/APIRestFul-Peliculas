import { DataTypes } from 'sequelize';
import sequelize from '../database.js';

const Venta = sequelize.define('Venta', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    fecha: { type: DataTypes.DATE, allowNull: false },
    cliente: { type: DataTypes.STRING, allowNull: false },
    sucursal: { type: DataTypes.STRING, allowNull: false },
    empleado: { type: DataTypes.STRING, allowNull: false },
    importe: { type: DataTypes.FLOAT, allowNull: false }
    }, {
    timestamps: false // No necesitamos createdAt ni updatedAt para este ejemplo
});

export default Venta;