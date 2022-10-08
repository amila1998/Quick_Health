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
  const [questions, setQuestions] = useState([]);
  const [callback, setCallback] = useState(true);
  const [search, setSearch] = useState('');
  const [showBtn, setShowButton] = useState(false)
  const [allLabels, setAllLabels] = useState([])
  console.log("🚀 ~ file: Questions.js ~ line 19 ~ Questions ~ allLabels", questions)



  const handleSearch = (e) => {
    setSearch(e.target.value)
    setShowButton(true)
  }

  const handleResetSearch = (e) => {
    setSearch(e.target.value = '')
    setShowButton(false)
    setCallback(true)
  }


  const handleOnClickSearch = () => {
    setCallback(true)
  }


  useEffect(() => {

    const getAllQuestions = async () => {
      if (callback) {
        try {
          const res = await axios.get(`/api/questions/AllQuestions?keyword=${search}&createdAt=a`)
          setQuestions(res.data.questions)
        } catch (error) {
          console.log("🚀 ~ file: Questions.js ~ line 17 ~ getAllQuestions ~ error", error)

        }
        setCallback(false)
      }

    }

    getAllQuestions();

  }, [callback])

  useEffect(() => {

    const getAllLabels = async () => {
      try {
        const res = await axios.get("/api/label/")
        setAllLabels(res.data.AllLabel)
      } catch (error) {
        console.log(error)
      }
    }
    getAllLabels()

  }, [])


  const navigateToCreateQuestion = () => {
    navigate('/createQuestion')
  }

  const [selectedLable, setSelectedLable] = useState('')
  const [byAnswers, setByAnswers] = useState(0)
  const [byStars, setByStars] = useState(0)

  const changeLabelCate = (e) => {
    setSelectedLable(e.target.value)
  }

  const handleByStars = (e) => {
    setByStars(e.target.value)
  }

  const handleByAns = (e) => {
    setByAnswers(e.target.value)
  }

  let AdvanceFilderQuestions = []
  let AdvanceFilderQuestionsbyLabels = []
  let AdvanceFilderQuestionsbyAns = []
  let AdvanceFilderQuestionsbyStars = []

  const [isD,setIsD]=useState(false)

  const handleAdvanceSearch = async (e) => {
    e.preventDefault()
    setIsD(true)
    for (const q of questions) {
      console.log("🚀 ~ file: Questions.js ~ line 95 ~ handleAdvanceSearch ~ q", q.replies.length)
      if (selectedLable != '') {
        for (const l of q.lables) {
          for (const v of l.value) {
            if (v === selectedLable) {
              await AdvanceFilderQuestionsbyLabels.push(q)

            }
          }
        }
      }

      if (q.replies.length >= byAnswers) {
        await AdvanceFilderQuestionsbyAns.push(q)

      }

      if (q.stars.length >= byStars) {
        console.log('hh');
        await AdvanceFilderQuestionsbyStars.push(q)

      }

    }

    //check duplicated questions

    //all
    if (AdvanceFilderQuestionsbyLabels.length > 0 && AdvanceFilderQuestionsbyAns.length > 0 && AdvanceFilderQuestionsbyStars.length > 0) {
      for (const x of AdvanceFilderQuestionsbyLabels) {
        for (const y of AdvanceFilderQuestionsbyAns) {
          for (const z of AdvanceFilderQuestionsbyStars) {
            if (x._id === y._id && x._id === z._id && y._id === z._id) {
              await AdvanceFilderQuestions.push(x)
            }
          }
        }
      }
    }

    //onlyAns&Stars
    if (AdvanceFilderQuestionsbyAns.length > 0 && AdvanceFilderQuestionsbyLabels.length === 0 && AdvanceFilderQuestionsbyStars.length> 0) {
      for (const x of AdvanceFilderQuestionsbyAns) {
        for(const y of AdvanceFilderQuestionsbyStars){
          if (x._id===y._id){
            await AdvanceFilderQuestions.push(x)
          }
        }
      }
    }


    //onlyAns
    if (AdvanceFilderQuestionsbyAns.length > 0 && AdvanceFilderQuestionsbyLabels.length === 0 && AdvanceFilderQuestionsbyStars.length === 0) {
      for (const x of AdvanceFilderQuestionsbyAns) {
        await AdvanceFilderQuestions.push(x)
      }
    }

    //onlyStars
    if (AdvanceFilderQuestionsbyAns.length === 0 && AdvanceFilderQuestionsbyLabels.length === 0 && AdvanceFilderQuestionsbyStars.length > 0) {
      for (const x of AdvanceFilderQuestionsbyStars) {
        await AdvanceFilderQuestions.push(x)
      }
    }

    setQuestions(AdvanceFilderQuestions)

  }

  const handleAdvanceReset = (e) => {
    e.preventDefault()
    setIsD(false)
    setCallback(true)
    setSelectedLable('')
    setByAnswers(0)
    setByStars(0)


    AdvanceFilderQuestions = []
    AdvanceFilderQuestionsbyLabels = []
    AdvanceFilderQuestionsbyAns = []
    AdvanceFilderQuestionsbyStars = []
  }






  return (
    <div>
      <div className='Qbody'>
        <div className='QTop'>
          <div className='QRow1'><input onChange={handleSearch} className="inputs" value={search} type="text" name="search" placeholder='Search' />
            <button className="btnOrange" onClick={handleOnClickSearch} >Search</button>
            {
              showBtn && <button onClick={handleResetSearch} className="btnRed"  >Reset</button>
            }

          </div>
          <div className='QRow2 QAlingLeft'> <button className="btnGreen" onClick={navigateToCreateQuestion} >Ask Question</button>
          </div>
        </div>

        <div className='QBottom'>
          <div className='QBottomL'>
            <h2 className='brand-title Qleft'>Advance Filter</h2>
            <hr />
            <label>By Lables :</label>
            <select onChange={changeLabelCate} defultValue={selectedLable} className="inputs" name="lable" >
              <option value="" selected={selectedLable === ''}>All Lables</option>
              {
                allLabels.map(l => {
                  return <option selected={selectedLable === l.LabelName} value={l.LabelName
                  }>{l.LabelName}</option>
                })
              }
            </select>
            <br /><br />
            <label>By Answers More Than :</label>
            <div className='Qrow'>
              <input value={byAnswers} onChange={handleByAns} className="inputs" type="number" name="minViews" placeholder='from' />
            </div><br />
            <label>By Stars More Than :</label>
            <div className='Qrow'>
              <input value={byStars} onChange={handleByStars} className="inputs" type="number" name="minViews" placeholder='from' disabled/>
            </div><br />
            <div className='Qcenter'>
              {
                !isD && <><button className="btnOrange" onClick={handleAdvanceSearch}>Filter</button><br/><br/></>
              }
              <button className="btnRed" onClick={handleAdvanceReset} >Reset</button>
              
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