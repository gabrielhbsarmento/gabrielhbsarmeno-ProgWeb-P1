import React from 'react'
import Login from '../pages/login/index'
import ProtectedRoutes from '../Routes/ProtectedRoutes'
import Cadastro from '../pages/Cadastro/index'
import {signOut} from 'firebase/auth'
import {auth} from '../services/firebase'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'

const Routering = () => {
  return ( 
    <Router>
      <Routes>
        <Route path="*" element={<Login/>} />
        <Route path="/cadastrar" element={<Cadastro/>} />
        <Route path="/home" element={<Home></Home>}
        />
      </Routes>
    </Router>
   );
}
 
export default Routering;