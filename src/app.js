import 'dotenv/config';

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import petsRouter from './routes/pets.router.js';
import usersRouter from './routes/users.router.js';
import mocksRouter from './routes/mocks.router.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
    console.error("Error: La variable de entorno MONGO_URL no está definida.");
    process.exit(1);
}

mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Conectado a la base de datos de MongoDB Atlas');
})
.catch(error => {
    console.error('Error al conectar a la base de datos de MongoDB Atlas:', error);
    process.exit(1);
});

app.use('/api/pets', petsRouter);
app.use('/api/users', usersRouter);
app.use('/api/mocks', mocksRouter);

app.get('/', (req, res) => {
    res.send('¡Bienvenido al Backend de Adoptme!');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('¡Algo salió mal!');
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});