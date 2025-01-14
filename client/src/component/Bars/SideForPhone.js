import React, {useState, useEffect } from 'react'
import { Drawer, Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import logo from '../../images/logo.png'
import { Menu, Badge } from 'antd';
import { Avatar, } from 'antd';
import './nav.css'
import firebase from 'firebase/compat/app';

import Side from './Side';
import { CategorySubCategoryForSide } from '../Homesections/Category_sub';
import {
    AppstoreOutlined,
    HistoryOutlined,
    StarOutlined,
    SafetyOutlined,
    UserOutlined,
    UserAddOutlined, DashboardOutlined, MoreOutlined,
    LogoutOutlined,
    ShoppingOutlined,
    ControlOutlined,
    ShoppingCartOutlinedوGoogleOutlined, ShoppingCartOutlined,
    GoogleOutlined
} from '@ant-design/icons'; 
import { toast } from 'react-toastify';

import { CRUDUSER } from '../../functions/auth';
import { auth, googleAuthProvider } from '../../firebase';

const { SubMenu, Item } = Menu
const logoPic = new URL("user.png", import.meta.url)

const SideForPhone = () => {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
    const { width, height } = windowDimensions
    const [top, setTop] = useState(0);
    const navigate = useNavigate();
    const [current, setCurrent] = useState('');
    const [isActive, setActive] = useState("false");
    let { user, cart, wishlist } = useSelector((state) => ({ ...state }))
    // console.log(wishlist)
    const [country_code, setCountry_code] = useState("Jo")
    const [city, setCity] = useState("city")
    const dispatch = useDispatch()
    const { sidebar } = useSelector((state) => ({ ...state }))
    const imgStyle = {
        width: '70%',
        height: '200px',
        objectFit: 'contain'
    }
    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }
     
}, [])
    const googleLogin = async () => {
        auth.signInWithPopup(googleAuthProvider).then(async (result) => {
            const { user } = result
            const idTokenResult = await user.getIdTokenResult()
            CRUDUSER(idTokenResult.token)
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
                            _id: res.data._id,
                            joinedTime: res.data.createdAt
                        }
                    })

                }).catch()
            // navigate("/")
        }).catch((error) => {
            toast.error(error.message)
        })
    }
    const handleClick = (event) => {

        setCurrent(event.key);
    };
    const logout = () => {
        firebase.auth().signOut()
        dispatch({
            type: "LOGE_OUT",
            payload: null
        })
        dispatch({
            type: "WISHLIST",
            payload: []
        })
        localStorage.removeItem('wishlist')

        navigate("/login")
    }
   
    function getWindowDimensions() {
        const { innerWidth: width, innerHeight: height } = window;
        return {
            width,
            height
        };
    }
    return (
        <Drawer 
           
            width='65%'
            placement='right'
            className='text-center scroll'
            onClose={() => {
                /// close sideDrawe
                dispatch({
                    type: "SET_SIDE",
                    payload: false,
                });
            }} visible={sidebar}>
           <Menu  className='pc' onClick={handleClick} selectedKeys={[current]} mode="vertical">

                {!user && (<span className="avatar-item d-flex justify-content-center">
                    <Badge count={1} offset={[-10, 10]}>
                        <Avatar size={105} shape="circle" icon={<UserOutlined />} />
                    </Badge>
                </span>
                )}  
                              

                {!user && (<Item className="d-flex justify-content-center ">
                    <Link onClick={() => {
                        /// close sideDrawe
                        dispatch({
                            type: "SET_SIDE",
                            payload: false,
                        }); }} className='btn btn-sm btn-outline-dark w-100' to="/login">Login</Link>
                    </Item>
                )}
                {!user && (<div lassName="d-flex justify-content-center ">
                    <button className=" rounded btn btn-danger w-100 border-white "  onClick={googleLogin} > Log in with <GoogleOutlined style={{ fontSize: '20px' }} /> </button>
                </div>
                )}    
               
                {user && user.role === "subscriber" && user.picture.length > 0 &&(
                    <><div className="d-flex justify-content-center ">
                        <Avatar src={user.picture[0].url || logoPic} shape="circle" size={{
                            xs: 100,
                            sm: 100,
                            md: 100,
                            lg: 100,
                            xl: 100,
                            xxl: 100,
                        }}></Avatar></div><br />
                        <h5 className='text-center mt-2'>{user.name || user.email && user.email.split('@')[0]/*  ||user.displayName this used for show the first section of email */}</h5>
                        {user && user.role === "subscriber" && (<button className='btn btn-outline w-100'><Item icon={<HistoryOutlined style={{ fontSize: '16px', color: 'green' }} />}
                            ceventkey='setting:1'>
                            <Link to="/user/history "> History</Link>
                        </Item></button>)}
                        {user && user.role === "subscriber" && (<button className='btn btn-outline w-100'><Item ceventkey='setting:1' icon={<UserOutlined style={{ fontSize: '15px', color: 'blue' }} />} >
                            <Link to="/user/profile"> Profile</Link>
                        </Item></button>)}
                        {user && (<button className='btn btn-outline w-100'><Item className={wishlist.length > 0 ? "text-success" : "text-mutted"} key="wishlist" icon={<StarOutlined />}>
                            <Link to="/user/wishlist">

                                <Badge className={wishlist.length > 0 ? "text-success" : "text-mutted"} count={wishlist.length} offset={[9, 0]} >
                                    wishlist
                                </Badge>
                            </Link>

                        </Item></button>)}
                        {user && user.role === "subscriber" && (<button className='btn btn-outline w-100'><Item ceventkey='setting:1' icon={<SafetyOutlined style={{ fontSize: '15px', color: 'purple' }} />}>
                            <Link to="/user/password"> Password</Link>
                        </Item></button>)}
                        {user && user.role === "admin" && (<button className='btn btn-outline w-100'><Item eventkey='setting:1' >
                            <Link className="nav-link  " to="/admin/dashboard">Dashboard</Link>
                        </Item></button>)}



                        <button className='btn btn-outline w-100'> <Item icon={<LogoutOutlined style={{ fontSize: '16px', color: 'red' }} />} onClick={logout}>
                            log out
                        </Item></button>
                    </>
                )}
                {user && user.role === "subscriber" && user.picture.length < 1 && (
                    <><div className="d-flex justify-content-center ">
                        <Avatar src={user.img || logoPic} shape="circle" size={{
                            xs: 100,
                            sm: 100,
                            md: 100,
                            lg: 100,
                            xl: 100,
                            xxl: 100,
                        }}></Avatar></div><br />
                        <h5 className='text-center mt-2'>{user.name || user.email && user.email.split('@')[0]/*  ||user.displayName this used for show the first section of email */}</h5>
                        {user && user.role === "subscriber" && (<button className='btn btn-outline w-100'><Item icon={<HistoryOutlined style={{ fontSize: '16px', color: 'green' }} />}
                            ceventkey='setting:1'>
                            <Link to="/user/history "> History</Link>
                        </Item></button>)}
                        {user && user.role === "subscriber" && (<button className='btn btn-outline w-100'><Item ceventkey='setting:1' icon={<UserOutlined style={{ fontSize: '15px', color: 'blue' }} />} >
                            <Link to="/user/profile"> Profile</Link>
                        </Item></button>)}
                        {user && (<button className='btn btn-outline w-100'><Item className={wishlist.length > 0 ? "text-success" : "text-mutted"} key="wishlist" icon={<StarOutlined />}>
                            <Link to="/user/wishlist">

                                <Badge className={wishlist.length > 0 ? "text-success" : "text-mutted"} count={wishlist.length} offset={[9, 0]} >
                                    wishlist
                                </Badge>
                            </Link>

                        </Item></button>)}
                        {user && user.role === "subscriber" && (<button className='btn btn-outline w-100'><Item ceventkey='setting:1' icon={<SafetyOutlined style={{ fontSize: '15px', color: 'purple' }} />}>
                            <Link to="/user/password"> Password</Link>
                        </Item></button>)}
                        {user && user.role === "admin" && (<button className='btn btn-outline w-100'><Item eventkey='setting:1' >
                            <Link className="nav-link  " to="/admin/dashboard">Dashboard</Link>
                        </Item></button>)}



                        <button className='btn btn-outline w-100'> <Item icon={<LogoutOutlined style={{ fontSize: '16px', color: 'red' }} />} onClick={logout}>
                            log out
                        </Item></button>
                    </>
                )}
                {user && user.role === "admin" && user.picture.length > 0 && (


                    // <SubMenu className='  navbar-brand ms-auto ' icon={(<img  className='navimg' alt="user pic" src={user.picture && (user.picture[0].url) || user.img && (user.img) || !user.img && (logoPic) }  />)  } eventkey="UserName" 
                 <> <div className="d-flex justify-content-center ">
                        <Avatar  src={user.picture[0].url ||logoPic} shape="circle" size={{
                            xs: 100,
                            sm: 100,
                            md: 100,
                            lg: 100,
                            xl: 100,
                            xxl: 100,
                        }}></Avatar></div><br/>
                        <h5 className='text-center mt-2'>(Admin){user.name || user.email && user.email.split('@')[0]/*  ||user.displayName this used for show the first section of email */}</h5> 


                        {/* <img className="img-fluid" src={user.picture.url} width="160"/> */}
                        {/* { user.joinedTime &&(user.joinedTime.split('T')[0])||'Dashbored'} */}
                        {user && user.role === "subscriber" && (<button className='btn btn-outline w-100'><Item ceventkey='setting:1'>
                            <Link className="nav-link w-100  " to="/user/history"> History</Link>
                        </Item></button>)}
                        {user && user.role === "admin" && (<button className='btn btn-outline w-100'><Item eventkey='setting:2' icon={<DashboardOutlined style={{ fontSize: '15px', color: 'blue' }} />} >
                            <Link to="/admin/dashboard">DashBoard</Link>
                        </Item></button>)}
                        {user && user.role === "admin" && (<button className='btn btn-outline w-100'><Item icon={<HistoryOutlined style={{ fontSize: '16px', color: 'green' }} />}
                            ceventkey='setting:1'>
                            <Link to="/user/history"> History</Link>
                        </Item></button>)}
                        {user && user.role === "admin" && (<button className='btn btn-outline w-100'><Item ceventkey='setting:1' icon={<UserOutlined style={{ fontSize: '15px', color: 'blue' }} />} >
                            <Link to="/user/profile"> Profile</Link>
                        </Item></button>)}
                        {user && (<button className='btn btn-outline w-100'><Item className={wishlist.length > 0 ? "text-success" : "text-mutted"} key="wishlist" icon={<StarOutlined />}>
                            <Link to="/user/wishlist">

                                <Badge className={wishlist.length > 0 ? "text-success" : "text-mutted"} count={wishlist.length} offset={[9, 0]} >
                                    wishlist
                                </Badge>
                            </Link>

                        </Item></button>)}
                        {user && user.role === "admin" && (<button className='btn btn-outline w-100'><Item ceventkey='setting:1' icon={<SafetyOutlined style={{ fontSize: '15px', color: 'purple' }} />}>
                            <Link to="/user/password"> Password</Link>
                        </Item></button>)}


                        <button className='btn btn-outline w-100'> <Item icon={<LogoutOutlined style={{ fontSize: '16px', color: 'red' }} />} onClick={logout}>
                            log out
                        </Item></button>

                 </>
                )}
                {user && user.role === "admin" && user.picture.length < 1 &&  (


                    // <SubMenu className='  navbar-brand ms-auto ' icon={(<img  className='navimg' alt="user pic" src={user.picture && (user.picture[0].url) || user.img && (user.img) || !user.img && (logoPic) }  />)  } eventkey="UserName" 
                    <> <div className="d-flex justify-content-center ">
                        <Avatar src={user.img|| logoPic} shape="circle" size={{
                            xs: 100,
                            sm: 100,
                            md: 100,
                            lg: 100,
                            xl: 100,
                            xxl: 100,
                        }}></Avatar></div><br />
                        <h5 className='text-center mt-2'>(Admin){user.name || user.email && user.email.split('@')[0]/*  ||user.displayName this used for show the first section of email */}</h5>


                        {/* <img className="img-fluid" src={user.picture.url} width="160"/> */}
                        {/* { user.joinedTime &&(user.joinedTime.split('T')[0])||'Dashbored'} */}
                        {user && user.role === "subscriber" && (<button className='btn btn-outline w-100'><Item ceventkey='setting:1'>
                            <Link className="nav-link w-100  " to="/user/history"> History</Link>
                        </Item></button>)}
                        {user && user.role === "admin" && (<button className='btn btn-outline w-100'><Item eventkey='setting:2' icon={<DashboardOutlined style={{ fontSize: '15px', color: 'blue' }} />} >
                            <Link to="/admin/dashboard">DashBoard</Link>
                        </Item></button>)}
                        {user && user.role === "admin" && (<button className='btn btn-outline w-100'><Item icon={<HistoryOutlined style={{ fontSize: '16px', color: 'green' }} />}
                            ceventkey='setting:1'>
                            <Link to="/user/history"> History</Link>
                        </Item></button>)}
                        {user && user.role === "admin" && (<button className='btn btn-outline w-100'><Item ceventkey='setting:1' icon={<UserOutlined style={{ fontSize: '15px', color: 'blue' }} />} >
                            <Link to="/user/profile"> Profile</Link>
                        </Item></button>)}
                        {user && (<button className='btn btn-outline w-100'><Item className={wishlist.length > 0 ? "text-success" : "text-mutted"} key="wishlist" icon={<StarOutlined />}>
                            <Link to="/user/wishlist">

                                <Badge className={wishlist.length > 0 ? "text-success" : "text-mutted"} count={wishlist.length} offset={[9, 0]} >
                                    wishlist
                                </Badge>
                            </Link>

                        </Item></button>)}
                        {user && user.role === "admin" && (<button className='btn btn-outline w-100'><Item ceventkey='setting:1' icon={<SafetyOutlined style={{ fontSize: '15px', color: 'purple' }} />}>
                            <Link to="/user/password"> Password</Link>
                        </Item></button>)}


                        <button className='btn btn-outline w-100'> <Item icon={<LogoutOutlined style={{ fontSize: '16px', color: 'red' }} />} onClick={logout}>
                            log out
                        </Item></button>

                    </>
                )}

             
                {/* {user && user.role === "admin" && (  <Item onClick={handleToggle} key="admintool" icon={<ControlOutlined />}>
                    C Panel 
                </Item>)} */}


               

                

            </Menu>
            {/* {!user&&(<Menu>
                <Item className='btn btn-sm btn-outline w-100' key="shop" icon={<ShoppingOutlined />}>
                    <Link to="/shop">Shop</Link>

                </Item>
                <Item className={cart.length > 0 ? "text-success btn btn-sm btn-outline w-100" : "text-mutted btn btn-sm btn-outline w-100"} key="cart" icon={<ShoppingCartOutlined />}>
                    <Link to="/cart">

                        <Badge className={cart.length > 0 ? "text-success" : "text-mutted"} count={cart.length} offset={[9, 0]} >
                            Cart
                        </Badge>
                    </Link>

                </Item></Menu>)} */}
            {/* <CategorySubCategoryForSide /> */}
        </Drawer>
    )
}
export default SideForPhone