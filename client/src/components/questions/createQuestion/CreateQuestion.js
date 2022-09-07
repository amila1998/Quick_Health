import React, { useContext, useState } from 'react'
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
  const [title, setTitle] = useState('')





  let labletopicArray = [];


  const allLables = [
    'ayurvedic', 'western', 'estern'
  ]

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

  return (
    <div>
      <div className="layout">
        <ToastContainer />
        <div className='NQBoday'>
          <h2 className="brand-title">Ask A Question</h2><hr /> <br />
          <lable>Title :</lable>  <br />
          <input className="inputs" onChange={titleHandleChange} placeholder></input>
          <br />  <br />
          <lable>Body :</lable>  <br />
          <TextEditor initialValue='' setBody={setBody} />
          <br />
          <lable>Lables :</lable>  <br />
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
          <button className='btnGreen'>Publish</button>
          <button className='btnRed'>Cancel</button>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default CreateQuestion