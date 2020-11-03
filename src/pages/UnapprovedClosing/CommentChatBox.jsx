/* eslint-disable eqeqeq */
import React, { useState, useRef } from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import moment from 'moment'

const CommentChatBox = ({ onChange, comments, userComments, height = 400 }) => {
    const [comment, setComment] = useState("")
    const chatBoxRef = useRef()

    const handleOnchange = (_comment) => {
        if (_comment) {
            setComment("");
            onChange(_comment)
        }

    }

    useEffect(() => {
        chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight
    }, [comments, userComments, onChange])

    return (
        <div style={{ width: "100%", backgroundColor: "#fff", height: height * 1.2, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div style={{ height, overflowY: "scroll" }} ref={chatBoxRef} className="border-form p-2">
                {
                    comments.map((comment, id) => <Pill comment={comment} key={id} />)
                }
                {userComments.map((comment, id) => <NewMessagePill comment={comment} key={id} />
                )}
            </div>
            <div className="">
                <div className="input-group mb-3">
                    <textarea value={comment} onChange={e => setComment(e.target.value)} className="form-control" aria-label="With textarea"></textarea>
                    <div className="input-group-append">
                        <button onClick={() => handleOnchange(comment)} className="btn btn-success" type="button">COMMENT</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CommentChatBox


const NewMessagePill = ({ comment }) => {
    const { state } = useContext(AuthContext)
    // console.log(state)
    return (
        <div div class={`chat-pill`}>
            <div className="abbrv-row">
                <div alt="Avatar" class={`abbrv-right`}>
                    {state.user.employee.emp_abbrv}
                </div>
            </div>
            <div className="chat-content">
                <p>{comment}</p>
            </div>
            <span class={`time-right`}>{moment().fromNow()}</span>
        </div >
    )
}

const Pill = ({ comment }) => {
    const { state } = useContext(AuthContext)
    const me = state.user.employee.employee_id == comment?.employee?.employee_id
    return (
        <div class={`chat-pill ${me ? "" : "darker"}`}>
            <div className="abbrv-row">
                <div alt="Avatar" class={`${me ? "abbrv-right" : "abbrv"}`}>
                    {comment?.employee?.emp_abbrv}
                </div>
            </div>
            <div className="chat-content">
                <p>{comment?.document_message}</p>
            </div>

            <span class={`${me ? "time-right" : "time-left"}`}>{moment(comment?.created_at).fromNow()}</span>
        </div>
    )
}