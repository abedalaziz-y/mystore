import axios from 'axios'


export const getUsersOrders = async (authtoken) =>
    await axios.get(`${process.env.REACT_APP_API}admin/orders`, {
        headers: {
            authtoken
        }
    })

export const changeStatus = async (orderId,orderStatus,authtoken) =>
    await axios.put(`${process.env.REACT_APP_API}admin/orders-status`, {orderId,orderStatus},{
        headers: {
            authtoken
        }
    })
 