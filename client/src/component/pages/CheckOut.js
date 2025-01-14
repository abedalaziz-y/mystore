import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
// import ReactQuill from "react-quill";
import './Home.css'
import PhoneInput from 'react-phone-number-input'
import { emptyUserCart, getUserCart, saveUserAddress, saveCartNotes, applyCoupon, saveCatrPhone, createCOD } from '../../functions/user';
import { useNavigate } from 'react-router-dom';
import { Tooltip } from 'antd';
import 'react-quill/dist/quill.snow.css';
const CheckOut = () => {
    const [country_calling_code, setCountry_calling_code] = useState(+962)
    const [country, setCountry] = useState("JO")
    const [check, setCheck] = useState(false)
    const [discountError, setDiscountError] = useState('')
    const [totalAfterDiscount, setTotalAfterDiscount] = useState(0)
    const [coupon, setCoupon] = useState('')
    const dispatch = useDispatch()
    const [notes, setNotes] = useState('')
    const [phone, setPhone] = useState(0)
    const [address, setAddress] = useState([])
    const [products, setProducts] = useState([])
    const [total, setTotal] = useState(0)
    const [Latitude, setLatitude] = useState()
    const [Longitude, setLongitude] = useState()
    const [addressSaved, setAddressSaved] = useState(false)
    const [locationButton, setLocationButton] = useState('Send Location ')
    const { user, COD } = useSelector((state) => ({ ...state }))
    const couponTrueOrFalse = useSelector((state) => (state.coupon))
    useEffect(() => {
        getUserCart(user.token).then((res) => {
            // console.log("user cart response", JSON.stringify(res.data, null, 4))
            setProducts(res.data.products)
            setTotal(res.data.cartTotal)
        })
        let interval;
        setTimeout(() => {

            fetch("https://ipapi.co/json/")
                // .then(res => res.json())
                .then(res => setCountry(res.country_code))
            // .then(res => setCountry_calling_code(res.country_calling_code))


            GetUserLocation(); // first time zero

            interval = setInterval(() => {
                GetUserLocation(); // after 30 second

            }, 3600000);
        }, 0)

    }, [])
    const GetUserLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            toast.error("Geolocation is not supported by this browser.")
        }
        function showPosition(position) {
            setLatitude(position.coords.latitude)
            setLongitude(position.coords.longitude)
            setAddress([...address, {
                latitude: position.coords.latitude
                , longitude: position.coords.longitude
            }])
            // let object = {};
            // object.latitude = position.coords.latitude
            // object.longitude = position.coords.longitude
            //     address.push(object)

        }

        // .then(res=>console.log(res))
    }
    const saveInfo = () => {
        if (!phone) {
            toast.error("Please Enter Phone Number!")
            return
        }
        if (phone.length < 13) {
            toast.error("Please Enter Full Phone Number!")
            return
        }
        if (!address) {
            toast.error("Please Send Location!")
            return
        }
        if (address && phone && phone.length === 13) {

            saveCartNotes(user.token, notes).then((res) => {
                if (res.data.ok) {
                    toast.success("Notes has been saved with order successfully")

                }

            })
            saveCatrPhone(user.token, phone).then((res) => {
                if (res.data.ok) {
                    toast.success("phone  saved with order successfully")

                }

            })
            navigate('/payment')
        }

    }
    const saveInfoWithCOD = () => {
        if (!phone) {
            toast.error("Please Enter Phone Number!")
            return
        }
        if (phone.length < 13) {
            toast.error("Please Enter Full Phone Number!")
            return
        }
        if (!address) {
            toast.error("Please Send Location!")
            return
        }


        saveCartNotes(user.token, notes).then((res) => {
            if (res.data.ok) {
                toast.success("Notes has been saved with order successfully")

            }

        })
        saveCatrPhone(user.token, phone).then((res) => {
            if (res.data.ok) {
                toast.success("phone  saved with order successfully")

            }

        })


        createCOD(user.token, COD, couponTrueOrFalse).then((res) => {
            // console.log("COD", res)
            //empty cart redux,loacal storeage,reset coupon,reset cod,redirecte to uhistory

            if (res.data.ok) {
                // loacal storeage, reset
                if (typeof window !== "undefined") {
                    localStorage.removeItem("cart")
                }
                //  empty cart redux
                dispatch({
                    type: "ADD_TO_CART",
                    payload: []
                })
            }
            //  empty coupon redux

            dispatch({
                type: "COUPON_APPLIED",
                payload: false
            })
            //  empty cod redux

            dispatch({
                type: "COD",
                payload: false
            })

            //empty cart from mongoose
            emptyUserCart(user.token).then((res) => {
                // console.log(res)
                setProducts([])
                setTotal(0)
                toast.success("Cart is empty.Continue Shopping")
            })
            setTimeout(() => {
                navigate('/user/history')
            }, 1000)
            //redirecte to uhistory
        })
    }
    const SaveAddressToDb = () => {
        // saveUserAddress(user.token)
        saveUserAddress(user.token, address).then((res) => {
            // console.log("save user address ",(res))
            if (res.data.ok) {
                setAddressSaved(true)
                toast.success("Locatin has been sent successfully")
                setLocationButton("update Location")
            }


        })
    }


    let navigate = useNavigate()
    const emptyCart = () => {

        //remove cart from local storeage
        if (typeof window !== "undefined") {
            localStorage.removeItem("cart")
        }
        //remove cart from redux 
        dispatch({
            type: "ADD_TO_CART",
            payload: []
        })
        //remove cart from mongoDB 
        emptyUserCart(user.token).then((res) => {
            // console.log(res)
            setProducts([])
            setTotal(0)
            toast.success("Cart is empty.Continue Shopping")
        })

        navigate('/cart')
    }
    const applyDiscountCoupon = () => {
        // console.log(coupon)
        applyCoupon(user.token, coupon).then((res) => {
            // console.log("coupon applied", res.data)
            if (res.data) {
                setTotalAfterDiscount(res.data)
                //update redux coupon applied true/false
                dispatch({
                    type: "COUPON_APPLIED",
                    payload: true
                })
                setCheck(true)
            }
            if (res.data.err) {
                setDiscountError(res.data.err)
                setCheck(false)
                //update redux coupon applied true/false
                dispatch({
                    type: "COUPON_APPLIED",
                    payload: false
                })
            }

        })
    }
    return (<>
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-md-6 mt-3'>
                    <textarea dir='auto' theme="snow" value={notes} onChange={(e)=>setNotes(e.target.value)} ></textarea>


                    {/* <div style={{ width: 500, height: 300 }}>
                        <div ref={quillRef} />
                    </div> */}
                    {/* <button disabled={!notes ||notes===""} className='btn btn-outline-warning btn-raised btn-block text-dark mt-2' onClick={SaveNotes} >Save Notes With Order</button> */}
                    <br />
                    <h4>Phone Number</h4>
                    <PhoneInput
                        className='w-25'
                        limitMaxLength='10'
                        international
                        withCountryCallingCode
                        countryCallingCodeEditable={false}
                        defaultCountry={country ? country : "JO"}
                        placeholder="Enter phone number"
                        value={phone}
                        onChange={setPhone} />
                    <br />
                    <h4 className='mt-2'>Delivery Address  </h4>

                    {/* Latitude:{JSON.stringify(Latitude)}Longitude :  {JSON.stringify(Longitude)} */}
                    {/*                    
                    {console.log("Latitude", Latitude)}
                    {console.log("Longitude", Longitude)}
                    {console.log("user address", address)} */}

                    {Latitude && Longitude ? (<iframe src={`https://www.google.com/maps?q=${Latitude},${Longitude}&hl=es;z=14&output=embed`} className='w-100'></iframe>) : GetUserLocation()}
                    <br />
                    <Tooltip visible={addressSaved === false} placement="bottom" title={"location are required!"}>   <button className='btn btn-success btn-raised  btn-block' onClick={SaveAddressToDb}>{locationButton}</button>

                    </Tooltip>
                    <hr />
                    <h4>Got Coupon?</h4>
                    {discountError && <div class="m-2 text-center alert alert-danger alert-dismissible fade show" role="alert">
                        <strong className='text-center'>{discountError}</strong>
                        <button type="button" class="close" data-bs-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>}
                    {totalAfterDiscount > 0 && (
                        <div class="m-2 text-center alert alert-success alert-dismissible fade show" role="alert">
                            <strong className='text-center'>Coupon Applied Successfully! check the Total</strong>
                            <button type="button" class="close" data-bs-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    )}
                    <input type='text'
                        disabled={totalAfterDiscount > 0}
                        onChange={e => {
                            setCoupon(e.target.value);
                            setDiscountError('')
                        }}
                        className=' text-uppercase form-control' value={coupon} />
                    <button className=' mb-5 btn btn-outline-info btn-raised mt-2'
                        onClick={applyDiscountCoupon} disabled={totalAfterDiscount > 0}>Coupon Applay</button>
                    <br />

                </div>


                <div className='col-md-6'>
                    <h4>Order summary </h4>
                    <hr />
                    <h6 className='text-center'>products/<b>{products.length}</b> </h6>
                    <hr />
                    <p>{products.map((p, i) => (
                        <>

                            <div key={i}>{p.product.title} x  ({p.count})</div>
                            <div>Colors: ({p.colors[0]} {p.colors[1]} {p.colors[2]}) </div>

                            <div> Price:{p.price}</div>
                        </>
                    )
                    )} </p>
                    <hr />
                    {check ? (<div><p>Cart total =<del className='text-danger'>{total} </del> JD</p>
                        <p>Cart Total After Discount= <b className='text-success'>{totalAfterDiscount}</b> JD</p>
                    </div>) : (<p >Cart total={total} JD</p>)}


                    <div className='row mb-5'>
                        <div className='col'>
                            {COD ? (<button className='btn btn-warning btn-raised mt-2 w-75'
                                disabled={addressSaved === false}
                                // onClick={() => navigate('/payment')}
                                onClick={saveInfoWithCOD}
                            >Place Order

                            </button>)
                                : <button className='btn btn-warning btn-raised mt-2 w-75'
                                    disabled={addressSaved === false}
                                    // onClick={() => navigate('/payment')}
                                    onClick={saveInfo}
                                >Place Order

                                </button>}

                        </div>
                        <div className='col'>
                            <button disabled={!products.length} onClick={emptyCart} className=' w-75 btn btn-outline-secondary btn-raised mt-2' >Empty Cart</button>

                        </div>
                    </div>

                </div>
            </div>

        </div>
    </>)
}
export default CheckOut