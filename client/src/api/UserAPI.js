import { useState, useEffect } from 'react'
import axios from 'axios'

function UserAPI(token) {
    const [isLogged, setIsLogged] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [isDoctor, setIsDoctor] = useState(false)
    const [isPharmacist, setIsPharmacist] = useState(false)
    const [userName, setuserName] = useState("")
    const [userPhoto,setUserPhoto] = useState("")
    const [user,setUser] = useState("")


    useEffect(() => {
        if (token) {
            const getUser = async () => {
                try {
                    const res = await axios.get('/api/auth/infor', {
                        headers: { Authorization: token }
                    })


                    setIsLogged(true)
                    if (res.data.role === 'admin') {
                        setIsAdmin(true)
                    } else if (res.data.role === 'doctor') {
                        setIsDoctor(true)
                    } else if (res.data.role === 'pharmacist'){
                        setIsPharmacist(true)
                    }else{
                        setIsAdmin(false)
                        setIsDoctor(false)
                        setIsPharmacist(false)
                    }

                        setuserName(res.data.name)
                        setUserPhoto(res.data.logo)
                        setUser(res.data)
                } catch (err) {
                    console.log("🚀 ~ file: UserAPI.js ~ line 37 ~ getUser ~ err", err)
                    window.sessionStorage.clear();
                    localStorage.clear();
                    setIsAdmin(false);
                    setIsDoctor(false);
                    setIsPharmacist(false);
                    setIsLogged(false);
                }
            }

            getUser()

        }
    }, [token])





    return {
        isLogged: [isLogged, setIsLogged],
        isAdmin: [isAdmin, setIsAdmin],
        isDoctor: [isDoctor, setIsDoctor],
        isPharmacist: [isPharmacist, setIsPharmacist],
        user: [userName, setuserName],
        userPhoto:[userPhoto,setUserPhoto],
        userDetails:[user,setUser]
    }
}

export default UserAPI