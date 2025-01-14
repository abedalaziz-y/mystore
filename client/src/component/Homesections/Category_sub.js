import React from 'react'
import ReactDOM from 'react-dom'
import { Menu } from 'antd';
import { useNavigate,Link } from "react-router-dom";
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import { useState } from 'react';
import './sections.css'
import { GETCATEGORIES ,GETCATEGORYSUBCATEGORY} from '../../functions/category';
import { useEffect } from 'react';




const CategorySubCategory=()=>{
    const [categories,setCategories]=useState([])
    const [loading, setLoading] = useState(false)
    const [current, setCurrent] = useState('');
    const [subOptions, setsubOptions] = useState([])
    const [clicked, setClicked] = useState(false)


    const { SubMenu, Item } = Menu

    const handleChange = (e) => {
        e.preventDefault()
        GETCATEGORYSUBCATEGORY(e.target.value)
            .then((res) => {

                setsubOptions(res.data)
            })
        setClicked(true)
      
    }

    const getCategories=()=>{
       
        GETCATEGORIES().then((c) => {
            setCategories(c.data)
            setLoading(false)
        
        })
    }
    const handleClick = (event) => {
          
        setCurrent(event.key);
    };

useEffect(()=>{
    getCategories()
},[])

   


        const showCategories=()=>{
           
            return (<><div className="d-flex justify-content-center" key={1}>
                <div className="dropdown mr-1" key={2}>
                    {categories.map((c)=>(
                        <>
                            
                                    <button key={c._id} onClick={handleChange}  value={c._id} className="btn  ml-2 dropdown-toggle" data-bs-toggle="dropdown">
                                       {c.name}
                                    </button>
                            <div className="dropdown-menu text-center " aria-labelledby="dropdownMenuOffset" key={c.name} >
                                <Link className='dropdown-item text-danger' key={c.slug} to={`/${c.slug}`}> All {c.name}</Link>
                                {subOptions.length > 0 && subOptions.map((sub) => (<Link className='dropdown-item' key={sub.slug} to={`/${c.slug}/${sub.slug}`}>{sub.name}</Link>))}


                            </div>
                        </>
                    ))}  
                             </div>
                    

            </div>
            </>
            )
        }
    return(<>{loading?(<h6>loading...</h6>):showCategories()}
      {/* selected category  {JSON.stringify(selectedcategory)} */}

      {/* {JSON.stringify(subOptions)} */}

    </>)
}






const CategorySubCategoryForSide = () => {
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(false)
    const [current, setCurrent] = useState('');
    const [subOptions, setsubOptions] = useState([])
    const [clicked, setClicked] = useState(false)


    const { SubMenu, Item } = Menu

    const handleChange = (e) => {
        e.preventDefault()
        GETCATEGORYSUBCATEGORY(e.target.value)
            .then((res) => {

                setsubOptions(res.data)
            })
        setClicked(true)

    }

    const getCategories = () => {

        GETCATEGORIES().then((c) => {
            setCategories(c.data)
            setLoading(false)

        })
    }
    const handleClick = (event) => {

        setCurrent(event.key);
    };

    useEffect(() => {
        getCategories()
    }, [])




    const showCategories = () => {

        return (<><div className="d-flex" key={1}>
            <div className="dropdown mr-1" key={2}>
                {categories.map((c) => (
                    <>

                        <button key={c._id} onClick={handleChange} value={c._id} className="btn btn-outline w-100 mt-2 ml-2 dropdown-toggle" data-bs-toggle="dropdown">
                            {c.name}
                        </button>
                        <div className="dropdown-menu w-100 " aria-labelledby="dropdownMenuOffset" key={c.name} >
                            <Link className='dropdown-item text-danger' key={c.slug} to={`/${c.slug}`}> All {c.name}</Link>
                            {subOptions.length > 0 && subOptions.map((sub) => (<Link className='dropdown-item' key={sub.slug} to={`/${c.slug}/${sub.slug}`}>{sub.name}</Link>))}


                        </div>
                    </>
                ))}
            </div>


        </div>
        </>
        )
    }
    return (<>{loading ? (<h6>loading...</h6>) : showCategories()}
        {/* selected category  {JSON.stringify(selectedcategory)} */}

        {/* {JSON.stringify(subOptions)} */}

    </>)
}
export  { CategorySubCategoryForSide, CategorySubCategory}



