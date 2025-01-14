import React, { useEffect, useState } from 'react';
import './trader.css'
import PhoneInput from 'react-phone-number-input'
import { CREATETRADERINFO, GETTRADERINFO, UPDATETRADERINFO } from '../../../../functions/trader';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { DeleteOutlined, EditFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const CreateTrader = () => {
    const { user } = useSelector((state) => ({ ...state }))
    const [name, setName] = useState('')
    const [facebook, setFacebook] = useState('')
    const [instagram, setInstagram] = useState('')
    const [twitter, setTwitter] = useState('')
    const [editPhone, setEditPhone] = useState(false)
    const [phone, setPhone] = useState()
    const [about, setAbout] = useState('')
    const [oldPhone, setOldPhone] = useState(null)
    const [oldName, setOldName] = useState('')
    const [oldAbout, setOldAbout] = useState('')
    const [slug, setSlug] = useState('')
    let dispatch = useDispatch()
    let traderInfo = {
        facebook: facebook,
        instagram: instagram,
        twitter: twitter,
        name: name,
        phone: phone,
        about: about
    }
    const handleSubmit = (e) => {
        e.preventDefault()


        if (!oldPhone && !oldName && !oldAbout) {

            CREATETRADERINFO(traderInfo, user.token).then((res) => {
                //  console.log(res)
                toast.success("created success")
                window.location.reload()
                if (typeof window !== "undefined") {
                    localStorage.removeItem("trader")
                }
                //remove cart from redux 
                dispatch({
                    type: "TRADER",
                    payload: []
                })

            })
        } else {


            UPDATETRADERINFO(slug, user.token, traderInfo).then((res) => {
                toast.success("updated Successfully")
                //  console.log(res)
                if (typeof window !== "undefined") {
                    localStorage.removeItem("trader")
                }
                //remove cart from redux 
                dispatch({
                    type: "TRADER",
                    payload: []
                })

                window.location.reload()

            })



        }
    }

    useEffect(() => {
        GETTRADERINFO().then((res) => {
            // console.log(res.data)
            {
                res.data.map((m) => {
                    // setName(m.name)
                    // setAbout(m.about)
                    // setPhone(m.phone)
                    setName(m.name)
                    setAbout(m.about)
                    setOldPhone(m.phone)
                    setFacebook(m.facebook)
                    setInstagram(m.instagram)
                    setTwitter(m.twitter)
                    // console.log(m.about)
                    // console.log(m.phone)
                    setSlug(m.slug)
                    setOldName(m.name)
                    setOldAbout(m.about)
                })
            }
            let trader = res.data
            if (typeof window !== 'undefined') {
                if (localStorage.getItem('trader')) {
                    trader = JSON.parse(localStorage.getItem('trader'))
                }

                // console.log("cart update colors")
                localStorage.setItem('trader', JSON.stringify(trader))
                dispatch({
                    type: "TRADER",
                    payload: trader
                })
            }
        })
    }, [])



    return (<>
        <div className='container trader'>

            <div className='card borderd shadow text-center d-flex justify-content-center mb-5 '>
                <h1 className='text-center text-success'>Trdaer info</h1>
                {/* {JSON.stringify(name)}<br />
                {JSON.stringify("neew number",phone)}<br />
                {JSON.stringify(about)}<br />
                {JSON.stringify(slug)}<br />
                {JSON.stringify(traderInfo)}<br /> */}
                <form onSubmit={handleSubmit}>


                    <div className='col-auto d-flex justify-content-center'>
                        <div className="form-group mb-3">
                            <label > Trader name
                                <input
                                    required
                                    dir='auto'
                                    type="text" className="form-control form-control "
                                    placeholder="Enter name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)} /></label></div>

                    </div>
                    <div className='col-auto d-flex justify-content-center'>
                        <div className="form-group mb-3">
                            <label > Fcebook Link
                                <input
                                    required

                                    type="text" className="form-control form-control "
                                    placeholder="Enter FaceBook Link"
                                    value={facebook}
                                    onChange={(e) => setFacebook(e.target.value)} /></label></div>

                    </div>
                    <div className='col-auto d-flex justify-content-center'>
                        <div className="form-group mb-3">
                            <label > Instagram Link
                                <input
                                    required

                                    type="text" className="form-control form-control "
                                    placeholder="Enter instagram Link"
                                    value={instagram}
                                    onChange={(e) => setInstagram(e.target.value)} /></label></div>

                    </div>
                    <div className='col-auto d-flex justify-content-center'>
                        <div className="form-group mb-3">
                            <label > Twitter Link
                                <input
                                    required

                                    type="text" className="form-control form-control "
                                    placeholder="Enter FaceBook Link"
                                    value={twitter}
                                    onChange={(e) => setTwitter(e.target.value)} /></label></div>

                    </div>

                    <div className='col-auto'>
                        <label>  current Phone  <div class="input-group mb-3  d-flex justify-content-center"> <input dir='auto' disabled type="text" class="form-control" id="phone" value={oldPhone} />
                            <span class="input-group-text"><EditFilled className='text-warning' onClick={() => setEditPhone(true)} /></span> </div></label>
                    </div>
                    {editPhone === true && (<>
                        <div className="form-group mb-3">
                            <label className='mt-2'> Store Phone Number
                                <PhoneInput
                                    required
                                    limitMaxLength='10'
                                    international
                                    withCountryCallingCode
                                    countryCallingCodeEditable={false}
                                    defaultCountry={"JO"}
                                    placeholder="Enter phone number"
                                    value={phone}
                                    onChange={setPhone} /></label></div>
                    </>)}



                    <div className='col-auto'>
                        <div className="form-group mb-3">
                            <label >About Store
                                <textarea
                                    dir='auto'
                                    maxLength={150}
                                    cols={50} rows='10'
                                    type="text" className="form-control form-control "
                                    placeholder="Enter Store About"
                                    value={about}
                                    onChange={(e) => setAbout(e.target.value)} /></label></div>

                    </div>
                    {!about && !name && !phone ? '' : (<button type='submit' className='btn btn-primary'> Save</button>)}

                </form>



            </div>

        </div>

    </>)
}

export default CreateTrader