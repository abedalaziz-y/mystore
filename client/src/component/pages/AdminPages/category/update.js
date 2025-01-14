import React from 'react'
import ReactDOM from 'react-dom'
import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import { useSelector } from "react-redux"
import { Table} from 'antd';
import { Link, useNavigate,useParams } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { SyncOutlined} from '@ant-design/icons';
import { GETCATEGORY, UPDATECATEGORY } from "../../../../functions/category"

const UpdateCategory = () => {
//match show us the current url details


    let navigate = useNavigate()
    const { user } = useSelector((state) => ({ ...state }))

    const [name, setName] = useState("")
    const [loading, setLoading] = useState(false)
    const [categories, setCategories] = useState([])
    let { slug } = useParams()
    useEffect(() => {
      getCategory()
    }, [])

    const getCategory = () => GETCATEGORY(slug).then((c) => {


        setName(c.data.name)

    })


    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        UPDATECATEGORY(slug, user.token, { name })
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

                navigate('/admin/categories')
            })
            .catch((err) => {
                console.log(err)
                setLoading(false)
                if (err.response.status === 400) toast.error(err.response.data)
            })


    }
   
    const categoryForm = () =>
        <form onSubmit={handleSubmit} className='mt-5 text-dark '>
            <div className="form-group">
                <input type="text" className="form-control form-control-lg" name="categoryName" placeholder="category Name"
                    value={name} onChange={(e) => setName(e.target.value)} autoFocus required />
            </div>
            <div className="form-group"><button className="btn btn-dark  btn-block w-100 mt-2" type="submit" disabled={name.length < 4 || !name}>{loading ? <SyncOutlined spin twoToneColor="#108fff" /> : (<h5 className="text-white">Update</h5>)}</button>
            </div>

        </form>
    const { Column, ColumnGroup } = Table;

    return (<div className="container-fluid text-dark">
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

                {loading ? <h2 className="text-center text-danger">Loading</h2> : <h2 className="text-center text-warning"><strong>Update </strong>Category</h2>}
                {categoryForm()}
              


            </div>

        </div>
    </div>
    )

}






export default UpdateCategory

