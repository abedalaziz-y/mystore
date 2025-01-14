import React from 'react'
import ReactDOM from 'react-dom'
import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import {  useSelector } from 'react-redux';
const RedirectLoading=()=>{
    const { user } = useSelector((state) => ({ ...state }))
const [count,setCount]=useState(1)
let navigate=useNavigate()



useEffect(()=>{
    
    const intreval=setInterval(()=>{
        setCount((currentCount)=>--currentCount)
    },1000)
    //if count ===0 redirect
    if (user && user.token){
        count === 0 && navigate("/user/history") 
    }else{
        count === 0 && navigate('/Login')
    }
   
    return ()=>clearInterval(intreval)
}, [count, navigate,user])

return(
    <>  </>
//    <Login/>
    // <h1 className="text-center text-danger">Access Denide! redirect in {count} seconds</h1>
)
}
const RedirectLoadingAdmin = () => {
    const [count, setCount] = useState(3)
    let navigate = useNavigate()



    useEffect(() => {
        const intreval = setInterval(() => {
            setCount((currentCount) => --currentCount)
        }, 1000)
        //if count ===0 redirect

        count === 0 && navigate('/Login')
        return () => clearInterval(intreval)
    }, [count, navigate])
    return (
        <h1 className="text-center text-danger">Access Denide! redirect in {count} seconds</h1>
    )
}
export  {RedirectLoading,RedirectLoadingAdmin}