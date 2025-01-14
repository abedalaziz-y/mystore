import React from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useState,useEffect} from 'react'
import './register.css'
import { auth } from '../../firebase';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';


const ResetPassword = () => {
    
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
  

    const {user}=useSelector(state=>({...state}))

    useEffect(() => {
        if (user &&user.token) {
            navigate("/")
        }
    }, [user, navigate])
    const handleSubmit = async (e) => {
            setLoading(true)
        e.preventDefault()

        const config = {
            url: process.env.REACT_APP_RURLFP,
            handleCodeInApp: true
        }

        await auth.sendPasswordResetEmail(email,config)
        .then(()=>{
            setEmail('')
            setLoading(false)
            toast.success("Email sent successfully check Your Email and click on the link sent!")
        })
        .catch((error)=>{
            toast.error(error.message)
            setLoading(false)
           
        })
       
    }
    const ResetPassword = () => (
        <form onSubmit={handleSubmit} className='product pulse animated form-container mt-5 mb-5'>
            {loading ? <h2 className="text-center text-danger">Loading</h2>: <h2 className="text-center"><strong>Reset </strong>Password</h2>}
            <div className="form-group">
                <input type="email" className="form-control form-control-lg" name="email" placeholder="Email"
                  value={email} onChange={(e)=>setEmail(e.target.value)}  autoFocus required />
            </div>
            <div className="form-group"><button className="btn btn-danger btn-block w-100 mt-2" type="submit" disabled={!email || !email.includes("@") || !email.includes(".com")}>Send Email Code </button>
            </div>  <div className='mt-1'>
                <Link to='/Login' className='  text-info '>
                    try login again <b>click here</b>
                </Link></div>
        </form>
    )

    return (
        <div className="container mt-5" >

            <div className='row mt-5'>


                {ResetPassword()}
            </div><div >
            </div>
        </div>

    )

};

export default ResetPassword