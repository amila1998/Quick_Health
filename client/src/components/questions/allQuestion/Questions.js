import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { GlobalState } from '../../../GlobalState'
import QCard from '../questionCard/QCard'
import './question.css'

const Questions = () => {
  const state = useContext(GlobalState)
  const [userDetails] = state.userAPI.userDetails


const navigate = useNavigate();
const [questions,setQuestions]=useState([]);
const [callback,setCallback]=useState(true);
const [search,setSearch]=useState('');
console.log("🚀 ~ file: Questions.js ~ line 17 ~ Questions ~ search", search)
const [showBtn,setShowButton]=useState(false)

const handleSearch=(e)=>{
  setSearch(e.target.value)
  setShowButton(true)
}

const handleResetSearch=(e)=>{
  setSearch(e.target.value='')
  setShowButton(false)
  setCallback(true)
}


const handleOnClickSearch = ()=>{
  setCallback(true)
}


useEffect(() => {

  const getAllQuestions = async()=>{
    if(callback){
      try {
        const res = await axios.get(`/api/questions/AllQuestions?keyword=${search}`)
        setQuestions(res.data.questions)
      } catch (error) {
        console.log("🚀 ~ file: Questions.js ~ line 17 ~ getAllQuestions ~ error", error)
        
      }
      setCallback(false)
    }
   
  }

  getAllQuestions();
  
}, [callback])


  const navigateToCreateQuestion =()=>{
    navigate('/createQuestion')
  }
  return (
    <div>
      <div className='Qbody'>
        <div className='QTop'>
          <div className='QRow1'><input onChange={handleSearch} className="inputs" value={search} type="text" name="search" placeholder='Search' />
            <button className="btnOrange" onClick={handleOnClickSearch} >Search</button>
            {
              showBtn&&<button onClick={handleResetSearch} className="btnRed"  >Reset</button>
            }
            
          </div>
          <div className='QRow2 QAlingLeft'> <button className="btnGreen" onClick={navigateToCreateQuestion} >Ask A Question</button>
          </div>
        </div>

        <div className='QBottom'>
          <div className='QBottomL'>
            <h2 className='brand-title Qleft'>Advance Filter</h2>
            <hr />
            <label>By Lables</label>
            <select className="inputs" name="lable" >
              <option value="" selected>All Lables</option>
              <option value="doctor">Lable 1</option>
              <option value="pharmacist">Lable 2</option>
            </select>
            <br /><br /><label>By Views</label>
            <div className='Qrow'>
              <input className="inputs" type="number" name="minViews" placeholder='from' />
              <label>_</label>
              <input className="inputs" type="number" name="maxViews" placeholder='to' />
            </div><br />
            <label>By Answers</label>
            <div className='Qrow'>
              <input className="inputs" type="number" name="minViews" placeholder='from' />
              <label>_</label>
              <input className="inputs" type="number" name="maxViews" placeholder='to' />
            </div><br />
            <div className='Qcenter'>
              <button className="btnOrange"  >Filter</button><br/><br/>
              <button className="btnRed"  >Reset</button>
            </div>
          </div>
          <div className='QBottomR'>
            <div>
            <h2 className='brand-title Qleft'>{questions.length} Questions Have</h2>
            <hr />
            </div>
            <div className='QCardBody'>
            {
                questions.map(question => {
                    return <QCard key={question._id} question={question}
                     />
                })
            } 
              
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}

export default Questions