import express from 'express'
import PedidosController from '../controllers/PedidosController';
const routes = express.Router();

routes.post('/add', PedidosController.create)

routes.get('/find', PedidosController.get)
routes.get('/find/:id', PedidosController.find)

routes.patch('/update/:id', PedidosController.update)
routes.delete('/delete/:id', PedidosController.delete)

export default routes;

///atribuindo as rotas de buscar e deletar  com fetbyid backend
/// atribuindo 5 rotas