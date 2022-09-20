import React, { useContext, useState } from "react";
import axios from "axios";
import { GlobalState } from "../../../GlobalState";
// import "./doctorSchedule.css"
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
const initialState = {
    DrugName:"",
    DrugQuantity:"",
    Description:"",
    DrugPrice: ""
    
};
const AddDrugsDetails = () => {


    const gState = useContext(GlobalState)
    const [token] = gState.token
    const [data, setData] = useState(initialState);
    const {  DrugName,DrugQuantity,Description,DrugPrice} = data
    console.log("🚀 ~ file: AddPharmacyDetails.js ~ line 20 ~ AddPharmacyDetails ~ data", data)
    const [UserID, setUserID] = useState("123456");
    const [PharmacyID, setPharmacyID] = useState("123456");
    const [DrugImage, setDrugImage] = useState(false);
    console.log("🚀 ~ file: addDrugsDetails.js ~ line 25 ~ AddDrugsDetails ~ DrugImage", DrugImage)
    const [fileName, setFileName]=useState("");
    const [file, setFile] = useState(false);
    const [fileURL, setfileURL] = useState('');
    
  
  
    const navigate = useNavigate()

    const onChangeHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    

    console.log(token);
    const addPharmacyDetailsHandler = async (e) => {
        e.preventDefault();
        if (DrugPrice === "" ||   DrugName===""||DrugQuantity===""||Description==="" ) {
            alert("Fill all the fields");
        } else {
            try {
                const res = await axios.post("/api/drugs/add", { UserID,PharmacyID,DrugName,DrugQuantity,Description,DrugPrice,DrugImage}, {
                    headers: { Authorization: token }
                });
                console.log(res)
                // alert(res.data)
                toast.success(res.data.msg, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  });
               window.location.href = '/pharmacist'
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

            // setLoading(true)
            const res = await axios.post('/api/drugUpload', formData, {
                headers: { 'content-type': 'multipart/form-data', Authorization: token }
            })
            // setLoading(false)
            setDrugImage(res.data.url)
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
            // if (!isAdmin) return alert("You're not an admin")
            // setLoading(true)
            // await axios.post('/api/destroy', { public_id: images.public_id }, {
            //     headers: { Authorization: token }
            // })
            // setLoading(false)
            setDrugImage(false)
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

    const styleUpload = {
        display: DrugImage ? "block" : "none"
    }


    const cancelBtn = () => {
        navigate('/pharmacist')
    }

  return (
    <div className='create_product_body'>
    <div className="layout">
            <ToastContainer/>
          <form className="addDoctorScheduleLayout" controlId="formBasicEmail" action="">
              <h2 className="brand-title" style={{ fontWeight: "bolder", fontSize: "35px" }}>Pharmacy Details</h2>
              <div className="input">
                  <br />
                  <label className="label">Drug Name</label>
                  <br />
                  <input className="inputs" type="text" name="DrugName" required onChange={onChangeHandler} placeholder='' />
                  <br />
                  <br />
                  <label className="label">Quantity</label>
                  <br />
                  <input className="inputs" type="text" name="DrugQuantity" required onChange={onChangeHandler} placeholder='card/Bottles' />
                  <br />
                  <br />
                  <label className="label">Description</label>
                  <br />
                  <input className="inputs" type="text" name="Description" required onChange={onChangeHandler} placeholder='' />
                  <br />
                  <br />
                  <label className="label">Price</label>
                  <br />
                  <input className="inputs" type="text" name="DrugPrice" required onChange={onChangeHandler} placeholder='L.K.R 0.00' />
                  <br />
                  <br />
                  <div className="upload">
                    <input type="file" name="file" id="file_up" onChange={handleUpload} />
                    
                         <div id="file_img" style={styleUpload}>
                                <img src={DrugImage ? DrugImage : ''} alt="" />
                                <span onClick={handleDestroy}>X</span>
                            </div>
                    
                </div>


                 
                  <center>
                      <button className="addVisitBtn" onClick={addPharmacyDetailsHandler}>Submit</button>
                      <button className="cancelBtn" onClick={() => cancelBtn()}>Cancel</button>
                  </center>


              </div>
          </form>

      </div>
      </div>
  )
}

export default AddDrugsDetails