import React, { useContext, useEffect, useState } from 'react'
import './updateprofile.css'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { GlobalState } from '../../GlobalState'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpadateProfile = () => {
    const state = useContext(GlobalState)
    const [isLogged] = state.userAPI.isLogged
    const [isAdmin] = state.userAPI.isAdmin
    const [isDoctor] = state.userAPI.isDoctor
    const [isPharmacist] = state.userAPI.isPharmacist
    const [userDetails] = state.userAPI.userDetails
    const [images, setImages] = useState(false)
    const [loading, setLoading] = useState(false)
    const [token] = state.token
    const history = useNavigate()
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [service, setService] = useState('')
    const [speciality, setSpeciality] = useState('')
    const [officialMail, setOfficialMail] = useState('')
    const [logo, setLogo] = useState('')

    useEffect(() => {
        setName(userDetails.name)
        setLogo(userDetails.logo)
        if (isDoctor) {
            setPhone(userDetails.doctor?.phone)
            setService(userDetails.doctor?.service)
            setSpeciality(userDetails.doctor?.speciality)
        }
        if (isPharmacist) {
            setPhone(userDetails.pharmacist?.phone)
            setOfficialMail(userDetails.pharmacist?.officialMail)

        }
    }, [userDetails, isDoctor, isPharmacist, images])

    const handleName = (e) => {
        setName(e.target.value);
    }

    const handlePhone = (e) => {
        setPhone(e.target.value);
    }

    const handleService = (e) => {
        setService(e.target.value);
    }
    const handleSpeciality = (e) => {
        setSpeciality(e.target.value);
    }
    const handleOfficialMail = (e) => {
        setOfficialMail(e.target.value);
    }

    const handleUpload = async e => {
        e.preventDefault()
        try {
            const file = e.target.files[0]

            if (!file) return alert("File not exist.")

            if (file.size > 1024 * 1024) // 1mb
                return alert("Size too large!")

            if (file.type !== 'image/jpeg' && file.type !== 'image/png') // 1mb
                return alert("File format is incorrect.")

            let formData = new FormData()
            formData.append('file', file)

            setLoading(true)
            const res = await axios.post('/api/upload', formData, {
                headers: { 'content-type': 'multipart/form-data', Authorization: token }
            })
            setLoading(false)
            setImages(res.data)
        } catch (err) {
            toast.error(err.response.data.msg, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
        }
    }

    const handleDestroy = async () => {
        try {
            if (!isAdmin) return alert("You're not an admin")
            setLoading(true)
            await axios.post('/api/destroy', { public_id: images.public_id }, {
                headers: { Authorization: token }
            })
            setLoading(false)
            setImages(false)
        } catch (err) {
            toast.error(err.response.data.msg, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
        }
    }


    const handleSubmit = async e => {
        e.preventDefault()
        try {
            const res = await axios.patch('/api/auth/updateProfile', { name, images, phone, officialMail, service, speciality }, {
                headers: { Authorization: token }
            })
            toast.success(res.data.msg, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
              window.location.href = "/profile";
        } catch (err) {
            console.log("🚀 ~ file: UpadateProfile.js ~ line 125 ~ handleSubmit ~ err", err)
            toast.error(err.response.data.msg, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
        }
    }

    const styleUpload = {
        display: images ? "block" : "none"
    }
    return (
        <div className='create_product_body'>
            <ToastContainer />
            <div className="create_product">
                <div className="upload">
                    <input type="file" name="file" id="file_up" onChange={handleUpload} />
                    {
                        loading ? <div id="file_img"></div>

                            : <div id="file_img" style={styleUpload}>
                                <img src={images ? images.url : ''} alt="" />
                                <span onClick={handleDestroy}>X</span>
                            </div>
                    }
                </div>
                <form onSubmit={handleSubmit}>
                    <div className='pL '>
                        <h3 className='brand-title Qleft'>Personal Informations</h3>
                        <hr /><br />
                        <div className='pRow'><div><label>Name  : </label><input className="inputs" type="text" name="name" value={name} onChange={handleName} required placeholder='Name' /></div></div>
                        {
                            isDoctor && <>
                                <h3 className='brand-title Qleft'>Professional Informations</h3>
                                <hr /><br />
                                <div className='pRow'><div><label>Phone  : </label><input className="inputs" type="text" value={phone} name="phone" onChange={handlePhone} placeholder='Phone' /></div></div>
                                <div className='pRow'><div><label>Service : </label><input className="inputs" type="text" name="service" value={service} onChange={handleService} placeholder='Service' /></div></div>
                                <div className='pRow'><div><label>Speciality  : </label>   <select className="inputs" name="speciality" value={speciality} onChange={handleSpeciality}>
                                    <option value="" disabled>--Select Speciality--</option>
                                    <option value="Allergists">Allergists</option>
                                    <option value="Dermatologists">Dermatologists</option>
                                    <option value="Ophthalmologists">Ophthalmologists</option>
                                    <option value="Cardiologists">Cardiologists</option>
                                    <option value="Endocrinologists">Endocrinologists</option>
                                    <option value="Gastroenterologists">Gastroenterologists</option>
                                    <option value="Nephrologists">Nephrologists</option>
                                    <option value="Urologists">Urologists</option>
                                    <option value="Pulmonologists">Pulmonologists</option>
                                    <option value="Otolaryngologists">Otolaryngologists</option>
                                    <option value="Psychiatrists">Psychiatrists</option>
                                    <option value="Oncologists">Oncologists</option>
                                    <option value="Radiologists">Radiologists</option>
                                    <option value="Rheumatologists">Rheumatologists</option>
                                    <option value="General surgeons">General surgeons</option>
                                    <option value="Orthopedic surgeons">Orthopedic surgeons</option>
                                    <option value="Cardiac surgeons">Cardiac surgeons</option>
                                    <option value="Anesthesiologists">Anesthesiologists</option>

                                </select></div></div>


                            </>
                        }
                        {
                            isPharmacist && <>
                                <h3 className='brand-title Qleft'>Professional Informations</h3>
                                <hr /><br />
                                <div className='pRow'><div><label>Phone  : </label><input className="inputs" type="text" name="phone" value={phone} placeholder='Phone' onChange={handlePhone} /></div></div>
                                <div className='pRow'><div><label>Official Mail : </label><input className="inputs" type="email" name="officialMail" value={officialMail} onChange={handleOfficialMail} placeholder='Official Mail' /></div></div>


                            </>
                        }
                    </div>
                    <br /> <br />
                    <center>
                        <button type="submit" className='btnOrange'>{"Update"}</button></center>
                </form>
            </div>
        </div>
    )
}

export default UpadateProfile