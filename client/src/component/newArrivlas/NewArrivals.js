import React from 'react'
import ReactDOM from 'react-dom'
import '../pages/Home.css'
import { GETBRODUCTS,GETBRODUCTSLIST,GETPRODUCTSBYCOUNT } from '../../functions/product';
import { useState } from 'react';
import { useEffect } from 'react';
import ProductsCard from '../pages/ProductsCard';
import LoadingCard from '../pages/cards/LoadingCard';
import { Pagination } from 'antd';
import './NewArrivals.css'

const NewArrivlas = () => {
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

    useEffect(()=>{
        GETPRODUCTSBYCOUNT().then((res) => setProductsCount(res.data))

    },[])
    ///sort order limit
    const loadAllProducts = () => {
        setLoading(true)
        GETBRODUCTSLIST('createdAt', 'desc', page).then((res) => {
            setProducts(res.data)
            setLoading(false)
        })
    }

    const settings = {


        // fade: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        speed: 1000,
        autoplaySpeed: 3000,
        cssEase: "linear",
        swipeToSlide: true,
        responsive: [
            {
                breakpoint: 1400,
                settings: {

                    autoplay: true,
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    infinite: true,

                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    // dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]

    };

    return (
        <>
     
            <div className="  container-fluid newarrivlaspage ">
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
export default NewArrivlas