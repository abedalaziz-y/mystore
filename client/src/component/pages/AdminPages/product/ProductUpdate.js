import React from 'react'
import ReactDOM from 'react-dom'
import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import { useSelector } from "react-redux"
import { ToastContainer } from 'react-toastify';
import '../SubCategory/Category.css'
import { GETCATEGORIES, GETCATEGORYSUBCATEGORY } from "../../../../functions/category"
import { CREATEPRODUCT, GETPRODUCT, UPDATEPRODUCT } from "../../../../functions/product";
import { useNavigate, useParams } from "react-router-dom";
import Productform from "./Createform";
import { Progress } from 'antd';
import {SyncOutlined, DeleteOutlined,} from '@ant-design/icons';
import UpdateProductform from "./updateProductForm";

import FileUpload from "../../../fileupload/fileUpload";
 //////// important note 
 // when we want to bick a category and sub category we store the clikeable values in sebreat state that we storing 
 // the values that we got from data base that beacuse we want admin take his time to choose 
 // and if he click by mistake on other category or sub he can back to the original by click back
 // into the category and the subs will be there so  2 states to store cliked cat and subs 
 // and 2 state storing the daa base information that we are displaying to the user 
const initialState = {
    title: '',
    description: '',
    price: '',
    category: '',
    // categories: [],
    subcategory: [],
    shipping: '',
    quantity: '',
    images: [],
    colors: [],
    // colors: '["Red", "Blue", "Green", "Orange", "White", "Black", "Yellow", "Purple", "Silver", "Brown"
    //     , "Gray", "Pink", "Olive", "Maroon", "Violet", "Charcoal", "Magenta", "Bronze", "Cream", "Gold"
    //     , "Tan", "Teal", "Mustard", "Navy Blue", "Coral", "Burgundy", "Lavender", "Mauve", "Peach", "Rust",
    //     "Indigo", "Ruby", "Clay", "Cyan", "Azure", "Beige", "Off White	", "Turquoise", "Amber", "Mint"],'
    brand: '',


}
const ProductUpdate = () => {
    const [values, setValues] = useState(initialState)
    const [categories,setCategories]=useState([])
    const [product, setProduct]=useState([])
    const {user}=useSelector((state)=>({...state}))
    const [loading, setLoading] = useState(false)
    const [subOptions, setSubOptions] = useState([])
    const [showSubDropDown, setsshowSubDropDown] = useState(false)
    const [choose, setChoose] = useState(false)
    const [count, setCount] = useState(0)
    const [subcategoriesarr, setSubcategoriesarr]=useState([])
    const [selectedCategory, setSelectedCategory] = useState('')
    let navigate = useNavigate()
  
    let { slug } = useParams()

    useEffect(() => {
        getporduct()
        getallcategories()
       
    }, [])
    
   
    const getporduct = () => {
        GETPRODUCT(slug).then((product) => {
            setValues({ ...values, ...product.data })
            // console.log("the orignal", product)
            GETCATEGORYSUBCATEGORY(product.data.category._id).then((res) => {
                setSubOptions(res.data)
            })
            let arr = []
            product.data.subcategory.map((res) => {
                arr.push(res._id)
            })

            setSubcategoriesarr((prev) => arr)
            // console.log("selected previos sub category ", arr)
        })
            } 
    const getallcategories = () => {
        GETCATEGORIES().then((c) => {

            setCategories(c.data)
            // setValues({ ...values, categories: c.data })

        })
    } 

    
        const handleSubmit=(e)=>{
            e.preventDefault()
            setLoading(true)
            values.subcategory=subcategoriesarr
            values.category=selectedCategory?selectedCategory:values.category
            UPDATEPRODUCT(slug,values,user.token)
            .then((res)=>{
                setLoading(false)
                toast.success(`${res.data.title} updated successfully`)
                navigate('/admin/products')
            }).catch((err)=>{
                // console.log(err)
                toast.error(err.response.data.err)
            })
        }


    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })

    }


    const handlecategorychange = (e) => {
        e.preventDefault()
        setsshowSubDropDown(true)
        // console.log('clicked category', e.target.value)
        setValues({ ...values, subcategory: [] })

      setSelectedCategory(e.target.value)


        GETCATEGORYSUBCATEGORY(e.target.value)
            .then((res) => {
                // console.log("sub category when category clicked",res)
                setSubOptions(res.data)

            })
            // console.log("Existing category (theb original) ",values.category)
                // if user change category by misstik and want the orignal subcategory >>>when click back to the 
                //original category the orininal sub will showup
            if(values.category._id===e.target.value){
                getporduct()
            }
            setSubcategoriesarr([])
        
    }


    return (<div className=" container-fluid">
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

            {loading ? <h2 className="text-center text-danger">Loading..</h2> : <h2 className="text-center text-info"><strong>Update </strong>Product</h2>}
                {/* {JSON.stringify(values)}
            {JSON.stringify(selectedCategory)}
                {JSON.stringify(subcategoriesarr)} */}
            <div className=" col col-md m-3 ">
                 <div className=' productA '>
                    <h5 className='text-center text-white'>{loading ? <Progress type="circle" percent={count} width={80} /> : (<h5>upload images</h5>)}</h5>
                    <FileUpload Loading={loading} setCount={setCount} setValues={setValues} values={values} loading={loading} setLoading={setLoading} />

                <UpdateProductform  selectedCategory={selectedCategory}
                setSubcategoriesarr={setSubcategoriesarr} 
                subcategoriesarr={subcategoriesarr}
                 setCategories={setCategories}
                  categories={categories} 
                  setValues={setValues} 
                  subOptions={subOptions} 
                   handleSubmit={handleSubmit}
                 handleChange={handleChange}
                  values={values} 
                  setsshowSubDropDown={showSubDropDown} 
                  loading={loading}
                   handlecategorychange={handlecategorychange}/>
                </div>
            </div>

            </div>

        
    </div>
    )

}






export default ProductUpdate