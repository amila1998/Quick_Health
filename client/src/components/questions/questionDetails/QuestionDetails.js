import axios from 'axios';
import React, { useEffect, useRef, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Lable from '../../utils/lable/Lable';
import './questionDetails.css';
import correcti from '../../../asserts/icons/correct.png';
import deletei from '../../../asserts/icons/delete.png';
import editi from '../../../asserts/icons/edit.png';
import replyi from '../../../asserts/icons/reply.png';
import sharei from '../../../asserts/icons/share.png';
import wrongi from '../../../asserts/icons/wrong.png';
import reporti from '../../../asserts/icons/report.png';
import { GlobalState } from '../../../GlobalState';

const QuestionDetails = () => {
    const state = useContext(GlobalState)
    const [isLogged] = state.userAPI.isLogged
    const [token] = state.token
    const [userDetails] = state.userAPI.userDetails
    const [editMode, SetEditMode] = useState(false)
    const params = useParams()
    const questionID = params.qID
    const [questionDetails, setQuestionDetails] = useState('');


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

   
    useEffect(() => {
        if(questionDetails){
            if (questionDetails.userID!=userDetails._id) {
                SetEditMode(false)
            }else{
                SetEditMode(true)
            }

        }

    }, [userDetails._id,questionDetails.userID])

    



    if (questionDetails) {

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
                            <div className='mar share fW'><img src={sharei} /> Share</div>
                            <div className='mar reply fW '><img className='im' src={replyi} />Reply</div>
                        </div>
                        {
                            editMode ?
                                <>
                                    <div className='cbBottom'>
                                        <div className='mar edit fW'><img src={editi} /> Edit</div>
                                        <div className='mar report fW '><img src={deletei} />Delete</div>
                                    </div>
                                </> :
                                <>
                                    <div className='mar report fW '>
                                        <img src={reporti} />
                                        Report
                                    </div>
                                </>
                        }

                    </div>
                </div>
            </div>

        </div>
    )
}

export default QuestionDetails