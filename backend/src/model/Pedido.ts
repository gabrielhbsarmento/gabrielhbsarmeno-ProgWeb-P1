import mongoose, { Schema } from 'mongoose';

import * as Yup from 'yup';

export const pedidoSchemaYup = Yup.object().shape({
    pedido: Yup.string().required(),
    preco: Yup.number().required(),
    userid: Yup.string()
});

const pedidoSchema = new Schema({
    pedido: {
        type: String,
        required: true,
    },
    preco: {
        type: Number,
        required: true
    },
    entregue: {
        type: Boolean,
        default: false
    },
    userid: {
        type: String,
        required: true,
    },
}, { timestamps: true })

export const Pedido = mongoose.model('pedidos', pedidoSchema, 'pedidos');
///atribuindo as rotas de buscar e deletar  com fetbyid backend