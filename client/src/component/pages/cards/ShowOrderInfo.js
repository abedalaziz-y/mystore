import React, { useEffect } from 'react';
import { getUser } from '../../../functions/admin';
import { useSelector, useDispatch } from 'react-redux';
    // import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'; 
const ShowOrderInfo=({order})=>{
    const { user } = useSelector((state) => ({ ...state }))

 
    return (
        <div class="table-responsive mt-5  table-bordered border-dark text-dark ">
            <b className='text-primary'>Payment Details</b>
            {console.log("order",order)}
        <table className='table '>
          
                <thead >
                    <tr>
                        <th>
                        Order Id
                        </th>
                       { user && user.role === "admin" && (<th>
                            Orderd By
                        </th>)}
                    <th>
                        Amount/JD
                    </th>
                    <th>
                        Payment Method 
                    </th>
                    <th>
                        Payment Status
                    </th>
                  
                    </tr>
                  
                </thead>
                 
                   
                  <tbody>
                    <tr>

                        <td> {order._id}</td>
                        {user && user.role === "admin" &&  ( <td> {order.orderdBy.name}</td>)}

                        <td>{(order.paymentIntent.amount / 100).toLocaleString()}</td>
                        <td>{order.paymentIntent.payment_method_types[0]}</td>
                        <td className={order.paymentIntent.status ==="succeeded"?"bg-success":"warning"}>   {order.paymentIntent.status.toUpperCase()}</td>

                    </tr>
                  </tbody>
            
       
         
            </table>
            </div>
    )
}
{/* <span className='border border-danger'>
                    Amount :{(order.paymentIntent.amount / 100).toLocaleString("en-US",{
                        style:"currency",
                        currency:"USD"
                    })} 
                </span> */}
export default ShowOrderInfo