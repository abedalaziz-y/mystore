import React from 'react'
import ReactDOM from 'react-dom'
import {toast} from 'react-toastify'
import { Modal,Button } from 'antd';
import { useSelector } from 'react-redux';
import { StarOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
const RatingModal=({children,star})=>{
    let navigate=useNavigate()
    const {user}=useSelector((state)=>({...state}))
    const [modalVisible,setModalVisible]=useState(false)
    const { slug } = useParams()
    
    
    
    const handleModal=()=>{
        if(user &&user.token){
           setModalVisible(true)
        }else{
            navigate("/login", { state: { from: `/product/${slug}` } });
           
            
        }

    }
   
    return(<><div onClick={handleModal}>
            <StarOutlined className='text-warning'/>
        <br />{<button className='btn btn-ouline'>{star ? "change  Rate" : user ? "Leave Rating" : "Login to Rate"}</button>}
        </div>
        
            <Modal title="leave Your Rating" centered visible={modalVisible} onOk={()=>{
                setModalVisible(false)
            toast.success("Thanks for the review, it appeared and affected the overall rating ")
            }}
            onCancel={()=>setModalVisible(false)}
            >
          {children}
        </Modal>
       
        </>
    )
}



export default RatingModal
