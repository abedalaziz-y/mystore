import axios from 'axios'
export const GETSUBCATEGORIES = async () => {
    return await axios.get(`${process.env.REACT_APP_API}Subcategory`)
} 
export const READSUB = async () => {
    return await axios.get(`${process.env.REACT_APP_API}readsub`)
} 

export const GETSUBCATEGORY = async (slug) => {
    return await axios.get(`${process.env.REACT_APP_API}Subcategory/${slug}`)
}
export const GETSUBCATEGORYPRODUCTS = async (slug) => {
    return await axios.get(`${process.env.REACT_APP_API}subcategoryproducts/${slug}`)
}


export const REMOVESUBCATEGORY = async (slug, authtoken) => {
    return await axios.delete(`${process.env.REACT_APP_API}Subcategory/${slug}`, {
        headers: {
            authtoken,
        } 
    })
}

export const UPDATESUBCATEGORY = async (slug, authtoken, Subcategory) => {
    return await axios.put(`${process.env.REACT_APP_API}SubCategory/${slug}`, Subcategory, {
        headers: {
            authtoken,
        }
    })
}
export const CREATESUBCATEGORY = async (Subcategory, authtoken) => {
    return await axios.post(`${process.env.REACT_APP_API}Subcategory`, Subcategory, {
        headers: {
            authtoken,
        }
    })
}
export const getSubCount = async () =>
    await axios.get(`${process.env.REACT_APP_API}sub/total`, {
    })