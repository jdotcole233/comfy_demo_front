/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'react-bootstrap'
import { Datatable } from '../../components'
import { creditNotes } from './columns'
import { useMemo } from 'react'
import { DropdownButton, Dropdown, ButtonGroup } from "react-bootstrap";



const ShowPayments = props => {
    const [selectedOffer, setSelectedOffer] = useState(null)
    const [viewPayments, setViewPayments] = useState(false)
    const handleShowPayments = useCallback(offer => {
        setSelectedOffer(offer);
        setViewPayments(c => !c);
    }, [])

    const rows = useMemo(() => {
        if (!selectedOffer) return []
        const _rows = selectedOffer.offer_participant.map((reinsurer) => ({
            ...reinsurer,
            ...reinsurer.reinsurer,
            amount: `${selectedOffer.offer_detail.currency} ${reinsurer.offer_amount}`,
            actions: (
                <DropdownButton
                    variant="danger"
                    size="sm"
                    as={ButtonGroup}
                    id="dropdown-basic-button"
                    title="Generate Credit Note"
                >
                    <Dropdown.Item
                        onClick={() => {
                            props.setSelectedReinsurer(reinsurer);
                            props.setshowCreditNotePreview((s) => !s);
                        }}
                    >
                        Preview
                </Dropdown.Item>
                    <Dropdown.Item
                        onClick={() => {
                            props.setSelectedReinsurer(reinsurer);
                            props.setViewOffer((s) => !s);
                            props.setShowSendClosingSlip((s) => !s);
                        }}
                    >
                        Send
                </Dropdown.Item>
                </DropdownButton>
            ),
        }));

        return _rows
    }, {selectedOffer})
    return (
        <div>

            <button
                onClick={() => handleShowPayments(props.offer)}
                className="btn btn-sm w-md btn-info mb-2"
            >
                Credit Notes
          </button>

            {/* Modal for the generate button */}

            <Modal centered show={viewPayments} onHide={() => setViewPayments(s => !s)} size="xl">
                <Modal.Header closeButton>
                    <h5>Offer Participants   <strong>[{selectedOffer?.offer_detail?.policy_number}]</strong></h5>

                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col-md-6"></div>
                        <div className="col-md-6 d-flex justify-content-end">
                            <button onClick={props.download} className="btn btn-sm btn-primary w-md">Generate Notes</button>
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

ShowPayments.propTypes = {
    offer: PropTypes.object.isRequired,
    download: PropTypes.func.isRequired,
    setViewOffer: PropTypes.func.isRequired,
    setSelectedReinsurer: PropTypes.func.isRequired,
    setShowSendClosingSlip: PropTypes.func.isRequired,
    setshowCreditNotePreview: PropTypes.func.isRequired,
}


export default ShowPayments
