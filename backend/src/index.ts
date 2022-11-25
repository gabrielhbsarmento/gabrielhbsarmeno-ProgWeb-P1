import 'dotenv/config';
import express from 'express';
import pedido from './routes/pedido'
import mongoose from 'mongoose';
import morgan from 'morgan'
import cors from 'cors'

const app = express()

app.use(express.json());
app.use(cors())

app.use(morgan('combined'))
app.use('/pedido', pedido)

const PORT = process.env.PORT || 3000;

const mongoURI = process.env.MONGODB_URL || '';
console.log('Conectando ao mongo');

mongoURI &&
    mongoose
        .connect(mongoURI)
        .then(() => console.log('MongoDB conectado ...'))
        .catch((err) => console.log(err));

app.listen(process.env.PORT, () =>
    console.log('Servidor rodando com sucesso', process.env.PORT)
);
