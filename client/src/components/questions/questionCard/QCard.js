import React from 'react'
import './qcard.css'
const QCard = () => {
  return (
    <div>
        <div className='Qcard'>
            <div className='cTitle'>What is the best medical treatment for pimples ?</div>
            <div className='cLables'></div><br/><br/>
            <hr></hr>
            <div className='cBottom'>
                <div>
                <div>Vote : 2</div>
                <div>Answers : 5</div>
                </div>
                <div><a href='#'>Amila </a> added 14 mins ago</div>
            </div>
        </div>
    </div>
  )
}

export default QCard