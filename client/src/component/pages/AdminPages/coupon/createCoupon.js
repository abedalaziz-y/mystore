import React, { useEffect, useState } from 'react';
import {useSelctor,useDispatch, useSelector} from 'react-redux'
import {toast} from 'react-toastify'
import DatePicker from 'react-datepicker'
import { DeleteFilled, EditFilled, SyncOutlined } from '@ant-design/icons'
import { CREATECOUPONS, getCoupons,removeCoupons } from '../../../../functions/coupon';
import "react-datepicker/dist/react-datepicker.css";
import { Link } from 'react-router-dom';

const CreateCoupons=()=>{

    const [startDate, setStartDate] = useState(new Date());
    const {user}=useSelector((state)=>({...state}))
    const [name,setName]=useState('')
    const [expiry, setExpiry] = useState('')
    const [discount, setDiscount] = useState('')
    const [loading, setLoading] = useState()
    const [coupons,setCoupons]=useState([])
    useEffect(()=>{
        loadallcoupons()
    },[])

    const handleSubmit=(e)=>{
        setLoading(true)
            e.preventDefault()
            // console.log(name,expiry,discount)
            // this way we can send the data insted of set a state for all values of all states
        CREATECOUPONS({name,expiry,discount},user.token).then((res)=>{
            setLoading(false)
            getCoupons()
            setName('')
            setExpiry('')
            setDiscount('')
            loadallcoupons()
            toast.success(`${res.data.name} created successfully`)   
        })
        .catch((err)=>{
            console.log(err )
            // toast.error(err)
        })
    }
    const handleDeleteCoupon = (couponId)=>{
        if(window.confirm("Delete?")){
            setLoading(true)
            removeCoupons(couponId,user.token).then((res)=>{
                setLoading(false)
                toast.success(`${res.data.name} Deleted Successfully`)
               loadallcoupons()
            }).catch((err) => toast.error(err))
           
        }
      
    }
    const loadallcoupons = () => getCoupons().then((res) => {
        setCoupons(res.data)
    }).catch((err) => toast.error(err))
   const handleChangeDiscount=(e)=>{
        let discount = e.target.value < 1 ? 1 : e.target.value

        setDiscount(e.target.value)
    }
    const handleKey=(e)=>{
        // e.preventDefault()
        if (discount > 100) {
            toast.error(`Max  available value 100`)
            return
        }
    }
    return(<>
    <div className='container-fluid'>
        <div className='row mb-5'>
            <div className='col'>
                <div className='container'>
                <h4>Coupon</h4>
                <form onSubmit={handleSubmit} className='form '>
                        <div className='form-group'>
                            <label for='name' className='text-muted' >Name</label>
                            <input type='text' className='form-control' id='name'
                                onChange={(e) => setName(e.target.value)} value={name} autoFocus
                                required />
                        </div><div className='form-group'>
                            <label for='discount' className='text-muted' >Discount %</label>
                                <input type='number' onKeyDown={handleKey} step="1" dir='auto' style={{ maxWidth: '100px', minWidth: '100px' }} max={100} className='form-control' 
                                onChange={handleChangeDiscount} value={discount} min='0'
                                required />
                        </div><div className='form-group'>
                            <label for='expiry' className='text-muted' >expiry</label>
                            <DatePicker 
                             className='form-control'
                             value={expiry}
                                    selected={expiry} onChange={(date) => setExpiry(date)}
                              showTimeSelect
                             dateFormat="Pp"
                           
                             required
                             />
                             <button className='btn btn-outline-primary m-2'>Save</button>
                        </div>
                </form>
                    </div>
            </div>
        </div>
        <div className='row'>
                <div class="table-responsive mt-5   text-dark mb-4 ">



                    <table className="table table-bordered  mb-2 ">
                        <thead className="thead-dark">
                            <tr>
                              
                                <th className="col-2 text-center" scope="col"> name
                                   
                                </th>
                                <th className=" text-center" scope="col" >
                                    created_at  </th>
                                <th className=" text-center" scope="col" >
                                    discount % </th>
                                <th className=" text-center" scope="col" >
                                    expiry </th>
                                <th className=" text-center" scope="col" colSpan="2">
                                    Action </th>

                            </tr>
                        </thead>
                        <tbody>
                            {loading ? <SyncOutlined spin twoToneColor="#108fff" />:coupons.map((coupon) => (
                            <tr key={coupon._id}>
                               

                                <td className="text-center">{coupon.name}</td>
                                <td className="text-center"> {coupon.created_at.substring(0, 10)} ---{coupon.created_at.substring(11, 20)} </td>
                                <td className="text-center">{coupon.discount}</td>
                                <td className="text-center">{new Date(coupon.expiry).toLocaleDateString()}</td>
                                <td><DeleteFilled className="btn btn-danger" onClick={() => handleDeleteCoupon(coupon._id)} /></td>
                            </tr>))}


                        </tbody>
                    </table>
                </div>
        </div>
    </div>
    
    </>
    )
}
export default CreateCoupons