
import React from 'react'
import ReactDOM from 'react-dom'
import '../Bars/nav.css'
import { Avatar ,Badge} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { CloudUploadOutlined, setTwoToneColor } from '@ant-design/icons';
import Resizer from 'react-image-file-resizer'
import axios from 'axios'
import { useSelector } from 'react-redux';
import { DeleteOutlined } from '@ant-design/icons';

const FileUpload = ({ loading,setCount, values, setValues, setLoading})=>{
    const { user } = useSelector((state) => ({ ...state })) 

    

    const fileUploadAndResize=(e)=>{
        //resize
        //send to server >>server send to cloudinary 
        //set url to images[] in the parent component-product create
     let files=e.target.files
     let allUploadedFiles=values.images




        if (files) {
            

            const intreval = setInterval(() => {
                setCount((currentCount) => ++currentCount)
            },500)
   

          
            setLoading(true);   
          
            
            for (let i = 0; i < files.length; i++) {
                Resizer.imageFileResizer(
                    files[i],
                    720,
                    720,
                    "JPEG",
                    100,
                    0,
                    (uri) => {
                        // console.log(uri);
                        axios
                            .post(
                                `${process.env.REACT_APP_API}uploadimages`,
                                { image: uri },
                                {
                                    headers: {
                                        authtoken: user ? user.token : "",
                                    },
                                }
                            )
                            .then((res) => {
                                // console.log("IMAGE UPLOAD RES DATA", res);
                                setLoading(false);
                                setCount(0)
                                allUploadedFiles.push(res.data);

                                setValues({ ...values, images: allUploadedFiles });
                            })
                            .catch((err) => {
                                setLoading(false);
                                // console.log("CLOUDINARY UPLOAD ERR", err);
                            });
                    },
                    "base64"
                );
            }
        }}
    setTwoToneColor('aquamarine') ///the icons colors

    const handleImageRemove = (public_id) => {
        setLoading(true);
        // console.log("remove image", public_id);
        axios
            .post(
                `${process.env.REACT_APP_API}/removeimage`,
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
                // console.log(err);
                setLoading(false);
            });
    };
    return(
        <>
                
                    

              
            <div className='text-center'>
                <div className='row '>
                <div className='col'>

                     
                    {values.images && ( 
                     
                        values.images.map((image) => (
                            <Badge className=' deletebadge btn text-danger' key={image.public_id} onClick={() => handleImageRemove(image.public_id)} count={<DeleteOutlined  />} to>
                            <Avatar className='ml-2' src={image.url} shape="square" size={{
                                xs: 50,
                                sm: 65,
                                md: 80,
                                lg: 110,
                                xl: 135,
                                xxl: 170,
                                }} icon={<UserOutlined />} /></Badge>

                        ))
                        )} 
                    </div>
                </div>

                <label class="btn btn-primary  center-block btn-file w-50 mt-2" >
                    <CloudUploadOutlined style={{ fontSize: '20px' }} />
                    <input type="file" hidden multiple accept='images/*' onChange={fileUploadAndResize} /></label>
            </div>
        </>
    )
}

export default FileUpload