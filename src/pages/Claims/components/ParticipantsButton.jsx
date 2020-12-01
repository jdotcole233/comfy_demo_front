/* eslint-disable no-throw-literal */
import React from 'react'
import { useState } from "react"
import { useMutation } from 'react-apollo'
import { SEND_CLAIM_DEBIT_NOTE } from '../../../graphql/mutattions';
// import swall from 'sweetalert2'
// import swal from 'sweetalert'
import { Drawer } from '../../../components';
import PreViewClaimDebitNote from '../PreViewClaimDebitNote';
import SingleDebitNote from '../SendSingleClaimDebitNote'

const ParticipantsButton = ({ offer, shares, list, toggleModal }) => {
    const [selectedShare, setSelectedShare] = useState(null)
    const [showClaimDebitNote, setShowClaimDebitNote] = useState(false)
    const [openMailBox, setOpenMailBox] = useState(false)
    const [sendClaimDebitNote] = useMutation(SEND_CLAIM_DEBIT_NOTE);

    const handleViewClaimDebitNote = share => {
        setSelectedShare(share);
        
        setShowClaimDebitNote(!showClaimDebitNote);
    }
    // const handleSendSingleClaimDebitNote = data => {
    //     swall.fire({
    //         icon: "warning",
    //         allowOutsideClick: false,
    //         allowEscapeKey: false,
    //         title: "Send Claim Debit Note",
    //         text: `A copy of the claim debit note will be sent to all associates of ${data.re_company_name}`,
    //         buttons: ["No", { text: "Yes", closeModal: false }],
    //         showCancelButton: true,
    //         confirmButtonText: "Yes",
    //         cancelButtonText: "No",
    //         reverseButtons: true,
    //         showLoaderOnConfirm: true
    //     }).then(input => {
    //         if (!input.value) throw null
    //         sendClaimDebitNote({
    //             variables: {
    //                 offer_claim_participant_id: data.offer_claim_participant_id,
    //                 offer_id: offer?.offer_id,
    //                 reinsurer_id: data.reinsurer_id,
    //             }
    //         }).then(_res => {
    //             swal("Success", "Claim Debit note sent to all participants", "success")
    //         }).catch(err => {
    //             if (err) {
    //                 swal("Oh noes!", "The AJAX request failed!", "error");
    //             } else {
    //                 swal.stopLoading();
    //                 swal.close();
    //             }
    //         })
    //     });
    // }


    const toggleMailBox = (shares) => {
        setSelectedShare(shares)
        setOpenMailBox(!openMailBox)
        // toggleModal()
    }

    return (
        <>
            <button onClick={() => handleViewClaimDebitNote(shares)} className="btn btn-sm btn-primary mr-1">Preview</button>
            <button onClick={() => toggleMailBox(shares)} className="btn btn-sm btn-success">Send</button>

            {/* Preview Claim Debit Note */}
            <Drawer width="50%" isvisible={showClaimDebitNote} toggle={() => setShowClaimDebitNote(!showClaimDebitNote)}>
                <PreViewClaimDebitNote offer={offer} claim={list} shares={selectedShare} />
            </Drawer>

            <Drawer width="40%" isvisible={openMailBox} toggle={() => setOpenMailBox(!openMailBox)} >
                <SingleDebitNote reinsurer_id={selectedShare?.reinsurer_id} offer={offer} toggle={() => setOpenMailBox(!openMailBox)} />
            </Drawer>
        </>
    )
}

export default ParticipantsButton
