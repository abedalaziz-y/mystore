

import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react'
import { auth } from '../../firebase';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import {
    PhoneOutlined, MessageOutlined, MailOutlined, WhatsAppOutlined,
    InstagramOutlined, TwitterOutlined, LinkOutlined
    , FacebookOutlined
} from '@ant-design/icons';

import { useDispatch, useSelector } from 'react-redux';
import { a } from 'react-router-dom';
import { GETTRADERINFO } from '../../functions/trader';

const Footer=({name,phone,about})=> {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    const [email, setEmail] = useState("")
    let dispatch = useDispatch()

    const { width, height } = windowDimensions
    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

    }, [])
    function getWindowDimensions() {
        const { innerWidth: width, innerHeight: height } = window;
        return {
            width,
            height
        };
    }
    const navigate = useNavigate()
    let { user,trader } = useSelector((state) => ({ ...state }))
    const handleSubmit = async (e) => {
        e.preventDefault()

        const config = {
            url: process.env.REACT_APP_RURL,
            handleCodeInApp: true
        }


        await auth.sendSignInLinkToEmail(email, config)
        toast.success(`The link has been sent successfully to ${email} Click on the link sent to complete the registration`)
        window.localStorage.setItem('emialForRegisteration', email)
        setEmail('')
    }
   
   
    return (
       <div className='container-fluid'>
           {trader&&(trader.map((ti)=>(
               <div className='row  ' key={ti.name}>

                   <div className='  container text-center text-white bg-dark'  >





                 




                      <div className='mt-3'>
                           <button className='btn btn-outline'><a href={`tel:${ti.phone}`} target={'_blank'}>اتصل بنا <PhoneOutlined style={{ fontSize: '25px', color: 'green' }} /> </a></button>
                           <button className='btn btn-outline'> <a href={`http://wa.me/${ti.phone}`} target={'_blank'}>راسلنا واتس اب <WhatsAppOutlined style={{ fontSize: '25px', color: 'greenyellow' }} /> </a>
</button>
                      </div>



                    




                       <form onSubmit={handleSubmit} >
                           <div className='row d-flex justify-content-center'>
                               <div className='col-auto'>
                                   <p className='pt-2'>
                                       <strong>Sign up for free</strong>
                                   </p>
                               </div>

                               <div className='d-flex justify-content-center '>

                                   <input value={email} onChange={(e) => setEmail(e.target.value)} type='email' name="email" placeholder='Email Address' required className=' ml-2 mb-4 form-control' style={{ width: '350px' }} />
                                   <button type='submit' className='mb-4 ml-2 btn btn-outline-primary'>
                                       Subscribe
                                   </button>
                               </div>
                               <div className='d-flex justify-content-center   '>
                                   <form className='border'  action="https://formsubmit.co/sam3nee@gmail.com" method="POST">
                                       <input type="hidden" name="_next" value="https://elecom.herokuapp.com" />

                                       <input  
                                           type="email" name="email" autocomplete="on" inputmode="email" 
                                       placeholder='Email for free Coupon'
                                        required className='mb-4 form-control'  />
                                       <button type='submit' className='mb-4 ml-2 btn btn-outline-success'>
                                           Get Free Coupon
                                       </button>
                                    </form>
                                   
                               </div>

                           </div>
                       </form>

                       <section >
                           <div className='row'>
                               <div className='mb-4 mb-md-0 col ' ><h5 className='text-white'>
                                   who are we?
                               </h5>
                                   <hr />
                                   <p>{ti.about}</p>
                               </div>
                               <div className='mb-4 mb-md-0 col'>

                                   <h5 className='text-uppercase text-white'>Main Links</h5>

                                   <ul className='list-unstyled mb-0'>
                                       <li>
                                           <a >
                                               <Link to='/'>Home</Link>
                                           </a>
                                       </li>
                                       <li>
                                           <a >
                                               <Link to='/login'>login</Link>
                                           </a>
                                       </li>
                                       <li>
                                           <a >
                                               <Link to='/register'>Sing Up</Link>
                                           </a>
                                       </li>
                                       <li>
                                           <a >
                                               <Link to='/shop'>Shop</Link>
                                           </a>
                                       </li>
                                   </ul>
                               </div>
                               <div className='mb-4 mb-md-0 col'>

                                   <h6 className='text-uppercase text-white'>Sosial Media Links </h6>

                                   <ul className='list-unstyled mb-0'>
                                       <li>
                                           <a  className='text-white ' >
                                               <CopyToClipboard text={window.location.href}
                                                   >
                                                   <LinkOutlined onClick={() => toast.success(`Store link Copied ,Have Fun`)} style={{ fontSize: '25px', marginBottom: '5px' }}/>
                                                      
                                                   
                                               </CopyToClipboard>
                                                                                          </a>
                                       </li>
                                       <li>
                                           <a href={`${ti.facebook}`} className='text-white ' >
                                               <FacebookOutlined style={{ fontSize: '25px', color: 'blue', marginBottom: '5px' }} />
                                           </a>
                                       </li>
                                       <li>
                                           <a href={`${ti.twitter}`} className='text-white '>
                                               <TwitterOutlined style={{ fontSize: '25px', color: 'aqua', marginBottom: '5px' }} />
                                           </a>
                                       </li>
                                       <li>
                                           <a href={`${ti.instagram}`} className='text-white '>
                                               <InstagramOutlined style={{ fontSize: '25px',color:'purple',marginBottom:'5px' }} />
                                           </a>
                                       </li>
                                       
                                   </ul>
                               </div>





                           </div>
                       </section>

 

                   </div >
                   <div className='container-fluid'>
                       <div className='text-right p-3 row ' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>

                        {width>500&&(<div >

                               <p>   صنع بإتقان على | <a href={`http://wa.me/+962798197697`} target={'_blank'}>منصة تاجر حُر </a>|<b>{ti.name} جميع الحقوق محفوظة للتاجر</b></p>

                           </div>)}
                           {width<500&&(
                               <div >

                                   <p>   صنع بإتقان على | <a href={`http://wa.me/+962798197697`} target={'_blank'}>منصة تاجر حُر </a><br/><b>{ti.name} جميع الحقوق محفوظة للتاجر</b></p>

                               </div>
                           )}

    


                       </div>
                   </div></div>
           )))}
          
              
        
       </div>
    );
}
export default Footer