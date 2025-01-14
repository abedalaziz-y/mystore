import React from 'react'
import ReactDOM from 'react-dom'
import '../pages/Home.css'
import { GETBRODUCTSLIST, GETPRODUCTSBYCOUNT } from '../../functions/product';
import { useState } from 'react';
import { useEffect } from 'react';
import ProductsCard from '../pages/ProductsCard';
import LoadingCard from '../pages/cards/LoadingCard';
import { Pagination } from 'antd';
import './BasedOnRating.css'

const BasedOnRating = () => {
    // const { titl, images, description, price, slug } = products
    // const [productImg, setProductImg] = useState(images[0].url)

    const [productsCount, setProductsCount] = useState(0)
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    // const [productImg, setProductImg] = useState(images[0].url)

    useEffect(() => {

        loadAllProducts()
    }, [page])

    useEffect(() => {
        GETPRODUCTSBYCOUNT().then((res) => setProductsCount(res.data))

    }, [])
    ///sort order limit
    const loadAllProducts = () => {
        setLoading(true)
        GETBRODUCTSLIST('ratings.star', 'desc', page).then((res) => {
            setProducts(res.data)
            setLoading(false)
        })
    }

  ;

    return (
        <>

            <div className="  container-fluid bestsellerspage ">
                {/* {productsCount} */}
                {loading ? (<LoadingCard count={4} />) :
                    (<div className="row">


                        {products.map((product) => (


                            <div className=' col-6 col-lg-3 col-md-4'>
                                <ProductsCard key={product._id} product={product} />


                            </div>

                        ))}
                    </div>)
                }
                <div className='row  mt-5'>
                    <div class="col-auto col-sm-6 col-md-3 offset-2 offset-md-4 m-auto mb-5">
                        <nav class="float-start w-100">
                            <Pagination current={page} total={Math.round((productsCount / 12) * 10)} onChange={(value) => setPage(value)} />

                        </nav>

                    </div>
                </div>
                {/* {JSON.stringify(page)} */}

            </div>




        </>

    )



}
export default BasedOnRating