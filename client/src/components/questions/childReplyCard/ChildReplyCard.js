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

const ChildReplyCard = ({ reply,setCallback,questionID,replyID }) => {
    const state = useContext(GlobalState)
    const [userDetails] = state.userAPI.userDetails
    const [token] = state.token
    const [isLogged] = state.userAPI.isLogged
    const [myReply, setMyReply] = useState(false)


    useEffect(() => {
        if (userDetails) {
            if (userDetails._id === reply.userID) {
                setMyReply(true)
            }
        }
    }, [userDetails, reply])


    const childReplyDelete =async()=>{
        try {
            const res = await axios.delete(`/api/question/questionDeleteChildReply/${questionID}/${replyID}/${reply._id}`,{
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
                        <div className='mar edit fW cMpointer'  ><img className='im' src={editi} />Edit</div>
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