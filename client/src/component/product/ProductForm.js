import React, {  useState } from 'react';
import { Card, Tooltip } from 'antd';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { HeartOutlined, ShoppingCartOutlined, HeartFilled, ShoppingFilled } from '@ant-design/icons';
import './product.css'
import _ from "lodash"
import ShareLinks from '../share/share';

import { useSelector, useDispatch } from 'react-redux'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import ProductItems from './productItems';
import StarRating from 'react-star-ratings';
import RatingModal from '../modal/RatingModal';
import { showAvverage } from '../../functions/ratings'
import { addToWishlist } from '../../functions/user';
import { toast } from 'react-toastify';

// this is children component of product
const ProductForm = ({ product, onStarClick, star }) => {
    const [ setModalVisible] = useState(false)
    const[tooltip,setTooltip]=useState("click to Add")
    const { images, title, _id } = product
    const dispatch = useDispatch()
    const { user, cart,wishlist } = useSelector((state) => ({ ...state }))
    const { slug } = useParams()
    const handleAddToCart = () => {
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
    const navigate=useNavigate()
    const handleAddToWishList=(e)=>{
        e.preventDefault()
        if (user && user.token) {
            
            addToWishlist(product._id, user.token).then((res) => {
                // console.log("add to wishlist ",res.data)
                let wishlist = [];
                if (typeof window !== "undefined") {
                    // if wishlist is in local storage GET it
                    if (localStorage.getItem("wishlist")) {
                        wishlist = JSON.parse(localStorage.getItem("wishlist"));
                    }
                    // push new product to cart
                    wishlist.push({
                        ...product,
                        count: 1,
                    });
                    // remove duplicates
                    let unique = _.uniqWith(wishlist, _.isEqual);
                    // save to local storage
                    // console.log('unique', unique)
                    localStorage.setItem("wishlist", JSON.stringify(unique));
                    // show tooltip


                    // add to reeux state
                    dispatch({
                        type: "WISHLIST",
                        payload: unique,
                    });
                    /// show  cart items in  sideDrawe

                }
                toast.success("Added To Wishlist success")
                navigate('/user/wishlist')
            })
        } else {
            navigate("/login", { state: { from: `/product/${slug}` } });


        }
      
    }


    const getWishlistProducts = wishlist.find(wishlist => wishlist._id === product._id);
    const getCartProducts = cart.find(cart => cart._id === product._id);

    // if(getFruit){
    //     console.log("product found in wish list",getFruit)
    // }else{
    //     console.log("product not found in wish list", getFruit)

    // }
    return (<>
        <div className='col-md-7 col-12 col-sm-12'>
            <Carousel alt='images of product' showArrows={true} autoPlay infiniteLoop stopOnHover emulateTouch  >

                {images && images.map((image) => (

                    <img alt='img of slider' className='sliderimage' src={image.url} key={image.public_id} />

                ))}
            </Carousel >
            {/* <Tabs type='card'>
                    <TabPane tab="Description" key='1'> </TabPane>
                </Tabs> */}
        </div>
        <div className='col-md-5 col-12 col-sm-12'>
            <h1 className='text-center text-white bg-secondary p-3'>{title}</h1>
            {/* {JSON.stringify(wishlist    )} */}
            {product &&product.ratings && product.ratings.length>0?showAvverage(product):(
               <div className='text-center pt-2 pb-2'>
                    <span>
                        <StarRating
                            starDimension="20px"
                            starSpacing="2px"
                            starRatedColor="gold"
                          
                        />
                        
                    </span>
                    ({product && product.ratings &&(product.ratings.length)})
                </div>
            )}
            <Card 

                actions={[<>{getCartProducts ? (< button className='btn btn-outline'><Link to='/cart'>
                    
                    <ShoppingFilled style={{color:"red"}} /><br />Exist In Cart
                </Link></button>) : (< button className='btn btn-outline' disabled={product.quantity < 1} onClick={product.quantity < 1 ? "" : handleAddToCart}>
                    <Tooltip title={product.quantity < 1 ? "Out Of Stok" : tooltip} color={product.quantity < 1 ? "red" : tooltip === "click to Add" ? "orange" : "green"}>
                         <ShoppingCartOutlined className={product.quantity < 1 ? 'text-danger' : 'text-success'} /><br />{product.quantity < 1 ? "Out Of Stock" : "Add to cart"}</Tooltip>
                </button>)}</>,
                    <>
                        {getWishlistProducts ? (<button className='btn btn-ouline'><Link to="/user/wishlist"> <HeartFilled style={{ color: 'red' }} /><br />Exist in Wishlist</Link></button>) :
                            (<button className='btn btn-ouline' onClick={handleAddToWishList}> <HeartOutlined className='text-dark' /><br />Add to wishlist</button>)
                        }</>,
            //         <>
            //             {getWishlistProducts ? (<button className='btn btn-ouline'><Link> <HeartFilled style={{ color: 'red' }} /><br />Exist in Wishlist</Link></button>):
            //   (<button  className='btn btn-ouline' onClick={handleAddToWishList}> <HeartOutlined className='text-dark' /><br />Add to wishlist</button>)
            //             }</>,
                    <RatingModal star={star}>
                    <StarRating
                        name={_id}
                        numberOfStars={5}
                        rating={star}
                        changeRating={onStarClick}
                        isSelectable={true}
                        starRatedColor="gold"
                        starHoverColor='gold'
                    /></RatingModal>]}>


                <ProductItems product={product} />
           

            </Card>
            <div>
                <ShareLinks product={product} />
                
                
            </div>
        </div>
    </>)
}
export default ProductForm