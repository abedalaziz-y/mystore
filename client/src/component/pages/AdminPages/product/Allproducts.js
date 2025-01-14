import React from 'react'
import ReactDOM from 'react-dom'
import { useState } from 'react';
import { useEffect } from 'react';
import { GETPRODUCTBYCOUNT } from '../../../../functions/product';
import { DELETEEPRODUCT } from '../../../../functions/product';
import '../product/product.css'

import {

    LoadingOutlined
} from '@ant-design/icons'
import { toast } from "react-toastify"

import AdminCard from '../cards/AdminProductCards';
import { useSelector } from "react-redux"

const AllProducts = (e) => {
    const [products, setProduct] = useState([])
    const [loading, setLoading] = useState(false)

    const { user } = useSelector((state) => ({ ...state }))

    useEffect(() => {
        getallproducts()

    }, [])
    const handleRemoveProduct = (slug) => {
        let awnser = window.confirm('Delete?')
        if (awnser) {
            // console.log('deleted product',slug)
            DELETEEPRODUCT(slug, user.token)
                .then((res) => {
                    getallproducts()
                    toast.success(`${res.data.title} Deleted successfully`)
                    // console.log(res)
                }).catch((err) => {
                    if (err.response.data.status === 400) {
                        toast.error(err.response.data)
                        // console.log(err)
                    }
                })
        }

    }
    const getallproducts = () => {
        setLoading(true)
        GETPRODUCTBYCOUNT(50)
            .then((res) => {
                setProduct(res.data)
                setLoading(false)

            })
            .catch((err) => {
                console.log(err)
                setLoading(false)
            })
    }
    return (<div className=" productupdate container-fluid text-dark">
        <div className="row mb-5">
            <h1 className='text-center'>{loading ? <LoadingOutlined type="circle" style={{ color: 'red' }} width={80} /> : (<h3 className='text-warning'>All Products</h3>)}</h1>


            {products.map((product) => (
                <div className='col-6 col-md-3 text-dark'>

                    <AdminCard handleRemoveProduct={handleRemoveProduct} key={product._id} product={product} />
                </div>
            ))}



        </div>
    </div>

    )
}



export default AllProducts