import React from 'react';
import { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { GETPRODUCT,getRelated,PRODUCTSTAR, RELATEDPRODUCTS } from '../../functions/product';
import ProductForm from './ProductForm';
import { useSelector } from 'react-redux';
import ProductsCard from '../pages/ProductsCard';
const Product=()=>{
    const {user}=useSelector((state)=>({...state}))
    const [product,setProduct]=useState({})
    const [related, setRelated] = useState({})
    let { slug } = useParams()
    const [star,setStar]=useState(0)
    useEffect(()=>{
        
        loadProduct()
    }, [slug])

    useEffect(()=>{
        if(product.ratings &&user){
            let existingRatingObject = product.ratings.find(
                (element) => element.postedBy == user._id)
            existingRatingObject && setStar(existingRatingObject.star)//currentuser star
        }
    })
    ///we mention slug as a dependices cause we want to run withen the slug change

    const loadProduct=()=>{
        GETPRODUCT(slug).then((res)=>{
            setProduct(res.data)
            //load related
           RELATEDPRODUCTS(res.data._id).then((res)=>{
               setRelated(res.data)
           })
        })
    }
const onStarClick = (newRating,name)=>{
    setStar(newRating)
    // console.log("name or prodict _id  is ",name)
    // console.log("new rating is ", newRating)
    // console.log("new rating is ", newRating)
    PRODUCTSTAR(name, newRating,user.token).then((res)=>{
        loadProduct()
        // console.log("respnose from backend",res)
    }).catch((err)=>{
        console.log(err)
    })
       
    }
    return(<>
    
                    <div className=' productpage container-fluid'>
                        <div className='row'>
                <ProductForm product={product} onStarClick={onStarClick} star={star}/>
               
                        </div>
                        <div className='row'>
                           <div className='col text-center pt-5 pb-5'>
                               <hr/>
                               <h3>Products you may like</h3>
                               <hr/>
                           </div>
                        </div>
                      <div className='row'>

                {related.length ? (
                    related.map((r) => (
                        <div className=' col-6 col-lg-3 col-md-3'>
                            <ProductsCard key={r._id} product={r} />


                        </div>
                    ))
                ) : (
                    <div className="text-center col">No Products Found</div>
                )}
                      </div>
                    </div>
       

    </>
    )
}

export default Product