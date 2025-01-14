import React from 'react'
import ReactDOM from 'react-dom'
import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from 'react-redux';
import { SearchOutlined } from '@ant-design/icons';
import { AudioOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';

const SearchForm=()=>{
const  navigate=useNavigate()
const dispatch=useDispatch()
const {search}=useSelector((state)=>({...state}))
const {text}=search

const handleChange=(e)=>{

    dispatch({
        type:"SEARCH_QUERY",
        payload:{text:e.target.value}
    })

}
    const handleSubmit = (e) => {
        e.preventDefault()
        navigate(`/shop?${text}`)
    }

    return(
        <>
           
            <form className=' input-group input-group-sm my-2 my-lg-0 pr-2 ' onSubmit={handleSubmit}>
                <input type="search" 
            dir='auto'
            onChange={handleChange}
            value={text} 
                    className="form-control mr-sm-2 "
             placeholder='search'/>
             <SearchOutlined className='pt-2 pl-1' onClick={handleSubmit} style={{cursor:'pointer'}}/>
        </form>
        </>

    )
}

export default SearchForm