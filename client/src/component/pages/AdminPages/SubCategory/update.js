import React from 'react'
import ReactDOM from 'react-dom'
import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import { useSelector } from "react-redux"
import { Table } from 'antd';
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { SyncOutlined } from '@ant-design/icons';
import { UPDATESUBCATEGORY,GETSUBCATEGORY } from "../../../../functions/SubCategory"
import { CREATESUBCATEGORY, REMOVESUBCATEGORY, GETSUBCATEGORIES } from "../../../../functions/SubCategory"

import { GETCATEGORIES } from "../../../../functions/category";
const UpdateSubCategory = () => {
    //match show us the current url details


    let navigate = useNavigate()
    const { user } = useSelector((state) => ({ ...state }))

    const [name, setName] = useState("")
    const [loading, setLoading] = useState(false)
    const [categories, setCategories] = useState([])
    const [parent, setParent] = useState([])
    const [Category, setCategory] = useState("")
    let { slug } = useParams()
    useEffect(() => {
        getSubCategory()
        getallcategories()
    }, [])

    const getSubCategory = () => GETSUBCATEGORY(slug).then((c) => {


        setName(c.data.name)
        setParent(c.data.parent)

    })
    const getallcategories = () => GETCATEGORIES().then((c) => {


        setCategories(c.data)

    })
    

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        UPDATESUBCATEGORY(slug,user.token,{name,parent})
            .then((res) => {
                setLoading(false)
                setName("")
                toast.success(` ${name} has been Updated successfully`, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });

                navigate('/admin/SubCategory')
            })
            .catch((err) => {
                console.log(err)
                setLoading(false)
                if (err.response.status === 400) toast.error(err.response.data)
            })


    }

    const categoryForm = () =>
        <form onSubmit={handleSubmit} className='mt-5 form-select '>
            <select class="form-select form-select-lg mb-3" aria-label=".form-select-lg example" placeholder="Select a category"
                onChange={(e) => setParent(e.target.value)}>
                <option className="text-muted" selected>Open this select menu</option>
                {categories.length > 0 && categories.map((c) => <option selected={c._id === parent }   key={c._id} value={c._id}>{c.name}</option>)}
            </select>
            <div className="form-group">
                <input type="text" className="form-control form-control-lg" name="sub categoryName" placeholder="sub category Name"
                    value={name} onChange={(e) => setName(e.target.value)} autoFocus required />
            </div>
            <div className="form-group"><button className="btn btn-dark  btn-block w-100 mt-2" type="submit" disabled={name.length < 4 || !name}>{loading ? <SyncOutlined spin twoToneColor="#108fff" /> : (<h5 className="text-white">Update</h5>)}</button>
            </div>

        </form>
  

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

                {loading ? <h2 className="text-center text-danger">Loading</h2> : <h2 className="text-center text-warning"><strong>Update </strong>Sub Category</h2>}
                {categoryForm()}



            </div>

        </div>
    </div>
    )

}






export default UpdateSubCategory

