import React from 'react'
import ReactDOM from 'react-dom'
import { Card } from 'antd';
import { useState } from 'react';
import './cards.css'
import logo from '../../../../images/logo.png'
import {Link} from 'react-router-dom'
import {

    DeleteFilled, EditFilled
} from '@ant-design/icons'
const AdminCard = ({ product, handleRemoveProduct })=>{
    const {title,images,description,price,slug}=product
    const { Meta } = Card;
    const [productImg, setProductImg] = useState(images[0].url)
    return(<>
        <Card className='mt-4 productcard text-dark border border-danger mb-2 ' 
        
            bordered
            hoverable
            cover={(<img className='cardsimg' alt="example" src={productImg && productImg.length ? productImg:logo} />)  }
            actions={[<Link to={`/admin/product/${slug}`}><EditFilled style={{ color: 'green' }} /></Link>, <DeleteFilled onClick={() => handleRemoveProduct(slug)}style={{ color: 'red' }}/>]}

        >
            <h4 className='text-center'>{title}</h4>
            <Meta className='text-start' description={`${description && description.substring(0, 45)}....`} />
            <p className=' text-start mt-2'>{price} jd</p>
        </Card>
            
    </>
       
    )
}
export default AdminCard