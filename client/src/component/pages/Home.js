import React, { useEffect, useState } from 'react';
import './Home.css'
import Jumbotron from './cards/Jumbotron';
import NewArrivlas from '../Homesections/NewArrivals';
import BestSellers from '../Homesections/BestSellers';
import { Link } from 'react-router-dom';
import {CategorySubCategory} from '../Homesections/Category_sub';
import { GETSUBCATEGORIES } from '../../functions/SubCategory';
import LowestPrice from '../Homesections/LowestPrice';
import BasedOnRating from '../Homesections/BasedOnRating';


const Home = () => {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    const [subCategories, setSubCategories] = useState([])
    const [scn]=useState([])

    useEffect(() => {


        const delayd = setTimeout(() => {
            GETSUBCATEGORIES().then((c) => {
                setSubCategories(c.data)
               c.data.map((m)=>(
                   scn.push(m.name)
               ))
                // console.log(scn)
              
                

            })
        }, 300)
        return () => clearTimeout(delayd)


    }, [scn]) 
  

  
   
   const jumbo=()=>{
            
       return(
                   <Jumbotron key={scn} text={scn}  >  </Jumbotron>
                  

               )
         
    
   }
    const { width } = windowDimensions
    useEffect(() => {
      
            setWindowDimensions(getWindowDimensions());
        

    }, [])
    function getWindowDimensions() {
        const { innerWidth: width, innerHeight: height } = window;
        return {
            width,
            height
        };
    }
    return (<div className='homepage container-fluid'>
        <div className='jumbotron  jumbotronNew w-100 bt-5  text-center h1 '>
          
          
            <b>{jumbo()}</b>
        </div>
       {width>450&&( <div className='   p-3 mb-5 ' ><CategorySubCategory/></div>)}
        <div className='  h3 '><b>New Arriveals</b><Link to="products/newarrivlas">
             <button className='btn btn-outline float-end'>Show All</button></Link></div>
       
       <div className='container'>
            <NewArrivlas />  
            </div> 
       
        <h4 className='  newarivlas p-3 mt-5 mb-5  text-center display-3 ' >Best Sellers <Link to="products/bestsellers"><button className='btn btn-outline float-end'>Show All</button></Link></h4>



        <div className='container'>
            
            
            <BestSellers />   </div> 
        <h4 className='   p-3 mt-5 mb-5  text-center display-3 ' >Lowest Price <Link to="products/lowestprice"><button className='btn btn-outline float-end'>Show All</button></Link></h4>

        <div className='container'>


            <LowestPrice />   </div> 
  
        <h4 className='   p-3 mt-5 mb-5  text-center display-6 ' >      Highest Rated
          
         
           <Link to="products/BasedOnRating"><button className='btn btn-outline float-end'>Show All</button></Link></h4>

       <div className='container'>


            <BasedOnRating />   </div> 
    </div>
    
    

        )



}
export default Home