import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import Lable from '../../utils/lable/Lable'



const QuestionDetails = () => {
    const params = useParams()
    const questionID = params.qID
    const [questionDetails, setQuestionDetails] = useState('');
    console.log("🚀 ~ file: QuestionDetails.js ~ line 9 ~ QuestionDetails ~ questionDetails", questionDetails)

    useEffect(() => {
        const getQuestionDetails = async () => {
            try {
                const res = await axios.get(`/api/questions/questionDetailsByID/${questionID}`)
                setQuestionDetails(res.data.question)
            } catch (error) {
                console.log("🚀 ~ file: QuestionDetails.js ~ line 14 ~ getQuestionDetails ~ error", error)

            }

        }
        getQuestionDetails()
    }, [questionID])



    let allLbles = [];
   



    if (questionDetails) {

        var date_1 = new Date(questionDetails.createdAt);
        var date_2 = new Date();
        var codeBlock = questionDetails.body;

        document.getElementById("wrapper").innerHTML = codeBlock

        for (const l of questionDetails?.lables) {
            for (const v of l.value) {
                allLbles.push(v)
            }
        }
    }




    return (
        <div>
            <div>
                <div className='Qcard'>
                    <div className='cTitle' >{questionDetails.title}</div>
                    <div id="wrapper"></div>
                    <div className='cLables'>
                        {

                            allLbles.map(lable => {
                                return <Lable key={lable} lable={lable}
                                />
                            })

                        }
                    </div><br /><br />
                    <hr></hr>
                    <div className='cBottom'>
                        <div className='cbBottom'>
                            <div className='mar'>Share</div>
                            <div className='mar'>Reply</div>
                        </div>
                        <div>Report</div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default QuestionDetails