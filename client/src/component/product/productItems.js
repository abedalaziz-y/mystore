import React from 'react';
import { Link } from 'react-router-dom';

const ProductItems=({product})=>{

    const { sold, shipping, colors, slug,brand, quantity,price,category,subcategory,description}=product


    return(<>
    <ul className='list-groub'>
        <li className='list-group-item' >
                Price <span className='label albel-default label-pill pull-right' key={price}>{price} jd</span>
        </li>
            {category && (<li className='list-group-item' >
                Category <Link className='label albel-default label-pill pull-right' key={category.slug} to={`/${category.slug}`}>{category.name}</Link>
            </li>)}
            {subcategory && (
                <li className='list-group-item pb-3' style={{overflow:'visible'}} > 
               Sub Category {subcategory.map((sub)=>(
                   <Link key={sub.slug} className='label albel-default label-pill pull-right pr-4 '  to={`/subcategory/${sub.slug}`}>{sub.name}</Link>
               ))} 
            </li> 
            )}
        <li className='list-group-item' >
                Shipping <span className={shipping === "Yes" ? ' text-success text label albel-default label-pill pull-right' : ' text-danger text label albel-default label-pill pull-right' }>{shipping} </span>
        </li>
            {colors && (
                <li className='list-group-item pb-3' >
                    Colors {colors.map((color) => (
                        <span className='label albel-default label-pill pull-right pr-4' key={color}>{color} </span>                 ))}
                </li>
            )}
            <li key={6} className='list-group-item'>
                Brand <span className='label albel-default label-pill pull-right' key={brand}>{brand} </span>
            </li>
            <li key={7} className='list-group-item'>
                Quantity <span className='label albel-default label-pill pull-right' key={quantity}>{quantity} </span>
            </li>
            <li key={8} className='list-group-item'>
                Sold <span className='label albel-default label-pill pull-right' key={sold}>{sold} </span>
            </li>
            <li key={9} className='list-group-item'>
                <details>
                    <summary>Description</summary>
                    <p>{description}</p>
                </details>
            </li>
                
            
    </ul>

    </>)
}

export default ProductItems