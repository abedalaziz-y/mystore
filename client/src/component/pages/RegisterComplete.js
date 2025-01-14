import React from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useState ,useEffect} from 'react'
import './register.css'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../../firebase';
import { CRUDUSER } from '../../functions/auth';

// uploaduserimage
const RegisterComplete = () => {
    let dispatch = useDispatch()

    const navigate = useNavigate();
///// navigate used for redirect the user after complete registeration
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const[picture,setPicture]=useState([])

    useEffect(() => { setEmail(window.localStorage.getItem('emialForRegisteration'))},[])

    const { user } = useSelector(state => ({ ...state }))

    useEffect(() => {
        if (user && user.token) {
            navigate("/")
        }
    }, [user, navigate])
    const handleSubmit = async (e) => {
        e.preventDefault()
        

        //add a custom validation
         
        if(!email || !password){
            toast.error("ُEmail and Password are required ")
            return
        }
        if (password.length<6) {
            toast.error('password are too short!!')
            return
        }
      
       

        try{
                const result= await auth.signInWithEmailLink(email,window.location.href)

                
                // console.log(result)
                if(result.user.emailVerified){
                    //remove email from local storeage
                    window.localStorage.removeItem('emialForRegisteration')
                    // get user  id  token then redirect
                    let user=auth.currentUser
                    // update user password
                    await user.updatePassword(password)
                    /// get the token 
                    const idTokenResult=await user.getIdTokenResult( )

                    //reduxt store
                    // console.log('user',user,"token",idTokenResult)
                    CRUDUSER(idTokenResult.token)
                        .then((res) => {
                            dispatch({
                                type: "LOGED_IN_USER",
                                payload: {
                                    // this way we can get the info from fire base directelly 
                                    // email: user.email,
                                    // displayName: user.displayName,
                                    // token: idTokenResult.token  
                                    //and this way we  got the data from our backend server from resbonse
                                    name: res.data.name,
                                    email: res.data.email,
                                    role: res.data.role,
                                    // picture: user.photoURL,
                                    picture: res.data.picture,
                                    token: idTokenResult.token,
                                    _id: res.data._id
                                }
                            })

                        }).catch()

                    //redirect
                    navigate("/")

            } 
        }catch(error){
        //  console.log(error)
         toast.error(error.message)
         setEmail('')
         setPassword('')
         setPicture([])
          
        }
       
    }

    const completeRegisterForm = () => (
        <form onSubmit={handleSubmit}>
            <h1 className="text-center"><strong className='text-white'>Register Complete</strong></h1>
            <div className="form-group"><input type="email" className="form-control form-control-lg" name="email" placeholder="Email"
                value={email}  disabled />
                <input type="password" className="form-control form-control-lg mt-2" name="password" placeholder=" create password"
                    value={password} onChange={(e)=>setPassword(e.target.value)} autoFocus /></div><br/>
            {/* <input
                type="file"
                name="file"
                id="input-files"
                class="form-control-file border"
            /> */}
            <div className="form-group"><button className="btn btn-success btn-block w-100 mt-2" type="submit" disabled={password.length<6} >finish</button>
            </div><div className="already text-center"  >You already have an account?  <Link to='/Login'> Login here.
            </Link></div>
        </form>
    )

    return (
        <div className="container mt-5">

            <div className='row mt-5'>
             
              

                    {completeRegisterForm()}

                
            </div>
        </div>

    )

};

export default RegisterComplete