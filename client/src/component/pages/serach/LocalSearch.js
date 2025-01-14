import React from 'react';
import { Input } from 'antd';
const LocalSearch=({keyword,setKeyword})=>{
    const { Search } = Input;
    const handleSearch = (e) => {
        e.preventDefault()
        setKeyword(e.target.value.toLowerCase())
    }

    return(
        
            <Search
                placeholder="enter name"
                allowClear

                onChange={handleSearch}

                value={keyword}
            />
      
    )
}
export default LocalSearch