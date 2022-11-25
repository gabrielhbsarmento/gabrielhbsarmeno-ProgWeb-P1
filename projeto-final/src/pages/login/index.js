import React, {useEffect, useState} from 'react'
import { Container, Form, SubContainerSign } from './styles'
import Input from '../../components/input/index'
import Botao from '../../components/Botao/index'
import { validarEmail, validarSenha } from '../../utils/validadores'
import UserService from '../../services/UserService'
import { NavLink, useNavigate } from 'react-router-dom'

import {signInWithEmailAndPassword, onAuthStateChanged} from 'firebase/auth'
import {auth} from '../../services/firebase'

const userService = new UserService()

const Login = () => {
  const [loading, setLoading] = useState()
  const [form, setForm] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if(user){
        navigate('/home')
      }
    })
  })

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true)
      const data = await signInWithEmailAndPassword(auth, form.email, form.password)
      //console.log('response do Login', response)
      console.log(data)
      if(data){//if (response === true) {
        alert('usuário Logado com Sucesso')
        navigate('/home')
      }
      setLoading(false)
      /* 
        const response = await userService.login(form)
        console.log('response do Login', response)
        if (response === true) {
          alert('usuário Logado com Sucesso')
          navigate('/home')
        }
      */
      setLoading(false)
    }
    catch (err) {
      alert('Algo deu errado com o Login' + err)
    }
  }

  const handleChange = (event) => {
    setForm({...form, [event.target.name]: event.target.value})
  }

  const validadorInput = () => {
    return validarEmail(form.email) && validarSenha(form.password)
  }

  return (
    <Container>
      <Form>
        <h1>Faça o seu Login 👋</h1>
        <Input
          name='email'
          placeholder='Digite o seu e-mail'
          onChange={handleChange}
          type='email'
        />
        <Input
          name='password'
          placeholder='Digite a sua senha'
          onChange={handleChange}
          type='password'
        />
        <Botao
          type='submit'
          text='Entrar!'
          onClick={handleSubmit}
          disabled={loading === true || !validadorInput()}
        />
        <SubContainerSign>
          <p>Não possui conta?</p>
          <NavLink to="cadastrar">Cadastrar</NavLink>
        </SubContainerSign>
      </Form>
    </Container>
    
  )
}

export default Login;