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

const ReplyCard = ({ reply }) => {
    console.log("🚀 ~ file: ReplyCard.js ~ line 5 ~ ReplyCard ~ reply", reply)
    const state = useContext(GlobalState)
    const [userDetails] = state.userAPI.userDetails
    const [myReply, setMyReply] = useState(false)
    const [replilesHide, setReplyHide] = useState(false)
    const correctVotes=[];
    const incorrectVotes=[];

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
                                <div className='mar report fW cMpointer' ><img className='im' src={deletei} />Delete</div></>
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