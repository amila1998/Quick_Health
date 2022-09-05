import { useContext, useState } from "react";
import { MdVisibility } from "react-icons/md";
import { MdVisibilityOff } from "react-icons/md";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialState = {
  email: "",
  password: "",
  cfPassword: "",
  name: ''
};

const Register = () => {
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [data, setData] = useState(initialState);
  console.log("🚀 ~ file: Register.js ~ line 21 ~ Register ~ data", data)
  const { email, password, cfPassword, name } = data;
  const [isLoading, setisLoading] = useState(false);
  const [role, setRole] = useState('normalUser');
  console.log("🚀 ~ file: Register.js ~ line 23 ~ Register ~ role", role)
  const [gender, setGender] = useState('');
  console.log("🚀 ~ file: Register.js ~ line 25 ~ Register ~ gender", gender)

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleRole = e => {
    setRole(e.target.value)
  }

  const handleGender = e => {
    setGender(e.target.value)
  }

  const handleClick = () => {
    setVisible(!visible);
  };

  const handleClick2 = () => {
    setVisible2(!visible2);
  };

  const register = async (e) => {
    e.preventDefault();

    // check fields
    if (!email || !password || !role || !cfPassword || !password || !gender || !name)
      return toast("Please fill in all fields.", {
        className: "toast-failed",
        bodyClassName: "toast-failed",
      });


    if (password != cfPassword)
      return toast("Password is not match", {
        className: "toast-failed",
        bodyClassName: "toast-failed",
      });

    try {
      setisLoading(true);
      const res = await axios.post("/api/auth/register", { email, password, role, gender, name });

      setisLoading(false);
      toast.success(res.data.msg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      window.location.href = "/signin";
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
  };

  return (
    <div className="layout">
      <ToastContainer />
      <form className="form" controlId="formBasicEmail" action="">
        <div className="">
          <h2 className="brand-title">Sign Up</h2><div className="inpt"> <br />
            <input className="inputs" type="text" name="name" required onChange={handleChange} placeholder='Name' /><br /><br />
            <select className="inputs" name="gender" value={gender} required onChange={handleGender}>
              <option value="" >Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select><br /><br />
            <select className="inputs" name="role" value={role} required onChange={handleRole}>
              <option value="normalUser" selected>Normal User</option>
              <option value="doctor">Doctor</option>
              <option value="pharmacist">Pharmacist</option>
            </select><br /><br />
            <input className="inputs" type="email" name="email" required onChange={handleChange} placeholder='Email' /><br /><br />
            <div className="rowflex">
              <input className="inputs" type={visible ? "text" : "password"}
                name="password" required
                placeholder='Password'
                onChange={handleChange} /><span className="icons" onClick={handleClick}>{visible ? <MdVisibility /> : <MdVisibilityOff />}</span>
            </div><br />
            <div className="rowflex">
              <input className="inputs" type={visible2 ? "text" : "password"}
                name="cfPassword" required
                placeholder='Confirm Password'
                onChange={handleChange} /><span className="icons" onClick={handleClick2}>{visible2 ? <MdVisibility /> : <MdVisibilityOff />}</span>
            </div><br />

          </div>
          <div>

            <div className=""><br />
              <button className="btnOrange" type="submit" onClick={register} >Sign Up</button></div> <br />

          </div></div>

        <a className="bodyLink" href="/signin">Sign In</a>

      </form>



    </div>
  )
}

export default Register