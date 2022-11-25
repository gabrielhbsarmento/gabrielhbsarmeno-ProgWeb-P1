import React from 'react';
import Routering from './routes'
import UserServices from '../services/UserService';

const userService = new UserServices();

const ProtectedRoutes = ({children}) => {
  const usuarioAutenticado = userService.usuarioAutenticado()
  console.log('usuarioAutenticado', usuarioAutenticado)
  return usuarioAutenticado ? children : <Routering/>
}
 
export default ProtectedRoutes;