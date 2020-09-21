/* eslint-disable no-throw-literal */
import React, { useState, useRef, useEffect, useContext } from 'react'
import styles from './styles/ViewReinsurerOffer.module.css'
import { useMutation } from 'react-apollo'
import { MAKE_PAYMENT_INSURER, UPDATE_PAYMENT_REINSURER } from '../../graphql/mutattions'
import { INSURER, REINSURER } from '../../graphql/queries'
import swal from 'sweetalert'
import { DrawerContext } from '../../components/Drawer';



export const AddPayments = ({ details, edit, reinsurer_id, toggle, payment }) => {
    const { closed } = useContext(DrawerContext);
    const [expectedAmtToBePaid, setExpectedAmtToBePaid] = useState(0)
    const [amountError, setAmountError] = useState(false)
    const [currency, setCurrency] = useState("")
    const [policy_number, setPolicy_number] = useState("")
    const [form_inputs, setForm_inputs] = useState({
        payment_type: "",
        cheque_number: "",
        bank_name: "",
        beneficiary_bank_name: "",
        offer_payment_comment: "",
        payment_amount: ""
    })
    useEffect(() => {
        if (closed) {
            setForm_inputs({
                payment_type: "",
                cheque_number: "",
                bank_name: "",
                beneficiary_bank_name: "",
                offer_payment_comment: "",
                payment_amount: ""
            })
        }
    }, [closed])
    const formRef = useRef()
    const [makePayment] = useMutation(MAKE_PAYMENT_INSURER, {
        refetchQueries: [{ query: INSURER, variables: { id: reinsurer_id } }]
    })

    const [updatePayment] = useMutation(UPDATE_PAYMENT_REINSURER, {
        refetchQueries: [{ query: REINSURER, variables: { id: reinsurer_id } }]
    })

    useEffect(() => {
        if (details) {
            let sumOfPaymentAmounts = 0;
            setCurrency(details?.offer_detail.currency)
            setPolicy_number(details?.offer_detail.policy_number)
            details.offer_participant_payment.map(payment => {
                sumOfPaymentAmounts += parseFloat(payment.payment_amount);
                return payment;
            })
            const paymentThreshold = parseFloat(details?.fac_premium) - parseFloat(details?.commission_amount) - sumOfPaymentAmounts
            setExpectedAmtToBePaid(paymentThreshold);
        }
    }, [details])

    useEffect(() => {
        if (payment) {
            const obj = JSON.parse(payment.paid_details || "{}");
            setForm_inputs({
                payment_amount: payment?.offer_payment_amount,
                cheque_number: obj.payment_from?.cheque_number,
                bank_name: obj.payment_from?.bank_name,
                beneficiary_bank_name: obj.payment_to,
                offer_payment_comment: payment.offer_participant_payment_comment || "-",
                payment_type: obj.payment_type || ""
            })
        }
    }, [payment])


    const handleMakePayment = event => {
        event.preventDefault()
        const data = {

            offer_payment_id: payment?.offer_payment_id,
            offer_id: details?.offer_id,
            payment_amount: form_inputs.payment_amount,
            payment_details: JSON.stringify({
                payment_type: form_inputs.payment_type,
                payment_from: {
                    cheque_number: form_inputs.cheque_number ? form_inputs.cheque_number : "N/A",
                    bank_name: form_inputs.bank_name
                },
                payment_to: form_inputs.beneficiary_bank_name
            }),
            Offer_payment_comment: form_inputs.offer_payment_comment || "-"
        }

        swal({
            closeOnClickOutside: false,
            closeOnEsc: false,
            icon: "warning",
            title: "Are you sure you want to make payment?",
            buttons: ["No", { text: "Yes", closeModal: false }]
        }).then(input => {
            if (!input) throw null;
            makePayment({
                variables: { data }
            }).then(res => {
                swal("Sucess", "Payment made Successfully", "success");
                formRef.current.reset()
                setForm_inputs({
                    payment_type: "",
                    cheque_number: "",
                    bank_name: "",
                    beneficiary_bank_name: "",
                    offer_payment_comment: "",
                    payment_amount: ""
                })
                toggle()
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

    const handleUpdatePayment = event => {
        event.preventDefault()
        const variables = {
            offer_participant_payment_id: payment?.offer_participant_payment_id,
            paid_details: JSON.stringify({
                payment_type: form_inputs.payment_type,
                payment_from: {
                    cheque_number: form_inputs.cheque_number ? form_inputs.cheque_number : "N/A",
                    bank_name: form_inputs.bank_name
                },
                payment_to: form_inputs.beneficiary_bank_name
            }),
            Offer_payment_comment: form_inputs.offer_payment_comment
        }

        swal({
            closeOnClickOutside: false,
            closeOnEsc: false,
            icon: "warning",
            title: "Are you sure you want to update payment?",
            buttons: ["No", { text: "Yes", closeModal: false }]
        }).then(input => {
            if (!input) throw null;
            updatePayment({
                variables
            }).then(res => {
                swal("Sucess", "Payment updated Successfully", "success");
                formRef.current.reset()
                setForm_inputs({
                    payment_type: "",
                    cheque_number: "",
                    bank_name: "",
                    beneficiary_bank_name: "",
                    offer_payment_comment: "",
                    payment_amount: ""
                })
                toggle()
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

    const handleChange = event => {
        const { name, value } = event.target;
        if (name === "payment_amount" && (value > expectedAmtToBePaid || value < 0)) {
            setAmountError(true);
        } else {
            setAmountError(false)
        }
        setForm_inputs({
            ...form_inputs,
            [name]: value
        })
    }

    return (
        <div>
            <div className={styles.card_header}>
                <h3 className={styles.card_title}>{!edit ? "Make" : "Edit"} Payment</h3>
            </div>
            <fieldset className="border p-2 mb-2">
                <legend className={styles.details_title}>Payment Quota [{policy_number}]</legend>
                <table className="table">
                    <tbody>
                        <tr>
                            <td>Participating %</td>
                            <td>{details?.offer_participant_percentage}%</td>
                        </tr>
                        <tr>
                            <td>Facultative Premium</td>
                            <td>{currency} {details?.participant_fac_premium?.toLocaleString(undefined, { maximumFractionDigits: 2 })} </td>
                        </tr>
                        <tr>
                            <td>NIC levy</td>
                            <td>{currency} {payment?.offer_deduction_charge?.nic_levy_paid.toLocaleString(undefined, { maximumFractionDigits: 2 })} </td>
                        </tr>
                        <tr>
                            <td>Withholding Tax</td>
                            <td>{currency} {payment?.offer_deduction_charge?.withholding_tax_paid.toLocaleString(undefined, { maximumFractionDigits: 2 })} </td>
                        </tr>
                        <tr>
                            <td>Comission</td>
                            <td>{currency} {payment?.offer_deduction_charge?.commission_taken.toLocaleString(undefined, { maximumFractionDigits: 2 })} </td>
                        </tr>
                        <tr>
                            <td>Brokerage</td>
                            <td>{currency} {payment?.offer_deduction_charge?.brokerage_amount_paid.toLocaleString(undefined, { maximumFractionDigits: 2 })} </td>
                        </tr>
                        <tr>
                            <td>
                                <strong>Actual Amount {!edit ? "to be" : ""} paid</strong>
                            </td>
                            <td>{currency} {payment?.offer_payment_amount.toLocaleString(undefined, { maximumFractionDigits: 2 })} </td>
                        </tr>
                    </tbody>
                </table>
            </fieldset>
            <form ref={formRef} onSubmit={(e) => {
                if (edit) {
                    handleUpdatePayment(e);
                    return;
                }
                handleMakePayment(e)
            }} className={styles.card_body}>


                <div className="row">
                    <div className="col-md-12">
                        <label htmlFor="paymentype">Payment type</label>
                        <select name="payment_type" value={form_inputs.payment_type} id="" className="form-control" required>
                            <option value="">Choose a type</option>
                            <option value="Bank Transfer">Bank Transfer</option>
                            <option value="Cheque">Cheque</option>
                        </select>
                    </div>
                </div>
                {form_inputs.payment_type.length ? <fieldset className="border mt-3 p-2">
                    <legend className={styles.details_title}>Payment From</legend>
                    <div className="row">
                        {form_inputs.payment_type !== "Bank Transfer" && <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="cheque Nunmber">cheque Number</label>
                                <input name="cheque_number" value={form_inputs.cheque_number} onChange={handleChange} type="text" className="form-control" placeholder="cheque Nunmber" required />
                            </div>
                        </div>}
                        <div className={`col-md-${form_inputs.payment_type === "Bank Transfer" ? "12" : "6"}`}>
                            <div className="form-group">
                                <label htmlFor="Bank name">Bank name</label>
                                <input type="text" name="bank_name" value={form_inputs.bank_name} onChange={handleChange} className="form-control" placeholder="Bank name" required />
                            </div>
                        </div>
                    </div>
                </fieldset> : null}
                <fieldset className="border mt-3 p-2">
                    <legend className={styles.details_title}>Payment To</legend>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group">
                                <label htmlFor="Bank name">Bank name</label>
                                <input type="text" name="beneficiary_bank_name" onChange={handleChange} value={form_inputs.beneficiary_bank_name} className="form-control" placeholder="Bank name" required />
                            </div>
                        </div>
                    </div>
                </fieldset>
                <fieldset className="border mt-3 p-2">
                    <legend className={styles.details_title}>Payment Details</legend>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="Amount">Amount</label>
                                <input type="number" value={form_inputs.payment_amount} name="payment_amount" className="form-control" placeholder="Amount" required readOnly />
                                {amountError && <p className="text-danger">Please enter a value not less than 0 or greater than {expectedAmtToBePaid}</p>}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="Currency">Currency</label>
                                <input type="text" value={details?.offer_detail?.currency} onChange={() => { }} className="form-control" placeholder="Currency" readOnly />
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="form-group">
                                <label htmlFor="Comment">Comment</label>
                                <textarea value={form_inputs.offer_payment_comment} onChange={handleChange} name="offer_payment_comment" id="" cols="30" rows="10" className="form-control" required></textarea>
                            </div>
                        </div>
                    </div>
                </fieldset>
                <div className="for-group py-2">
                    <input type="submit" disabled={amountError} className="form-control btn btn-primary w-md btn-sm" value={`${!edit ? "Make" : "Edit"} Payment`} />
                </div>
            </form>
        </div>
    )
}
