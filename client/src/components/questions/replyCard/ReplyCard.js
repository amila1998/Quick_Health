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

const ReplyCard = ({ reply ,questionID ,setCallback}) => {
    console.log("🚀 ~ file: ReplyCard.js ~ line 5 ~ ReplyCard ~ reply", reply)
    const state = useContext(GlobalState)
    const [userDetails] = state.userAPI.userDetails
    const [token] = state.token
    const [isLogged] = state.userAPI.isLogged
    const [myReply, setMyReply] = useState(false)
    const [replilesHide, setReplyHide] = useState(false)
    const correctVotes=[];
    const incorrectVotes=[];

    const [openQuestionReplyDelete, setOpenQuestionReplyDelete] = useState(false);
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
    const handleCloseQuestionReplyDelete = () => {
        setOpenQuestionReplyDelete(false);

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

    useEffect(() => {
        if (reply) {
           for(const rv of reply.vote){
                if (rv.voteStatus === 0) {
                    correctVotes.push(rv)
                }
                if (rv.voteStatus === 1) {
                    incorrectVotes.push(rv)
                }
           }
        }
    }, [reply])

    const submitQuestionReplyDelete = async()=>{
        try {
            const res = await axios.delete(`/api/question/deleteQuestionReply/${reply._id}/${questionID}`,{
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
                    {
                        myReply ?
                            <>
                                <div className='mar edit fW cMpointer' ><img className='im' src={editi} />Edit</div>
                                <div className='mar report fW cMpointer' onClick={handleOpenQuestionReplyDelete}><img className='im'  src={deletei} />Delete</div>
                                <Modal
                                            open={openQuestionReplyDelete}
                                            onClose={handleCloseQuestionReplyDelete}
                                            aria-labelledby="modal-modal-title"
                                            aria-describedby="modal-modal-description"
                                        >
                                            <Box sx={style}>
                                                <h2 className='brand-title'>Delete</h2>
                                                <hr />
                                                <h6>Are you sure to Delete this Reply ?</h6>
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
                                <div className='mar reply fW cMpointer' ><img className='im' src={replyi} />Reply</div>
                                <div className='mar correct fW cMpointer' ><img className='im' src={correcti} />Correct</div>
                                <div className='mar report fW cMpointer' ><img className='im' src={wrongi} />Wrong</div>
                            </>
                    }



                </div>
                <br />
                <hr />
            </div>
            <div className='rCW'>
                {correctVotes.length} users said this answer is correct and  {incorrectVotes.length} users is said this is wrong answer
                <br />

            </div>
            <hr />
            <div className='rRCount' onClick={() => { reply.childReplies.length > 0 && setReplyHide(!replilesHide) }}>
                Replies ({reply.childReplies.length}){reply.childReplies.length > 0 && <div className='imDiv'> {replilesHide ? <><img className='im2' src={expandi} /></> : <><img className='im3' src={collespani} /></>}</div>}
            </div>
            {
                replilesHide && <div className='rReplies'>
                    <hr /><hr />
                </div>
            }
            <hr />
        </div>
    )
}

export default ReplyCard