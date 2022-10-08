import React, { useContext, useEffect, useState } from 'react'
import { GlobalState } from '../../../GlobalState'
import './childReplyCard.css'
import deletei from '../../../asserts/icons/delete.png';
import editi from '../../../asserts/icons/edit.png';
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

const ChildReplyCard = ({ reply, setCallback, questionID, replyID }) => {
    const state = useContext(GlobalState)
    const [userDetails] = state.userAPI.userDetails
    const [token] = state.token
    const [isLogged] = state.userAPI.isLogged
    const [myReply, setMyReply] = useState(false)
    const [replyChildBody, setReplyChildBody] = useState(reply.replyBody)
    const [openQuestionChildReplyEdit, setOpenQuestionChildReplyEdit] = useState(false)

    const handleOpenQuestionChildReplyEdit = () => {
        setOpenQuestionChildReplyEdit(true)
    }

    const handleCloseQuestionChildReplyEdit = () => {
        setOpenQuestionChildReplyEdit(false)
    }


    useEffect(() => {
        if (userDetails) {
            if (userDetails._id === reply.userID) {
                setMyReply(true)
            }
        }
    }, [userDetails, reply])


    const childReplyDelete = async () => {
        try {
            const res = await axios.delete(`/api/question/questionDeleteChildReply/${questionID}/${replyID}/${reply._id}`, {
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

        } catch (error) {
            console.log("🚀 ~ file: ChildReplyCard.js ~ line 46 ~ childReplyDelete ~ error", error)
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

    const handleChildReplyBody = (e) => {
        setReplyChildBody(e.target.value)
    }

    const updateChildReply = async (e) => {
        try {
            e.preventDefault();
            const res = await axios.patch(`/api/question/questionEditChildReply/${questionID}/${replyID}/${reply._id}`, { replyBody: replyChildBody }, {
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
            handleCloseQuestionChildReplyEdit();

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
        <div className='chidReplyBody'>
            <div className='rFrom'>
                <h5>From : </h5>
                <div className='rName'>{myReply ? 'You' : reply.userName}</div>
            </div>
            <div className='rMsg'>
                {reply.replyBody}
                <br />
                {myReply && <>
                    <hr />
                    <div className='rActions'>
                        <div className='mar edit fW cMpointer'  onClick={handleOpenQuestionChildReplyEdit}><img className='im' src={editi} />Edit</div>
                        <Modal
                            open={openQuestionChildReplyEdit}
                            onClose={handleCloseQuestionChildReplyEdit}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                                <h2 className='brand-title'>Update Reply</h2>
                                <hr />
                                <textarea className='inputs' value={replyChildBody} onChange={handleChildReplyBody} name='replyBody' placeholder='Please enter your answer here....' />
                                <div>
                                    <br />
                                    <div className='btncenter'>
                                        <button className='btnGreen' onClick={updateChildReply}>Update</button>
                                        <button className='btnRed' onClick={handleCloseQuestionChildReplyEdit}>Cancel</button>
                                    </div>
                                </div><br />
                            </Box>
                        </Modal>
                        <div className='mar report fW cMpointer' onClick={childReplyDelete}><img className='im' src={deletei} />Delete</div>
                    </div>
                </>
                }

                <br />
            </div>
        </div>
    )
}

export default ChildReplyCard