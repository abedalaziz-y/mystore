import React from 'react'
import ReactDOM from 'react-dom'
import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import { useSelector } from "react-redux"
import { DeleteFilled, EditFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import LocalSearch from "../../serach/LocalSearch";
import {SyncOutlined} from '@ant-design/icons';
import { Select, Tag } from 'antd';
import '../SubCategory/Category.css'
import { READSUB } from "../../../../functions/SubCategory";
import { CREATESUBCATEGORY, REMOVESUBCATEGORY, GETSUBCATEGORIES, SUBCATEGORIES, showsubcategories } from "../../../../functions/SubCategory"
import { CREATECATEGORY, REMOVECATEGORY, GETCATEGORIES } from "../../../../functions/category"
const Create = () => {

    const { user } = useSelector((state) => ({ ...state }))
    const [name, setName] = useState("")
    const [loading, setLoading] = useState(false)
    const [subcategories, setSubCategories] = useState([])
    const [categories, setCategories] = useState([])
    const [keyword, setKeyword] = useState("")
    const [Category, setCategory] = useState("")
    const { Option } = Select;



    useEffect(() => {
        getallcategories()
        getallSubcategories()
    }, [])

    const getallcategories = () => GETCATEGORIES().then((c) => {


        setCategories(c.data)
        console.log("categories response",c)
    })
    const getallSubcategories = () => GETSUBCATEGORIES().then((d) => {


        setSubCategories(d.data)
        // console.log("subcategories response", d)
    })


    const search = (keyword) => (c) => c.name.toLowerCase().includes(keyword)

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        CREATESUBCATEGORY({ name,parent:Category }, user.token)
            .then((res) => {
                // console.log(res)
                setLoading(false)
                setName("")
                toast.success(`${name} has been created successfully`, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });

                getallcategories()
                getallSubcategories()
            })
            .catch((err) => {
                console.log(err)
                setLoading(false)
                if (err.response.status === 400) toast.error(err.response.data)
            })


    }
    const handleRemove = async (slug) => {
        // let awnser =window.confirm(" Are you sure you want Delete")
        // console.log(awnser,slug)
        if (window.confirm(` Are you sure you want Delete ${slug}`)) {
            setLoading(true)
            REMOVESUBCATEGORY(slug, user.token).then(res => {
                setLoading(false)
                console.log(res)
                toast.success(` ${res.data.name} Deleted successfully `)
                getallSubcategories()
            }).catch((err) => {
                if (err.response.data.status === 400) {
                    toast.error(err.response.data)
                }

            })
        }
    }
    const SubcategoryForm = () =>{
        const onSearch=(val)=> {
            // console.log(Category);
        }
     
                        return(
                            <form onSubmit={handleSubmit} className='mt-5 text-dark'>
            <div className="form-group">
                                   <h3 className="text-danger text-center">chose Category</h3>
                                   
                                    <select class="form-select form-select-lg mb-3" aria-label=".form-select-lg example" placeholder="Select a category"
                                      onChange={(e) => setCategory(e.target.value)}>
                                        <option  className="text-muted">Open this select menu</option>
                                        {categories.length > 0 && categories.map((c) => <option className="text-danger" key={c._id} value={c._id}>{c.name}</option>)}

                                    </select>

                                  
                                  
                <input type="text" className="form-control form-control-lg mt-3" name="SubcategoryName" placeholder="  Enter Sub category Name"
                    value={name} onChange={(e) => setName(e.target.value)} autoFocus required />
            </div>
            <div className="form-group"><button className="btn btn-dark  btn-block w-100 mt-2" type="submit" disabled={name.length < 3 || !name}>{loading ? <SyncOutlined spin twoToneColor="#108fff" /> : (<h5 className="text-white">Create</h5>)}</button>
            </div>

        </form>
        )
    }
    const date=new Date()
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


            <div className=" col-auto col-md">

                {loading ? <h2 className="text-center text-danger">Loading</h2> : <h2 className="text-center text-warning"><strong>Create </strong>Sub Category</h2>}
                {SubcategoryForm() }
                <div class="table-responsive mt-5  table-bordered text-dark border-warning mb-4 ">
                   

                  
                    <table className="table mb-2 ">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">#id</th>
                                <th className="col-2 text-center" scope="col"> name
                                    <LocalSearch keyword={keyword} setKeyword={setKeyword} />
                                </th>
                                <th className=" text-center" scope="col" >
                                    createdAt  </th>
                                <th className=" text-center" scope="col" colSpan="2">
                                    Action  </th>

                            </tr>
                        </thead>
                        <tbody>
                            {subcategories.filter(search(keyword)).map((subcategory) => (<tr>
                                <th scope="row">{subcategory._id.substring(20,24)}</th>
                             
                                <td>{subcategory.name}</td>
                                <td className="text-center"> {subcategory.createdAt.substring(0, 10)} ---{subcategory.createdAt.substring(11, 20)} </td> 
                                <td cellPadding="5"><Link to={`/admin/SubCategory/${subcategory.slug}`}><EditFilled className="btn btn-warning" /></Link></td>
                                <td><DeleteFilled onClick={() => handleRemove(subcategory.slug)} className="btn btn-danger" /></td>
                            </tr>))}


                        </tbody>
                    </table>
                </div>
                {/* <div class="table-responsive mt-5  table-bordered ">
                    <table className="table text-white ">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">#</th>
                                <th className="col-2 text-center" scope="col"> name
                                    <LocalSearch keyword={keyword} setKeyword={setKeyword} />
                                </th>
                                <th className=" text-center" scope="col" colSpan="2">
                                    Action  </th>

                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((categories) => (<tr>
                                <th scope="row">{categories._id}</th>
                                <td>{categories.name}</td>
                                <td cellPadding="5"><Link to={`/admin/subcategory/${categories.slug}`}><EditFilled className="btn btn-warning" /></Link></td>
                                <td><DeleteFilled onClick={() => handleRemove(categories.slug)} className="btn btn-danger" /></td>
                            </tr>))}


                        </tbody>
                    </table>
                </div> */}


            </div>

        </div>
    </div>
    )

}






export default Create