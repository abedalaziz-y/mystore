import React from 'react';
import '../../Bars/nav.css'
import { auth } from '../../../firebase';
import { useDispatch } from 'react-redux';
import { Avatar, Badge, Progress } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { setTwoToneColor } from '@ant-design/icons';
import Resizer from 'react-image-file-resizer'
import axios from 'axios'
import { useSelector } from 'react-redux';
import { DeleteOutlined, EditFilled } from '@ant-design/icons';
import { useState } from 'react';
import { CRUDUSER } from '../../../functions/auth';
import { toast } from "react-toastify"
import { Link, useNavigate } from "react-router-dom";
import {

    CameraOutlined,

} from '@ant-design/icons';
import { updateUserImages, updateUserName } from '../../../functions/user';
const initialState = {

    images: [],
    name: '',
    picture: []


}



const Profile = () => {
    const [editName, setEditName] = useState(false)
    const [count, setCount] = useState(0)
    const [values, setValues] = useState(initialState)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    let { user } = useSelector((state) => ({ ...state }))


    let navigate = useNavigate()


    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setEmail(user.email)

        if (!values.name || values.name.length < 1) {
            updateUserImages(user.token, values.images).then((res) => {
                toast.success("profile image updated ")
                // console.log("updated",res)
                window.location.reload()
                return
            })
        } else {
            if (!values.images || values.images.length < 1) {
                updateUserName(user.token, values.name).then((res) => {
                    // console.log(res,"user new name updated success")
                    window.location.reload()
                })
            } else {
                try {
                    // const result = await auth.signInWithEmailAndPassword(email, password)

                    // const { user } = result
                    // const idTokenResult = await user.getIdTokenResult()
                    CRUDUSER(user.token, values)
                        .then((res) => {

                            setLoading(false)
                            setCount(0)
                            setPassword('')
                            setValues({ ...values, name: res.data.name })

                            // user.picture[0].url
                            // dispatch({
                            //     type: "LOGED_IN_USER",
                            //     payload: {
                            //         // this way we can get the info from fire base directelly 
                            //         // email: user.email,
                            //         // displayName: user.displayName,
                            //         // token: idTokenResult.token  
                            //         //and this way we  got the data from our backend server from resbonse
                            //         name: res.data.name,
                            //         email: res.data.email,
                            //         role: res.data.role,
                            //         // img: user.photoURL,
                            //         picture: res.data.picture,
                            //         token: idTokenResult.token,
                            //         // _id: res.data._id,
                            //         // joinedTime: res.data.createdAt
                            //     }
                            // })

                            handleImageRemove()
                            toast.success(` profile picture has been updated successfully`, {
                                position: "top-center",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                            });
                            //    console.log(res)


                            window.location.reload()
                        }).catch()
                    // navigate("/")
                } catch (error) {

                    // toast.error(error.message)
                    toast.error("Password Incorrect !")
                    setLoading(false)
                }
            }
        }





    }








    //should change picture and name

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })

        console.log(values)
    }

    const fileUploadAndResize = (e) => {
        //resize
        //send to server >>server send to cloudinary 
        //set url to images[] 
        let files = e.target.files
        let allUploadedFiles = values.images





        if (files) {

            // setValues({ ...values, images: '' });

            setInterval(() => {
                setCount((currentCount) => ++currentCount)
            }, 500)



            setLoading(true);

            for (let i = 0; i < files.length; i++) {
                Resizer.imageFileResizer(
                    files[0],
                    720,
                    720,
                    "JPEG",
                    100,
                    0,
                    (uri) => {
                        // console.log(uri);
                        axios
                            .post(
                                `${process.env.REACT_APP_API}uploaduserimage`,
                                { image: uri },
                                {
                                    headers: {
                                        authtoken: user ? user.token : "",
                                    },
                                }
                            )
                            .then((res) => {
                                console.log("IMAGE UPLOAD RES DATA", res);
                                setLoading(false);
                                setCount(0)


                                allUploadedFiles.push(res.data);
                                setEmail(user.email)
                                setValues({ ...values, images: allUploadedFiles });

                                setValues({ ...values, picture: values.images[0] });

                            })
                            .catch((err) => {
                                setLoading(false);
                                console.log("CLOUDINARY UPLOAD ERR", err);
                            });
                    },
                    "base64"
                );
            }
        }
    }
    setTwoToneColor('aquamarine') ///the icons colors

    const handleImageRemove = (public_id) => {
        setLoading(true);
        // console.log("remove image", public_id);
        axios
            .post(
                `${process.env.REACT_APP_API}/deleteduserimage`,
                { public_id },
                {
                    headers: {
                        authtoken: user ? user.token : "",
                    },
                }
            )
            .then((res) => {
                setLoading(false);
                const { images } = values;
                let filteredImages = images.filter((item) => {
                    return item.public_id !== public_id;
                });
                setValues({ ...values, images: filteredImages });
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    };
    return (
        <>

            <div className="container-fluid">
                <div className="row ">
                    {/* {JSON.stringify(values.images)}
                    {JSON.stringify(values.name)} */}
                    <form onSubmit={handleSubmit} className=' d-flex justify-content-center mt-3 mb-5'>

                        <div className="col-md-5  mt-1 ">

                            <div className="card   text-center    ">
                                <div className='card-header   w-100 text-bold'><h3>Pofile</h3></div>


                                {/* {JSON.stringify(values.images)} */}
                                <h4 className="card-title">{values.images.length === 0 ? 'cuurent image' : values.images.length > 1 ? 'choose one of them' : 'Awosem now you can save'}</h4>
                                {user.picture.length === 0 && values.images.length === 0 && (<><div className='col d-flex justify-content-center '><Avatar className='ml-2' src={user.img} shape="circle" size={{
                                    xs: 100,
                                    sm: 140,
                                    md: 140,
                                    lg: 140,
                                    xl: 140,
                                    xxl: 140,
                                }} icon={<UserOutlined />} /></div></>)}

                                {user.picture.length !== 0 && (<><div className='col d-flex justify-content-center '><Avatar className='ml-2' src={user.picture[0].url} shape="circle" size={{
                                    xs: 100,
                                    sm: 140,
                                    md: 140,
                                    lg: 140,
                                    xl: 140,
                                    xxl: 140,
                                }} icon={<UserOutlined />} /></div></>)}
                                {/*                                 
                              {values.images.length>0 &&(<><div className='col d-flex justify-content-center '><Avatar className='ml-2' src={(values.images[0].url)} shape="circle" size={{
                                    xs: 100,
                                    sm: 140,
                                    md: 140,
                                    lg: 140,
                                    xl: 140,
                                    xxl: 140,
                                }} icon={<UserOutlined />} /></div></>)}  
                                
                                         */}
                                <h5 className='text-center text-white'>{loading ? <Progress type="circle" percent={count} width={80} /> : ''}</h5>

                                {values.images && (

                                    values.images.map((image) =>

                                        <Badge className=' deletebadge btn text-danger' key={image.public_id} onClick={() => handleImageRemove(image.public_id)} count={values.images.length > 1 ? <DeleteOutlined /> : ''} to>
                                            <Avatar className='ml-2' src={image.url} shape="circle" size={{
                                                xs: 100,
                                                sm: 140,
                                                md: 140,
                                                lg: 140,
                                                xl: 140,
                                                xxl: 140,
                                            }} icon={<DeleteOutlined />} /> </Badge>




                                    )


                                )}


                                <div className="col   ">
                                    <div className="form-group mb-3 d-flex justify-content-center  "><label className="form-label btn btn-dark   center-block btn-file"> <CameraOutlined style={{ fontSize: '20px' }} />
                                        <input className="form-control" type="file" hidden accept='images/*' onChange={fileUploadAndResize} /></label></div>
                                </div>
                                <div className="col d-flex justify-content-center ">

                                    <label className="form-label">Email <input disabled type="text" className="form-control" name="email" value={user.email} /></label></div>

                                {user.name ? (<div className="col">

                                    <label>  current Name  <div className="input-group mb-3  d-flex justify-content-center"> <input dir='auto' disabled type="text" class="form-control" id="username" value={user.name} />
                                        <span className="input-group-text"><EditFilled className='text-warning' onClick={() => setEditName(true)} /></span> </div></label>
                                </div>) :
                                    (<div className="col">

                                        <label>  current Name  <div class="input-group mb-3  d-flex justify-content-center"> <input dir='auto' placeholder='Clikck Edit & Enter Name' disabled type="text" class="form-control" id="username" value={user.name} />
                                            <span className="input-group-text"><EditFilled className='text-warning' onClick={() => setEditName(true)} /></span> </div></label>
                                    </div>)
                                }

                                {editName ? <div className="col">
                                    <div className="form-group mb-3 d-flex justify-content-center"><label class="form-label">Enter New  Name <input onChange={handleChange} dir='auto' type="text" class="form-control" id="username" name='name' placeholder='maximum 10 char' value={values.name} /></label></div>
                                </div> : ''}
                                {user && user.joinedTime && (<div className="col">
                                    <div className="form-group d-flex justify-content-center mb-3"><label class="form-label">Joind in <input disabled type="text " class="form-control text-center" name="email" value={user.joinedTime.substring(0, 10)} /></label></div>
                                </div>)}


                                <div className="col-md-12 content-right">
                                    <button
                                        disabled={values.images.length < 1 && !values.name}
                                        className={values.images.length > 1 ?
                                            'btn btn-danger mr-2 form-btn' :
                                            values.images.length === 0 ?
                                                "btn btn-danger mr-2 form-btn" :
                                                "btn btn-success mr-2 form-btn"} type='submit' > save</button>
                                    <button className="btn btn-danger form-btn" onClick={() => window.location.reload()}>CANCEL </button></div>

                                {/* (<button disabled={values.name.length > 15 || values.name.length === 0} className={values.name.length < 1 ? 'btn btn-danger ml-2' : values.name.length === 0 ? "btn btn-danger ml-2" : "btn btn-success ml-2"} type='submit' > save</button>)} */}



                            </div>
                        </div> </form>
                </div>
            </div>




        </>
    )
}
export default Profile