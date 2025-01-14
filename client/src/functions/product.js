import axios from 'axios' 

export const CREATEPRODUCT = async (product, authtoken) => {
    return await axios.post(`${process.env.REACT_APP_API}product`, product, {
        headers: {
            authtoken,
        }
    })
}
export const CREATECOLOR = async (color, authtoken) => {
    return await axios.post(`${process.env.REACT_APP_API}colors`, color, {
        headers: {
            authtoken,
        }
    })
}

export const GETCOLORS = async () => {
    return await axios.get(`${process.env.REACT_APP_API}colors`)
}
export const REMOVECOLOR = async (slug, authtoken) => {
    return await axios.delete(`${process.env.REACT_APP_API}colors/${slug}`, {
        headers: {
            authtoken,
        }
    })
}

//////////////////brands
export const CREATEBRAND = async (brand, authtoken) => {
    return await axios.post(`${process.env.REACT_APP_API}brand`, brand, {
        headers: {
            authtoken,
        }
    })
}

export const GETBRANDS = async () => {
    return await axios.get(`${process.env.REACT_APP_API}brand`)
}
export const REMOVEBRAND = async (slug, authtoken) => {
    return await axios.delete(`${process.env.REACT_APP_API}brand/${slug}`, {
        headers: {
            authtoken,
        }
    })
}
export const GETPRODUCTBYCOUNT = async (count) => {
    return await axios.get(`${process.env.REACT_APP_API}products/${count}`)
}

export const DELETEEPRODUCT = async (slug, authtoken) => {
    return await axios.delete(`${process.env.REACT_APP_API}product/${slug}`, {
        headers: {
            authtoken,
        }
    }) 
}

export const GETPRODUCT = async (slug) => {
    return await axios.get(`${process.env.REACT_APP_API}product/${slug}`)
}

export const UPDATEPRODUCT = async (slug, product, authtoken) => {
    return await axios.put(`${process.env.REACT_APP_API}product/${slug}`, product, {
        headers: {
            authtoken,
        }
    })
}

export const GETBRODUCTS=async(sort,order,limit)=>{
    return await axios.post(`${process.env.REACT_APP_API}products`,{
        sort,order,limit
    })
}

export const GETPRODUCTSBYCOUNT= async () => {
    return await axios.get(`${process.env.REACT_APP_API}products/total`)
}

 
export const GETBRODUCTSLIST = async (sort, order, page) => {
    return await axios.post(`${process.env.REACT_APP_API}products/list`, {
        sort, order, page
    })
}
export const PRODUCTSTAR = async (productId, star, authtoken) => {
    return await axios.put(`${process.env.REACT_APP_API}product/star/${productId}`,
    {star },
     {
        headers: {
            authtoken,
        }
    })
}
export const RELATEDPRODUCTS = async (productId) => {
    return await axios.get(`${process.env.REACT_APP_API}product/related/${productId}`)
}

export const GETPRODUCTSBYFILLTER = async (arg) => {
    return await axios.post(`${process.env.REACT_APP_API}search/filters`,arg)
}
export const brandsCount = async () =>
    await axios.get(`${process.env.REACT_APP_API}brands/total`, {

    })
export const getColorsCount = async () =>
    await axios.get(`${process.env.REACT_APP_API}colors/total`, {

    })
