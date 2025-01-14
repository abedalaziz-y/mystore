import React from 'react'
import ReactDOM from 'react-dom'
import { useSelector } from 'react-redux';
import {RedirectLoading} from './RdirectLoading';
import History from '../userPages/History';
import Wishlist from '../userPages/Wishlist';
import Password from '../userPages/Password';
import Profile from '../userPages/profile';
import Payment from '../payment';


const UserRoute=()=>{
    // let navigate=useNavigate()
    const { user } = useSelector(state => ({ ...state }))
    return user && user.token ?<History/> : <RedirectLoading/>
}
const PasswordRout = () => {
    // let navigate=useNavigate()
    const { user } = useSelector(state => ({ ...state }))
    return user && user.token ? <Password /> : <RedirectLoading />
}
const ProfileRoute = () => {
    // let navigate=useNavigate()
    const { user } = useSelector(state => ({ ...state }))
    return user && user.token ? <Profile /> : <RedirectLoading />
}
const WishlistRout = () => {
    // let navigate=useNavigate()
    const { user } = useSelector(state => ({ ...state }))
    return user && user.token ? <Wishlist /> : <RedirectLoading />
}
const PaymentRoute = () => {
    // let navigate=useNavigate()
    const { user } = useSelector(state => ({ ...state }))
    return user && user.token ? <Payment /> : <RedirectLoading />
}

export { UserRoute, PasswordRout, WishlistRout, ProfileRoute, PaymentRoute }