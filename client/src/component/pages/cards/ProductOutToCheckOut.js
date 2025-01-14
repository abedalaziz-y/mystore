import React, { useEffect } from 'react';
import { Select  } from 'antd';
import {useState} from 'react'
import { useDispatch } from 'react-redux';
import ModaImage from 'react-modal-image'
import  logo from '../../../images/logo.png'
import {toast} from 'react-toastify'
import { CheckCircleOutlined, CloseCircleOutlined, DeleteOutlined } from '@ant-design/icons'
import { GETPRODUCT } from '../../../functions/product';


const ProductOutToCheckOut = ({ p})=>{
    const dispatch = useDispatch()
    const [values, setValues] = useState([])
    const[countnum,setCountnum]=useState(1)
 const [selectedColor,setSelectedColor]=useState([])
  
    useEffect((value) => {
        if (p.count !== 0 && selectedColor.length > 0) {
            setCountnum(selectedColor.length)
        }
       
        hadleChangeColors() 
    }, [selectedColor])



    const handleColorSet = (value) => {
        setSelectedColor(value)
        
    }
    const hadleChangeColors=()=>{
        
        let Colors=selectedColor
        let cart = []
        if (typeof window !== 'undefined') {
            if (localStorage.getItem('cart')) {
                cart = JSON.parse(localStorage.getItem('cart'))
            }
            cart.map((product, i) => {
                if (product._id === p._id) {
                    cart[i].colors = Colors
                }
            })
            // console.log("cart update colors")
            localStorage.setItem('cart', JSON.stringify(cart))
            dispatch({
                type: "ADD_TO_CART",
                payload: cart
            })
        }
    }

 
    const handlQuantityChange=(e)=>{

        
        let count = e.target.value < 1? 1 : e.target.value
            if(count>p.quantity){
                toast.error(`Max  available quantity :${p.quantity}`)
                return
            }
        let cart = []
        if (typeof window !== 'undefined') {
            if (localStorage.getItem('cart')) {
                cart = JSON.parse(localStorage.getItem('cart'))
            }
            cart.map((product, i) => {
                if (product._id === p._id) {
                //    cart[i].colors = selectedColor
                    cart[i].count = count
                }
            })
            // console.log("cart update colors")
            localStorage.setItem('cart', JSON.stringify(cart))
            dispatch({
                type: "ADD_TO_CART",
                payload: cart
            })
        }
    }

 

    const handleKey=(e)=>{
        // e.preventDefault()
    }
    const handleRemove=()=>{
        let cart = []
        if (typeof window !== 'undefined') {
            if (localStorage.getItem('cart')) {
                cart = JSON.parse(localStorage.getItem('cart'))
            }
            cart.map((product, i) => {
                if (product._id === p._id) {
                    // cart[i].colors = selectedColor
                    cart.splice(i,1)
                }
            })
            // console.log("cart update colors")
            localStorage.setItem('cart', JSON.stringify(cart))
            dispatch({
                type: "ADD_TO_CART",
                payload: cart
            })
        }

    }
    const getColors=(e)=>{
        e.preventDefault()
        GETPRODUCT(p.slug).then((res)=>{
            setValues(res.data.colors)
            console.log("pro",res.data.colors)
        })
    }
   
    return(<>
                <tbody className='tbody text-center'>
                    <tr>
                        <td>
                    <div className='text-center mx-auto d-block  ' style={{ width: '80px', height: 'auto' }}  >
                        {p.images.length ? (<ModaImage className='border border-warning rounded ' small={p.images[0].url} large={p.images[0].url} />) 
                            : (<ModaImage small={logo}  />)}
                            </div>
                        </td>
                <td>{p.title}  </td>
                        <td>{p.price}</td>
                <td>{p.brand}</td>

                <Select
              
                    mode="multiple"
                       onClick={getColors}
                    placeholder="select"
                    value={selectedColor}
                    onChange={(value) => { handleColorSet(value);hadleChangeColors()}}
                   
                 
                    style={{
                        width: '100%',
                    }}
                >
              
                    {values.map((color)=>{
                       
                        return(
                            <option name={color} value={color} key={color}>{color}</option>
                    )})}
                </Select>
                <td >
                    <input onKeyDown={handleKey}  step="1" dir='auto' max={p.quantity} type='number' style={{ maxWidth: '60px', minWidth: '60px' }}
                        className={countnum > p.count ? ' form-control border-danger' :'  form-control '}
                                 value={p.count} 
                                 onChange={handlQuantityChange} />
                            </td>
                            {/* {countnum} */}
                {/* <td>{selectedColor.length>1?selectedColor.length:1}</td> */}
                <td>{p.shipping == "Yes" ? <CheckCircleOutlined className='text-success' style={{ fontSize: '20px' }} /> : <CloseCircleOutlined className='text-danger' style={{fontSize:'20px'}}/>}</td>
                <td><DeleteOutlined onClick={handleRemove} className='text-danger' style={{fontSize:'20px',cursor:'pointer'}}/></td>
                    </tr>
                </tbody>
      
         </>)
}

export default ProductOutToCheckOut