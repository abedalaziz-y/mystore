import React from 'react'
import ReactDOM from 'react-dom'

import { Link } from 'react-router-dom';
import {  useSelector } from 'react-redux'
import { DashboardOutlined, SettingOutlined, CloseCircleOutlined } from '@ant-design/icons';


import { LeftCircleTwoTone , RightCircleTwoTone } from '@ant-design/icons';
import  { useState } from "react";
import './nav.css'
const Side=({handleToggle,isActive})=>{
   
    let { user } = useSelector((state) => ({ ...state }))

return (
<>
        
</>
   

 
)
}

// {
//     user && user.role === "admin" && (<div className="wrapper   position-fixed ">

//         <div className={isActive ? "active " : null} id="sidebar" style={{ height: window.innerHeight }}>
//             <div className="sidebar-header">

//                 {user && user.role === "admin" && (
//                     <h4 className=''><sup><SettingOutlined /> </sup >Control Panel <CloseCircleOutlined onClick={handleToggle} /></h4>)}

//             </div>

//             <ul className="list-unstyled  mb-5 " >

//                 {user && user.role === "admin" && (
//                     <li className='text-center   fs-2  '>  <Link className="nav-link " to="/admin/dashboard">Dashboard</Link>
//                     </li>)}
//                 {user && user.role === "admin" && (
//                     <li className='text-center fs-2 '>  <Link className="nav-link " to="/admin/categories">categories</Link>
//                     </li>)}
//                 {user && user.role === "admin" && (
//                     <li className='text-center fs-2 '>  <Link className="nav-link " to="/admin/subcategory">subCategories</Link>
//                     </li>)}
//                 {user && user.role === "admin" && (
//                     <li className=' fs-2 '>  <Link className="nav-link " to="/admin/products">products(RUD)</Link>
//                     </li>)}
//                 {user && user.role === "admin" && (
//                     <li className=' fs-2 '>  <Link className="nav-link " to="/admin/product">Product(create)</Link>
//                     </li>)}
//                 {user && user.role === "admin" && (
//                     <li className='text-center fs-2 '>  <Link className="nav-link " to="/admin/coupon">copon</Link>
//                     </li>)}
//                 {user && user.role === "admin" && (
//                     <li className='text-center fs-2 '>  <Link className="nav-link " to="/admin/colors">colors</Link>
//                     </li>)}
//                 {user && user.role === "admin" && (
//                     <li className='text-center fs-2 '>  <Link className="nav-link " to="/admin/brands">brands</Link>
//                     </li>)}

//                 {/* {user && user.role === "admin" && (
//                         <li className='text-center fs-2 '>  <Link className="nav-link " to="/user/password">Password</Link>
//                         </li>)} */}
//                 {/* <a className="#homeSubmenu" data-toggle="collapse" aria-expanded="false">Pages</a>
//                 <ul className="collapse list-styled  " id="homeSubmenu">
                  
//                     </ul> */}

//             </ul>

//         </div>

//     </div>)
// }
export default Side