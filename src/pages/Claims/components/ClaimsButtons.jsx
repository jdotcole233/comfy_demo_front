/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useEffect } from 'react'
import { useMutation } from 'react-apollo';
import { Modal } from 'react-bootstrap';
import swal from 'sweetalert';
import { Datatable, Drawer } from '../../../components';
import { AuthContext } from '../../../context/AuthContext';
import { REMOVE_CLAIM_AMOUNT } from '../../../graphql/mutattions';
import { ALLOFFERS, OFFERS } from '../../../graphql/queries';
import { deleteAccessRoles, editAccessRoles } from '../../../layout/adminRoutes';
import { distributionsColumns } from '../columns';
import PreviewClaimDebitNote from '../PreViewClaimDebitNote';
import SendSingleDebitNote from '../SendSingleClaimDebitNote'

const ClaimsButtons = ({ offer, claim, closeParent }) => {
    const { state: { user } } = useContext(AuthContext)

    const [claimsDistribution, setClaimsDistribution] = useState([])
    const [viewDistribution, setViewDistribution] = useState(false);
    const [distributionList, setDistributionList] = useState(null)
    const [selectedClaim, setSelectedClaim] = useState(null);
    const [claimComment, setClaimComment] = useState("")
    const [showUpdateClaimAmount, setShowUpdateClaimAmount] = useState(false);
    const [showClaimsModal, setShowClaimsModal] = useState(false)
    const [skip] = useState(0)
    const [selectedShare, setSelectedShare] = useState(null)
    const [showSingleClaimSendBox, setShowSingleClaimSendBox] = useState(false)
    const [showClaimDebitNote, setShowClaimDebitNote] = useState(false)


    const [removeClaim] = useMutation(REMOVE_CLAIM_AMOUNT, {
        refetchQueries: [
            {
                query: OFFERS, variables: {
                    offer_status: ["CLOSED"],
                    skip
                }
            },
            {
                query: ALLOFFERS, variables: {
                    offer_status: ["CLOSED"],
                    skip
                }
            }
        ]
    });

    const handleViewUpdateForm = claim => {
        setSelectedClaim(claim);
        setClaimComment(claim.claim_comment)
        setShowUpdateClaimAmount(true);
    }

    const removeClaimAmount = offer_Claim => {
        setShowClaimsModal(!showClaimsModal);
        swal({
            icon: "warning",
            closeOnClickOutside: false,
            title: "Are you sure ?",
            buttons: ["No", { text: "Yes", closeModal: false }]
        }).then(input => {
            if (!input) throw null;
            removeClaim({
                variables: {
                    id: offer_Claim.offer_claim_id,
                    offer_id: offer?.offer_id
                }
            }).then(res => {
                swal("Hurray", "Claim removed successfully", "success");
                // refetch()
            }).catch(err => {
                if (err) {
                    swal("Oh noes!", "The AJAX request failed!", "error");
                } else {
                    swal.stopLoading();
                    swal.close();
                }
            })
        })
    }






    const handleSendSingleClaimDebitNote = data => {
        setSelectedShare(data);
        setShowSingleClaimSendBox(true)
        // console.log(offer)
        setViewDistribution(false)
        setShowClaimsModal(false);
        // closeParent(false) 
        return;
    }

    const handleViewClaimDebitNote = share => {
        setSelectedShare(share);
        setShowClaimDebitNote(!showClaimDebitNote);
    }


    useEffect(() => {
        if (distributionList) {
            const rows = [];
            distributionList.offer_claim_participants.map((shares) => {
                const row = {
                    reinsurer: shares.re_company_name,
                    claim_amount: offer?.offer_detail?.currency + " " + distributionList.claim_amount,
                    percentage: shares.offer_participant_percentage,
                    actual_claim: offer?.offer_detail?.currency + " " + shares.claim_share,
                    created_at: new Date(shares.created_at).toDateString(),
                    actions: (
                        <>
                            <button onClick={() => handleViewClaimDebitNote(shares)} className="btn btn-sm btn-primary mr-1">Preview</button>
                            <button onClick={() => handleSendSingleClaimDebitNote(shares)} className="btn btn-sm btn-success">Send</button>
                        </>
                    )
                }

                rows.push(row);
                return row;
            })
            setClaimsDistribution(rows)
        }
    }, [distributionList])

    return (

        <>
            <button onClick={() => {
                setViewDistribution(true)
                setDistributionList(claim);
            }} className="btn btn-sm w-md btn-primary mr-1">Reinsurer's claim share</button>
            {editAccessRoles.includes(user?.position) && <button onClick={() => handleViewUpdateForm(claim)} className="btn btn-sm w-md btn-info mr-1">Modify claim</button>}
            {deleteAccessRoles.includes(user?.position) && <button onClick={() => removeClaimAmount(claim)} className="btn btn-sm w-md btn-danger">Remove claim</button>}

            {/* Modal for viewing the distribution */}
            <Modal size="xl" show={viewDistribution} onHide={() => setViewDistribution(!viewDistribution)}>
                <Modal.Header closeButton>
                    Claim History [{offer?.offer_detail?.policy_number}]
                </Modal.Header>
                <Modal.Body>
                    {/* <div className="row d-flex justify-content-end">
                            <button onClick={handleSendAllClaimDebitNote} className="btn btn-sm w-md btn-success">Send All</button>
                        </div> */}
                    <Datatable columns={distributionsColumns} data={claimsDistribution} />
                </Modal.Body>
            </Modal>
            {/* Preview Claim Debit Note */}
            <Drawer width="50%" isvisible={showClaimDebitNote} toggle={() => setShowClaimDebitNote(!showClaimDebitNote)}>
                <PreviewClaimDebitNote offer={offer} claim={distributionList} shares={selectedShare} />
            </Drawer>

            <Drawer isvisible={showSingleClaimSendBox} toggle={() => setShowSingleClaimSendBox(!showSingleClaimSendBox)} width="50%">
                <SendSingleDebitNote share={selectedShare} reinsurer_id={selectedShare?.reinsurer_id} offer={offer} toggle={() => setShowSingleClaimSendBox(!showSingleClaimSendBox)} />
            </Drawer>
        </>





    )
}

export default ClaimsButtons
