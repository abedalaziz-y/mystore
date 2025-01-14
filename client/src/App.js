import * as React from "react";
import { lazy,Suspense } from "react";
import firebase from "firebase/compat/app";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import 'antd/dist/antd.min.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "./firebase";
import { CURRENTUSER } from "./functions/auth";
import { UserRoute, PasswordRout, WishlistRout, ProfileRoute, PaymentRoute } from "./component/pages/Routes/User";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import AllProducts from "./component/pages/AdminPages/product/Allproducts";
import { useState } from "react";
import Payment from "./component/pages/payment";
import { getWishlist } from './functions/user';
import { GETTRADERINFO } from "./functions/trader";
import {
  AdminRoute, AdminRouteCreate, AdminRouteupdate, AdminRouteSubCategory, AdminRouteCreateBrand,
  AdminRouteAllProducts, AdminRouteupdateSub, AdminRouteCreatePeoduct,
  AllProductsRoute, AdminRouteupdateProduct, AdminRouteCreateCoupons, AdminRouteCreateColor, AdminRouteCreateTrader, AdminOrders, AdminDash
} from "./component/pages/Routes/admin";
import {

  LoadingOutlined, ShoppingCartOutlined

} from '@ant-design/icons';

///import with lazy
const Product = lazy(() => import('./component/product/product'))
const Login = lazy(() => import("./component/pages/Login"))
const Register = lazy(() => import("./component/pages/Register"))
const RegisterComplete = lazy(() => import("./component/pages/RegisterComplete"))
const Home = lazy(() => import("./component/pages/Home"))
const NavBar = lazy(() => import("./component/Bars/NavBar"))
const ResetPassword = lazy(() => import("./component/pages/ResetPassword"))
const NewArrivlas = lazy(() => import("./component/newArrivlas/NewArrivals"));
const BestSellers = lazy(() => import("./component/BestSellers/BestSellers"));
const SubCategoryProduct = lazy(() => import("./component/subCategory/subcategoryProducts"));
const CategoryProducts = lazy(() => import("./component/category/categoryProducts"));
const Shop = lazy(() => import("./component/pages/shop")) ;
const Cart = lazy(() => import("./component/pages/cart"));
const SideDrawer = lazy(() => import("./component/drawer/Drawer")) ;
const CheckOut = lazy(() => import("./component/pages/CheckOut")) ;
const LowestPrice = lazy(() => import("./component/lowestprice/LowestPrice")) ;
const BasedOnRating = lazy(() => import("./component/basedonrating/BasedOnRating")) ;
const Footer = lazy(() => import("./component/footer/Footer")) ;
const SideCool = lazy(() => import("./component/Bars/SideBar"));
const SideForPhone = lazy(() => import("./component/Bars/SideForPhone")) ;
const NewNave = lazy(() => import("./component/Bars/newNave"))

const App = () => {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  const { width, height } = windowDimensions
  const dispatch = useDispatch()
  const [color, setColor] = useState("black")
  const [wishlistlen, setWishlistlen] = useState()
  const { user,trader } = useSelector((state) => ({ ...state }))
  const [name, setName] = useState('')
  const [phone, setPhone] = useState()
  const [about, setAbout] = useState('')
  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
  }
  useEffect(() => {


    
    GETTRADERINFO().then((res) => {
      if (res.data) {
        dispatch(({
          type: "TRADER",
          payload: res.data
        }))
      }
    })
    setWindowDimensions(getWindowDimensions())

    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult()
        // console.log('user', user)

      


        CURRENTUSER(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: "LOGED_IN_USER",
              payload: {
                // this way we can get the info from fire base directelly 
                // email: user.email,
                // displayName: user.displayName,
                // token: idTokenResult.token  
                //and this way we  got the data from our backend server from resbonse
                name: res.data.name,
                email: res.data.email,
                role: res.data.role,
                img: user.photoURL,
                picture: res.data.picture,
                token: idTokenResult.token,
                _id: res.data._id
              }
            })

          }).catch(err => console.log(err))
       
      }
    })
    
    //clean
    return () => unsubscribe()
    
  }, [dispatch])
  // useEffect(() => {
  //   return firebase.auth().onIdTokenChanged(async (user) => {
  //     if (!user) {
  //       dispatch({
  //         type: "LOGE_OUT",
  //       });
  //       destroyCookie(null, "token");
  //       setCookie(null, "token", "", {});
  //     } else {
  //       const { token } = await user.getIdTokenResult();
     
  //       axiosAuth.post("/CURRENTUSER", {}).then((res) => {
  //         // console.log("RES =====> ", res);
  //         dispatch({
  //           type: "LOGED_IN_USER",
  //           payload: res.data,
  //         });
  //       });
  //     }
  //   });
  // }, []);

  useEffect(() => {
   
    let interval;
    setTimeout(() => {

     
      navigator.geolocation.getCurrentPosition()
 // first time zero
      componentDidMount()

      interval = setInterval(() => {
     // after 30 second
        componentDidMount()
        navigator.geolocation.getCurrentPosition()

      }, 3600000);
    }, 0)

  }, [])
  const componentDidMount=()=> {
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
          if (result.state === "granted") {
            console.log(result.state);
            //If granted then you can directly call your function here
          } else if (result.state === "prompt") {
            console.log(result.state);
          } else if (result.state === "denied") {
            //If denied then you have to show instructions to enable location
          }
          result.onchange = function () {
            console.log(result.state);
          };
        });
    } else {
      alert("Sorry Not available!");
    }
  }

    // .then(res=>console.log(res))
  
  return (
       
    <div className="App"  >
      <Suspense fallback={
        <div className="col text-center text-dark p-5 h4">
          ~Wiki St <LoadingOutlined style={{ color: 'gold' }} /> re 
    <ShoppingCartOutlined style={{ color: 'gold' }} />
        </div>
      }>
{width<500&&     ( <NewNave />)
}  
        {width > 500 && (<NavBar />)
        }  

    <SideDrawer/>
{user&&user.role==='admin'&&(<SideCool/>)}
      <SideForPhone />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        ltr={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Routes>
        <Route path="checkout" element={<CheckOut />} />
        <Route path="payment" element={<PaymentRoute />} />
        <Route path="/Admin/dashboard" element={<AdminDash />} />
        <Route path='*' element={<Home/>}/>
        <Route path="cart" element={<Cart />} />
        <Route path="Login" element={<Login />} />
        <Route path="ResetPassword" element={<ResetPassword />} />
        <Route path="Register" element={<Register />} />
        <Route path="/Register/complete" element={<RegisterComplete />} />
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/user/history" element={<UserRoute />} />
        <Route path="/user/profile" element={<ProfileRoute />} />
        <Route path="/user/Password" element={<PasswordRout />} />
        <Route path="/user/wishlist" element={<WishlistRout />} />
        <Route path="/Admin/orders" element={<AdminOrders />} />
        <Route path="/Admin/colors" element={<AdminRouteCreateColor />} />
        <Route path="/Admin/brands" element={<AdminRouteCreateBrand />} />
        <Route path="/Admin/trader" element={<AdminRouteCreateTrader />} />
        <Route path="/Admin/categories" element={<AdminRouteCreate />} />
        <Route path="/Admin/coupon" element={<AdminRouteCreateCoupons />} />
        <Route path="/Admin/category/:slug" element={<AdminRouteupdate />} />
        <Route path="/Admin/subcategory" element={<AdminRouteSubCategory />} />
        <Route path="/Admin/SubCategory/:slug" element={<AdminRouteupdateSub />} />
        <Route path="/Admin/product" element={<AdminRouteCreatePeoduct />} />
        <Route path="/Admin/products/:count" element={<AllProductsRoute />} />
        <Route path="/Admin/products" element={<AllProductsRoute />} />
        <Route path="/Admin/product/:slug" element={<AdminRouteupdateProduct />} />
        <Route path="products/newarrivlas" element={<NewArrivlas />} />
        <Route path="products/bestsellers" element={<BestSellers />} />
        <Route path="products/LowestPrice" element={<LowestPrice />} />
        <Route path="products/BasedOnRating" element={<BasedOnRating />} />
        <Route path="product/:slug" element={<Product />} />
        <Route path="/:slug/:slug" element={<SubCategoryProduct />} />
        <Route path="/:slug" element={<CategoryProducts />} />



      </Routes>
      {/* <Footer name={name} phone={phone} about={about}/> */}
      </Suspense>
    </div>
 );

}

export default App