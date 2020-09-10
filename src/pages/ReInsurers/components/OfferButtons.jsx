import React, { useState, useEffect } from 'react'
import { DropdownButton, ButtonGroup, Dropdown } from 'react-bootstrap';
import { Drawer, Datatable } from '../../../components'
import UpdateExtraCharges from '../UpdateExtraCharges'
import ViewReinsurerOffer from '../ViewReinsurerOffer'
import { Modal } from 'react-bootstrap'
import { AddPayments } from '../AddPayment'
import { paymentsColumns } from '../columns'


const OfferButtons = ({ offer, data }) => {
    const [paymentsModal, setPaymentsModal] = useState(false)
    const [addPaymentDrawer, setAddPaymentDrawer] = useState(false)
    const [updatepaymentDrawer, setUpdatepaymentDrawer] = useState(false);
    const [viewOffer, setViewOffer] = useState(false)
    const [selectedOffer, setSelectedOffer] = useState(null);
    const [showExtraChargesDrawer, setShowExtraChargesDrawer] = useState(false)
    const [payments, setPayments] = useState([])
    const [payment, setPayment] = useState(null)

    useEffect(() => {
        if (selectedOffer) {
            const actualPayments = selectedOffer.offer_participant_payment.filter(payment => {
                const obj = JSON.parse(payment.paid_details || "{}");
                return obj.payment_type
            })
            const rows = [];
            actualPayments.map((payment) => {
                const obj = JSON.parse(payment.paid_details || "{}");
                const row = {
                    type: obj.payment_type === "Cheque" ? obj.payment_type + " - " + obj.payment_from?.cheque_number + " " : obj.payment_type || "N/A",
                    bank_name: obj?.payment_from?.bank_name || "N/A",
                    beneficiary_bank: obj.payment_to || "N/A",
                    payment_amount: payment.offer_payment_amount.toLocaleString(undefined, { maximumFractionDigits: 2 }),
                    created_at: new Date(payment.created_at).toDateString(),
                    updated_at: payment.updated_at,
                    actions: (
                        <>
                            <button onClick={() => handleEditPayment(payment)} className="btn btn-sm btn-info w-md">View</button>
                        </>
                    )
                }
                rows.push(row)
                return payment;
            })
            setPayments(rows)
        }
    }, [selectedOffer])


    const handleEditPayment = (payment) => {
        setPayment(payment)
        setPaymentsModal(!!0);
        setUpdatepaymentDrawer(!0);
    }

    const handleViewOfferDetails = offer => {
        setSelectedOffer(offer)
        setViewOffer(!viewOffer)
    }

    const handleViewExtraCharges = offer => {
        console.log(offer)
        setSelectedOffer(offer);
        setShowExtraChargesDrawer(!showExtraChargesDrawer)
    }

    const handleShowPayments = offer => {
        setSelectedOffer(offer);
        setPaymentsModal(!paymentsModal)
    }

    return (
        <div>
            <>
                <DropdownButton className="mr-1 mb-1 w-md" variant="danger" size="sm" as={ButtonGroup} id="dropdown-basic-button" title="Action">
                    <Dropdown.Item onClick={() => handleViewOfferDetails(offer)}>View Details</Dropdown.Item>
                    {offer.offer_extra_charges && offer.reinsurer_offers_only.payment_status !== "PAID" ? <Dropdown.Item onClick={() => handleViewExtraCharges(offer)}>View Deductions</Dropdown.Item> : null}
                </DropdownButton>
                {offer.offer_participant_payment.length ? <button onClick={() => handleShowPayments(offer)} className="btn w-md btn-primary btn-sm">Payments</button> : null}
            </>


            {/* View Offer Drawer */}
            <Drawer width="40%" isvisible={viewOffer} toggle={() => setViewOffer(!viewOffer)}>
                <ViewReinsurerOffer data={selectedOffer} />
            </Drawer>

            {/* Update Extra charges Drawer */}
            <Drawer width="40%" isvisible={showExtraChargesDrawer} toggle={() => setShowExtraChargesDrawer(!showExtraChargesDrawer)}>
                <UpdateExtraCharges details={selectedOffer} toggle={() => setShowExtraChargesDrawer(!showExtraChargesDrawer)} />
            </Drawer>

            {/* View paymnts */}
            <Modal size="xl" show={paymentsModal} onHide={() => setPaymentsModal(!paymentsModal)}>
                <Modal.Header closeButton>
                    Payments history
                </Modal.Header>
                <Modal.Body>
                    <Datatable columns={paymentsColumns} data={payments} />
                </Modal.Body>
            </Modal>


            {/* Add payment Drawer */}
            <Drawer width="40%" isvisible={addPaymentDrawer} toggle={() => setAddPaymentDrawer(!addPaymentDrawer)}>
                <AddPayments details={addPaymentDrawer} />
            </Drawer>
            {/* /end of add payment Drawer */}

            {/* Edit payment Drawer */}
            <Drawer width="40%" isvisible={updatepaymentDrawer} toggle={() => setUpdatepaymentDrawer(!updatepaymentDrawer)}>
                <AddPayments edit={true} details={selectedOffer} reinsurer_id={data?.reinsurer.reinsurer_id} payment={payment} toggle={() => setUpdatepaymentDrawer(!updatepaymentDrawer)} />
            </Drawer>
            {/* /end of add payment Drawer */}

        </div>
    )
}

export default OfferButtons
