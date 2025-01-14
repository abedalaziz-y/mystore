import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import {toast} from 'react-toastify'
import { getWishlist,removeWishlist } from '../../../functions/user'
import { useSelector,useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import {

    DeleteOutlined,

} from '@ant-design/icons';
const Wishlist = () =>{
    const[wishlist,setWishlist]=useState([])
    const {user}=useSelector((state)=>({...state}))
    const wishlistUser = useSelector((state) => (state.wishlist))
    useEffect(()=>{
      loadWishlist()
    },[])
    const loadWishlist=()=>{
        getWishlist(user.token).then((res)=>{
            // console.log(res.data)
            
            {res.data.map((data)=>{
                setWishlist(data.wishlist)
              
            })}
         
        })
    }
    const dispatch=useDispatch()
    const handleRemove = (product)=>{
        removeWishlist(product._id,user.token).then((res)=>{
            loadWishlist()
            let wishlist = []
            if (typeof window !== 'undefined') {
                if (localStorage.getItem('wishlist')) {
                    wishlist = JSON.parse(localStorage.getItem('wishlist'))
                }
                wishlist.map((p, i) => {
                    if (product._id === p._id) {
                        // cart[i].colors = selectedColor
                        wishlist.splice(i, 1)
                    }
                })
                // console.log("cart update colors")
                localStorage.setItem('wishlist', JSON.stringify(wishlist))
                dispatch({
                    type: "WISHLIST",
                    payload: wishlist
                })
            }
        })
    }
return(
    <div className="container-fluid " style={{minHeight:'700px'}}>
        <div className="row">
            <div className="col-auto ">
            
            </div>


            <div className="col  ">
            <h4> Wishlist</h4>

                {/* <h4> {JSON.stringify(wishlist)}</h4> */}
          {wishlist.map((p)=>(
                   <div key={p._id} className='alert alert-success'>
                  <h3>       <Link to={`/product/${p.slug}`}>{p.title}</Link>   <DeleteOutlined onClick={() => handleRemove(p)} className='btn   float-right text-danger' /></h3>
                      
                    

                  
                   </div>

               ))}
                {wishlist.length<1 && (<b>No Products in Wishlist <Link to='/shop'>Continue Shopping </Link></b>)}
            </div>
        </div>
    </div>

)
}


export default Wishlist