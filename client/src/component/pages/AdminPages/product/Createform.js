import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { SyncOutlined } from '@ant-design/icons';

import { useState } from 'react';
import { Select, Divider, Input, Typography, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { GETCOLORS } from '../../../../functions/product';

const Productform = ({setValues, subOptions,showSubDropDown,handleSubmit, handleChange, values, loading, handlcategorychange})=>{
    const {
        title,
        description,
        price,
        category,
        categories,
        subcategory,
        shipping,
        quantity,
        images,
        colors,
        brand,
        

    }=values
    const[basicCOlors,setBasicCOlors]=useState([])
    const [name, setName] = useState([]);
    const[selectedItems,setSelectedItems]=useState([])
    const [items, setItems] = useState([]);
    let index = 0;
    const { Option } = Select;
    const onNameChange = (event) => {
        setName(event.target.value);
    };

    const addItem = (e) => {
        e.preventDefault();
        setItems([...items, name || `New item ${index++}`]);
        selectedItems.push(name)
        setName('');
       
    };
    // const getcolors=()=>{
    //     GETCOLORS().then((res)=>{
    //             setItems(res.data)
    //     })
    // }
//     useEffect(()=>{
// getcolors()
//     },[])
    return (
      

     
        <form onSubmit={handleSubmit} className='mt-3'>
            <div className="form-group">
                <h3 className="text-danger text-center">chose Category</h3>

                <select name="category" class="form-select form-select-lg mb-3" aria-label=".form-select-lg example" placeholder="Select a category"
                    onChange={handlcategorychange}>
                    <option className="text-muted">Open this select menu</option>
                    {categories.length > 0 && categories.map((c) => <option className="text-danger" key={c._id} value={c._id}>{c.name}</option>)}

                </select>
                <h3 className={showSubDropDown ? 'text-info text-center' : ' hide text-warning text-center '}>chose sub Category</h3>

                {/* <select name="category" class={showSubDropDown ? "form-select form-select-lg mb-3" : "form-select form-select-lg mb-3 hide"} aria-label=".form-select-lg example" placeholder="Select a category"
                    onChange={handlcategorychange}>
                    <option className="text-muted">Open this select menu</option>
                    {subOptions.length > 0 && subOptions.map((sub) => <option className="text-danger" key={sub._id} value={sub._id}>{sub.name}</option>)}

                </select> */}
                <Select
                    status={subOptions &&("success")}
                    className={showSubDropDown ? 'text-dark ' : ' hide text-warning text-center '}
                    mode="multiple"
                    allowClear
                    size='large '
                    style={{ width: '100%' }}
                    placeholder="Please select"
                   value={subcategory}
                    onChange={(value) => setValues({...values,subcategory:value})}
                >
                    {subOptions.length > 0 && subOptions.map((sub) => <option className="text-primary" key={sub._id} value={sub._id}>{sub.name}</option>)}
                
               
                </Select>

                <h3 className='text-center text-info mt-3'>title</h3>
                <input dir='auto' type="text" className="form-control form-control-lg " name="title" placeholder="Enter product title"
                    value={title} onChange={handleChange} required />
                <h3 className='text-center text-info mt-3'>description</h3>
                <input dir='auto' type="text" className="form-control form-control-lg " name="description" placeholder="Enter product description"
                    value={description} onChange={handleChange} required />
                <h3 className='text-center text-info mt-3'>price</h3>
                <input dir='auto' type="number" className="form-control form-control-lg " name="price" placeholder="Enter product price"
                    value={price} onChange={handleChange} required />
                <h3 className='text-center text-warning mt-3'>shipping?</h3>
                <select name="shipping" className="form-select form-select-lg " aria-label=".form-select-lg example"
                    onChange={handleChange}>
                    < option className="text-muted">select</option>
                    <option value={"No"}>No</option>
                    <option value={"Yes"}>Yes</option>
                </select>
                <label className='mt-3'>quantity</label>
                <input dir='auto' type="number" className="form-control form-control-lg " name="quantity" placeholder="Enter product quantity"
                    value={quantity} onChange={handleChange} required />
                <label className='mt-3' >colors</label>
                 {/* <select name="color" className="form-select form-select-md mb-3" aria-label=".form-select-lg "
                    onChange={handleChange}>
                    <option className="text-muted" >select color</option>
                    {colors.map((color) => (
                        <option key={color} value={color}>{color}</option>
                    ))}
                </select> */}
                <Select
                    mode="multiple"
                      allowClear
                    className='form-control form-control-lg '
                    value={colors}
                    onChange={(value) => setValues({ ...values, colors: value }) }
                    placeholder="custom dropdown render"
                    dropdownRender={(menu) => (
                        <>
                            {menu}
                            <Divider
                                style={{
                                    margin: '8px 0',
                                }}
                            />
                            <Space
                                align="center"
                                style={{
                                    padding: '0 8px 4px',
                                }}
                            >
                                <Input className='form-control form-control-lg mt-3' placeholder="Please enter item" value={name} onChange={onNameChange} />{}
                                <Typography.Link
                                    onClick={addItem}
                                    style={{
                                        whiteSpace: 'nowrap',
                                    }}
                                >
                                    <PlusOutlined /> Add item
                                </Typography.Link>
                            </Space>
                        </>
                    )}
                >
                    {items.map((item) => (
                        <Option key={item}>{item.name}</Option>
                    ))}
                </Select>
                {/* {JSON.stringify(basicCOlors)} */}
               
               {/* color input dir='auto'  */}
                {/* <input dir='auto' type="text" className="form-control form-control-lg " name="colors" placeholder="Enter first color"
                    value={colors} onChange={handleChange} required /> */}
                <label className='mt-3' >barnd</label>

                <input dir='auto' type="text" className="form-control form-control-lg " name="brand" placeholder="Enter product brand"
                    value={brand} onChange={handleChange} required />

            </div>
            <div className="form-group"><button className="btn btn-outline-info  text-dark btn-block w-100 mt-2" type="submit"
                disabled={title.length < 3 || !title || !price || !description || !quantity || !colors || !brand || !shipping}>{loading ? <SyncOutlined spin twoToneColor="#108fff" /> : (<h5 className="text-dark">Create</h5>)}</button>
            </div>

        </form>
        
    )
}
export default Productform