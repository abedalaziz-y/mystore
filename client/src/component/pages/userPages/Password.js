import React from 'react'
import ReactDOM from 'react-dom'
import {auth} from '../../../firebase'
import {toast} from 'react-toastify'
import { useState } from "react"

const Password = (e) =>
{
    const [password,setPassword]=useState("")
    const [loading, setLoading] = useState(false)
const handleSubmit=async(e)=>{
    e.preventDefault()
    setLoading(true)
    // console.log(password)
    ///cauurentUser bring to us the loged in user now !
   await auth.currentUser.updatePassword(password)
   .then((err)=>{
       setLoading(false)
       toast.success("password Updated successfully!")
       setPassword('')
   }).catch(err=>{
       setLoading(false)
       toast.error(err.message)
   })
}
    const PasswordUpdate=()=>{
        return (
        
            <form onSubmit={handleSubmit} className=' product pulse animated form-container mt-5'>
            {loading ? <h2 className="text-center text-danger">Please Wait!</h2> : <h2 className="text-center"><strong>Reset </strong>Password</h2>}
            <div className="form-group">
                <input type="password" className="form-control form-control-lg" name="password" placeholder="New Password"
                  onChange={(e)=>setPassword(e.target.value)} disabled={loading} autoFocus required value={password}/>
            </div>
            <div className="form-group"><button className="btn btn-danger btn-block w-100 mt-2" type="submit" disabled={!password || loading || password.length<6}>Reset </button>
            </div>  
              
        </form>)
    }
return(
    <div className="container-fluid">
        <div className="row mb-5">
            
            <div className="col">
                {PasswordUpdate()}
            </div>
        </div>
    </div>
)
    
}


export default Password