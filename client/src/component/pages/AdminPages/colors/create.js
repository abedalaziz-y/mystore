import React from 'react'
import ReactDOM from 'react-dom'
import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import { useSelector } from "react-redux"
import { DeleteFilled, EditFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import LocalSearch from "../../serach/LocalSearch";
import {

    SyncOutlined,

} from '@ant-design/icons';
import { CREATECOLOR,REMOVECOLOR } from '../../../../functions/product'
import { GETCOLORS } from "../../../../functions/product";

const CreateColor = () => {

    const { user } = useSelector((state) => ({ ...state }))
    const [name, setName] = useState("")
    const [loading, setLoading] = useState(false)
    const [colors, setColors] = useState([])
    const [keyword, setKeyword] = useState("")



    useEffect(() => {
        getallColors()
    }, [])

    const getallColors = () => GETCOLORS().then((c) => {


        setColors(c.data)


    })


    const search = (keyword) => (c) => c.name.toLowerCase().includes(keyword)

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        CREATECOLOR({ name }, user.token)
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

                getallColors()
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
            REMOVECOLOR(slug, user.token).then(res => {
                setLoading(false)
                // console.log(res)
                toast.success(` ${res.data.name} Deleted successfully `)
                getallColors()
            }).catch((err) => {
                if (err.response.data.status === 400) {
                    toast.error(err.response.data)
                }

            })
        }
    }
    const colorsForm = () =>
        <form onSubmit={handleSubmit} className='mt-5 text-dark '>
            <div className="form-group">
                <input type="text" className="form-control form-control-lg" name="color" placeholder="color Name"
                    value={name} onChange={(e) => setName(e.target.value)} autoFocus required />
            </div>
            <div className="form-group"><button className="btn btn-dark  btn-block w-100 mt-2" type="submit" disabled={name.length < 3|| !name}>{loading ? <SyncOutlined spin twoToneColor="#108fff" /> : (<h5 className="text-white">Create</h5>)}</button>
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

                {loading ? <h2 className="text-center text-danger">Loading</h2> : <h2 className="text-center text-warning"><strong>Create </strong>color</h2>}
                {colorsForm()}
                <div class="table-responsive mt-5  table-bordered border-dark text-dark ">
                    <table className="table  ">
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
                            {colors.filter(search(keyword)).map((color) => (<tr>
                                <th scope="row">{color._id}</th>
                                <td>{color.name}</td>
                                <td><DeleteFilled onClick={() => handleRemove(color.slug)} className="btn btn-danger" /></td>
                            </tr>))}


                        </tbody>
                    </table>
                </div>


            </div>

        </div>
    </div>
    )

}



 


export default CreateColor