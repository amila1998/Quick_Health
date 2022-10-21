import React, { useContext, useState } from "react";
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
const AddPharmacyDetails = (props) => {
    const {setOpen}=props;
    const gState = useContext(GlobalState)
    const [token] = gState.token
    const [userDetails] = gState.userAPI.userDetails
    console.log("🚀 ~ file: AddPharmacyDetails.js ~ line 20 ~ AddPharmacyDetails ~ userDetails",userDetails._id)
    const [data, setData] = useState(initialState);
    const {  PharmacyName,StreetAddress,City, State,number,OpenTime,  CloseTime } = data
    console.log("🚀 ~ file: AddPharmacyDetails.js ~ line 20 ~ AddPharmacyDetails ~ data", data)
    const [UserID, setUserID] = useState(userDetails._id);
    console.log("🚀 ~ file: AddPharmacyDetails.js ~ line 25 ~ AddPharmacyDetails ~ UserID", UserID)
    
    
  
    const navigate = useNavigate()

    const onChangeHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    

    console.log(token);
    const addPharmacyDetailsHandler = async (e) => {
        e.preventDefault();
        if (OpenTime === "" ||  CloseTime === "" ||  PharmacyName===""||StreetAddress===""||City===""|| State===""||number==="") {
            alert("Fill all the fields");
        } else {
            try {
                const res = await axios.post("/api/pharmacy/add", { UserID, PharmacyName,StreetAddress,City, State,number,OpenTime,  CloseTime }, {
                    headers: { Authorization: token }
                });
                // console.log(res)
                // alert(res.data)
                setOpen(false)
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
        setOpen(false)
        navigate('/pharmacist')
    }




  return (
      <div className="layout">
            {/* <ToastContainer /> */}
          <form  controlId="formBasicEmail" action="">
              <h2 className="brand-title" style={{ fontWeight: "bolder", fontSize: "35px" }}>Pharmacy Details</h2>
              <div className="input">
                  <br />
                  <input className="inputs" type="text" name="PharmacyName" required onChange={onChangeHandler} placeholder='Pharmacy Name' />
                  <br />
                  <br />
                  <label className="label">Address</label>
                  <br />
                  <input className="inputs" type="text" name="StreetAddress" required onChange={onChangeHandler} placeholder='street' />
                  <br />
                  <br />



                  <div class="row g-2">
                      <div class="col-md">
                          <div class="form-floating">
                              <input className="inputs" type="text" name="City" required onChange={onChangeHandler} placeholder='City' />
                              <br />
                              <br />
                          </div>
                      </div>
                      <div class="col-md">
                          <div class="form-floating">
                              <input className="inputs" type="text" name="State" required onChange={onChangeHandler} placeholder='State' />
                              <br />
                              <br />
                          </div>
                      </div>
                  </div>

                  <input className="inputs" type="text" name="number" required onChange={onChangeHandler} placeholder='Contact Number  +94XXXXXX' />
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
                      <button className="addVisitBtn" onClick={addPharmacyDetailsHandler}>Submit</button>
                      <button className="cancelBtn" onClick={() => cancelBtn()}>Cancel</button>
                  </center>


              </div>
          </form>

      </div>
  )
}

export default AddPharmacyDetails