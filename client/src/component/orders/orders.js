import React, { useState } from 'react';
import { CheckCircleOutlined,CloseCircleOutlined} from '@ant-design/icons'
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import logo from '../../images/logo.png'
import ShowPaymentInfo from '../pages/cards/ShowOrderInfo'
import ModaImage from 'react-modal-image'
import { CopyToClipboard } from 'react-copy-to-clipboard';
const Orders = ({ orders, handleStatusChange})=>{
    const {user}=useSelector((state)=>({...state}))
    const [copied, setCopied] = useState(false)

    const showOrderInTable = (order) => {
        const {address}=order
  
      
      
        return (
            <>
                <div class="table-responsive mt-5 w-100  table-bordered border-dark text-dark ">
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
                            {order.products.map((p, i) => (
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
                                            <b>{p.product.price}</b>
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
                                    <tr>

               

                                    </tr>
                                </>

                            ))}
                            <tr className='table-primary'>
                                <th colSpan={3} scope="col">Notes</th>
                                <th scope="col" colSpan={2}>Phone Number</th>
                                <th scope="col" colSpan={2}>Date Of Order</th>
                            </tr>
                            <td colSpan={3}>
                                <b className='pl-1' >  {order.notes ? order.notes : "No Notes"}</b>
                            </td>
                            <td colSpan={2} >
                                <b className='text-success'>{order.phone}</b>
                                {user && user.role === "admin" && (<CopyToClipboard text={order.phone}
                                    onCopy={() => setCopied(true)}>
                                    <button className='btn btn-danger w-100 text-dark'
                                        onClick={() => toast.success(`${order.phone} Copied successfully!`)}>
                                        Copy to clipboard </button>
                                </CopyToClipboard>)}
                            </td>
                            <td colSpan={2}>
                                <b > {order.created_at.slice(0, 10)}</b><br />
                                <b> Time{'-->'} {order.created_at.slice(11, 19)}</b>
                            </td>
                            <tr>
                                {address.map((item, i) => (
                                    <td colSpan='10' key={i}>
                                        <iframe src={`https://www.google.com/maps?q=${item.latitude},${item.longitude}&hl=es;z=14&output=embed`} className='w-100'></iframe>
                                    </td>

                                ))}
                            </tr>
                          
                            <tr
                                className={order.orderStatus === "Not Processed" ? "bg-danger font-weight-bold"
                                    : order.orderStatus === " Processed" ? "bg-info font-weight-bold"
                                        : order.orderStatus === " Processing" ? "bg-warning font-weight-bold"
                                            : order.orderStatus === " Cancelled" ? "bg-active font-weight-bold"
                                                : order.orderStatus === " Completed" ? "bg-success font-weight-bold"
                                                    : "bg-primary font-weight-bold"}>
                                {user && user.role === "admin" &&(<td colSpan={10}><select
                                 className={'form-select' }  
                                 onChange={(e)=>handleStatusChange(order._id,e.target.value)}
                                    defaultValue={order.orderStatus} name="status">
                                    <option value={"Cash On Delivery"}>Cash On Delivery</option>
                                    <option value={"Not Processed"}>Not Processed</option>
                                    <option value={"Processing"}>Processing</option>
                                    <option value={"Dispatched"}>Dispatched</option>
                                   
                                    <option value={"Completed"}>Completed</option>
                                </select></td>)} 
                            </tr>
                        </tbody>
                    </table>
                </div>
            </>
        )
    }
    const showEacthOrders = () => orders.map((order, i) => (
        <> 
        <div key={i} className=' p-1 card w-100'>
         
            {<ShowPaymentInfo order={order} />}
            {showOrderInTable(order)}
            <div className='row'>
                <div className='col'>

                </div>
            </div>
            </div></> 
    ))
    return (<div> <div className=' text-center'>
        <h5> <u>{orders.length} </u> orders</h5>
            <div className='col '>
                <h4 className=''>{orders.length ? " All Users Orders " : "No Purchase orders yet"}</h4>
                {showEacthOrders()}
            </div>
      

    </div>
    </div>
)
}
export default Orders