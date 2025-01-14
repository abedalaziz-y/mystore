import React from 'react';
import { Drawer,Button } from 'antd';
import { Link } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import logo from '../../images/logo.png'
const SideDrawer=()=>{
    const dispatch=useDispatch()
    const {drawer,cart}=useSelector((state)=>({...state}))
    const imgStyle={
        width:'100%',
        height: '200px',
        objectFit:'contain'
    }
    return(
    <Drawer 
    placement='right'
    className='text-center' 
    title={`Cart /${cart.length} Product`} 
    onClose={()=>{
            /// close sideDrawe
            dispatch({
                type: "SET_VISIBLE",
                payload: false,
            });     
    }} visible={drawer}>
        {cart.map((p)=>{
            return(
                <div key={p._id} className='row'>
                    <div className='col'>
                            {p.images[0]?
                            (<>
                                <img src={p.images[0].url} style={imgStyle} />
                                <h6 className='text-center text-white bg-secondary'>{p.title} x {p.count}</h6>
                            </>
                            )
                            :
                            (<>
                                <img src={logo} style={imgStyle} />
                                <h6 className='text-center text-white'>{p.title} x {p.count}</h6>
                            </>)
                        }
                    </div>
                </div>
            )
        })}
            <Link to='/cart' >
                <button onClick={()=>
                    dispatch({
                        type:"SET_VISIBLE",
                        payload:false
                    })
                } className='text-center btn btn-primary btn-raised btn-block'>
                    Go To Cart
            </button>
            </Link>
    </Drawer>
   )
}
export default SideDrawer