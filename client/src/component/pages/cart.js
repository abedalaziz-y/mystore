import React from 'react';
import { toast } from 'react-toastify';

import { useSelector,useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductOutToCheckOut from '../pages/cards/ProductOutToCheckOut'
import { userCart } from '../../functions/user';
import { Navigate } from 'react-router-dom';
import { Tabs } from 'antd';
import { Toast } from 'bootstrap';
const initialState = {
   
    colors: [],
}
const Cart =()=>{
      
     const {cart,user}=useSelector((state)=>({...state}))
     const dispatch=useDispatch()
    const [modalVisible, setModalVisible] = useState(false)
    let navigate = useNavigate()
    const {colors}=cart
    const[pushedcolors,setColor]=useState([])
     const getTotal=()=>{

        return cart.reduce((currentVlaue,nextValue)=>{
            const firsttotal = currentVlaue + nextValue.count * nextValue.price
            const totalString = String(firsttotal).slice(0,5)
          const  total=Number(totalString)
            return total
        },0)
     }

    const saveOrderToDb=()=>{
        {cart.map((c)=>{
            if (  c.count<c.colors.length){
                return toast.error(`Please Select ${c.colors.length} count at least`)
            }else{
                if (c.colors.length < 1){
                    return toast.error(`Please Select 1 Color at least`)
                }
                    userCart(cart, user.token).then((res) => {
                        console.log("cart response", res)
                        if (res.data.ok) {
                            navigate('/checkout')
                        }
                    }).catch((err) => {
                        console.log(err)
                    })
        // alert("save")
        // console.log("cart",cart)
                
               
            }
        })}
        
    }
    const saveCashOrderToDb = () => {
        {
            cart.map((c) => {
                dispatch({
                    type:"COD",
                    payload:true
                })
                if (c.count < c.colors.length) {
                    return toast.error(`Please Select ${c.colors.length} count at least`)
                } else {
                    if (c.colors.length < 1) {
                        return toast.error(`Please Select 1 Color at least`)
                    }
                    userCart(cart, user.token).then((res) => {
                        console.log("cart response", res)
                        if (res.data.ok) {
                            navigate('/checkout')
                        }
                    }).catch((err) => {
                        console.log(err)
                    })
                    // alert("save")
                    // console.log("cart",cart)


                }
            })
        }

    }
    const showCartItems=()=>{

        return(<>
            <div class="table-responsive">
            <table className='table table-bordered'>
            <thead className='thaed-light bg-warning text-center'>
                <tr>
                        <th scope='col'>Image</th>
                        <th scope='col'>Title</th>
                        <th scope='col'>Price</th>
                        <th scope='col'>Brand</th>
                        <th scope='col'>Colors</th>
                        <th scope='col'>Count</th>
                        <th scope='col'>Shipping</th>
                        <th scope='col'>Remove</th>

                </tr>
            </thead>
            {cart.map((p)=>{
             
              
                return(<>
                  
                    <ProductOutToCheckOut  colors={p.colors} key={p._id} p={p} />
            </>  )})}
        </table></div>
        </>)
    }
    const handleRedirect=()=>{
        if (user && user.token) {
            setModalVisible(true)
        } else {
            navigate("/login", { state: { from: `/cart` } });


        }
    }

    return (<div className='container-fluid'>
      
        <div className='row pt-2'>
            <div className='col-md-9'>
                <h4 className='text-center'>Cart / {cart.length} {cart.length > 1 ? "prodcts" : "product"} </h4>        

                {!cart.length ? <p>No product in Cart. <Link to="/shop">Continue Shopping</Link> </p>
                :
                showCartItems()
                
                }
            </div>
            <div className='col-md-3 '>
                <h4 className='text-center'>Order summary</h4>
                <hr/>
                <p>products</p>
                {cart.map((c,i)=>(
                    <div key={i}>
                        <p>{c.title}* {c.count}=${c.count * c.price} </p>
                        </div>
                ))}
                <hr/>
                total:<b>${getTotal()}</b>
                <br/>

            
                { 
                    user ?
                        
                               
                                    (<>
                            <button
                                disabled={!cart.length}
                                onClick={saveOrderToDb}
                                className={cart.length > 0 ?
                                    'btn btn-sm btn-primary mb-5 mt-2 pulse animated infinite'
                                    : 'btn btn-sm btn-primary mb-5 mt-2   '}>
                                Proceed to Checkout</button>
                                <br/>
                            <button
                                disabled={!cart.length}
                                onClick={saveCashOrderToDb}
                                className={cart.length > 0 ?
                                    'btn btn-sm btn-warning mb-5 mt-2 pulse animated infinite'
                                    : 'btn btn-sm btn-warning mb-5 mt-2   '}>
                               Pay Cash On Delivery</button>
                                    </> )
                           
                            

      
                    
                        
                        : (<button
                        onClick={handleRedirect}
                            visible={modalVisible}
                             className='btn btn-sm btn-outline-success mt-2 mb-5'
                             >Login to Checkout </button>)
                }
            </div>
        </div>
    </div>)
}
export default Cart