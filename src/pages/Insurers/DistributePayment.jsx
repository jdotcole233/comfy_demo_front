/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-throw-literal */
import React, { useState, useEffect } from 'react'
import styles from './styles/ViewInsurerOffer.module.css'
import swal from 'sweetalert'
import { useMutation, useQuery } from 'react-apollo';
import { DISTRIBUTE_PAYMENT } from '../../graphql/mutattions';
import { INSURER, GET_ISNURER_DEDUCTIONS } from '../../graphql/queries';
import { Alert } from 'react-bootstrap';





export default function DistributePayment({ data, toggle, insurer_id = 1, showFlag }) {
    const [forms, setForms] = useState([])
    const [errors, setErrors] = useState([])
    const [reinsurers, setReinsurers] = useState([])


    const getPaymentId = () => {
        if (data && data.offer_payment.length) {
            return data?.offer_payment[0]?.offer_payment_id
        }
        return 0
    }
    const { data: deductions } = useQuery(GET_ISNURER_DEDUCTIONS, {
        variables: {
            id: insurer_id,
            offer_id: data?.offer_id || "1",
            payment_id: getPaymentId()
        }
    })
    const [distribute] = useMutation(DISTRIBUTE_PAYMENT, {
        refetchQueries: [{ query: INSURER, variables: { id: insurer_id } }]
    })




    useEffect(() => {
        if (deductions) {
            setReinsurers([...JSON.parse(deductions.getOfferparticipantDeductions)])
        }
    }, [deductions])

    useEffect(() => {
        if (data) {
            const newForms = data.offer_participant.map(part => {
                const row = {
                    offer_participant_id: part.offer_participant_payment.length ? part.offer_participant_payment[part.offer_participant_payment.length - 1].offer_participant_payment_id : "",
                    payment_type: "",
                    bank_name: "",
                    b_bank_name: "",
                    cheque_number: "",
                    comment: ""
                }
                return row;
            })
            const form_errors = newForms.map(value => ({
                payment_type: { type: false, message: "Please select a payment type" },
                bank_name: { type: false, message: "Please select bank name" },
                b_bank_name: { type: false, message: "Please provide beneficiary bank name" },
                cheque_number: { type: false, message: "Please provide cheque number" },
                comment: { type: false, message: "Please provide comment" },
            }))
            setForms(newForms)
            setErrors(form_errors)
        }
    }, [data]);

    const handleChange = (key, event) => {
        const { name, value } = event.target;
        const formData = forms;

        formData[key][name] = value;
        setForms([...formData])
    }

    const buildPayload = data => {
        const details = data.map(el => ({
            offer_participant_payment_id: el.offer_participant_id,
            paid_details: JSON.stringify({
                payment_type: el.payment_type,
                payment_from: {
                    cheque_number: el.cheque_number ? el.cheque_number : "N/A",
                    bank_name: el.bank_name
                },
                payment_to: el.b_bank_name ? el.b_bank_name : "N/A",
            }),
            payment_comment: el.comment || "-"
        }))

        return details;
    }


    const handleDistibution = event => {
        const offer_participants = buildPayload(forms);
        swal({
            closeOnClickOutside: false,
            closeOnEsc: false,
            icon: "warning",
            title: "Are you sure you want to distribute payments ?",
            buttons: ["No", { text: "Yes", closeModal: false }]
        }).then(input => {
            if (!input) throw null;
            distribute({
                variables: {
                    data: {
                        offer_id: data?.offer_id,
                        offer_participants
                    }
                }
            }).then(res => {
                swal("Sucess", "Payment distributed Successfully", "success");
                setForms([])
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

    return !deductions ? null : (
        <div>
            <div className={styles.card_header}>
                <h2 className={styles.card_title}>Distribute Payments</h2>
            </div>
            <div className={styles.card_body}>
                {!showFlag ?
                    <>
                        {forms.length ? forms.map((participant, key) => {
                            return !data?.offer_participant[key].offer_participant_percentage ? null : (
                                <fieldset className="border-form p-2 mb-2" key={key}>
                                    <legend className={styles.details_title}>{data?.offer_participant[key]?.reinsurer?.re_company_name}</legend>
                                    <div className="row">
                                        <div className="col-md-12">
                                            {data?.offer_participant[key]?.offer_participant_payment?.length ?
                                                <table className="table border border-dark table-bordered">
                                                    <tbody>
                                                        <tr>
                                                            <th>Facultative Premuim</th>
                                                            <td>{data?.offer_participant[key].participant_fac_premium?.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
                                                            <th>Withholding Tax</th>
                                                            <td>{reinsurers[key]?.offer_deductions[reinsurers[key]?.offer_deductions.length - 1]?.withholding_tax_paid?.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Participating %</th>
                                                            <td>{data?.offer_participant[key].offer_participant_percentage}</td>
                                                            <th>Brokerage</th>
                                                            <td>{reinsurers[key]?.offer_deductions[reinsurers[key]?.offer_deductions.length - 1]?.brokerage_amount_paid?.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>NIC levy</th>
                                                            <td>{reinsurers[key]?.offer_deductions[reinsurers[key]?.offer_deductions.length - 1]?.nic_levy_paid?.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
                                                            <th>Commission taken</th>
                                                            <td>{reinsurers[key]?.offer_deductions[reinsurers[key]?.offer_deductions.length - 1]?.commission_taken?.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
                                                        </tr>
                                                        <tr>
                                                            <th></th>
                                                            <td></td>
                                                            <th>Amount</th>
                                                            <td>{data?.offer_participant[key].offer_participant_payment[data?.offer_participant[key].offer_participant_payment.length - 1].offer_payment_amount?.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
                                                        </tr>
                                                    </tbody>
                                                </table> : null}
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="payment_type">Payment Type</label>
                                        <select name="payment_type" id="" value={participant.payment_type} onChange={(e) => handleChange(key, e)} className="form-control">
                                            <option value="">Select payment type</option>
                                            <option value="Bank Transfer">Bank Transfer</option>
                                            <option value="Cheque">Cheque</option>
                                        </select>
                                        {errors[key].payment_type.type && <p>{errors[key].payment_type.message}</p>}
                                    </div>

                                    {/* Banks section */}
                                    <div className="row">
                                        {participant.payment_type && <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="bank name">Bank Name</label>
                                                <input type="text" className="form-control" value={participant.bank_name} onChange={(e) => handleChange(key, e)} name="bank_name" />
                                            </div>
                                        </div>}
                                        {participant.payment_type === "Bank Transfer" && <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="bank name">Beneficiary Bank Name</label>
                                                <input type="text" className="form-control" value={participant.b_bank_name} name="b_bank_name" onChange={(e) => handleChange(key, e)} />
                                            </div>
                                        </div>}
                                        {participant.payment_type === "Cheque" && <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="bank name">Cheque Number</label>
                                                <input type="text" className="form-control" value={participant.cheque_number} name="cheque_number" onChange={(e) => handleChange(key, e)} />
                                            </div>
                                        </div>}
                                    </div>
                                    {/* End of Bank section */}

                                    {/* Cheque section */}
                                    <div className="row">

                                    </div>
                                    {/* End of cheque section */}

                                    {/* Comment section */}
                                    <div className="form-group">
                                        <label htmlFor="comment">Comment</label>
                                        <textarea className="form-control" value={participant.comment} onChange={(e) => handleChange(key, e)} name="comment" id="" cols="30" rows="3"></textarea>
                                    </div>
                                    {/* End of comment section */}


                                </fieldset>
                            )
                        }) : null}
                        {forms.length ? <div className="form-group d-flex justify-content-end">
                            <button
                                type="submit"
                                onClick={handleDistibution}
                                className="btn btn-sm btn-primary w-md">
                                Distribute Payments
                        </button>
                        </div> : null}
                    </> : <Alert variant="danger">
                        <strong>No current payment identified on offer with policy number: {data?.offer_detail.policy_number}</strong>
                        <p><em>Payment to be made on {data?.offer_participant.length} reinsurers will be made active once payment is found.</em></p>
                    </Alert>}
            </div>
        </div>
    )
}
