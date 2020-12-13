import React, { useContext, useState } from 'react'
import { DropdownButton, Dropdown, ButtonGroup } from "react-bootstrap";
import { BottomDrawer, Drawer, Prompt } from '../../../components';
import { AuthContext } from '../../../context/AuthContext';
import { deleteAccessRoles } from '../../../layout/adminRoutes';
import EndorsementCoverNote from '../EndorsementPreviews/EndorsementCoverNote';
import EndorsementDebitNote from '../EndorsementPreviews/EndorsementDebitNote';
import CreditNotesListing from './CreditNotesListing';
import DeleteEndorsement from './DeleteEndorsement';
import SendEndorsementNotes from './SendEndorsementNotes';
import UpdateEndorsement from './UpdateEndorsement';



function EndorsementButtons({ endorsement, index, offer }) {
    const { state: { user } } = useContext(AuthContext)
    const [showCoverNote, setShowCoverNote] = useState(false);
    const [showDebitNote, setShowDebitNote] = useState(false);
    const [showCreditNotes, setShowCreditNotes] = useState(false);
    const [showDeletePrompt, setShowDeletePrompt] = useState(false);
    const [showSendDrawer, setShowSendDrawer] = useState(false);
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
                    Preview Contract Changes
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setShowDebitNote(true)}>
                    Endorsement  Debit Note
                </Dropdown.Item>
                {endorsement.approval_status === "APPROVED" &&
                    <Dropdown.Item onClick={() => setShowSendDrawer(true)}>
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
                <UpdateEndorsement endorsement={endorsement} offer={offer} />
                {deleteAccessRoles.includes(user?.position) &&
                    <Dropdown.Item onClick={() => setShowDeletePrompt(true)}>
                        Delete Endorsement
                    </Dropdown.Item>
                }
            </DropdownButton>

            <Prompt isvisible={showDeletePrompt} toggle={() => setShowDeletePrompt(false)}>
                <DeleteEndorsement onClose={() => setShowDeletePrompt(false)} endorsement={endorsement} />
            </Prompt>



            {/* Endorsement Cover Note */}
            <Drawer width="50%" isvisible={showCoverNote} toggle={() => setShowCoverNote(false)}>
                <EndorsementCoverNote index={index} offer={offer} endorsement={endorsement} />
            </Drawer>


            {/* Endorsement Cover Note */}
            <Drawer width="50%" isvisible={showDebitNote} toggle={() => setShowDebitNote(false)}>
                <EndorsementDebitNote doc_number={index} offer={offer} endorsement={endorsement} />
            </Drawer>


            <BottomDrawer height="60%" isvisible={showCreditNotes} toggle={() => setShowCreditNotes(false)} size="xl">
                {showCreditNotes && <CreditNotesListing endorsement={endorsement} index={index} offer={offer} id={endorsement?.offer_endorsement_id} />}
            </BottomDrawer>


            <Drawer width="45%" isvisible={showSendDrawer} toggle={() => setShowSendDrawer(false)}>
                {showSendDrawer && <SendEndorsementNotes toggle={() => setShowSendDrawer(false)} doc_number={index} endorsement={endorsement} insurer={offer?.offer_detail?.insured_by} />}
            </Drawer>

        </>
    )
}

export default EndorsementButtons



