import {useEffect, useState} from 'react'

import {auth} from '../../services/firebase'
import api from '../../services/api'
import { NavLink, useNavigate } from 'react-router-dom'
import {BsTrash} from 'react-icons/bs'
import './index.css'
import Input from '../../components/input/index'

export function Pedidos() {

    const [pedidos, setPedidos] = useState([])
    const [filter, setFilter] = useState('')
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    
    const consultarPedidos = () => {
        api.get(`/pedido/find?userid=${auth.currentUser.uid}`).then(response => setPedidos(response.data))
    }
    
    useEffect(() => {
        if(loading){
            auth.onAuthStateChanged(user => {
                if(user && loading){
                    setLoading(false)
                    consultarPedidos()
                    
                }else{
                    navigate("/")
                }
            })
        }
        
    }, [loading])

    const handleDelete = (pedido) => {
        api.delete(`/pedido/delete/${pedido._id}`)
           .then(response => {
            if(response.status == 200){
                consultarPedidos();
            }
        })

    }
        
    
    if(loading) return (<></>)

    if(filter){
        return (<>
            <Input
                name='Filtro'
                placeholder='Filtrar pedidos'
                onChange={(e) => setFilter(e.target.value)}
                type='text'
            />
            <table style={{fontFamily: 'Arial, Helvetica, sans-serif', borderCollapse: 'collapse', width:'100%'}}>
                <tbody>
                    <tr>
                        <th style={{padding: '8px', textAlign: 'center', color: '#fff'}}>Pedido</th>
                        <th style={{padding: '8px', textAlign: 'center', color: '#fff'}}>Preço</th>
                        <th style={{padding: '8px', textAlign: 'center', color: '#fff'}}>Entregue</th>
                        <th style={{padding: '8px', textAlign: 'center', color: '#fff'}}>Deletar</th>
                    </tr>
                    {pedidos.filter(pedido => pedido.pedido.toLowerCase().includes(filter)).map(pedido => <tr key={pedido._id}>
                        <td style={{padding: '8px', textAlign: 'center', color: '#fff'}}>{pedido.pedido}</td>
                        <td style={{padding: '8px', textAlign: 'center', color: '#fff'}}>{pedido.preco}</td>
                        <td style={{padding: '8px', textAlign: 'center', color: '#fff'}}>{pedido.entregue ? "Sim": "Não"}</td>
                        <td style={{padding: '8px', textAlign: 'center', color: '#fff'}}>
                            <BsTrash size={24} className='icon-delete' onClick={() => handleDelete(pedido)}/>
                        </td>
                    </tr>)}
                </tbody>
            </table>
        </>)
    }

    return (
        (<>
            <Input
                name='Filtro'
                placeholder='Filtrar pedidos'
                onChange={(e) => setFilter(e.target.value)}
                type='text'
            />
            <table style={{fontFamily: 'Arial, Helvetica, sans-serif', borderCollapse: 'collapse', width:'100%'}}>
                <tbody>
                    <tr>
                        <th style={{padding: '8px', textAlign: 'center', color: '#fff'}}>Pedido</th>
                        <th style={{padding: '8px', textAlign: 'center', color: '#fff'}}>Preço</th>
                        <th style={{padding: '8px', textAlign: 'center', color: '#fff'}}>Entregue</th>
                        <th style={{padding: '8px', textAlign: 'center', color: '#fff'}}>Deletar</th>
                    </tr>
                    {pedidos.map(pedido => <tr key={pedido._id}>
                        <td style={{padding: '8px', textAlign: 'center', color: '#fff'}}>{pedido.pedido}</td>
                        <td style={{padding: '8px', textAlign: 'center', color: '#fff'}}>{pedido.preco}</td>
                        <td style={{padding: '8px', textAlign: 'center', color: '#fff'}}>{pedido.entregue ? "Sim": "Não"}</td>
                        <td style={{padding: '8px', textAlign: 'center', color: '#fff'}}>
                            <BsTrash size={24} className='icon-delete' onClick={() => handleDelete(pedido)}/>
                        </td>
                    </tr>)}
                </tbody>
            </table>
        </>)
    )

}
