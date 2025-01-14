import React from 'react';
import { useState } from 'react';
import {useSelector} from 'react-redux'
import { useEffect } from 'react';
import { GETPRODUCTBYCOUNT } from '../../../functions/product';
import Orders from '../../orders/orders';

import {
  
    LoadingOutlined
} from '@ant-design/icons'

import { getUsersOrders,changeStatus } from '../../../functions/admin';
import AdminCard from './cards/AdminProductCards';
import {toast}from 'react-toastify'

const ManegeOrders = (e) =>{
        const [orders,setOrders]=useState([])
        const {user}=useSelector((state)=>({...state}))

        useEffect(()=>{
                loadOrders()
        },[])

    const loadOrders=()=>getUsersOrders(user.token).then((res)=>{
        setOrders(res.data)
    })
    const handleStatusChange=(orderId,orderStatus)=>{
        changeStatus(orderId, orderStatus,user.token).then((res)=>{
            toast.success("Status Updated ")
            loadOrders()
        })
    }
    return (<div className='container-fluid' >           
          <Orders orders={orders} handleStatusChange={handleStatusChange}/>
    </div>

)
}



export default ManegeOrders