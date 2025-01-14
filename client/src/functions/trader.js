import axios from 'axios'

export const CREATETRADERINFO=async(traderinfo,authtoken)=>{
    return await axios.post(`${process.env.REACT_APP_API}trader`, traderinfo, {
        headers: {
            authtoken,
        }
    })
}

export const GETTRADERINFO=async()=>{
    return await axios.get(`${process.env.REACT_APP_API}trader`, {
     
    })
}
export const UPDATETRADERINFO = async (slug, authtoken, traderinfo) => {
    return await axios.put(`${process.env.REACT_APP_API}trader/${slug}`, traderinfo, {
        headers: {
            authtoken,
        }
    })}