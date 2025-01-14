import React from 'react';
 import StarRating from 'react-star-ratings';


 export const showAvverage=(product)=>{
 ///reduce add the previous value with the next one
    if(product &&product.ratings){
        let ratingArray=product && product.ratings
        let total=[]
        let length=ratingArray.length
        // console.log(length)

        ratingArray.map((r)=>{
            total.push(r.star)
        })
        let totalReduced=total.reduce((previous,next)=>previous+next,0)
        // console.log(totalReduced)
        let highest=length*5
        // console.log(highest)
        let result=(totalReduced*5)/highest
        // console.log(result)
        return(
            <div className='text-center pt-2 pb-2'>
                <span>
                    <StarRating
                        starDimension="20px"
                        starSpacing="2px"
                        starRatedColor="gold"
                        rating={result}
                        editing={false}
                    />
                    ({product.ratings.length})
                </span>
            </div>
        )
    }
 }

export default showAvverage