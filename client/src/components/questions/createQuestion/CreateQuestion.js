import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { GlobalState } from '../../../GlobalState'
import './createQuestion.css'
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TextEditor from '../../utils/textEditor/TextEditor';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Chip from '@mui/material/Chip';
import Select from 'react-select';

const CreateQuestion = () => {
  const state = useContext(GlobalState)
  const [isLogged] = state.userAPI.isLogged
  const navigate = useNavigate();
  const [body, setBody] = useState('')
  const [lables, setLables] = useState([])
  const [lables2, setLables2] = useState([])
  const [title, setTitle] = useState('')
  const [token] = state.token

  let labletopicArray = [];


  const allLables = []

  for(const lb2 of lables2){
    allLables.push(lb2.LabelName)
  }

  
  useEffect(() => {
    const getAllLabels = async () => {
       
            try {
                const res = await axios.get("/api/label/")
                setLables2(res.data.AllLabel)
            } catch (error) {
                console.log(error)
            }
       
    }
    getAllLabels()

}, [])


  for (const l of allLables) {
    labletopicArray.push({ value: l, label: l })
  }

  const handleLablesChange = (selectedOption) => {
    let option = [];
    selectedOption.map((l) => {
      option.push(l.value)
    })
    setLables({ value: option })
  }

  const titleHandleChange = (e) => {
    setTitle(e.target.value)
  }

  const handleQuestionCreate =async(e)=>{
    e.preventDefault();
    try {
      if(!title){
        return toast("Please fill title field.", {
          className: "toast-failed",
          bodyClassName: "toast-failed",
        });
      }else{
        const res = await axios.post('/api/questions/createQuestion',{ title, body, lables }, {
          headers: { Authorization: token }
      });
        toast.success(res.data.msg, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        window.location.href = "/";

        
      }

      
    } catch (error) {
      console.log("🚀 ~ file: CreateQuestion.js ~ line 58 ~ handleQuestionCreate ~ error", error)
      toast.error(error.response.data.msg, {
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

  const handleCancel =()=>{
    window.location.href = "/";
  }

  return (
    <div>
      <div className="layout">
        <ToastContainer />
        <div className='NQBoday'>
          <h2 className="brand-title">Ask Question</h2><hr /> <br />
          <lable>Title * : </lable>  <br />
          <input className="inputs" onChange={titleHandleChange} placeholder='Enter your question here...'></input>
          <br />  <br />
          <lable>Body :</lable>  <br />
          <TextEditor initialValue='' setBody={setBody} />
          <br />
          <lable>Labels :</lable>  <br />
          <div className='inputs2'>
            <Select
              isMulti
              name="computingTopics"
              options={labletopicArray}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={handleLablesChange}
            />
          </div>
          <br/>
          <div className='btncenter'>
          <button className='btnGreen' onClick={handleQuestionCreate}>Publish</button>
          <button className='btnRed' onClick={handleCancel}>Cancel</button>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default CreateQuestion