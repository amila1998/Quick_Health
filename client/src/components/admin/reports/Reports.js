import React, { useState } from 'react'
import QandAReports from './QandAReports/QandAReports'
import './report.css'
import ReportedQuestionReport from './reportedQuestionReport/ReportedQuestionReport'
import report from '../../../asserts/icons/file-solid.svg'

const Reports = () => {
    const [reportedQuestionR,setReportedQuestionR]=useState(false)
    const [qaR,setQAR]=useState(false)

    const handleReportedQuestionR =()=>{
        setReportedQuestionR(true)
        setQAR(false)
    }
    const handleQAR =()=>{
        setReportedQuestionR(false)
        setQAR(true)
    }

    const handleBack =()=>{
        setReportedQuestionR(false)
        setQAR(false)
    }

if(!reportedQuestionR&&!qaR){
    return (
        <div className='rcBody'>
            <div className='rRow'><button onClick={handleReportedQuestionR} className='btnOrange btnr'><span className='imgicon'>< img  src={report}/></span>Reported Question Report</button></div>
            <div className='rRow'><button onClick={handleQAR} className='btnOrange btnr'><span className='imgicon'>< img  src={report}/></span>Q&A Report</button></div>
            
            
        </div>
      )
}else if(reportedQuestionR){
    return(
        <>
        <div>
            <ReportedQuestionReport/>
            <div><hr/><center><button onClick={handleBack} className='btnRed'>Back</button></center></div>
        </div>
        </>
    )
}else if(qaR){
    return(
        <> <div>
            <QandAReports></QandAReports>
            <div><hr/><center><button onClick={handleBack} className='btnRed'>Back</button></center></div>
        </div>
        </>
    )
}

}

export default Reports