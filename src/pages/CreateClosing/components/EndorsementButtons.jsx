import React, { useContext, useState } from 'react'
import { DropdownButton, Dropdown, ButtonGroup, Modal } from "react-bootstrap";
import { BottomDrawer, Datatable, Drawer, Loader } from '../../../components';
import { AuthContext } from '../../../context/AuthContext';
import { deleteAccessRoles } from '../../../layout/adminRoutes';
import { creditNotes } from '../columns';
import EndorsementCoverNote from '../EndorsementPreviews/EndorsementCoverNote';
import EndorsementDebitNote from '../EndorsementPreviews/EndorsementDebitNote';
import CreditNotesListing from './CreditNotesListing';



function EndorsementButtons({ endorsement, index, offer }) {
    const { state: { user } } = useContext(AuthContext)
    const [showCoverNote, setShowCoverNote] = useState(false);
    const [showDebitNote, setShowDebitNote] = useState(false);
    const [showCreditNotes, setShowCreditNotes] = useState(false);
    return (
        <>
            <DropdownButton
                className="mr-1 mb-1 w-md"
                size="sm"
                as={ButtonGroup}
                id="dropdown-basic-button"
                title="Generate Notes"
            >
                <Dropdown.Item onClick={() => setShowCoverNote(true)}>
                    Endorsement Cover Note
                    </Dropdown.Item>
                <Dropdown.Item onClick={() => setShowDebitNote(true)}>
                    Endorsement  Debit Note
                    </Dropdown.Item>
                {endorsement?.approval_status === "APPROVED" &&
                    <Dropdown.Item onClick={() => { }}>
                        Send
                        </Dropdown.Item>
                }
            </DropdownButton>

            <button onClick={() => setShowCreditNotes(true)} className="btn btn-sm w-md btn-info mb-1 mr-1">
                Credit Notes
                </button>
            <DropdownButton
                variant="warning"
                className="mr-1 mb-1 w-md"
                size="sm"
                as={ButtonGroup}
                id="dropdown-basic-button"
                title="Actions"
            >
                <Dropdown.Item onClick={() => { }}>
                    Edit
                    </Dropdown.Item>
                {(["UNPAID"].includes(endorsement?.payment_status) && endorsement?.approval_status === "APPROVED") && deleteAccessRoles.includes(user?.position) &&
                    <Dropdown.Item onClick={() => { }}>
                        Delete Offer
                        </Dropdown.Item>
                }
            </DropdownButton>



            {/* Endorsement Cover Note */}
            <Drawer width="50%" isvisible={showCoverNote} toggle={() => setShowCoverNote(false)}>
                <EndorsementCoverNote index={index} offer={offer} endorsement={endorsement} />
            </Drawer>


            {/* Endorsement Cover Note */}
            <Drawer width="50%" isvisible={showDebitNote} toggle={() => setShowDebitNote(false)}>
                <EndorsementDebitNote index={index} offer={offer} endorsement={endorsement} />
            </Drawer>


            <BottomDrawer height="60%" isvisible={showCreditNotes} toggle={() => setShowCreditNotes(false)} size="xl">
                {showCreditNotes && <CreditNotesListing offer={offer} id={endorsement?.offer_endorsement_id} />}
            </BottomDrawer>





        </>
    )
}

export default EndorsementButtons



