import React from 'react';
import {  toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import './register.css'
import { useState, useEffect } from 'react'
import { auth } from '../../firebase';

import { useSelector } from 'react-redux';
 import { useNavigate } from "react-router-dom";

const Register = () => {

    const [email, setEmail] = useState("")
   
    const navigate = useNavigate();
    // const meetingPic = new URL("meeting.jpg", import.meta.url)

    const handleSubmit =async(e) => {
        e.preventDefault()
       
        const config = {
            url: process.env.REACT_APP_RURL,
            handleCodeInApp:true
        }
        
       
        await auth.sendSignInLinkToEmail(email,config)
        toast.success(`The link has been sent successfully to ${email} Click on the link sent to complete the registration`)
        window.localStorage.setItem('emialForRegisteration',email)
        setEmail('')
    }


    const { user } = useSelector(state => ({ ...state }))

    useEffect(() => {
        if (user && user.token) {
            navigate("/")
        }
    }, [user, navigate])
    const RegisterForm = () => (
        <form onSubmit={handleSubmit} className=' productA pulse animated form-container mt-5 mb-5'>
            <h2 className="text-center"><strong>Create</strong> an account.</h2>
            <div className="form-group">
                <input type="email" className="form-control form-control-lg" name="email" placeholder="Email" 
                value={email} onChange={(e)=>setEmail(e.target.value)} autoFocus required/>
           </div>
            <div className="form-group"><button className="btn btn-danger btn-block w-100 mt-2" type="submit" disabled={!email || !email.includes("@") || !email.includes(".com")}>Send Email Code </button>
            </div><div className="already text-center t"  >You already have an account? 
             <Link to='/Login' className=' text-dark'> Login here.
            </Link></div>
        </form>
    )

    return (
        <div className="container-fluid register " >
          
        <div className='row '>    
        
                       <div className='col mb-2'>
                    {RegisterForm()}
                       </div>
                  
            
        </div>
    </div>

)
    
};

export default Register