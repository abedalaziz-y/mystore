import React from 'react'
import ReactDOM from 'react-dom'
import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import { useSelector } from "react-redux"
import { DeleteFilled, EditFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import LocalSearch from "../../serach/LocalSearch";
import './brand.css'
import {

    SyncOutlined,

} from '@ant-design/icons';
import { CREATEBRAND,REMOVEBRAND,GETBRANDS } from '../../../../functions/product'
import SideCool from '../../../Bars/SideBar'

const CreateBrand = () => {

    const { user } = useSelector((state) => ({ ...state }))
    const [name, setName] = useState("")
    const [loading, setLoading] = useState(false)
    const [brands, setBrands] = useState([])
    const [keyword, setKeyword] = useState("")



    useEffect(() => {
        getallBrands()
    }, [])

    const getallBrands = () => GETBRANDS().then((c) => {


        setBrands(c.data)


    })


    const search = (keyword) => (c) => c.name.toLowerCase().includes(keyword)

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        CREATEBRAND({ name }, user.token)
            .then((res) => {
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

                getallBrands()
            })
            .catch((err) => {
                // console.log(err)
                setLoading(false)
                if (err.response.status === 400) toast.error(err.response.data)
            })


    }
    const handleRemove = async (slug) => {
        // let awnser =window.confirm(" Are you sure you want Delete")
        // console.log(awnser,slug)
        if (window.confirm(` Are you sure you want Delete ${slug}`)) {
            setLoading(true)
            REMOVEBRAND(slug, user.token).then(res => {
                setLoading(false)
                // console.log(res)
                toast.success(` ${res.data.name} Deleted successfully `)
                getallBrands()
            }).catch((err) => {
                if (err.response.data.status === 400) {
                    toast.error(err.response.data)
                }

            })
        }
    }
    const brandsForm = () =>
    <div className='brand'>
            <form onSubmit={handleSubmit} className='mt-5 text-dark w-75'>
                <div className="form-group">
                    <input type="text" className="form-control form-control-lg" name="color" placeholder="brand Name"
                        value={name} onChange={(e) => setName(e.target.value)} autoFocus required />
                </div>
                <div className="form-group"><button className="btn btn-dark  btn-block w-100 mt-2" type="submit" disabled={name.length < 3 || !name}>{loading ? <SyncOutlined spin twoToneColor="#108fff" /> : (<h5 className="text-white">Create</h5>)}</button>
                </div>

            </form>
    </div>
    


    // return (<div className="container-fluid text-dark ">

    //     <div className="row">
        

    //             <SideCool />

            



    //         <div className=" col-9  text-dark ">
    //             {loading ? <h2 className="text-center text-danger">Loading</h2> : <h2 className="text-center text-warning"><strong>Create </strong>Brand</h2>}

    //             {brandsForm()}
    //             <div class="text-center   table-responsive mt-5  mb-5 table-bordered border-dark text-dark ">
    //                 <table className="table  ">
    //                     <thead className="thead-dark">
    //                         <tr>
    //                             <th className=" text-center" scope="col" > name
    //                                 <LocalSearch keyword={keyword} setKeyword={setKeyword} />
    //                             </th>
    //                             <th className=" text-center"  >
    //                                 Action  </th>

    //                         </tr>
    //                     </thead>
    //                     <tbody>
    //                         {brands.filter(search(keyword)).map((brand) => (<tr>
    //                             <td>{brand.name}</td>
    //                             <td><DeleteFilled onClick={() => handleRemove(brand.slug)} className="btn btn-danger" /></td>
    //                         </tr>))}


    //                     </tbody>
    //                 </table>
    //             </div>


    //         </div>

    //     </div>
    // </div>
    // )




    return (<div className="container-fluid text-dark ">

        <div className="row">






            <div className=" col   text-dark ">
                {loading ? <h2 className="text-center text-danger">Loading</h2> : <h2 className="text-center text-warning"><strong>Create </strong>Brand</h2>}

                {brandsForm()}
                <div class="text-center   table-responsive mt-5  mb-5 table-bordered border-dark text-dark ">
                    <table className="table  ">
                        <thead className="thead-dark">
                            <tr>
                                <th className=" text-center" scope="col" > name
                                    <LocalSearch keyword={keyword} setKeyword={setKeyword} />
                                </th>
                                <th className=" text-center"  >
                                    Action  </th>

                            </tr>
                        </thead>
                        <tbody>
                            {brands.filter(search(keyword)).map((brand) => (<tr>
                                <td>{brand.name}</td>
                                <td><DeleteFilled onClick={() => handleRemove(brand.slug)} className="btn btn-danger" /></td>
                            </tr>))}


                        </tbody>
                    </table>
                </div>


            </div>

        </div>
    </div>
    )
}



 


export default CreateBrand