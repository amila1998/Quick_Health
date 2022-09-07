import React from 'react'
import './qcard.css'
import Lable from '../../utils/lable/Lable'

const QCard = ({question}) => {
  console.log("🚀 ~ file: QCard.js ~ line 6 ~ QCard ~ question", question)

  let date_1 = new Date(question.createdAt);
  let date_2 = new Date();
  
  const days = (date_1, date_2) =>{
      let difference = date_2.getTime() - date_1.getTime();
      let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
      return TotalDays;
  }


  let allLbles = [];
  console.log("🚀 ~ file: QCard.js ~ line 19 ~ QCard ~ allLbles", allLbles)
  for(const l of question.lables){
    for(const v of l.value){
      allLbles.push(v)
    }
  }







  return (
    <div>
        <div className='Qcard'>
            <div className='cTitle'>{question.title}</div>
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
                <div className='mar'>Votes : {question.stars.length}</div>
                <div className='mar'>Answers : {question.replies.length}</div>
                </div>
                <div> <a href='#'>{question.userName}</a> - {days(date_2, date_1)} days a ago</div>
            </div>
        </div>
    </div>
  )
}

export default QCard