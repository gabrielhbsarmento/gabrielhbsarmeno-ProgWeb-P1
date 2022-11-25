import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { Pedido, pedidoSchemaYup } from '../model/Pedido';

export default {
    async create(request: Request, response: Response){

        const {pedido, preco, userid} = request.body;

        if(!(await pedidoSchemaYup.isValid({
            pedido, preco, userid
        }))){

            return response.status(401).json({message: 'Campos inválidos'})

        }

        const pedido_model = await Pedido.create({pedido, preco, userid})

        return response.json(pedido_model);

    },


    async get(request: Request, response: Response){
        const {userid} = request.query;

        const pedidos = await Pedido.find({userid: userid});

        return response.json(pedidos);

    },

    async find(request: Request, response: Response){
        const {id} = request.params;

        if(!id) return response.status(401).send('Request inválida');
        try{
            const pedido = await Pedido.findOne({_id: new mongoose.Types.ObjectId(id)})

            if(!pedido) return response.status(404).send('Pedido não existe');

            return response.json(pedido);
        }catch(e){
            return response.status(401).send('Request inválida');
        }

    },

    
    async delete(request: Request, response: Response){
        const {id} = request.params;

        if(!id) return response.status(401).send('Request inválida');
        try{
            const pedido = await Pedido.findOne({_id: new mongoose.Types.ObjectId(id)})

            if(!pedido) return response.status(404).send('Pedido não existe');

            await Pedido.deleteOne({_id: new mongoose.Types.ObjectId(id)})

            return response.json({message: 'Ok'});
        }catch(e){
            return response.status(401).send('Request inválida');
        }
    },

    async update(request: Request, response: Response){
        const {id} = request.params;

        const {pedido, preco} = request.body;

        if(!id) return response.status(401).send('Request inválida');

        if(!(await pedidoSchemaYup.isValid({
            pedido, preco
        }))){

            return response.status(401).json({message: 'Campos inválidos'})

        }

        try{
            
            let _pedido = await Pedido.findOne({_id: new mongoose.Types.ObjectId(id)});

            if(!_pedido) return response.status(404).send('Pedido não existe');

            await Pedido.updateOne({_id: new mongoose.Types.ObjectId(id)}, {pedido, preco})

            _pedido = await Pedido.findOne({_id: new mongoose.Types.ObjectId(id)});

            return response.json(_pedido);
        }catch(e){
            return response.status(401).send('Request inválida');
        }


    }
}
///atribuindo as rotas de buscar e deletar  com fetbyid backend