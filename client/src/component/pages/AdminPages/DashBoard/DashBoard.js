import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux'
import { useEffect } from 'react';
import './DashBoard.css'
import {

    LoadingOutlined, 
    UserOutlined, BarcodeOutlined, ContainerOutlined, 
    ProjectFilled, SendOutlined, SketchOutlined, TagFilled, 
    BgColorsOutlined
} from '@ant-design/icons'
import SideCool from '../../../Bars/SideBar';
import { getUsersCount, getUsersOrdersCount } from '../../../../functions/user';
import { brandsCount, getColorsCount, GETPRODUCTSBYCOUNT } from '../../../../functions/product';
import { getSubCount } from '../../../../functions/SubCategory';
import { getCategoriesCount } from '../../../../functions/category';
import { getCouponsCount } from '../../../../functions/coupon';
import { Link } from 'react-router-dom';

const AdminDashboard = (e) => {
    
    const [users,setUsers]=useState(0)
    const [sub, setSub] = useState(0)
    const [coupons, setCoupons] = useState(0)
    const [orders, setOrders] = useState(0)
    const [category, setCategory] = useState(0)
    const [colors, setColors] = useState(0)
    const [brands, setBrands] = useState(0)
    const [products, setProducts] = useState(0)
    const { user } = useSelector((state) => ({ ...state }))


    useEffect(()=>{
        uploadCounts()
    },[])


    const uploadCounts=()=>{
        getUsersCount().then((res) => {
            // console.log(res.data)
            setUsers(res.data)

        })
        GETPRODUCTSBYCOUNT().then((res) => {
            // console.log(res.data)
            setProducts(res.data)

        })
        getCategoriesCount().then((res) => {
            // console.log(res.data)
            setCategory(res.data)

        })
        getSubCount().then((res) => {
            // console.log(res.data)
            setSub(res.data)

        })
        getUsersOrdersCount().then((res) => {
            // console.log(res.data)
            setOrders(res.data)

        })
        brandsCount().then((res) => {
            // console.log(res.data)
            setBrands(res.data)

        })
        getCouponsCount().then((res) => {
            // console.log(res.data)
            setCoupons(res.data)

        })
        getColorsCount().then((res) => {
            // console.log(res.data)
            setColors(res.data)

        })
    }
   
return(<>
<div className='container-fluid dash text-center'>
       <div className='row'>
         
                <h1>Admin Dashboard</h1>
          
                <div className='col-md-3 col-6 mt-3'>
                    <div className='card shadow borderd text-white h5 bg-warning'>
                        <div className='card-header'> <sup> < UserOutlined /></sup>  Users</div>
                        <div className='card-body'>
                            {users && (<><p>{users}</p></>)}
                        </div>
                    </div>
                </div>
                <div className='col-md-3 col-6 mt-3'>
                    <Link to='/admin/orders'><div className='card shadow borderd text-white h5 bg-success'>
                        <div className='card-header'><sup><SendOutlined /></sup>  Orders </div>
                        <div className='card-body'>
                            {orders && (<><p>{orders}</p></>)}
                        </div>
                    </div></Link>
                </div>
                <div className='col-md-3 col-6 mt-3 '>
                <Link to='/admin/products'><div className='card shadow borderd text-white h5 bg-info'>
                        <div className='card-header'><sup><BarcodeOutlined /></sup>  Products </div>
                        <div className='card-body'>
                            {products && (<><p>{products}</p></>)}
                        </div>
                    </div></Link>
                </div>
                <div className='col-md-3 col-6 mt-3'>
                <Link to='/admin/categories'><div className='card shadow borderd text-white h5 bg-primary'>
                        <div className='card-header'><sup><ProjectFilled /></sup>  Categories </div>
                        <div className='card-body'>
                            {category && (<><p>{category}</p></>)}
                        </div>
                    </div></Link>
                </div>
                <div className='col-md-3 col-6 mt-3 '>
                <Link to='/admin/subcategory'><div className='card shadow borderd text-white h5 bg-secondary'>
                    <div className='card-header'><sup><ContainerOutlined /></sup>  <small>SubCategories</small> </div>
                        <div className='card-body'>
                            {sub && (<><p>{sub}</p></>)}
                        </div>
                    </div></Link>
                </div>
                <div className='col-md-3 col-6 mt-3 '>
                <Link to='/admin/brands'><div className='card shadow borderd text-white h5 bg-dark'>
                        <div className='card-header'><sup><SketchOutlined /></sup>  Brands </div>
                        <div className='card-body'>
                            {brands && (<><p>{brands}</p></>)}
                        </div>
                    </div></Link>
                </div>
                <div className='col-md-3 col-6 mt-3 '>
                <Link to='/admin/coupon'><div className='card shadow borderd text-white h5 bg-danger'>
                        <div className='card-header'><sup><TagFilled /></sup> Coupons </div>
                        <div className='card-body'>
                            {coupons && (<><p>{coupons}</p></>)}
                        </div>
                    </div></Link>
                </div>
                <div className='col-md-3 col-6 mt-3  '>
                <Link to='/admin/colors'><div className='card shadow borderd text-white h5 colors'>
                        <div className='card-header'><sup><BgColorsOutlined /></sup> Colors </div>
                        <div className='card-body'>
                            {colors && (<><p>{colors}</p></>)}
                        </div>
                    </div></Link>
               
            </div>
       </div>
</div>

</>)

    
}



export default AdminDashboard