

import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {GETSUBCATEGORYPRODUCTS}from '../../functions/SubCategory'
import ProductsCard from '../pages/ProductsCard';
import LoadingCard from '../pages/cards/LoadingCard';


const SubCategoryProduct = () => {
    const [subcategory, setSubcategory] = useState({})
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const { slug } = useParams()
        console.log(slug)
    const getprodcts = () => {
        setLoading(true)
        GETSUBCATEGORYPRODUCTS(slug).then((res) => {
            console.log(res)
            setSubcategory(res.data.subcategory)
            setProducts(res.data.products)
            setLoading(false)
        })
    }
    useEffect(() => {
        getprodcts()
    }, [])
    return (<>
        <div className="  container-fluid bestsellerspage ">
            {/* {productsCount} */}
            {loading ? (<LoadingCard count={4} />) :
                (<div className="conrtainer mb-5">

                    <div className='row'>
                        <h4 className='   p-3 mt-5 mb-5  text-center display-6 jumbotron' >{products.length} products
                           </h4>

                    </div>
                    <div className='row'>

                        {products.map((product) => (


                            <div className=' col-6 col-lg-3 col-md-4'>
                                <ProductsCard key={product._id} product={product} />


                            </div>

                        ))}</div>
                </div>)
            }


        </div>
    </>
    )
}
export default SubCategoryProduct