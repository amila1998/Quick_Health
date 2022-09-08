import React, { useState } from 'react'

import { saveAs } from 'file-saver'
import "../report.css"

import ReportedQuestion from './ReportedQuestion'


const ReportedQuestionReport = () => {

  return (
    <div>
         <div>
            <ReportedQuestion/>
        </div>
    </div>
  )
}

export default ReportedQuestionReport