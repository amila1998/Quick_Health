import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { GlobalState } from "../../../GlobalState";
// import "./doctorSchedule.css"
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
const initialState = {
    PharmacyName:"",
    StreetAddress:"",
    City:"",
     State:"",
    number:"",
    OpenTime: "",
     CloseTime: ""
};

const EditPharmacyDetails = (props) => {
  const {pharmacyId,setEOpen}= props
  const [pharmacy, setPharmacy]=useState("");
  const gState = useContext(GlobalState)
  const [token] = gState.token
  const [userDetails] = gState.userAPI.userDetails
  const [data, setData] = useState(initialState);
  const {  PharmacyName,StreetAddress,City, State,number,OpenTime,  CloseTime } = data
  const [UserID, setUserID] = useState(userDetails._id);
  const navigate = useNavigate()
  // console.log("🚀 ~ file: AddPharmacyDetails.js ~ line 25 ~ AddPharmacyDetails ~ UserID", UserID)
  // console.log("🚀 ~ file: EditPharmacyDetails.js ~ line 6 ~ EditPharmacyDetails ~ pharmacy", pharmacy)
  // console.log("🚀 ~ file: AddPharmacyDetails.js ~ line 20 ~ AddPharmacyDetails ~ userDetails",userDetails._id)
  console.log("🚀 ~ file: AddPharmacyDetails.js ~ line 20 ~ AddPharmacyDetails ~ data", data)   
  useEffect(() => {
    const getADoctorSchedule = async () => {
        try {
            const res = await axios.get(`/api/onePharmacy/${pharmacyId}`)
            setPharmacy(res.data.AllPharmacy)
            console.log(res)
        } catch (error) {
          console.log(error.response.data)
        }
    }
    getADoctorSchedule()
}, [pharmacyId])

const onChangeHandler = (e) => {
  setData({ ...data, [e.target.name]: e.target.value });
};



// console.log(token);
const editPharmacyDetailsHandler = async (e) => {
  e.preventDefault();
  if (OpenTime === "" ||  CloseTime === "" ||  PharmacyName===""||StreetAddress===""||City===""|| State===""||number==="") {
      alert("Fill all the fields");
  } else {
      try {
          const res = await axios.put(`/api/pharmacy/editPharmacy/${pharmacyId}`, { UserID, PharmacyName,StreetAddress,City, State,number,OpenTime,  CloseTime }, {
              headers: { Authorization: token }
          });
          // console.log(res)
          // alert(res.data)
          setEOpen(false)
          toast.success(res.data.msg, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          // window.location.href = '/pharmacist'
      } catch (err) {
          console.log(err);
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
};

const cancelBtn = () => {
  navigate('/pharmacist')
}
  
  return  (
    <div className="layout">
          {/* <ToastContainer /> */}
        <form  controlId="formBasicEmail" action="">
            <h2 className="brand-title" style={{ fontWeight: "bolder", fontSize: "35px" }}>Edit Pharmacy Details</h2>
            <div className="input">
                <br />
                <input className="inputs" type="text" name="PharmacyName" required onChange={onChangeHandler} defaultValue={pharmacy.PharmacyName}/>
                <br />
                <br />
                <label className="label">Address</label>
                <br />
                <input className="inputs" type="text" name="StreetAddress" required onChange={onChangeHandler} defaultValue={pharmacy.StreetAddress} />
                <br />
                <br />



                <div class="row g-2">
                    <div class="col-md">
                        <div class="form-floating">
                            <input className="inputs" type="text" name="City" required onChange={onChangeHandler} defaultValue={pharmacy.City} />
                            <br />
                            <br />
                        </div>
                    </div>
                    <div class="col-md">
                        <div class="form-floating">
                            <input className="inputs" type="text" name="State" required onChange={onChangeHandler} defaultValue={pharmacy.State} />
                            <br />
                            <br />
                        </div>
                    </div>
                </div>

                <input className="inputs" type="text" name="number" required onChange={onChangeHandler} defaultValue={pharmacy.number} />
                <br />


                <div class="row g-2">
                    <div class="col-md">
                        <div class="form-floating">
                            <label>Open Time</label>
                            <br />
                            <br />
                            <input
                                type="time"
                                name="OpenTime"
                                pattern="HH:MM"
                                placeholder="e.g. 16:45"
                                defaultValue={OpenTime}
                                onChange={onChangeHandler}
                            /><br/><br/>
                        </div>
                    </div>
                    <div class="col-md">
                        <div class="form-floating">
                            <label>Close Time</label>
                            <br />
                            <br />
                            <input
                                type="time"
                                name="CloseTime"
                                pattern="HH:MM"
                                placeholder="e.g. 18:45"
                                defaultValue={CloseTime}
                                onChange={onChangeHandler}
                            />
                        </div>
                    </div>
                </div>
                <br />
                

                <center>
                    <button className="addVisitBtn" onClick={editPharmacyDetailsHandler}>Submit</button>
                    <button className="cancelBtn" onClick={() => cancelBtn()}>Cancel</button>
                </center>


            </div>
        </form>

    </div>
)
}

export default EditPharmacyDetails