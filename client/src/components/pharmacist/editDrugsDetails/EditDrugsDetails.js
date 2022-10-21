import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { GlobalState } from "../../../GlobalState";
// import "./doctorSchedule.css"
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
const initialState = {
    DrugName:"",
    DrugQuantity:"",
    Description:"",
    DrugPrice: ""
    
};

const EditDrugsDetails = () => {
  const gState = useContext(GlobalState)
  const [userDetails] = gState.userAPI.userDetails
  const [token] = gState.token
  const [data, setData] = useState(initialState);
  const {  DrugName,DrugQuantity,Description,DrugPrice} = data
  const UserID=userDetails._id;
  const [DrugImage, setDrugImage] = useState(false);
  const [fileName, setFileName]=useState("");
  const [drugs, setDrugs] = useState('');
  const [fileURL, setfileURL] = useState('');
  const navigate = useNavigate()
  const params=useParams();
  const drugID=params.pid;
  const PharmacyID=drugs.PharmacyID
  console.log("🚀 ~ file: EditDrugsDetails.js ~ line 31 ~ EditDrugsDetails ~ PharmacyID", PharmacyID)
  

  // console.log("🚀 ~ file: EditDrugsDetails.js ~ line 25 ~ EditDrugsDetails ~ drugs", drugs.DrugName)
  // console.log("🚀 ~ file: AddDrugsDetails.js ~ line 19 ~ AddDrugsDetails ~ userDetails", userDetails._id)
  console.log("🚀 ~ file: AddPharmacyDetails.js ~ line 20 ~ AddPharmacyDetails ~ data", data)
  // console.log("🚀 ~ file: AddDrugsDetails.js ~ line 25 ~ AddDrugsDetails ~ UserID", UserID)
  // const [PharmacyID, setPharmacyID] = useState("123456");
  // console.log("🚀 ~ file: addDrugsDetails.js ~ line 25 ~ AddDrugsDetails ~ DrugImage", DrugImage)
  // console.log("🚀 ~ file: AddDrugsDetails.js ~ line 31 ~ AddDrugsDetails ~ PharmacyID", PharmacyID)




  const onChangeHandler = (e) => {
      setData({ ...data, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const getADoctorSchedule = async () => {
        try {
            const res = await axios.get(`/api/oneDrug/${drugID}`)
            setDrugs(res.data.allDrugs)
            console.log(res)
        } catch (error) {
            alert(error.response.data)
        }
    }
    getADoctorSchedule()
}, [drugID])
  

  // console.log(token);
  const addPharmacyDetailsHandler = async (e) => {
      e.preventDefault();
      if (DrugPrice === "" ||   DrugName===""||DrugQuantity===""||Description==="" ) {
          alert("Fill all the fields");
      } else {
          try {
              const res = await axios.put(`/api/drugs/editDrug/${drugID}`, { UserID,PharmacyID,DrugName,DrugQuantity,Description,DrugPrice,DrugImage}, {
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
                <input className="inputs" type="text" name="DrugName" placeholder={drugs.DrugName} required onChange={onChangeHandler} />
                <br />
                <br />
                <label className="label">Quantity</label>
                <br />
                <input className="inputs" type="text" name="DrugQuantity" required onChange={onChangeHandler} placeholder={drugs.DrugQuantity}/>
                <br />
                <br />
                <label className="label">Description</label>
                <br />
                <input className="inputs" type="text" name="Description" required onChange={onChangeHandler} placeholder={drugs.Description} />
                <br />
                <br />
                <label className="label">Price</label>
                <br />
                <input className="inputs" type="text" name="DrugPrice" required onChange={onChangeHandler} placeholder={drugs.DrugPrice} />
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
                    <button className="addVisitBtn" onClick={addPharmacyDetailsHandler}>Update</button>
                    <button className="cancelBtn" onClick={() => cancelBtn()}>Cancel</button>
                </center>


            </div>
        </form>

    </div>
    </div>
)
}

export default EditDrugsDetails