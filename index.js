require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cuentaRoutes = require('./routes/cuentaRoutes');

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api', cuentaRoutes);

mongoose.connect(process.env.MONGODB_CNN,)
    .then(() => console.log('Conectado a MongoDB'))
    .catch(err => console.log('Error al conectar a MongoDB:', err));

app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});
