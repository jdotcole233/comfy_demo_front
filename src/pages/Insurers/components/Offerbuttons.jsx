/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import swal from 'sweetalert'
import { useMutation } from 'react-apollo'
import { REMOVE_PAYMENT } from '../../../graphql/mutattions'
import { INSURER } from '../../../graphql/queries'
import { Drawer, Datatable } from '../../../components'
import { paymentsColumns } from '../dummy';
import { Modal } from 'react-bootstrap'
import ViewinsurerOffer from '../ViewInsurerOffer'
import { AddPayments } from '../AddPayments'
import DistributePayment from '../DistributePayment'
import { BASE_URL_LOCAL } from '../../../graphql'
import { useContext } from 'react'
import { AuthContext } from '../../../context/AuthContext'


const Offerbuttons = ({ offer, state, insurer }) => {
    const { state: ctx } = useContext(AuthContext)
    const [viewOffer, setViewOffer] = useState(false)
    const [paymentsModal, setPaymentsModal] = useState(false)
    const [addPaymentDrawer, setAddPaymentDrawer] = useState(false)
    const [updatepaymentDrawer, setUpdatepaymentDrawer] = useState(false);
    const [selectedOFfer, setSelectedOFfer] = useState(null)
    const [payments, setPayments] = useState([])
    const [payment, setPayment] = useState(null)
    const [distributePaymentsDrawer, setDistributePaymentsDrawer] = useState(false)
    const [showBtn, setShowBtn] = useState(!0);


    const [removePayment] = useMutation(REMOVE_PAYMENT, {
        refetchQueries: [{ query: INSURER, variables: { id: insurer?.insurer_id } }]
    });



    const handleViewOfferDetails = offer => {
        setSelectedOFfer(offer);
        setViewOffer(!viewOffer)
    }

    const handleShowEditpaymentDrawer = payment => {
        setPayment(payment)
        setPaymentsModal(!paymentsModal)
        setUpdatepaymentDrawer(!updatepaymentDrawer)
    }

    const handleViewOfferPayments = offer => {
        // console.log(offer)
        setSelectedOFfer(offer);
        setPaymentsModal(!paymentsModal)
    }

    const handleViewDistributePayments = offer => {
        setSelectedOFfer(offer);
        setDistributePaymentsDrawer(!distributePaymentsDrawer)
    }

    const handleGenerateReceipt = payment => {
        window.open(`${BASE_URL_LOCAL}/payment_receipt/${btoa(JSON.stringify({
            offer_id: selectedOFfer?.offer_id,
            payment_id: payment.offer_payment_id
        }))}`, "_blank");
    }

    const handlePaymentSchedule = (payment, id) => {

        // alert(payment.offer_payment_id)
        const ids = selectedOFfer.offer_payment.slice(id, selectedOFfer.offer_payment.length).map(el => el.offer_payment_id);
        // alert(JSON.stringify(ids));
        // return

        window.open(`${BASE_URL_LOCAL}/payment_schedule/${btoa(JSON.stringify({
            offer_id: selectedOFfer?.offer_id,
            payment_id: JSON.stringify(ids),
            insurer_id: state?.insurer_id
        }))}`, "_blank");
    }


    useEffect(() => {
        if (selectedOFfer) {
            //if offer payment szie is > 0
            if (selectedOFfer.offer_participant.length > 0) {
                setShowBtn(!0)
                //if offer payment last index of payment details is == null
                if (selectedOFfer.offer_participant[0].offer_participant_payment.length > 0) {
                    if (selectedOFfer.offer_participant[0].offer_participant_payment[selectedOFfer.offer_participant[selectedOFfer.offer_participant.length - 1].offer_participant_payment.length - 1].paid_details === "") {
                        setShowBtn(!!0);
                    } else {
                        setShowBtn(!0);
                    }
                }

            }
        }
    }, [selectedOFfer]);

    useEffect(() => {
        if (selectedOFfer) {
            const rows = [];
            selectedOFfer.offer_payment.map((payment, key) => {
                const obj = JSON.parse(payment.payment_details);
                const row = {
                    type: obj.payment_type === "Cheque" ? obj.payment_type + " - " + obj.payment_from.cheque_number + " " : obj.payment_type,
                    bank_name: obj.payment_from.bank_name,
                    beneficiary_bank: obj.payment_to,
                    payment_amount: `${obj?.conversion?.currency || selectedOFfer?.offer_detail?.currency} ${payment.payment_amount.toLocaleString(undefined, { maximumFractionDigits: 2 })}`,
                    created_at: payment.created_at,
                    updated_at: payment.updated_at,
                    actions: (
                        <>
                            <button onClick={() => handleShowEditpaymentDrawer(payment)} className="btn btn-sm w-md btn-info mr-1">View</button>
                            <button onClick={() => handleRemovePayment(payment)} className="btn btn-sm w-md btn-danger mr-1">Remove</button>
                            <button onClick={() => handlePaymentSchedule(payment, key)} className="btn btn-sm btn-success w-md mt-1 mr-1">Payment Schedule</button>
                            <button onClick={() => handleGenerateReceipt(payment)} className="btn btn-sm btn-warning w-md mt-1">Generate Receipt</button>
                        </>
                    )
                }
                rows.push(row)
                return payment;
            })
            setPayments(rows)
        }
    }, [selectedOFfer])


    const handleRemovePayment = payment => {
        setPaymentsModal(false);
        swal({
            closeOnClickOutside: false,
            closeOnEsc: false,
            icon: "warning",
            title: "Are you sure you want to remove payment?",
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "No",

            buttons: ["No", { text: "Yes", closeModal: false }]
        }).then(input => {
            if (!input) {
                setPaymentsModal(true)
                return;
            };
            removePayment({
                variables: {
                    id: payment.offer_payment_id
                }
            }).then(res => {
                swal("Success", "Payment record removed successfully", "success");
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


    return (
        <div>
            <>
                {
                    ['CEO',
                        'General Manager',
                        'Senior Broking Officer',
                        'Finance Executive',
                        'System Administrator',].includes(ctx?.user?.position) && <button onClick={() => handleViewOfferDetails(offer)} className="btn btn-sm btn-primary m-1">View Offer</button>}
                {['Finance Executive'].includes(ctx?.user?.position) && offer?.offer_status === "CLOSED" && <button onClick={() => handleViewOfferPayments(offer)} className="btn btn-sm btn-danger m-1">Payments</button>}
                {['Finance Executive'].includes(ctx?.user?.position) && offer?.offer_status === "CLOSED" &&
                    <button onClick={() => handleViewDistributePayments(offer)} className="btn btn-sm btn-success m-1">Distribute Payment</button>
                }
            </>



            {/* View Offer Drawer */}
            <Drawer width="40%" isvisible={viewOffer} toggle={() => setViewOffer(!viewOffer)}>
                <ViewinsurerOffer data={selectedOFfer} />
            </Drawer>
            {/* / end of View Offer Drawer */}



            {/* payments modal */}
            <Modal size="xl" show={paymentsModal} onHide={() => setPaymentsModal(!paymentsModal)}>
                <Modal.Header closeButton>
                    Payments History
                </Modal.Header>
                <Modal.Body>
                    <div className="row p-2 d-flex justify-content-end">
                        {
                            showBtn && selectedOFfer?.payment_status !== "PAID" ? <button onClick={() => {
                                setPaymentsModal(!paymentsModal);
                                setAddPaymentDrawer(!addPaymentDrawer)
                            }} className="btn btn-sm w-md btn-primary">Add Payment</button> : null}
                    </div>
                    {JSON.stringify(insurer)}
                    {JSON.stringify(state)}
                    <Datatable entries={5} columns={paymentsColumns} data={payments} />
                </Modal.Body>
            </Modal>
            {/* /end of payments modal */}


            {/* Add payment Drawer */}
            <Drawer width="40%" isvisible={addPaymentDrawer} toggle={() => setAddPaymentDrawer(!addPaymentDrawer)}>
                {addPaymentDrawer && <AddPayments
                    details={selectedOFfer}
                    insurer_id={insurer?.insurer.insurer_id}
                    toggle={() => setAddPaymentDrawer(!addPaymentDrawer)}
                />}
            </Drawer>
            {/* /end of add payment Drawer */}

            {/* Add payment Drawer */}
            <Drawer width="40%" isvisible={updatepaymentDrawer} toggle={() => setUpdatepaymentDrawer(!updatepaymentDrawer)}>
                <AddPayments edit={true} details={selectedOFfer} insurer_id={insurer?.insurer.insurer_id} payment={payment} toggle={() => setUpdatepaymentDrawer(!updatepaymentDrawer)} />
            </Drawer>
            {/* /end of add payment Drawer */}


            <Drawer width="50%" isvisible={distributePaymentsDrawer} toggle={() => setDistributePaymentsDrawer(!distributePaymentsDrawer)} >
                <DistributePayment data={selectedOFfer} showFlag={showBtn} insurer_id={insurer?.insurer.insurer_id} toggle={() => setDistributePaymentsDrawer(!distributePaymentsDrawer)} />
            </Drawer>


        </div>
    )
}

export default Offerbuttons
