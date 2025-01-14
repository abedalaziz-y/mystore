import axios from 'axios'
export const CRUDUSER = async (authtoken,values) => {
    return await axios.post(`${process.env.REACT_APP_API}CRUDUSER`, values, {
        headers: {
            authtoken,  
        }
    })
}
export const CURRENTUSER = async (authtoken) => {
    return await axios.post(process.env.REACT_APP_API_CURRENTUSER, {}, {
        headers: {
            authtoken,
        }
    })
}
export const CURRENTADMIN = async (authtoken) => {
    return await axios.post(process.env.REACT_APP_API_CURRENTADMIN, {}, {
        headers: {
            authtoken,
        }
    })
}
