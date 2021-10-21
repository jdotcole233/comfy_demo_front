import React, { memo, useState } from 'react'
import { useCallback } from 'react'
import { useMutation } from "@apollo/client"
import swal from 'sweetalert'
import { MAKE_COMMENT } from '../../graphql/mutattions'
import { ALLOFFERS, OFFERS, SINGLE_OFFER } from '../../graphql/queries'
import CommentChatBox from '../UnapprovedClosing/CommentChatBox'

const OfferComments = ({ offer, setClose, closed }) => {
    const [messages, setComments] = useState([])

    const [postComment, { loading }] = useMutation(MAKE_COMMENT, {
        variables: {
            id: offer?.offer_id,
            messages
        },
        refetchQueries: [
            { query: OFFERS, variables: { offer_status: ["OPEN", "CLOSED"] } },
            { query: ALLOFFERS, variables: { offer_status: ["OPEN", "CLOSED"] } },
            { query: SINGLE_OFFER, variables: { offer_id: offer?.offer_id } }
        ]
    })

    const addComment = useCallback(_comment => {
        setComments(prev => [...prev, _comment])
    }, [])

    const handleSetStatus = () => {
        swal({
            icon: "warning",
            title: "Post comment?",
            text: `This action will include the specified comment to this offer ${offer?.offer_detail?.policy_number}.`,
            buttons: ["No", { text: "Yes", closeModal: false }]
        }).then(input => {
            postComment().then(res => {
                swal("Success", "Comment added Successfully", "success")
                setComments([])
                setClose(false)
            }).catch(err => {
                swal("Whoops!!", "Error adding comment", "error")
            })
        })
    }

    return (
        <div className="container-fluid">
            <fieldset className="border-form mb-2">
                <legend className={``}>Offer Details [{offer?.offer_detail?.policy_number}]</legend>
                <table className="table">
                    <tbody>
                        <tr style={{ margin: 0, lineHeight: 0 }}>
                            <td>Insurance company</td>
                            <td>{offer?.insurer?.insurer_company_name} </td>
                        </tr>
                        <tr style={{ margin: 0, lineHeight: 0 }}>
                            <td>Class of business</td>
                            <td>{offer?.classofbusiness?.business_name} </td>
                        </tr>
                    </tbody>
                </table>
            </fieldset>
            <div className="row">
                <div className="col-md-12">

                    <CommentChatBox
                        height={470}
                        closed={closed}
                        comments={offer?.document_messages}
                        userComments={messages}
                        onChange={addComment}
                    />

                </div>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <button disabled={loading} onClick={handleSetStatus} className="btn btn-block btn-primary">Submit</button>
                </div>
            </div>
        </div>
    )
}

export default memo(OfferComments)
