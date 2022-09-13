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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Select from "react-select";
import InputLabel from "@mui/material/InputLabel";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    border:'2px read',
    borderRadius: "50px",
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};


const QuestionDetails = () => {
    const state = useContext(GlobalState)
    const [isLogged] = state.userAPI.isLogged
    const [token] = state.token
    const [userDetails] = state.userAPI.userDetails
    const [editMode, SetEditMode] = useState(false)
    const params = useParams()
    const questionID = params.qID
    const [questionDetails, setQuestionDetails] = useState('');
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setMessage('')
    }
    const [message, setMessage] = useState('');



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
        if (questionDetails) {
            if (questionDetails.userID != userDetails._id) {
                SetEditMode(false)
            } else {
                SetEditMode(true)
            }

        }

    }, [userDetails._id, questionDetails.userID])





    if (questionDetails) {

        var codeBlock = questionDetails.body;

        document.getElementById("wrapper").innerHTML = codeBlock

        for (const l of questionDetails?.lables) {
            for (const v of l.value) {
                allLbles.push(v)
            }
        }


    }

    const handleReport = () => {
        if (!isLogged) {
            toast.error("You must Sign in first !", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            handleOpen();
        }

    }

    const handleCancel = () => {
        handleClose()
    }

    const onChnageReportMessage = (e) => {
        setMessage(e.target.value)
    }

    const handleReportSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`/api/question/report/${questionID}`, { message }, {
                headers: { Authorization: token }
            })
            console.log("🚀 ~ file: QuestionDetails.js ~ line 142 ~ handleReportSubmit ~ res", res)
            toast.success(res.data.msg, {
                
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        handleClose();

        } catch (error) {
            console.log("🚀 ~ file: QuestionDetails.js ~ line 14 ~ getQuestionDetails ~ error", error)
            toast.error(error.response.data.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

    }


    return (
        <div>
            <ToastContainer />
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
                            <div className='mar share fW cMpointer'><img src={sharei} /> Share</div>
                            <div className='mar reply fW cMpointer'><img className='im' src={replyi} />Reply</div>
                        </div>
                        {
                            editMode ?
                                <>
                                    <div className='cbBottom'>
                                        <div className='mar edit fW cMpointer'><img src={editi} /> Edit</div>
                                        <div className='mar report fW cMpointer' ><img src={deletei} />Delete</div>
                                    </div>
                                </> :
                                <>
                                    <div className='mar report fW cMpointer' onClick={handleReport}>
                                        <img src={reporti} />
                                        Report
                                    </div>
                                    <Modal
                                        open={open}
                                        onClose={handleClose}
                                        aria-labelledby="modal-modal-title"
                                        aria-describedby="modal-modal-description"
                                    >
                                        <Box sx={style}>
                                            <h2 className='brand-title'>Report Question</h2>

                                            <hr />
                                            <label>Message :</label>
                                            <textarea className='inputs' rows='10' name='message' onChange={onChnageReportMessage} placeholder='Please enter reason here....'></textarea><br /><br />
                                            <div>
                                                <div className='btncenter'>
                                                    <button className='btnGreen' onClick={handleReportSubmit}>Report</button>
                                                    <button className='btnRed' onClick={handleCancel}>Cancel</button>
                                                </div>
                                            </div><br/>
                                        
                                        </Box>
                                    </Modal>
                                </>
                        }

                    </div>
                </div>
            </div>

        </div>
    )
}

export default QuestionDetails