import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import './register.css'
import _ from "lodash"
import { GETCOLORS } from '../../functions/product';
import { GETBRANDS } from '../../functions/product';

import { GETCATEGORIES } from '../../functions/category';
import { useSelector,useDispatch } from 'react-redux';
import { GETPRODUCTBYCOUNT, GETPRODUCTSBYFILLTER } from '../../functions/product';
import ProductsCard from './ProductsCard';
import LoadingCard from '../pages/cards/LoadingCard';
import { Menu,Slider,Checkbox, Radio } from 'antd';
import { WarningFilled, BgColorsOutlined, SketchOutlined, CarOutlined, DollarCircleTwoTone, DollarOutlined, DownSquareOutlined, setTwoToneColor, StarOutlined, TrademarkCircleOutlined } from '@ant-design/icons';
import Star from '../stars/starform';
import { GETSUBCATEGORIES } from '../../functions/SubCategory';

const Shop=()=>{
  
    const [brandWithoutRepeat, setBrandWithoutRepeat]=useState([])
const [shipping,setShipping]=useState("")
const [brand, setBrand] = useState([]) 
const [productColors, setProductColors]=useState([])
const [defaultColors, setDefaultColors]=useState([])
const[colors,setColors]=useState([])
    const [brands, setBrands] = useState([])

const [subcategory,setSubcategory]=useState('')
const [subCategories, setSubCategories]=useState([])    
const [star,setStar]=useState('')
const [products,setProdcts]=useState([])
const [categories,setCategories]=useState([])
const [categoriesId,setCategiresId]=useState([])
const [loading,setLoading]=useState(false)
const [price,setPrice]=useState([0,0])
const [ok,setOk]=useState(false)
let dispatch=useDispatch()
const {search}=useSelector((state)=>({...state}))
const {text}=search
const pfc={products}
useEffect(()=>{
        
        loadAllProducts()
  //fetch categories
  GETCATEGORIES().then((res)=>setCategories(res.data))
  GETCOLORS().then((res)=>{
      setColors(res.data)
    //   console.log("colors",res.data)
  })
    GETBRANDS().then((res) => {
        setBrands(res.data)
        // console.log("colors", res.data)
    })
    GETSUBCATEGORIES().then((res)=>setSubCategories(res.data))

},[])
    const fetchProduacts = (arg) => {
        GETPRODUCTSBYFILLTER(arg).then((res) => {
            setProdcts(res.data)
            setDefaultColors(res.data)
        })
    }

///1-load products by default on page load
const loadAllProducts=()=>{
        GETPRODUCTBYCOUNT(20).then((res) => {
            setProdcts(res.data)
         setProductColors(res.data)
            setLoading(false)
        })
 
        
}
///2-load products based on user words on search 
 
        useEffect(()=>{

            
                const delayd = setTimeout(() => {
                    fetchProduacts({ query: text })
                    if (!text) {
                        loadAllProducts()
                    }
                }, 300)
                return () => clearTimeout(delayd)

           
        },[text]) //this mean when text change this useeffect will run automatically
   
  
    const {SubMenu,ItemGroup}=Menu

    //3-load products based on price 
    const handleSlider=(value)=>{
        dispatch({
            type:"SEARCH_QUERY",
            payload:{text:""}
        })
        ///reset
        setStar('')
        setSubcategory('')
        setCategiresId([])
        setPrice(value)
        setShipping('')

        setTimeout(()=>{
            setOk(!ok)
        },300)
    }
    useEffect(()=>{
        if (price !== [0, 0]) {
            fetchProduacts({ price })
}

    },[ok])

    ///-4 load all products based on categories A-display category in a list of check box the when youser click ok 
    // on of category we send this category id to load all product based on this choise
  const  handleCheck=(e)=>{
        // console.log(e.target.value)

      dispatch({
          type: "SEARCH_QUERY",
          payload: { text: "" }
      })
      ///reset
      setStar('')
      setPrice([0,0])
      setSubcategory('')

      setShipping('')


    
        let inTheState=[...categoriesId]    
        let justChecked=e.target.value
        let foundInTheState=inTheState.indexOf(justChecked)// indexOf used to check if the justchecked are found in
        // in the state if its is the its will retrn index ,,not found return -1
        if(foundInTheState===-1){
           inTheState.push(justChecked)
        }else{
            // we gonna pull out from the state

            inTheState.splice(foundInTheState,1) //grap 1 index from the index which is found
        }
        setCategiresId(inTheState)
        // console.log(inTheState)
        fetchProduacts({category:inTheState})

    }
   ////-5 show products based on star rating
    const handleStarClick=num=>{
        //  console.log(num)

        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: "" }
        })
        setPrice([0,0])
        setCategiresId([])
        setStar(num)
        setSubcategory('')

        setShipping('')

        fetchProduacts({stars:num})
    }

    ///-6 showSubcategories
      
    const showSubCategories = () =>subCategories.map((s) => (
        <div
            key={s._id}
            className='p-1 pt-2 m-1 badge badge-secondary'
                onClick={() => handleSub(s)}
            style={{cursor:'pointer',fontSize:"15px"}}
            >                
                {s.name}
               </div>
           
     
        ))
    useEffect(() => {
     if(subcategory!==""){
         fetchProduacts({
             subcategory
         })
     }

    }, [subcategory])

    const handleSub = (sub) => {
        // console.log('sub', sub)
        setSubcategory(sub)
        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: "" }
        })
        setPrice([0, 0])
        setCategiresId([])
        setStar('')

        setShipping('')

    }
    const showStars=()=>(
        <div className=' pt-2 pl-4 pr-4 pb-2 ' >
            <Star 
           
            starClick={handleStarClick}
            numberOfStars={5}
            />
            <Star
                starClick={handleStarClick}
                numberOfStars={4}
            />
            <Star 
            starClick={handleStarClick}
            numberOfStars={3}
            />
            <Star
                starClick={handleStarClick}
                numberOfStars={2}
            />
            <Star
                starClick={handleStarClick}
                numberOfStars={1}
            />
            
        </div>
       
        
    )
 ////-7 colors

    const showColors = () => colors.map((color) => (
        <div
            key={color._id}
            className='p-1 pt-2 m-1 badge'
            onClick={() => handleColors(color.name)}
            style={{ cursor: 'pointer', fontSize: "15px",color:color.name}}
        >
            {color.name}
        </div>


    ))
    // const showColors = () => productColors.map((product) => {
        
  
    //     return (<>
    //     {   colors.map((color)=>{
          
    //         return(<>
    //             <div className='pl-5'>{color.name}</div>
    //         </>)
    //     })
      
    //     }
    //         {/* { colors && (<>
             
    //                {colors.map((c,i) => (
    //                    <Radio
    //                        key={c}
    //                        onClick={() => handleColors(c)}
    //                        name={color}
    //                        className="pb-2 pl-4 pr-5 text-dark"
    //                        checked={color === c}
    //                    >
    //                        {c}
    //                    </Radio>         ))}
               
    //         </>  )} */}
          
    //     </>   )
    // })
    

    const handleColors = (color) => {
        // console.log('sub', sub)
       
        setSubcategory('')
        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: "" }
        })
        setPrice([0, 0])
        setCategiresId([])
        setStar('')
        setBrand("")
        setShipping('')

        fetchProduacts({ color })


    }
   useEffect(()=>{
   },[])

   //-8 brands
    const showBrands = () => brands.map((brand) => {
           
        // let unique = _.uniqWith(product.brand, _.isEqual);
       
       
        return (
              <div
            key={brand.name}
                onClick={() => handleBrands(brand.name)}
                name={brand.name}
                className="pb-2 pl-4 pr-5 text-dark"
            style={{ cursor: 'pointer', fontSize: "15px"}}
        >
               
                {<div className='mt-2'> <sup> <SketchOutlined style={{ fontSize: "15px", color: 'goldenrod' }} /></sup>  {brand.name}</div>} 
        </div>
            
        )
    })
      

    const handleBrands = (brand) => {
        // console.log('sub', sub)
        setBrand(brand)
        setSubcategory('')
        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: "" }
        })
        setPrice([0, 0])
        setCategiresId([])
        setStar('')

        setShipping('')

        fetchProduacts({ brand })
       
    }
    useEffect(() => {
      
    }, [brand])



    //9-- based on shipping

    const showShipping = () => {

        return (
            <>
                <Checkbox
                    className='pb-2 pl-4 pr-4'
                    onChange={handleShippingChange}
                    value="Yes"
                    checked={shipping === "Yes"}

                >
                    Yes
                </Checkbox>
                <Checkbox
                    className='pb-2 pl-4 pr-4'
                    onChange={handleShippingChange}
                    value="No"
                    checked={shipping === "No"}

                >
                    No
                </Checkbox>

            </>

        )
    }
    const handleShippingChange=(e)=>{
        setShipping(e.target.value)
        setBrand("")
        setSubcategory('')
        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: "" }
        })
        setPrice([0, 0])
        setCategiresId([])
        setStar('')
        fetchProduacts({ shipping:e.target.value })

    }
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    const { width, height } = windowDimensions
    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

    }, [])
    function getWindowDimensions() {
        const { innerWidth: width, innerHeight: height } = window;
        return {
            width,
            height
        };
    }
    return(
        <>
        <div className='container-fluid shop'>
                <div className='row mb-5'>
                <div className='col-md-3 bg-light  mb-5 filter ' >
                        <h4 className='text-center'>search/filter</h4>
                        <hr/>
                        <Menu mode='inline'
                            defaultOpenKeys={width > 450 ? ["1", '2', '3', '4', '5', '6', '7'] : ["1"]}>
                                {/* for price */}
                            <SubMenu key={1}
                                title={<div > <DollarCircleTwoTone /><span className='h6 pl-1 '>
                                    Price Between</span></div>
                               }>
                                <div>
                                    <Slider className='ml-4 mr-4' 
                                    tipFormatter={(v)=>`JD ${v}`} 
                                    range value={price}
                                        max='1000'
                                     onChange={handleSlider}>                                       
                                     </Slider>
                                </div>
                            </SubMenu>
                            {/* for category */}
                            <SubMenu key={2}
                                title={<div > <DownSquareOutlined /><span className='h6 pl-1 '>
                                   Categories</span></div>
                                }>
                                <div>
                                    {categories.map((c) => (<div key={c._id}>
                                        <Checkbox 
                                            onChange={handleCheck} 
                                            className='pb-2 pl-4 pr-4'
                                             value={c._id} 
                                             name="category"
                                             checked={categoriesId.includes(c._id)}
                                             >{c.name}
                                        </Checkbox>
                                    </div>
                                    ))}
                                </div>
                            </SubMenu>
                            <SubMenu key={3}
                                title={<div > <StarOutlined style={{color:'red'}} /><span className='h6 pl-1 '>
                                    Rating </span></div>
                                }>
                                <div>
                                    <div style={{ marginTop: '-10px' }}>{ showStars()}</div>    
                                </div>
                            </SubMenu>
                            {/* for subcategory */}
                            <SubMenu key={4}
                                title={<div > <DownSquareOutlined /><span className='h6 pl-1 '>
                                    SubCategories</span></div>
                                }>
                                <div style={{ marginTop: '-10px' }} className="pl-4 pr-2">{showSubCategories()}</div>    

                               
                            </SubMenu>
                            <SubMenu key={5}
                                title={<div > <TrademarkCircleOutlined spin={true} style={{ color: 'orange' }} /><span className='h6 pl-1 '>
                                    Brands</span></div>
                                }>
                                <div style={{ marginTop: '-10px' }} className="pl-4 pr-2">{showBrands()}</div>


                            </SubMenu>
                            <SubMenu key={6}
                                title={<div > <DownSquareOutlined /><span className='h6 pl-1 '>
                                    colors</span></div>
                                }>
                                <div style={{ marginTop: '-10px' }} className="pl-4 pr-2">{showColors()}</div>


                            </SubMenu>
                            {/* <SubMenu key={6}
                                title={<div > <BgColorsOutlined style={{color:'red'}}/><span className='h6 pl-1 '>
                                    colors</span></div>
                                }>
                                <div style={{ marginTop: '-10px' }} className="pl-4 pr-2">{showColors()}</div>


                            </SubMenu> */}
                           
                            {/* shipping */}
                            <SubMenu key={7}
                                title={<div > <CarOutlined   style={{ color: 'green' }} /><span className='h6 pl-1 '>
                                    shipping</span></div>
                                }>
                                <div style={{ marginTop: '-10px' }} className="pl-4 pr-2">{showShipping()}</div>


                            </SubMenu>
                        </Menu>
                        
                </div>
                <div className='col-md-9 '>
                        {loading ? (<LoadingCard count={4} />) :
                        
                        (<div className='row'>
                                {products.map((product) => (

                                    <div className='col-6 col-md-6 col-lg-4 '>
                                    <ProductsCard key={product} product={product} />
                                       </div>
                                ))}
                            
                        </div>)
                        }
                        {products.length < 1 && <div  className='text-center'><WarningFilled /></div>}
                </div>
            </div>
        </div>
        
        </>
    )
}


export default Shop