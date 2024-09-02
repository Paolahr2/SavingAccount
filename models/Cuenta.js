// models/Cuenta.js
const mongoose = require('mongoose');

const cuentaSchema = new mongoose.Schema({
    numeroCuenta: {
        type: Number,
        unique: true,
        required: true,
        autoIncrement: true
    },
    documentoCliente: {
        type: String,
        required: true
    },
    fechaApertura: {
        type: Date,
        default: Date.now
    },
    saldo: {
        type: Number,
        required: true,
        min: 0
    },
    claveAcceso: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Cuenta', cuentaSchema);
