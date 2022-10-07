import React, { useContext, useEffect, useState } from 'react'
import { GlobalState } from '../../../GlobalState'
import './replyCard.css'
import correcti from '../../../asserts/icons/correct.png';
import deletei from '../../../asserts/icons/delete.png';
import editi from '../../../asserts/icons/edit.png';
import replyi from '../../../asserts/icons/reply.png';
import sharei from '../../../asserts/icons/share.png';
import wrongi from '../../../asserts/icons/wrong.png';
import reporti from '../../../asserts/icons/report.png';
import collespani from '../../../asserts/icons/collespan.png';
import expandi from '../../../asserts/icons/expand.png';
import { Box, Modal } from '@mui/material';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import ChildReplyCard from '../childReplyCard/ChildReplyCard';

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

const ReplyCard = ({ reply, questionID, setCallback }) => {
    const state = useContext(GlobalState)
    const [userDetails] = state.userAPI.userDetails
    const [token] = state.token
    const [isLogged] = state.userAPI.isLogged
    const [myReply, setMyReply] = useState(false)
    const [replilesHide, setReplyHide] = useState(false)
    const [isCorrect, setIsCorrect] = useState(0);
    const [openQuestionReplyDelete, setOpenQuestionReplyDelete] = useState(false);
    const [openQuestionReplyEdit, setOpenQuestionReplyEdit] = useState(false);
    const [openQuestionChildReply, setOpenQuestionChildReply] = useState(false);
    const handleOpenQuestionReplyDelete = () => {
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
            setOpenQuestionReplyDelete(true);
        }
    };
    const handleOpenQuestionReplyEdit = () => {
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
            setOpenQuestionReplyEdit(true);
        }
    };
    const handleOpenQuestionChildReply = () => {
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
            setOpenQuestionChildReply(true);
        }
    };
    const handleCloseQuestionReplyDelete = () => {
        setOpenQuestionReplyDelete(false);

    }

    const handleCloseQuestionChildReply = () => {
        setOpenQuestionChildReply(false);

    }

    const handleCloseQuestionReplyEdit = () => {
        setOpenQuestionReplyEdit(false);

    }

    const handleOnclickCloseQuestionReplyDelete = () => {
        handleCloseQuestionReplyDelete();
    }

    useEffect(() => {
        if (userDetails) {
            if (userDetails._id === reply.userID) {
                setMyReply(true)
            }
        }
    }, [userDetails, reply])
    const [c, setC] = useState(0)
    const [w, setW] = useState(0)
    useEffect(() => {
        const setVotesCount = async () => {
            if (reply) {
                var ic = 0
                var iw = 0
                for (let index = 0; index < reply.vote.length; index++) {
                    if (reply.vote[index]?.voteStatus == 1) {
                        ic = ic + 1
                    }
                    if (reply.vote[index]?.voteStatus == 2) {
                        iw = iw + 1
                    }
                }

                setC(ic);
                setW(iw);
            }


        }
        setVotesCount();
    }, [reply])

    const submitQuestionReplyDelete = async () => {
        try {
            const res = await axios.delete(`/api/question/deleteQuestionReply/${reply._id}/${questionID}`, {
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
            setCallback(true)
            setOpenQuestionReplyDelete(false)

        } catch (error) {
            console.log("🚀 ~ file: ReplyCard.js ~ line 48 ~ deleteReply ~ error", error)
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
    const [replyBody, setReplyBody] = useState(reply.replyBody)
    const handleReplyBody = (e) => {
        setReplyBody(e.target.value)
    }

    const updateReply = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.patch(`/api/question/updateReply/${reply._id}/${questionID}`, { replyBody }, {
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
            setCallback(true)
            setOpenQuestionReplyEdit(false);
        } catch (error) {
            console.log("🚀 ~ file: ReplyCard.js ~ line 151 ~ updateReply ~ error", error)
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

    const [childReplyBody, setChildReplyBody] = useState('')

    const handleChildReplyBody = (e) => {
        setChildReplyBody(e.target.value)
    }

    const submitQuestionChildReply = async (e) => {
        try {
            if (childReplyBody) {
                e.preventDefault();

                const res = await axios.patch(`/api/question/addChildReply/${reply._id}/${questionID}`, { childReplyBody }, {
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
                setCallback(true)
                setOpenQuestionChildReply(false);

            } else {
                toast.error('Reply can not be empty', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }

        } catch (error) {
            console.log("🚀 ~ file: ReplyCard.js ~ line 209 ~ submitQuestionChildReply ~ error", error)
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
    const [voteStatus, setVoteStatus] = useState(0)
    useEffect(() => {
        if (reply.vote?.length > 0) {

            for (const v of reply.vote) {
                if (userDetails._id === v.userID) {
                    setIsCorrect(v.voteStatus)
                    setVoteStatus(v.voteStatus)
                }
            }

        }
    }, [userDetails, reply])



    const submitCorrect = async () => {
        if (isLogged) {
            try {
                if (voteStatus === 1) {
                    const res = await axios.patch(`/api/question/vote/${reply._id}/${questionID}`, { 'voteStatus': 0, isCorrect }, {
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
                } else {
                    const res = await axios.patch(`/api/question/vote/${reply._id}/${questionID}`, { 'voteStatus': 1, isCorrect }, {
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
                }
                setCallback(true)
            } catch (error) {
                console.log("🚀 ~ file: ReplyCard.js ~ line 276 ~ submitCorrect ~ error", error)
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
        } else {
            toast.error('Please signin before voting ', {
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

    const submitWrong = async () => {
        if (isLogged) {
            try {
                if (voteStatus === 2) {
                    const res = await axios.patch(`/api/question/vote/${reply._id}/${questionID}`, { 'voteStatus': 0, isCorrect }, {
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
                } else {
                    const res = await axios.patch(`/api/question/vote/${reply._id}/${questionID}`, { 'voteStatus': 2, isCorrect }, {
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
                }
                setCallback(true)
            } catch (error) {
                console.log("🚀 ~ file: ReplyCard.js ~ line 276 ~ submitCorrect ~ error", error)
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
        } else {
            toast.error('Please signin before voting ', {
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
        <div className='rBody'>
            <div className='rFrom'>
                <h5>From : </h5>
                <div className='rName'>{myReply ? 'You' : reply.userName}</div>
            </div>
            <div className='rMsg'>
                {reply.replyBody}
                <br />  <br />
                <div className='rActions'>
                    <div className='mar reply fW cMpointer' onClick={handleOpenQuestionChildReply}><img className='im' src={replyi} />Reply</div>
                    <Modal
                        open={openQuestionChildReply}
                        onClose={handleCloseQuestionChildReply}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <h2 className='brand-title'>Reply</h2>
                            <hr />
                            <textarea className='inputs' onChange={handleChildReplyBody} name='replyBody' placeholder='Please enter your answer here....' />
                            <div>
                                <br />
                                <div className='btncenter'>
                                    <button className='btnGreen' onClick={submitQuestionChildReply}>Submit</button>
                                    <button className='btnRed' onClick={handleCloseQuestionChildReply}>Cancel</button>
                                </div>
                            </div><br />
                        </Box>
                    </Modal>
                    {
                        myReply ?
                            <>

                                <div className='mar edit fW cMpointer' onClick={handleOpenQuestionReplyEdit} ><img className='im' src={editi} />Edit</div>
                                <Modal
                                    open={openQuestionReplyEdit}
                                    onClose={handleCloseQuestionReplyEdit}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                >
                                    <Box sx={style}>
                                        <h2 className='brand-title'>Update Reply</h2>
                                        <hr />
                                        <textarea className='inputs' value={replyBody} onChange={handleReplyBody} name='replyBody' placeholder='Please enter your answer here....' />
                                        <div>
                                            <br />
                                            <div className='btncenter'>
                                                <button className='btnGreen' onClick={updateReply}>Update</button>
                                                <button className='btnRed' onClick={handleCloseQuestionReplyEdit}>Cancel</button>
                                            </div>
                                        </div><br />
                                    </Box>
                                </Modal>
                                <div className='mar report fW cMpointer' onClick={handleOpenQuestionReplyDelete}><img className='im' src={deletei} />Delete</div>
                                <Modal
                                    open={openQuestionReplyDelete}
                                    onClose={handleCloseQuestionReplyDelete}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                >
                                    <Box sx={style}>
                                        <h2 className='brand-title'>Delete</h2>
                                        <hr />
                                        <h6>Are you sure to delete this reply ?</h6>
                                        <div>
                                            <br />
                                            <div className='btncenter'>
                                                <button className='btnGreen' onClick={submitQuestionReplyDelete}>Yes</button>
                                                <button className='btnRed' onClick={handleOnclickCloseQuestionReplyDelete}>No</button>
                                            </div>
                                        </div><br />
                                    </Box>
                                </Modal>
                            </>
                            :
                            <>

                                <div onClick={submitCorrect} className={isCorrect === 0 && 'mar ncorrect fW cMpointer' || isCorrect === 1 && 'mar correct fW cMpointer' || isCorrect === 2 && 'mar ncorrect fW cMpointer'} ><img className='im' src={correcti} />Correct</div>
                                <div onClick={submitWrong} className={isCorrect === 0 && 'mar nwrong fW cMpointer' || isCorrect === 1 && 'mar nwrong fW cMpointer' || isCorrect === 2 && 'mar wrong fW cMpointer'} ><img className='im' src={wrongi} />Wrong</div>
                            </>
                    }



                </div>
                <br />
                <hr />
            </div>
            <div className='rCW'>
                {c} users said this answer is correct and  {w} users is said this is wrong answer
                <br />

            </div>
            <hr />
            <div className='rRCount' onClick={() => { reply.childReplies.length > 0 && setReplyHide(!replilesHide) }}>
                Replies ({reply.childReplies.length}){reply.childReplies.length > 0 && <div className='imDiv'> {replilesHide ? <><img className='im2' src={expandi} /></> : <><img className='im3' src={collespani} /></>}</div>}
            </div>
            {
                replilesHide && <div className='rReplies'>
                    {
                        reply.childReplies?.map(rc => {
                            return <><hr />
                                <ChildReplyCard reply={rc} replyID={reply._id} questionID={questionID}  setCallback={setCallback}/>
                            </>

                        })
                    }
                </div>
            }
            <hr />
        </div>
    )
}

export default ReplyCard