import React, { useContext, useEffect, useState } from 'react'
import { GlobalState } from '../../../GlobalState'
import './childReplyCard.css'

const ChildReplyCard = ({ reply }) => {
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

    return (
        <div className='chidReplyBody'>
            <div className='rFrom'>
                <h5>From : </h5>
                <div className='rName'>{myReply ? 'You' : reply.userName}</div>
            </div>
            <div className='rMsg'>
                {reply.replyBody}
                <br />  <br />
            </div>
        </div>
    )
}

export default ChildReplyCard