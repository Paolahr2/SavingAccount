const Cuenta = require('../models/Cuenta.js');
const bcrypt = require('bcryptjs');


exports.listarCuentas = async (req, res) => {
    try {
        const cuentas = await Cuenta.find();
        res.json(cuentas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.crearCuenta = async (req, res) => {
  try {

    const { numeroCuenta, otroCampo } = req.body;

    if (!numeroCuenta) {
      return res.status(400).json({ message: 'El campo numeroCuenta es obligatorio.' });
    }

    const nuevaCuenta = new Cuenta({
      numeroCuenta,
      documentoCliente,
      saldo,
  
    });

    await nuevaCuenta.save();


  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        message: error.message,
        errors: error.errors
      });
    }
    res.status(500).json({
      message: 'Error al crear la cuenta',
      error: error.message
    });
  }
};

exports.consignarDinero = async (req, res) => {
    const { numeroCuenta, monto } = req.body;

    try {
        const cuenta = await Cuenta.findOne({ numeroCuenta });
        if (!cuenta) {
            return res.status(404).json({ message: "Cuenta no encontrada" });
        }

        cuenta.saldo += monto;
        await cuenta.save();
        res.json(cuenta);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.retirarDinero = async (req, res) => {
    const { numeroCuenta, monto } = req.body;

    try {
        const cuenta = await Cuenta.findOne({ numeroCuenta });
        if (!cuenta) {
            return res.status(404).json({ message: "Cuenta no encontrada" });
        }

        if (cuenta.saldo < monto) {
            return res.status(400).json({ message: "Saldo insuficiente" });
        }

        cuenta.saldo -= monto;
        await cuenta.save();
        res.json(cuenta);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.eliminarCuenta = async (req, res) => {
    const { numeroCuenta } = req.params;

    try {
        const cuenta = await Cuenta.findOne({ numeroCuenta });
        if (!cuenta) {
            return res.status(404).json({ message: "Cuenta no encontrada" });
        }

        if (cuenta.saldo > 0) {
            return res.status(400).json({ message: "No se puede eliminar una cuenta con saldo positivo" });
        }

        await Cuenta.deleteOne({ numeroCuenta });
        res.json({ message: "Cuenta eliminada correctamente" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

