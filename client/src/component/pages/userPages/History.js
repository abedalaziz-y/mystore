import React from 'react';
import { useState,useEffect } from 'react';
import '../../Bars/nav.css'
import { getUserOrders } from '../../../functions/user';
import {CheckCircleOutlined,CloseCircleOutlined} from '@ant-design/icons';
import { useSelector,useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import logo from '../../../images/logo.png'
import ShowPaymentInfo from '../../pages/cards/ShowOrderInfo'
import ModaImage from 'react-modal-image'

const History = () => {
    const [orders,setOrders]=useState([])

    const dispatch=useDispatch()
    const {user}=useSelector((state)=>({...state}))
    const loadUserOrders=()=>{
        getUserOrders(user.token).then((res)=>{
            console.log(JSON.stringify(res.data,null,4))
            setOrders(res.data)
        })
    }
    const showDownloadLink=()=>{
        return(<>
        </>)
    }
    const showOrderInTable=(order)=>{
        const {address}=order
        return(
            <>
                <div class="table-responsive mt-5  table-bordered border-dark text-dark " >
                    <b className='text-primary'>Order Details</b>
                    <table className="table text-center  ">
                       
                        <thead className="table-primary">
                          
                            <tr>
                                <th scope="col">image</th>
                                <th scope="col">title</th>
                                <th scope="col">price</th>
                                <th scope="col">Brand</th>
                                <th scope="col">Colors</th>
                                <th scope="col">Count</th>
                                <th scope="col">Sipping</th>

                            </tr>
                           
                        </thead>
                        
                        <tbody>
                           {order.products.map((p,i)=>(
                               <>
                               <tr key={i}>
                                       <td>
                                           {/* {p.product.images.length} */}
                                           <div className='text-center mx-auto d-block  ' style={{ width: '80px', height: 'auto' }}  >
                                               {p.product.images.length ? (<ModaImage className='border border-warning rounded ' small={p.product.images[0].url} large={p.product.images[0].url} />)
                                                   : (<ModaImage small={logo} />)}
                                           </div>
                                       </td>
                                    <td>
                                        <b>{p.product.title}</b>
                                    </td>
                                   <td>
                                       <b>{p.product.price  }</b>
                                   </td>
                                   <td>
                                       <b>{p.product.brand}</b>
                                   </td>
                                   <td>
                                       <b className='pl-1'>  {p.colors}</b>
                                   </td>
                                   <td>
                                       <b className='pl-1'>  {p.count}</b>
                                   </td>
                                   <td>{p.shipping == "Yes" ? 
                                   <CheckCircleOutlined className='text-success' 
                                   style={{ fontSize: '20px' }} /> 
                                   : <CloseCircleOutlined className='text-danger' 
                                   style={{ fontSize: '20px' }} />}</td>

                               </tr>
                             
                              </>
                           
                           ))}  <tr className='table-primary'>
                              
                                <th scope="col" colSpan={4}>Notes</th>
                                <th scope="col" colSpan={3}>Date Of Order</th>


                            </tr>
                       <tr>

                                <td colSpan={4}>
                                    <b className='pl-1'>  {order.notes ? order.notes : "No notes"}</b>
                                </td>
                                <td colSpan={3}> 
                                    <b > {order.created_at.slice(0, 10)}</b><br />
                                    <b> Time{'-->'} {order.created_at.slice(11, 19)}</b>
                                </td>
                       </tr>
                            {address.map((item, i) => (
                                <td colSpan='9'>
                                    <iframe src={`https://www.google.com/maps?q=${item.latitude},${item.longitude}&hl=es;z=14&output=embed`} className='w-100'></iframe>
                                </td>

                            ))}

                            <tr 
                            className={order.orderStatus === "Not Processed" ? "bg-danger font-weight-bold"
                                       : order.orderStatus === " Processed" ? "bg-info font-weight-bold"
                                        : order.orderStatus === " Processing" ? "bg-warning font-weight-bold"
                                        : order.orderStatus === " Cancelled"?"bg-active font-weight-bold"
                                        : order.orderStatus === " Completed" ? "bg-success font-weight-bold"
                                        :  "bg-primary font-weight-bold"}>
                                <td colSpan='9'>{order.orderStatus}</td>
                           </tr>
                        </tbody>
                    </table>
                </div>
            </>
        )
    }
    const showEacthOrders=()=>orders.reverse().map((order,i)=>(
        <div key={i} className='m-5 p-3 card'>
            {<ShowPaymentInfo order={order}/> }
            {showOrderInTable(order)}
            <div className='row'>
                <div className='col'>
                   {showDownloadLink()} 
                </div>
            </div>
        </div>
    ))
    useEffect(()=>{
        loadUserOrders()
    },[])
   return(<>
       <div className='container-fluid text-center' style={{ minHeight: '600px' }}>   
        <div className='container'>            <div className='row'>
                <div className='col '>
                   <h4 className=''>{orders.length ? "User Purchase orders" : "No Purchase orders yet"}</h4> 
                   {showEacthOrders()} 
                </div>
            </div>
           </div>

            </div>
   </>)
}
export default History