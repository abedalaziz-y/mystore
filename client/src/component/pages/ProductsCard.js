import React from 'react';
import '../pages/Home.css'
import { useState } from 'react';
import { useEffect } from 'react';
import logo from '../../images/logo.png'
import { Card, Avatar, Badge,Tooltip} from 'antd';
import {showAvverage} from '../../functions/ratings'
import _ from "lodash"
import {ShoppingCartOutlined, DeleteOutlined} from '@ant-design/icons'
import { useSelector, useDispatch } from 'react-redux'
import StarRating from 'react-star-ratings';

import { Link } from 'react-router-dom'

const ProductsCard = ({ product }) => {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
    const { width, height } = windowDimensions
    const [tooltip,setTooltip]=useState('click to Add')
    const { title, images, description, price, slug } = product
    const { Meta } = Card;

    const [productImg, setProductImg] = useState(images[0].url)
    const dispatch = useDispatch()
    const {user,cart}=useSelector((state)=>({...state}))
    const getCartProducts = cart.find(cart => cart._id === product._id);
    function getWindowDimensions() {
        const { innerWidth: width, innerHeight: height } = window;
        return {
            width,
            height
        };
    }

    const handleAddToCart = (e) => {
        setWindowDimensions(getWindowDimensions())
        e.preventDefault()
        // create cart array
        let cart = [];
        if (typeof window !== "undefined") {
            // if cart is in local storage GET it
            if (localStorage.getItem("cart")) {
                cart = JSON.parse(localStorage.getItem("cart"));
            }
            // push new product to cart
            cart.push({
                ...product,
                count: 1, 
            });
            // remove duplicates
            let unique = _.uniqWith(cart, _.isEqual);
            // save to local storage
            // console.log('unique', unique)
            localStorage.setItem("cart", JSON.stringify(unique));
            // show tooltip
            setTooltip("Added");

            // add to reeux state
            dispatch({
                type: "ADD_TO_CART",
                payload: unique,
            });
            /// show  cart items in  sideDrawe
            dispatch({
                type: "SET_VISIBLE",
                payload: true,
            });
        }
    };

    return (

       <><div >            {product && product.ratings && product.ratings.length > 0 ? showAvverage(product) : (
                <div className='text-center pt-2 pb-2 w-100' key={1}>
                    <span>
                        <StarRating 
                            starDimension="20px"
                            starSpacing="2px"
                            starRatedColor="gold" 
                          
                        />
                        ({product.ratings.length})
                    </span>
                </div>
            )}
            <Link  key={slug} to={`/product/${slug}`}>
               
                <Badge.Ribbon text={product.quantity < 1 ? "غير متوفر" : "متوفر"} color={product.quantity < 1 ? "red":"green"}>

                <Card className='mt-4 ml-1 productcard border shadow  '
                    key={title}
                    bordered
                    hoverable

                    cover={(<Avatar className=' cardsimg w-100' key={2} src={images && images.length ? images[0].url : logo} shape="square" size={{
                        xs: 170,
                        sm: 200,
                        md: 260,
                        lg: 230,
                        xl: 275,
                        xxl: 380,
                    }} icon={<DeleteOutlined />} />)}

                // cover={(<img className='cardsimg   ' alt="example" src={productImg && productImg.length ? productImg : logo} />)}
                // actions={[<Link to={`/`}><ShoppingCartOutlined style={{ color: 'red' }} /></Link>]}

                >
{              width<500&&(    <h6 className='cardtitle text-center ' key={2}>{`${title && title.substring(0, 27)}`}</h6>
)}    
                        {width > 500 && (<h5 className='cardtitle text-cnter  ' key={2}>{`${title && title.substring(0, 27)}`}</h5>
                        )}                <p className='text-start text-muted description ' key={description}> {`${description && description.substring(0, 23)}..`}</p>
                    <p className='price text-start ' key={price}>{price} jd</p>
                        {getCartProducts ? ( 
                            <button disabled={product.quantity < 1}
                                className='btn btn-outline-info w-100'>{width < 500 &&(<Link to='/cart'>
                                    In Cart
                               </Link>)}
                                {width > 500 && (<Link to='/cart'>
                                   Exist In Cart
                                </Link>)}

                             </button>)
                                
                                :
                                
                                (<Link to={``}> <Tooltip title={product.quantity < 1 ? "Out Of Stok" : tooltip} color={product.quantity < 1 ? "red" : tooltip === "click to Add" ? "orange" : "green"}>
                                    <div disabled={product.quantity < 1}
                                        onClick={product.quantity < 1 ? "" : handleAddToCart} className={product.quantity < 1 ? 'btn btn-danger  addtocartbtn w-100 ' : 'btn addtocartbtn w-100 '}>

                                        {product.quantity < 1 ? "Out Of Stock" : "Add to cart"}</div></Tooltip></Link>)}
                </Card>
                </Badge.Ribbon>

            </Link></div>

        </>
    )
}
export default ProductsCard