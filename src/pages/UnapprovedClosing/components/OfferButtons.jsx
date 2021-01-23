/* eslint-disable no-throw-literal */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useCallback, useMemo, useContext } from 'react'
import { DropdownButton, Dropdown, ButtonGroup } from "react-bootstrap";
import swal from 'sweetalert'
import { useMutation } from 'react-apollo'
import { DELETE_OFFER, ADD_PERCENTAGE } from '../../../graphql/mutattions';
import { OFFERS } from '../../../graphql/queries';
import { Modal } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { Drawer, Datatable } from '../../../components'
import { generateParticipants, calculateFacOffer } from '../actions'
import { creditNotes } from '../../CreateClosing/columns';
import { BASE_URL_LOCAL } from '../../../graphql'
import PreviewCoverNote from '../../CreateClosing/PreviewCoverNote'
import PreviewDebitNote from '../../CreateClosing/PreviewDebitNote'
import PreviewCreditNote from '../../CreateClosing/PreviewCreditNote'
// import SendCoverNoteMail from '../../CreateClosing/SendCoverNoteMail'
import SendClosngSlip from '../../CreateClosing/SendClosingSlip';
import { AuthContext } from '../../../context/AuthContext';
import { deleteAccessRoles } from '../../../layout/adminRoutes';
import OfferApproval from '../OfferApproval';

const OfferButtons = ({ offer }) => {
    const { state: { user } } = useContext(AuthContext)
    const history = useHistory()
    const [selectedOffer, setSelectedOffer] = useState(null)
    const [showCoverNotePreview, setShowCoverNotePreview] = useState(false)
    const [showCoverNoteMail, setshowCoverNoteMail] = useState(false)
    const [showDebitNotePreview, setshowDebitNotePreview] = useState(false)
    const [showCreditNotePreview, setshowCreditNotePreview] = useState(false)
    const [showReopenOfferModal, setShowReopenOfferModal] = useState(false)
    const [viewOffer, setViewOffer] = useState(false);
    const [selectedReinsurer, setSelectedReinsurer] = useState(null)
    const [showSendClosingSlip, setShowSendClosingSlip] = useState(false)
    const [showUpdateReinsurerPercentage, setShowUpdateReinsurerPercentage] = useState(false)
    const [percentageErrorEntry, setPercentageErrorEntry] = useState(false)
    const [percentage, setPercentage] = useState(0)
    const [fac_offer, setFac_offer] = useState(0)
    const [test_offer, setTest_offer] = useState(0)


    const [deleteoffer] = useMutation(DELETE_OFFER, {
        refetchQueries: [{ query: OFFERS, variables: { offer_status: ["CLOSED"] } }],
    });

    const [addPercentage] = useMutation(ADD_PERCENTAGE, {
        refetchQueries: [{ query: OFFERS, variables: { offer_status: ["CLOSED"] } }],
    });


    const handlePreviewCoverNote = useCallback(offer => {
        setSelectedOffer(offer);
        setShowCoverNotePreview(s => !s)
    }, [])
    const handlePreviewDebitNote = useCallback(offer => {
        setSelectedOffer(offer);
        setshowDebitNotePreview(!showDebitNotePreview)
    }, [])
    const handleReopenOffer = useCallback(offer => {
        setSelectedOffer(offer);
        setShowReopenOfferModal(c => !c);
    }, [])

    const handleApprovalDrawer = useCallback(offer => {
        // alert("Hello")
        setSelectedOffer(offer);
        setshowCoverNoteMail(!showCoverNoteMail)
    }, [])

    const handleShowPayments = useCallback(offer => {
        setSelectedOffer(offer);
        setViewOffer(c => !c);
    }, [])

    const handleCloseReopenOffer = useCallback(() => {
        setSelectedOffer(null);
        setShowReopenOfferModal(false)
    }, [])

    const handleShowUpdateModal = useCallback(reinsurer => {
        setSelectedReinsurer(reinsurer);
        setShowUpdateReinsurerPercentage(true)
    }, [])

    const handleDeleteOffer = offer => {
        swal({
            closeOnClickOutside: false,
            closeOnEsc: true,
            icon: "warning",
            title: "Delete offer?",
            text: `This action will remove offer with policy number ${offer?.offer_detail?.policy_number} completely from the system`,
            buttons: ["Cancel", { text: "Agree", closeModal: false }]
        }).then(input => {
            if (!input) throw {}
            deleteoffer({
                variables: { id: offer?.offer_id }
            }).then(res => {
                swal("Success", "Offer Deleted successfully", "success")
            })
                .catch(err => {
                    if (err) {
                        swal("Oh noes!", "The AJAX request failed!", "error");
                    } else {
                        swal.stopLoading();
                        swal.close();
                    }
                })
        })
    }

    const handleCloseUpdateModal = useCallback(evt => {
        setSelectedReinsurer(null);
        setShowUpdateReinsurerPercentage(false)
    }, [])

    const handleChangePercentageValue = evt => {
        setPercentage(evt.target.value)
    }

    useMemo(() => {
        if (selectedReinsurer) {
            setPercentage(selectedReinsurer.offer_participant_percentage)
            setTest_offer(fac_offer - selectedReinsurer.offer_participant_percentage)

        }
    }, [selectedReinsurer])

    useMemo(() => {
        if (parseFloat(test_offer) + parseFloat(percentage) > fac_offer) {
            setPercentageErrorEntry(true)
        } else {
            setPercentageErrorEntry(false)
        }
    }, [percentage])

    useMemo(() => calculateFacOffer({
        offer: selectedOffer,
        setFac_offer,
        setTest_offer
    }), [selectedOffer])

    const AddPercentage = evt => {
        swal({
            closeOnClickOutside: false,
            closeOnEsc: false,
            icon: "warning",
            title: `Update ${selectedReinsurer?.reinsurer?.re_company_name}'s percentage ?`,
            text: "This action would update the initial assigned percentage",
            buttons: [
                "No",
                {
                    text: "Yes",
                    closeModal: false,
                },
            ],
        }).then((input) => {
            if (!input) throw null;
            addPercentage({
                variables: {
                    offer_participant_id: selectedReinsurer?.offer_participant_id,
                    offer_id: selectedOffer?.offer_id,
                    percentage,
                },
            })
                .then((res) => {
                    swal({
                        icon: "success",
                        title: "Success",
                        text: "Offer has been reopened successfully",
                        buttons: ["Stay here", { text: "Go to Reopened offer" }]
                    }).then(input => {
                        if (!input) {
                            setSelectedReinsurer(null);
                            handleCloseUpdateModal();
                            handleCloseReopenOffer()
                        } else {
                            history.push({
                                pathname: "/admin/view-offer",
                                state: { offer_id: selectedOffer?.offer_id }
                            })
                        }
                    });

                })
                .catch((err) => {
                    if (err) {
                        swal("Oh noes!", "The AJAX request failed!", "error");
                    } else {
                        swal.stopLoading();
                        swal.close();
                    }
                });
        });
    }

    const { rows, participants, downloadLink } = useMemo(() => generateParticipants({
        offer: selectedOffer,
        _participants: selectedOffer?.offer_participant || [],
        setSelectedReinsurer,
        setShowSendClosingSlip,
        setViewOffer,
        setshowCreditNotePreview,
        handleShowUpdateModal
    }), [selectedOffer])

    const handleDownloadAll = event => {
        swal({
            icon: "warning",
            title: `This action generates ${selectedOffer?.offer_participant.length} credit notes as a zip file.`,
            text: "Do you wish to continue ?",
            buttons: ["No", { text: "Yes" }]
        }).then(input => {
            if (!input) throw {}
            window.open(`${BASE_URL_LOCAL}/generate_closing_slip_for_all/${downloadLink}`, "_blank")
        })
    }

    return (
        <div>
            <>
                <DropdownButton
                    className="mr-1 mb-1 w-md"
                    size="sm"
                    as={ButtonGroup}
                    id="dropdown-basic-button"
                    title="Generate Notes"
                >
                    <Dropdown.Item onClick={() => handlePreviewCoverNote(offer)}>
                        Preview Cover Note
            </Dropdown.Item>
                    <Dropdown.Item onClick={() => handlePreviewDebitNote(offer)}>
                        Preview Debit Note
            </Dropdown.Item>
                </DropdownButton>

                <button
                    onClick={() => handleShowPayments(offer)}
                    className="btn btn-sm w-md btn-info mb-1 mr-1"
                >
                    Credit Notes
          </button>
                <button onClick={() => handleApprovalDrawer(offer)} className="btn btn-sm w-md btn-success mb-2 mr-1">Approve</button>
                {["UNPAID"].includes(offer?.payment_status) && (
                    <DropdownButton
                        variant="warning"
                        className="mr-1 mb-1 w-md"
                        size="sm"
                        as={ButtonGroup}
                        id="dropdown-basic-button"
                        title="Actions"
                    >
                        <Dropdown.Item onClick={() => handleReopenOffer(offer)}>
                            Reopen Offer
              </Dropdown.Item>
                        {deleteAccessRoles.includes(user?.position) && <Dropdown.Item onClick={() => handleDeleteOffer(offer)}>
                            Delete Offer
              </Dropdown.Item>}
                    </DropdownButton>
                )}
            </>


            {/* Modal for Reopen Offer */}

            <Modal size="xl" centered show={showReopenOfferModal} onHide={handleCloseReopenOffer}>
                <Modal.Header closeButton>
                    Reopen offer
                    </Modal.Header>
                <Modal.Body>
                    <div className="container ">
                        <div className="col-md-12 alert alert-warning">
                            <p className="text-danger">Modification made to any reinsurer on this page will change the offer status to
                                either <strong>PENDING</strong> or <strong>OPEN</strong>
                            </p>

                            <p className="text-danger">This action will cause offer with policy number {selectedOffer?.offer_detail?.policy_number}
                                {" "}to be moved from <strong>CLOSING LIST</strong> to <strong>OFFER LIST</strong>
                            </p>
                        </div>
                    </div>
                    <Datatable entries={5} columns={creditNotes.filter(i => i.label !== "Reinsurer Amount")} data={participants} />
                </Modal.Body>
            </Modal>

            {/* End of Reopen Offer */}
            {/* Modal for update Reinsurer pecentage */}
            <Modal size="md" centered show={showUpdateReinsurerPercentage} onHide={handleCloseUpdateModal}>
                <Modal.Header closeButton>
                    Edit percentage
                    </Modal.Header>
                <Modal.Body>
                    <div className="form-group">
                        <label htmlFor="">Percentage</label>
                        <input
                            type="number"
                            value={percentage}
                            onChange={handleChangePercentageValue}
                            className="form-control"
                            placeholder="Percentage"
                        />
                        {percentageErrorEntry && (
                            <p className="text-danger">
                                You have provided a value more than available
                            </p>
                        )}
                    </div>
                    <div className="form-group">
                        <input
                            disabled={percentageErrorEntry || !percentage.length}
                            onClick={AddPercentage}
                            className="form-control btn btn-primary"
                            type="submit"
                            value="Edit percentage"
                        />
                    </div>
                </Modal.Body>
            </Modal>

            {/* End of Modal for Reinsurer percentage */}

            {/* Preview Cover note */}
            <Drawer width="50%" isvisible={showCoverNotePreview} toggle={() => setShowCoverNotePreview(!showCoverNotePreview)}>
                <PreviewCoverNote offer={selectedOffer} />
            </Drawer>
            {/* Send debit and credit  Note */}
            <Drawer width="40%" isvisible={showCoverNoteMail} toggle={() => setshowCoverNoteMail(!showCoverNoteMail)}>
                <OfferApproval offer={selectedOffer} setClose={setshowCoverNoteMail} />
            </Drawer>
            {/* Send closing slip Note */}
            <Drawer width="50%" isvisible={showSendClosingSlip} toggle={() => setShowSendClosingSlip(!showSendClosingSlip)}>
                <SendClosngSlip visible={showSendClosingSlip} reisnsurer={selectedReinsurer} offer={selectedOffer} toggle={() => setShowSendClosingSlip(!showSendClosingSlip)} />
            </Drawer>
            {/* Preview Debit Note */}
            <Drawer width="50%" isvisible={showDebitNotePreview} toggle={() => setshowDebitNotePreview(!showDebitNotePreview)}>
                <PreviewDebitNote offer={selectedOffer} />
            </Drawer>

            {/* Preview Credit Note */}
            <Drawer width="50%" isvisible={showCreditNotePreview} toggle={() => setshowCreditNotePreview(!showCreditNotePreview)}>
                <PreviewCreditNote offer={selectedOffer} reinsurer={selectedReinsurer} />
            </Drawer>


            {/* Modal for the generate button */}

            <Modal centered show={viewOffer} onHide={() => setViewOffer(!viewOffer)} size="xl">
                <Modal.Header closeButton>
                    <h5>Offer Participants   <strong>[{selectedOffer?.offer_detail?.policy_number}]</strong></h5>

                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col-md-6"></div>
                        <div className="col-md-6 d-flex justify-content-end">
                            <button onClick={handleDownloadAll} className="btn btn-sm btn-primary w-md">Generate Notes</button>
                        </div>
                    </div>
                    <div className="mt-4" >
                        <div className="table-responsive">

                            <Datatable entries={5} columns={creditNotes} data={rows} />
                        </div>

                    </div>

                </Modal.Body>
            </Modal>

            {/* / end of the modal for generate button */}


        </div>
    )
}

export default OfferButtons
