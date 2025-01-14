import axios from "axios";
// send cart debend user
export const userCart = async (cart, authtoken) => 
await axios.post(`${process.env.REACT_APP_API}user/cart`,{cart},{
    headers:{
        authtoken
    } 
})
    
//get cart debend user

export const getUserCart = async ( authtoken) =>
    await axios.get(`${process.env.REACT_APP_API}user/cart`,  {
        headers: {
            authtoken
        }
    })
//remove cart debend user
export const emptyUserCart = async (authtoken) =>
    await axios.delete(`${process.env.REACT_APP_API}user/cart`, {
        headers: {
            authtoken
        } 
    })

    //save user address
export const saveUserAddress = async (authtoken,address) =>
    await axios.post(`${process.env.REACT_APP_API}user/address`, {address}, {
        headers: {
            authtoken
        } 
    })

export const saveCartNotes = async (authtoken,notes) =>
    await axios.post(`${process.env.REACT_APP_API}user/cart/notes`, { notes }, {
        headers: {
            authtoken
        }
    })
export const saveCatrPhone = async (authtoken, phone) =>
    await axios.post(`${process.env.REACT_APP_API}user/cart/phone`, { phone }, {
        headers: {
            authtoken
        }
    })

export const applyCoupon = async (authtoken, coupon) =>
    await axios.post(`${process.env.REACT_APP_API}user/cart/coupon`, { coupon }, {
        headers: {
            authtoken
        }
    })
export const createOrder = async (authtoken,stripeResponse) =>
    await axios.post(`${process.env.REACT_APP_API}user/order`, { stripeResponse }, {
        headers: {
            authtoken
        }
    })
export const getUserOrders = async (authtoken) =>
    await axios.get(`${process.env.REACT_APP_API}user/orders`, {
        headers: { 
            authtoken 
        } 
    })
export const getWishlist = async (authtoken) =>
    await axios.get(`${process.env.REACT_APP_API}user/wishlist`, {
        headers: {
            authtoken
        }
    })
export const removeWishlist = async (productId,authtoken) =>
    await axios.put(`${process.env.REACT_APP_API}user/wishlist/${productId}`,{}, {
        headers: {
            authtoken
        }
    })
export const addToWishlist = async (productId, authtoken) =>
    await axios.post(`${process.env.REACT_APP_API}user/wishlist`, { productId }, {
        headers: {
            authtoken
        }
    })
export const createCOD = async (authtoken, COD, couponTrueOrFalse) =>
    await axios.post(`${process.env.REACT_APP_API}user/cod`, { couponApplied: couponTrueOrFalse,COD }, {
        headers: {
            authtoken
        }
    })
export const updateUserImages = async ( authtoken,images) =>
    await axios.put(`${process.env.REACT_APP_API}user/profile`, {images}, {
        headers: {
            authtoken
        }
    })
export const updateUserName = async (authtoken, name) =>
    await axios.put(`${process.env.REACT_APP_API}username/profile`, {name}, {
        headers: {
            authtoken
        }
    })

export const getUsersCount = async () =>
    await axios.get(`${process.env.REACT_APP_API}user/total`, {
     
    })
export const getUsersOrdersCount = async () =>
    await axios.get(`${process.env.REACT_APP_API}orders/total`, {

    })