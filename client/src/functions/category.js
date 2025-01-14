import axios from 'axios'
export const GETCATEGORIES = async () => {
   return  await axios.get(`${process.env.REACT_APP_API}categories`)
}

export const GETCATEGORY = async (slug) => {
    return await axios.get(`${process.env.REACT_APP_API}category/${slug}`)
}

export const GETCATEGORYPRODUCTS = async (slug) => {
    return await axios.get(`${process.env.REACT_APP_API}categoryproducts/${slug}`)
}

export const REMOVECATEGORY = async (slug,authtoken) => {
    return await axios.delete(`${process.env.REACT_APP_API}category/${slug}`,{
        headers:{
            authtoken,
        }
    })
}

export const UPDATECATEGORY = async (slug, authtoken,category) => {
    return await axios.put(`${process.env.REACT_APP_API}category/${slug}`, category, {
        headers: {
            authtoken,
        }
    })
}
export const CREATECATEGORY = async (category, authtoken) => {
    return await axios.post(`${process.env.REACT_APP_API}category`,category, {
        headers: {
            authtoken,
        } 
    })
}
export const GETCATEGORYSUBCATEGORY = async (_id) => {
    return await axios.get(`${process.env.REACT_APP_API}category/subcategory/${_id}`)
}
export const getCategoriesCount = async () =>
    await axios.get(`${process.env.REACT_APP_API}categorycount/total`, {

    })