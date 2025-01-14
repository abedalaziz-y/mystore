import React from 'react'
import ReactDOM from 'react-dom'
import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import { useSelector } from "react-redux"
import { ToastContainer } from 'react-toastify';
import '../SubCategory/Category.css'
import {  GETCATEGORIES ,GETCATEGORYSUBCATEGORY} from "../../../../functions/category"
import { CREATEPRODUCT } from "../../../../functions/product";
import { useNavigate } from "react-router-dom";
import Productform from "./Createform"; 
import { Progress } from 'antd';

import {

    SyncOutlined, DeleteOutlined,

} from '@ant-design/icons';

import FileUpload from "../../../fileupload/fileUpload";
const initialState = {
    title: '',
    description: '',
    price: '',
    category: '',
    categories:[],
    subcategory: [],
    shipping: '',
    quantity: '',
    images: [],
    colors:[],
    // colors: '["Red", "Blue", "Green", "Orange", "White", "Black", "Yellow", "Purple", "Silver", "Brown"
    //     , "Gray", "Pink", "Olive", "Maroon", "Violet", "Charcoal", "Magenta", "Bronze", "Cream", "Gold"
    //     , "Tan", "Teal", "Mustard", "Navy Blue", "Coral", "Burgundy", "Lavender", "Mauve", "Peach", "Rust",
    //     "Indigo", "Ruby", "Clay", "Cyan", "Azure", "Beige", "Off White	", "Turquoise", "Amber", "Mint"],'
    brand: '',
   

}
const CreateProduct = () => {
    let navigate = useNavigate()
    const [values, setValues] = useState(initialState)
    const { user } = useSelector((state) => ({ ...state }))
    const [loading, setLoading] = useState(false)
    const [subOptions, setsubOptions] = useState([])
    const [showSubDropDown, setsshowSubDropDown] = useState(false)
    const [choose, setChoose] = useState(false)
        const [count,setCount]=useState(0)

   

    const handleChange = (e) => {
        setValues({...values,[e.target.name]:e.target.value})
      
    }

  
  useEffect(() => {
      getallcategories()
    }, [])
    const getallcategories = () => GETCATEGORIES().then((c) => {
        

        setValues({...values,categories:c.data})

    })
    const handlcategorychange = (e) => {
        e.preventDefault()
        setsshowSubDropDown(true)
        // console.log('clicked',e.target.value)
        setValues({ ...values, subcategory:[],category: e.target.value })
        
        GETCATEGORYSUBCATEGORY(e.target.value)
        .then(res=>{
            // console.log(res)
            setsubOptions(res.data)

        })
    }

    
    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        CREATEPRODUCT(values,user.token)
            .then((res) => {
                // console.log(res)
                setLoading(false)
                setValues("")
                toast.success(`${res.data.title} has been created successfully`, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                window.alert(`${res.data.title} has been created succesfully `)
                window.location.reload()//   to reload the page 
                // navigate("/admin/categories")
            })
            .catch((err) => {
                // console.log(err)
                setLoading(false)
                // if (err.response.status === 400) toast.error(err.response.data)
                toast.err(err.response.data.err)
            })


    }
  
  
    return (<div className="container-fluid">
        <div className="row">
            <div className="col-auto ">

                <ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </div>


            <div className=" col-auto col-md mb-2 ">

                {loading ? <h2 className="text-center text-danger">Loading..</h2> : <h2 className="text-center text-info"><strong>Create </strong>Product</h2>}
                <div className=' border border-warning bg-light p-3  mt-5 '>
                    <h5 className='text-center text-white'>{loading ? <Progress type="dashboard" percent={count} width={80} />: (<h5>upload images</h5>)}</h5>
                    <FileUpload Loading={loading} setCount={setCount}  setValues={setValues} values={values} loading={loading} setLoading={setLoading}/>
                    <Productform setValues={setValues} subOptions={subOptions} showSubDropDown={showSubDropDown} handlcategorychange={handlcategorychange} handleSubmit={handleSubmit} handleChange={handleChange} values={values} setsshowSubDropDown={showSubDropDown} loading={loading} />
                
                </div>


            </div>

        </div>
    </div>
    )

}






export default CreateProduct