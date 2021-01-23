/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo, useState } from 'react'
import { useQuery } from 'react-apollo';
import { ButtonGroup, DropdownButton, Dropdown } from 'react-bootstrap';
import { Datatable, Drawer, Loader } from '../../../components';
import { GET_ENDORSEMENT_PARTICIPATION } from '../../../graphql/queries';
import { creditNotes } from '../columns';
import EndorsementCreditNote from '../EndorsementPreviews/EndorsementCreditNote';
import ParticipantCoverNote from '../EndorsementPreviews/ParticipantCoverNote';
import SendNotesFromCreditListing from './SendNotesFromCreditListing';

function CreditNotesListing({ id, offer, index, endorsement }) {
    const { loading, data } = useQuery(GET_ENDORSEMENT_PARTICIPATION, {
        variables: { id }
    })
    const [selectedReinsurer, setSelectedReinsurer] = useState(null);
    const [showCreditNotePreview, setshowCreditNotePreview] = useState(false);
    const [showContractChangesPreview, setShowContractChangesPreview] = useState(false);
    const [showSendNoteDrawer, setShowSendNoteDrawer] = useState(false);


    const participants = useMemo(() => {
        if (data && data?.readParticipationsForEndorsement) {
            const _data = JSON.parse(data?.readParticipationsForEndorsement || "[]");

            return _data.filter((el) => el.offer_participant_percentage !== 0)
                .map((reinsurer) => ({
                    ...reinsurer,
                    amount: `${offer.offer_detail.currency} ${reinsurer.offer_amount.toFixed(2)}`,
                    actions: (
                        <>
                            <DropdownButton
                                variant="danger"
                                size="sm"
                                as={ButtonGroup}
                                id="dropdown-basic-button"
                                title="Generate Notes"
                            >
                                <Dropdown.Item
                                    onClick={() => {
                                        setSelectedReinsurer(reinsurer);
                                        setshowCreditNotePreview((s) => !s);
                                    }}
                                >
                                    Preview Credit Note
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => {
                                    setSelectedReinsurer(reinsurer);
                                    setShowContractChangesPreview(true)
                                }}>
                                    Preview Contract Changes
                                </Dropdown.Item>
                                {endorsement.approval_status === "APPROVED" &&
                                    <Dropdown.Item
                                        onClick={() => {
                                            setSelectedReinsurer(reinsurer);
                                            setShowSendNoteDrawer(true)
                                        }}
                                    >
                                        Send
                                    </Dropdown.Item>
                                }

                            </DropdownButton>
                        </>
                    ),
                }))
        }
        return []
    }, [data]);


    if (loading) return <Loader />
    return (
        <>
            <div className="p-3 mt-3">
                <h3>Offer Participants { } </h3>
                <Datatable entries={5} columns={creditNotes} data={participants} />
            </div>

            <Drawer width="50%" isvisible={showCreditNotePreview} toggle={() => setshowCreditNotePreview(false)}>
                <EndorsementCreditNote endorsement={endorsement} offer={offer} reinsurer={selectedReinsurer} index={index} />
            </Drawer>


            <Drawer width="50%" isvisible={showContractChangesPreview} toggle={() => setShowContractChangesPreview(false)}>
                <ParticipantCoverNote endorsement={endorsement} offer={offer} reinsurer={selectedReinsurer} index={index} />
            </Drawer>

            <Drawer width="45%" isvisible={showSendNoteDrawer} toggle={() => setShowSendNoteDrawer(false)}>
                {showSendNoteDrawer && <SendNotesFromCreditListing toggle={() => setShowSendNoteDrawer(false)} endorsement={endorsement} index={index} reinsurer={selectedReinsurer} />}
            </Drawer>

        </>
    )
}

export default CreditNotesListing
