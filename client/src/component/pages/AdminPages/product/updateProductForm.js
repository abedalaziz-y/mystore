import React from 'react'
import ReactDOM from 'react-dom'
import { useState } from 'react';

import { SyncOutlined, PlusOutlined } from '@ant-design/icons';
import { Select } from 'antd';
import { GETCATEGORIES } from '../../../../functions/category';
import {  Divider, Input , Typography, Space } from 'antd';

const UpdateProductform = ({ 
     selectedCategory, 
    setSubcategoriesarr,
    subcategoriesarr, 
    categories,
     subOptions, 
      handleSubmit,
       handleChange,
        values,
        setValues,
         loading,
          handlecategorychange }) => {
    const {

        title,
        description,
        price,
        category,
        // categories,
        subcategory,
        shipping,
        quantity,
        images,
        colors,
        brand,


    } = values
    const [name, setName] = useState([]);
    const [selectedItems, setSelectedItems] = useState([])
    const [items, setItems] = useState([]);
    let index = 0;

    const onNameChange = (event) => {
        setName(event.target.value);
    };

    const addItem = (e) => {
        e.preventDefault();
        setItems([...items, name || `New item ${index++}`]);
        selectedItems.push(name)
        setName('');

    };
    const { Option } = Select;

    return (



        <form onSubmit={handleSubmit} className='mt-3'>
            <div className="form-group">
                <h3 className="text-danger text-center">chose Category</h3>
                <select
                    name="category"
                    className="form-control"
                    onChange={handlecategorychange}
                    value={selectedCategory ? selectedCategory : category._id}
                >
                    {categories.length > 0 &&
                        categories.map((c) => (
                            <option key={c._id} value={c._id}>
                                {c.name}
                            </option>
                        ))}
                </select>
               
               
                <h3 className={  '  text-warning text-center '}>chose sub Category</h3>

                <Select
                    status={subOptions && ("success")}
                    className={ '  text-warning text-center '}
                    mode="multiple"
                    allowClear
                    size='large '
                    style={{ width: '100%' }}
                    placeholder="please select"
                    value={subcategoriesarr}
                    onChange={(value) => setSubcategoriesarr(value)}
                >
                   
                    {subOptions.length > 0 && subOptions.map((sub) =>
                    
                     <option className="text-primary" key={sub._id} value={sub._id}>{sub.name}</option>
                     
                     )}



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
                <select name="shipping" className="form-select form-select-lg " value={shipping==="Yes"?"Yes":"No"}
                    onChange={handleChange} >

                    <option value={"No"}>No</option>
                    <option value={"Yes"}>Yes</option>
                </select>
                <label className='mt-3'>quantity</label>
                <input dir='auto' type="number" className="form-control form-control-lg" name="quantity" placeholder="Enter product quantity"
                    value={quantity} onChange={handleChange} required />
                <label className='mt-3'>colors</label>
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
                    dir='auto'
                    value={colors}
                    onChange={(value) => setValues({ ...values, colors: value })}
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
                                <Input dir='auto' placeholder="Please enter item" value={name} onChange={onNameChange} />{ }
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
                        <Option key={item}>{item}</Option>
                    ))}
                </Select>
                {/* {JSON.stringify(colors)} */}
                <label className='mt-3'>brand</label>
                <input dir='auto' type="text" className="form-control form-control-lg " name="brand" placeholder="Enter product brand"
                    value={brand} onChange={handleChange} required />

            </div>
            <div className="form-group"><button className="btn btn-outline-info  btn-block w-100 mt-2" type="submit"
                disabled={title.length < 2 || !title || !price || !description || !quantity || !colors || !brand || !shipping}>{loading ? <SyncOutlined spin twoToneColor="#108fff" /> : (<h5 className="text-white">Update</h5>)}</button>
            </div>

        </form>

    )
}
export default UpdateProductform