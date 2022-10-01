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
import Loading from '../../utils/loading/Loading';
import Share from '../../utils/Share/Share';
import ReplyCard from '../replyCard/ReplyCard';
import TextEditor from '../../utils/textEditor/TextEditor';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    border: '2px read',
    borderRadius: "50px",
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,

};

const style2 = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    border: '2px read',
    borderRadius: "50px",
    transform: 'translate(-50%, -50%)',
    width: '90%',
    height: '90%',
    margin: 'auto',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,


};

const style3 = {
    overflowY: 'scroll',
    height: '60%',
    zIndex: 5,


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
    //console.log("🚀 ~ file: QuestionDetails.js ~ line 46 ~ QuestionDetails ~ questionDetails", questionDetails)
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setMessage('')
    }
    const [openShare, setOpenShare] = useState(false);
    const handleOpenShare = () => setOpenShare(true);
    const handleCloseShare = () => {
        setOpenShare(false);
        setMessage('')
    }
    const [openReply, setOpenReply] = useState(false);
    const handleOpenReply = () => setOpenReply(true);
    const handleCloseReply = () => {
        setOpenReply(false);

    }
    const [openQuestionDelete, setOpenQuestionDelete] = useState(false);
    const handleOpenQuestionDelete = () => setOpenQuestionDelete(true);
    const handleCloseQuestionDelete = () => {
        setOpenQuestionDelete(false);

    }
    const [openEditeQuestion, setOpenEditeQuestion] = useState(false);
    const handleOpenEditeQuestion = () => { setOpenEditeQuestion(true); setSetExLables(true) };
    const handleCloseEditeQuestion = () => {
        setOpenEditeQuestion(false);

    }


    const [message, setMessage] = useState('');
    const [isLoading, setisLoading] = useState(false)
    const url = window.location.href
    const [copied, setCopied] = useState(false);
    const [replyBody, setReplyBody] = useState('')
    const [callback, setCallback] = useState(true)
    const [setExLables, setSetExLables] = useState(false)
    const copy = () => {
        const el = document.createElement("input");

        el.value = window.location.href;
        document.body.appendChild(el);
        setCopied(true);
        console.log("🚀 ~ file: QuestionDetails.js ~ line 68 ~ copy ~ el", el.value)
    }

    useEffect(() => {
        const getQuestionDetails = async () => {
            if (callback) {
                try {

                    const res = await axios.get(`/api/questions/questionDetailsByID/${questionID}`)
                    setQuestionDetails(res.data.question)
                    setBody(res.data.question.body)
                    setTitle(res.data.question.title)
                    setCallback(false)

                } catch (error) {
                    console.log("🚀 ~ file: QuestionDetails.js ~ line 14 ~ getQuestionDetails ~ error", error)

                }

            }

        }
        getQuestionDetails()
    }, [questionID, callback])



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





    if (questionDetails && isLoading === false) {

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

    const handleShare = () => {
        handleOpenShare();
    }

    const handleEditeQuestion = () => {
        handleOpenEditeQuestion();
    }

    const handleOnclickOepnQuestionDelete = () => {
        handleOpenQuestionDelete();
    }

    const handleReply = () => {
        if (!isLogged) {
            toast.error('You must Sign in first !', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

        } else {
            handleOpenReply();
        }

    }


    const handleCancel = () => {
        handleClose()
    }

    const handleCancelReply = () => {
        handleCloseReply()
    }

    const handleCancelEditQuestion = () => {
        handleCloseEditeQuestion()
    }

    const handleCancelShare = () => {
        handleCloseShare()
    }

    const handleCancelQuestionDelete = () => {
        handleCloseQuestionDelete()
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
            setCallback(true)

        } catch (error) {
            toast.error(error.response.data.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            toast.error(error.response.data.msg, {

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


    const handleReplyMsg = (e) => {
        setReplyBody(e.target.value)
    }
    const submitReply = async (e) => {
        if (!replyBody) {
            toast.error('Please fill the field', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else if (!token) {
            toast.error('You must signin first !!!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            e.preventDefault();
            try {
                const res = await axios.post(`/api/question/reply/${questionID}`, { replyBodyMsg: replyBody }, {
                    headers: { Authorization: token }
                })
                toast.success(res.data.msg, {

                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                handleCloseReply();
                setCallback(true);
            } catch (error) {
                console.log("🚀 ~ file: QuestionDetails.js ~ line 218 ~ submitReply ~ error", error)
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
    }


    const submitQuestionDelete = async () => {
        try {
            const res = await axios.delete(`/api/question/delete/${questionID}`, {
                headers: { Authorization: token }
            })
            toast.success(res.data.msg, {

                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            handleCloseQuestionDelete();
            window.location.href = "/";

        } catch (error) {
            console.log("🚀 ~ file: QuestionDetails.js ~ line 302 ~ submitQuestionDelete ~ error", error)
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

    const [body, setBody] = useState('')
    const [title, setTitle] = useState('')
    const [selectedValue, setSelectedValue] = useState([]);
    const [lables, setLables] = useState([])
    const [lables2, setLables2] = useState([])
    let option = [];
    let exAllLabels = []

    if (questionDetails) {
        for (const lb of questionDetails?.lables) {
            for (const l of lb.value) {
                exAllLabels.push(l)
            }
        }
    }

    useEffect(() => {
        if (setExLables) {
            for (let index = 0; index < exAllLabels.length; index++) {
                option.push(exAllLabels[index])
            }
            setSelectedValue(option)
            setLables({value: option})
            setSetExLables(false)
        }
    }, [exAllLabels, setExLables])

    let labletopicArray = [];

    const allLables = []

    for (const lb2 of lables2) {
        allLables.push(lb2.LabelName)
    }

    useEffect(() => {
        const getAllLabels = async () => {
            try {
                const res = await axios.get("/api/label/")
                setLables2(res.data.AllLabel)
            } catch (error) {
                console.log(error)
            }
        }
        getAllLabels()
    }, [])

    for (const l of allLables) {
        labletopicArray.push({ value: l, label: l })
    }

    const handleChange = (e) => {
        setSelectedValue(Array.isArray(e) ? e.map(x => x.value) : []);   
    }

    useEffect(() => {
        setLables({value: selectedValue})
    }, [selectedValue])
    
    const questionUpdate = async () => {
        try {
            const res = await axios.patch(`/api/question/questionUpdate/${questionID}`,{title,body,lables} ,{
                headers: { Authorization: token }
            })
            toast.success(res.data.msg, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            handleCloseEditeQuestion();
            setCallback(true)
        } catch (error) {
           console.log("🚀 ~ file: QuestionDetails.js ~ line 479 ~ submitQuestionDelete ~ error", error) 
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

    const handleOnChangeTitle =(e)=>{
        setTitle(e.target.value)
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
                            <div className='mar share fW cMpointer' onClick={handleShare}><img src={sharei} /> Share</div>
                            <Modal
                                open={openShare}
                                onClose={handleCloseShare}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={style}>
                                    <h2 className='brand-title'>Share With Others</h2>
                                    <hr />
                                    {/* <div className='btncenter'>
                                                <button onClick={copy}>{!copied ? "Copy link" : "Copied!"}</button>
                                                </div>
                                                <hr /> */}
                                    <Share url={url} />
                                    <div>
                                        <br />
                                        <div className='btncenter'>
                                            <button className='btnRed' onClick={handleCancelShare}>Cancel</button>
                                        </div>
                                    </div><br />
                                </Box>
                            </Modal>
                            <div className='mar reply fW cMpointer' onClick={handleReply}><img className='im' src={replyi} />Reply</div>
                            <Modal
                                open={openReply}
                                onClose={handleCloseReply}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={style}>
                                    <h2 className='brand-title'>Reply</h2>
                                    <hr />
                                    <textarea className='inputs' onChange={handleReplyMsg} name='replyBody' placeholder='Please enter your answer here....' />
                                    <div>
                                        <br />
                                        <div className='btncenter'>
                                            <button className='btnGreen' onClick={submitReply}>Confirm</button>
                                            <button className='btnRed' onClick={handleCancelReply}>Cancel</button>
                                        </div>
                                    </div><br />
                                </Box>
                            </Modal>
                        </div>
                        {
                            editMode ?
                                <>
                                    <div className='cbBottom'>
                                        <div className='mar edit fW cMpointer' onClick={handleEditeQuestion}><img src={editi} /> Edit</div>
                                        <Modal
                                            open={openEditeQuestion}
                                            onClose={handleCloseEditeQuestion}
                                            aria-labelledby="modal-modal-title"
                                            aria-describedby="modal-modal-description"
                                        >
                                            <Box sx={style2}>
                                                <h2 className='brand-title'>Edit Question</h2>
                                                <hr />
                                                <Box sx={style3}>
                                                    <div >
                                                        <lable>Title * : </lable>  <br />
                                                        <input className="inputs" defaultValue={title} onChange={handleOnChangeTitle}  placeholder='Enter your question here...'></input>
                                                        <br />  <br />
                                                        <lable>Body :</lable>  <br />
                                                        <TextEditor initialValue={body} setBody={setBody} />
                                                        <br />
                                                        <lable>Labels :</lable>  <br />
                                                        <div className='inputs2'>
                                                            <Select
                                                                isMulti
                                                                isClearable
                                                                name="computingTopics"
                                                                value={labletopicArray.filter(obj => selectedValue.includes(obj.value))}
                                                                options={labletopicArray}
                                                                className="basic-multi-select"
                                                                classNamePrefix="select"
                                                                onChange={handleChange}
                                                            />
                                                        </div>
                                                        <br />
                                                    </div>
                                                </Box>
                                                <div>
                                                    <br />
                                                    <div className='btncenter'>
                                                        <button className='btnGreen' onClick={questionUpdate} >Edit</button>
                                                        <button className='btnRed' onClick={handleCancelEditQuestion}>Cancel</button>
                                                    </div>
                                                </div><br />
                                            </Box>
                                        </Modal>
                                        <div className='mar report fW cMpointer' onClick={handleOnclickOepnQuestionDelete} ><img src={deletei} />Delete</div>
                                        <Modal
                                            open={openQuestionDelete}
                                            onClose={handleCloseQuestionDelete}
                                            aria-labelledby="modal-modal-title"
                                            aria-describedby="modal-modal-description"
                                        >
                                            <Box sx={style}>
                                                <h2 className='brand-title'>Delete</h2>
                                                <hr />
                                                <h6>Are you sure to Delete this question ?</h6>
                                                <div>
                                                    <br />
                                                    <div className='btncenter'>
                                                        <button className='btnGreen' onClick={submitQuestionDelete}>Yes</button>
                                                        <button className='btnRed' onClick={handleCancelQuestionDelete}>No</button>
                                                    </div>
                                                </div><br />
                                            </Box>
                                        </Modal>
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
                                            </div><br />
                                        </Box>
                                    </Modal>
                                </>
                        }
                    </div>
                </div>
            </div>
            <div className='replyTitle'>
                <br />
                <h3>Replies ({questionDetails.replies?.length})</h3>
            </div>
            <div>
                {
                    questionDetails.replies?.map(reply => {
                        return <ReplyCard key={reply._id} reply={reply}
                        />
                    })
                }

            </div>
        </div>
    )



}

export default QuestionDetails