import React from 'react'
import ReactDOM from 'react-dom'
import { useState,useEffect } from "react"
import { toast } from "react-toastify"
import { useSelector } from "react-redux"
import { DeleteFilled, EditFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import LocalSearch from "../../serach/LocalSearch";
import {

    SyncOutlined,

} from '@ant-design/icons';

import { CREATECATEGORY,REMOVECATEGORY,GETCATEGORIES } from "../../../../functions/category"
import { SUBCATEGORIES } from "../../../../functions/SubCategory";

const Create = () =>{
   
    const { user } = useSelector((state)=>({...state}))
    const [name,setName]=useState("")
    const [loading, setLoading] = useState(false)
    const [categories, setCategories] = useState([])
    const [keyword,setKeyword]=useState("")

  

    useEffect(() => {
        getallcategories()
    }, [])
   
    const getallcategories = () => GETCATEGORIES().then((c)=>{
        
        
        setCategories(c.data)
       
        
    })
    
   
    const search = (keyword) =>(c)=> c.name.toLowerCase().includes(keyword)

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        CREATECATEGORY({name},user.token)
        .then((res)=>{
            // console.log(res)
            setLoading(false)
            setName("")
            toast.success(`${name} has been created successfully`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
           
            getallcategories()
        })
        .catch((err)=>{
            console.log(err)
            setLoading(false)
            if (err.response.status === 400) toast.error(err.response.data)
        })
       

    }
        const handleRemove=async(slug)=>{
            // let awnser =window.confirm(" Are you sure you want Delete")
            // console.log(awnser,slug)
            if (window.confirm(` Are you sure you want Delete ${slug}`)){
                setLoading(true)
                REMOVECATEGORY(slug,user.token).then(res=>{
                        setLoading(false)
                        // console.log(res)
                        toast.success(` ${res.data.name} Deleted successfully `)
                    getallcategories()
                }).catch((err)=>{
                    if(err.response.data.status===400){
                        toast.error(err.response.data)
                    }
                    
                })
            }
        }
    const categoryForm = () => 
        <form onSubmit={handleSubmit} className='mt-5 text-dark '>
            <div className="form-group">
                <input type="text" className="form-control form-control-lg" name="categoryName" placeholder="category Name"
                    value={name} onChange={(e) => setName(e.target.value)}  autoFocus required />
            </div>
            <div className="form-group"><button className="btn btn-dark  btn-block w-100 mt-2" type="submit" disabled={name.length < 4 || !name }>{loading ? <SyncOutlined spin twoToneColor="#108fff" /> : (<h5 className="text-white">Create</h5>)}</button>
            </div>  
               
        </form>
    

    return (<div className="container-fluid text-dark">
        <div className="row mb-5">
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


            <div className=" col-auto col-md text-dark">

                    {loading ? <h2 className="text-center text-danger">Loading</h2> : <h2 className="text-center text-warning"><strong>Create </strong>Category</h2>}
                {categoryForm()}
                <div class="table-responsive mt-5  table-bordered border-dark text-dark ">
                        <table className="table  ">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">#</th>
                                    <th className="col-2 text-center" scope="col"> name
                                    <LocalSearch keyword={keyword} setKeyword={setKeyword}/>
                                      </th>
                                    <th className=" text-center" scope="col" colSpan="2">
                                        Action  </th>
                                
                                </tr>
                            </thead>
                            <tbody>
                                {categories.filter(search(keyword)).map((category) => (<tr>
                                    <th scope="row">{category._id}</th>
                                    <td>{category.name}</td>
                                    <td cellPadding="5"><Link to={`/admin/category/${category.slug}`}><EditFilled className="btn btn-warning" /></Link></td>
                                    <td><DeleteFilled onClick={() => handleRemove(category.slug)} className="btn btn-danger" /></td>
                                </tr>))}
                               
                           
                            </tbody>
                        </table>
                    </div>
                   
                 
            </div>
       
        </div>
    </div>
)

}


   



export default Create