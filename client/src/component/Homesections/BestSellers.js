import React from 'react'
import ReactDOM from 'react-dom'
import '../pages/Home.css'
import { GETBRODUCTS } from '../../functions/product';
import { useState } from 'react';
import { useEffect } from 'react';
import ProductsCard from '../pages/ProductsCard';
import LoadingCard from '../pages/cards/LoadingCard';

import Slider from "react-slick";


const BestSellers = () => {
    // const { titl, images, description, price, slug } = products
    // const [productImg, setProductImg] = useState(images[0].url)

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    // const [productImg, setProductImg] = useState(images[0].url)

    useEffect(() => {

        loadAllProducts()
    }, [])
    ///sort order limit
    const loadAllProducts = () => {
        setLoading(true)
        GETBRODUCTS("sold","desc", 8).then((res) => {
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
        speed: 500,
        autoplaySpeed: 2000,
        cssEase: "linear",
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
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }
        ]

    };

    return (
        <>

            <div className="  container  ">
                <div className="row">
                    {loading ? (<LoadingCard count={4} />) :
                        (<div className='col'>
                            <Slider className='slider' {...settings}>
                                {products.map((product) => (


                                    <ProductsCard key={product._id} product={product} />

                                ))}</Slider>
                        </div>)
                    }</div>

            </div>


        </>

    )



}
export default BestSellers