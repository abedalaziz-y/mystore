import React from 'react'
import ReactDOM from 'react-dom'
import  {useEffect} from 'react';
import { useSelector } from 'react-redux';
import { RedirectLoading } from './RdirectLoading';
import UpdateSubCategory from '../AdminPages/SubCategory/update';
import { CURRENTADMIN } from '../../../functions/auth';
// import History from '../userPages/History';
// import Wishlist from '../userPages/Wishlist';
// import Password from '../userPages/Password';
import { useState } from 'react';
import AdminDashboard from '../AdminPages/DashBoard/DashBoard';
import ManegeOrders from '../AdminPages/orders';
import Create from '../AdminPages/category/create';
import UpdateCategory from '../AdminPages/category/update';
import SubCategory from '../AdminPages/SubCategory/Create';
import ProductCreate from '../AdminPages/product/create';
import AllProducts from '../AdminPages/product/Allproducts';
import ProductUpdate from '../AdminPages/product/ProductUpdate';
import CreateCoupons from '../AdminPages/coupon/createCoupon'
import CreateColor from '../AdminPages/colors/create';
import CreateBrand from '../AdminPages/brand/create';
import CreateTrader from '../AdminPages/trader/create';
const AdminDash = () => {
    // let navigate=useNavigate()
    const { user } = useSelector((state) => ({ ...state }))
    const [ok, setOk] = useState(false)

    useEffect(() => {
        if (user && user.token) {
            CURRENTADMIN(user.token)
                .then(res => {
                    console.log('current admin response', res)
                    setOk(true)
                }).catch(err => {
                    console.log(err)
                    setOk(false)
                })
        }
    }, [user])
    if (ok === false) {
        return <RedirectLoading />
    }
    return ok ? <AdminDashboard /> : <RedirectLoading />
}
const AdminOrders = () => {
    // let navigate=useNavigate()
    const { user } = useSelector((state) => ({ ...state }))
    const [ok,setOk]=useState(false)

    useEffect(()=>{
        if(user &&user.token){
            CURRENTADMIN(user.token)
            .then(res=>{
                console.log('current admin response',res)
                setOk(true)
            }).catch(err=>{
                console.log(err)
                setOk(false)
            })
        }
    },[user])
    if (ok===false){
      return  <RedirectLoading />
    }
    return ok ? <ManegeOrders /> :  <RedirectLoading />
}
const AdminRouteCreate = () => {
    // let navigate=useNavigate()
    const { user } = useSelector((state) => ({ ...state }))
    const [ok, setOk] = useState(false)

    useEffect(() => {
        if (user && user.token) {
            CURRENTADMIN(user.token)
                .then(res => {
                  
                    setOk(true)
                }).catch(err => {
                    console.log(err)
                    setOk(false)
                })
        }
    }, [user])
  
    return ok ? <Create /> : <RedirectLoading />
}
const AdminRouteCreateColor = () => {
    // let navigate=useNavigate()
    const { user } = useSelector((state) => ({ ...state }))
    const [ok, setOk] = useState(false)

    useEffect(() => {
        if (user && user.token) {
            CURRENTADMIN(user.token)
                .then(res => {

                    setOk(true)
                }).catch(err => {
                    console.log(err)
                    setOk(false)
                })
        }
    }, [user])

    return ok ? <CreateColor /> : <RedirectLoading />
}
const AdminRouteCreateBrand = () => {
    // let navigate=useNavigate()
    const { user } = useSelector((state) => ({ ...state }))
    const [ok, setOk] = useState(false)

    useEffect(() => {
        if (user && user.token) {
            CURRENTADMIN(user.token)
                .then(res => {

                    setOk(true)
                }).catch(err => {
                    console.log(err)
                    setOk(false)
                })
        }
    }, [user])

    return ok ? <CreateBrand /> : <RedirectLoading />
}
const AdminRouteCreatePeoduct = () => {
    // let navigate=useNavigate()
    const { user } = useSelector((state) => ({ ...state }))
    const [ok, setOk] = useState(false)

    useEffect(() => {
        if (user && user.token) {
            CURRENTADMIN(user.token)
                .then(res => {

                    setOk(true)
                }).catch(err => {
                    console.log(err)
                    setOk(false)
                })
        }
    }, [user])

    return ok ? <ProductCreate /> : <RedirectLoading />
}
const AdminRouteupdate = () => {
    // let navigate=useNavigate()
    const { user } = useSelector((state) => ({ ...state }))
    const [ok, setOk] = useState(false)

    useEffect(() => {
        if (user && user.token) {
            CURRENTADMIN(user.token)
                .then(res => {
                   
                    setOk(true)
                }).catch(err => {
                    console.log(err)
                    setOk(false)
                })
        }
    }, [user])

    return ok ? <UpdateCategory /> : <RedirectLoading />
}

const AdminRouteSubCategory = () => {
    // let navigate=useNavigate()
    const { user } = useSelector((state) => ({ ...state }))
    const [ok, setOk] = useState(false)

    useEffect(() => {
        if (user && user.token) {
            CURRENTADMIN(user.token)
                .then(res => {

                    setOk(true)
                }).catch(err => {
                    console.log(err)
                    setOk(false)
                })
        }
    }, [user])

    return ok ? <SubCategory /> : <RedirectLoading />
}
const AdminRouteupdateSub = () => {
    // let navigate=useNavigate()
    const { user } = useSelector((state) => ({ ...state }))
    const [ok, setOk] = useState(false)

    useEffect(() => {
        if (user && user.token) {
            CURRENTADMIN(user.token)
                .then(res => {

                    setOk(true)
                }).catch(err => {
                    console.log(err)
                    setOk(false)
                })
        }
    }, [user])

    return ok ? <UpdateSubCategory /> : <RedirectLoading />
}
const AllProductsRoute = () => {
    // let navigate=useNavigate()
    const { user } = useSelector((state) => ({ ...state }))
    const [ok, setOk] = useState(false)

    useEffect(() => {
        if (user && user.token) {
            CURRENTADMIN(user.token)
                .then(res => {

                    setOk(true)
                }).catch(err => {
                    console.log(err)
                    setOk(false)
                })
        }
    }, [user])

    return ok ? <AllProducts /> : <RedirectLoading />
}

const AdminRouteupdateProduct = () => {
    // let navigate=useNavigate()
    const { user } = useSelector((state) => ({ ...state }))
    const [ok, setOk] = useState(false)

    useEffect(() => {
        if (user && user.token) {
            CURRENTADMIN(user.token)
                .then(res => {

                    setOk(true)
                }).catch(err => {
                    console.log(err)
                    setOk(false)
                })
        }
    }, [user])

    return ok ? <ProductUpdate /> : <RedirectLoading />
}
const AdminRouteCreateCoupons = () => {
    // let navigate=useNavigate()
    const { user } = useSelector((state) => ({ ...state }))
    const [ok, setOk] = useState(false)

    useEffect(() => {
        if (user && user.token) {
            CURRENTADMIN(user.token)
                .then(res => {

                    setOk(true)
                }).catch(err => {
                    console.log(err)
                    setOk(false)
                })
        }
    }, [user])

    return ok ? <CreateCoupons /> : <RedirectLoading />
}
const AdminRouteCreateTrader = () => {
    // let navigate=useNavigate()
    const { user } = useSelector((state) => ({ ...state }))
    const [ok, setOk] = useState(false)

    useEffect(() => {
        if (user && user.token) {
            CURRENTADMIN(user.token)
                .then(res => {

                    setOk(true)
                }).catch(err => {
                    console.log(err)
                    setOk(false)
                })
        }
    }, [user])

    return ok ? <CreateTrader /> : <RedirectLoading />
}
// user && user.token ? <History /> :

// const PasswordRout = () => {
//     // let navigate=useNavigate()
//     const { user } = useSelector(state => ({ ...state }))
//     return user && user.token ? <Password /> : <RedirectLoading />
// }
// const WishlistRout = () => {
//     // let navigate=useNavigate()
//     const { user } = useSelector(state => ({ ...state }))
//     return user && user.token ? <Wishlist /> : <RedirectLoading />
// }

// export { UserRoute, PasswordRout, WishlistRout }
export {
    AdminDash, AdminOrders, AdminRouteCreate, AdminRouteupdate, AdminRouteSubCategory, AdminRouteupdateSub,
    AdminRouteupdateProduct, AdminRouteCreatePeoduct, AllProductsRoute, 
    AdminRouteCreateCoupons, AdminRouteCreateColor, AdminRouteCreateBrand, AdminRouteCreateTrader }