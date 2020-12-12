/* eslint-disable no-throw-literal */
import React, { memo, useState } from 'react'
import { useCallback } from 'react'
import { useMutation } from 'react-apollo'
import swal from 'sweetalert'
import { APPROVE_ENDORSEMENT } from '../../graphql/mutattions/endorsements'
import { OFFERS } from '../../graphql/queries'
import { ENDORSEMENTS } from '../../graphql/queries/endorsements'
import CommentChatBox from './CommentChatBox'





const OfferApproval = ({ endorsement, setClose, closed }) => {
    const [status, setStatus] = useState("")
    const [messages, setComments] = useState([])

    const [setstatus, { loading }] = useMutation(APPROVE_ENDORSEMENT, {
        variables: {
            id: endorsement?.offer_endorsement_id,
            offer_id: endorsement?.offer?.offer_id,
            status,
            message: messages
        },
        refetchQueries: [
            {
                query: OFFERS,
                variables: {
                    offer_status: ["CLOSED"],
                    approval_status: "UNAPPROVED"
                }
            },
            {
                query: ENDORSEMENTS
            }
        ]
    })

    const popMessages = {
        APPROVED: `Setting the status of this offer with policy number ${endorsement?.offer_endorsement_detail?.policy_number} will enable all staff to generate and send copies of debit, cover and credit notes out of the system.`,
        MODIFY: `This action reminds the staff to make amendments to offer with policy number ${endorsement?.offer_endorsement_detail?.policy_number} for resubmission`,
        DELETE: `This action instructs staff to delete offer with policy number ${endorsement?.offer_endorsement_detail?.policy_number} from the system`,
    }

    const addComment = useCallback(_comment => {
        setComments(prev => [...prev, _comment])
    }, [])

    const handleSetStatus = () => {
        swal({
            icon: "warning",
            title: "Confirm Status?",
            text: popMessages[status],
            buttons: ["No", { text: "Yes", closeModal: false }]
        }).then(input => {
            if (!input) throw null
            setstatus().then(res => {
                swal("Success", "Offer status  changed Successfully", "success")
                setComments([])
                setStatus("")
                setClose(false)
            }).catch(err => {
                swal("Whoops!!", "Error changing offer status", "error")
            })
        })
    }



    return (
        <div className="container-fluid">
            <fieldset className="border-form mb-2">
                <legend className={`font-size-16`}>Offer Details [{endorsement?.offer_endorsement_detail?.policy_number}]</legend>
                <table className="table">
                    <tbody>
                        <tr style={{ margin: 0, lineHeight: 0 }}>
                            <td>Insurance company</td>
                            <td>{endorsement?.offer?.insurer?.insurer_company_name} </td>
                        </tr>
                        <tr style={{ margin: 0, lineHeight: 0 }}>
                            <td>Class of business</td>
                            <td>{endorsement?.classofbusiness?.business_name} </td>
                        </tr>
                    </tbody>
                </table>
            </fieldset>
            <div className="row">
                <div className="form-group col-md-12">
                    <label htmlFor="acceptance_type" className="text-danger">Approval Status</label>
                    <select name="approval_status" value={status} onChange={e => setStatus(e.target.value)} id="" className="form-control">
                        <option value="">Please Select...</option>
                        <option value="APPROVED">Approved</option>
                        <option value="MODIFY">Modify</option>
                        <option value="DELETE">Delete</option>
                    </select>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    {(status === "MODIFY" || status === "DELETE") &&
                        <CommentChatBox
                            comments={endorsement?.offer?.document_messages}
                            userComments={messages}
                            onChange={addComment}
                        />
                    }
                </div>
            </div>

            {status === "APPROVED" && (
                <div className="alert alert-danger">
                    By approving this offer, both cover and debit notes would be digitally signed
                </div>
            )}

            {status !== "" && <div className="row">
                <div className="col-md-12">
                    <button disabled={loading} onClick={handleSetStatus} className="btn btn-block btn-primary">Submit</button>
                </div>
            </div>}
        </div>
    )
}

export default memo(OfferApproval)
