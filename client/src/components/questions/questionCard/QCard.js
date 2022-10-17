import React from 'react'
import './qcard.css'
import Lable from '../../utils/lable/Lable'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'

const QCard = ({question}) => {
  const navigate = useNavigate()

  const dateMoment = moment.utc(question.createdAt).local().startOf('seconds').fromNow();
   
  let allLbles = [];
  for(const l of question.lables){
    for(const v of l.value){
      allLbles.push(v)
    }
  }


  const handleNavigateQuestionDetails = ()=>{
    navigate(`/questionDetails/`+question._id)
  }


  return (
    <div>
        <div className='Qcard'>
            <div className='cTitle cMpointer' onClick={handleNavigateQuestionDetails}>{question.title}</div>
            <div className='cLables'>
              {
                
                  allLbles.map(lable => {
                      return <Lable key={lable} lable={lable}
                      />
                  })
          
              }
</div><br/><br/>
            <hr></hr>
            <div className='cBottom'>
                <div className='cbBottom'>
                <div className='mar'>Stars : {question.stars.length}</div>
                <div className='mar'>Answers : {question.replies.length}</div>
                </div>
                <div> <a href='#'>{question.userName}</a> - {dateMoment}</div>
            </div>
        </div>
    </div>
  )
}

export default QCard