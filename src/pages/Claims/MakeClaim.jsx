/* eslint-disable no-throw-literal */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react'
import styles from './styles/card.module.css'
import { Alert } from 'react-bootstrap'
import { useMutation } from 'react-apollo';
import { MAKE_CLAIM_ON_OFFER } from '../../graphql/mutattions';
import { OFFERS } from '../../graphql/queries';
import swal from 'sweetalert';
import emptyImage from '../../assets/empty.png'
import { DrawerContext } from '../../components/Drawer';



const MakeClaim = ({ offer, toggle }) => {
    const { closed } = useContext(DrawerContext);
    const [claim_amount, setclaim_amount] = useState(0);
    const [claim_date, setclaim_date] = useState("");
    const [error, setError] = useState(false)
    const [makeClaim] = useMutation(MAKE_CLAIM_ON_OFFER, { refetchQueries: [{ query: OFFERS, variables: { offer_status: ["CLOSED"] } }] })
    const amountSpent = offer?.offer_claims.reduce((total, currentClaim) => total + parseFloat(currentClaim.claim_amount), 0)
    const leftAmount = parseFloat(offer?.fac_sum_insured) - amountSpent;
    const handleMakeClain = event => {
        event.preventDefault();
        const data = { claim_amount, claim_date, offer_id: offer?.offer_id };
        swal({
            icon: "warning",
            title: "Are you sure you want to make claim of " + offer?.offer_detail?.currency + " " + claim_amount + "?",
            buttons: ["No", { text: "Yes", closeModal: false }]
        }).then(input => {
            if (!input) throw {};
            makeClaim({ variables: { data } })
                .then(res => {
                    swal("Hurray!!", "Claimed made successfully", 'success');
                    setclaim_amount("");
                    setclaim_date("");
                    toggle();
                }).catch(err => {
                    if (err) {
                        console.log(err)
                        swal("Oh noes!", "The AJAX request failed!", "error");
                    } else {
                        swal.stopLoading();
                        swal.close();
                    }
                })
        })
    }
    useEffect(() => {
        if (closed) {
            // reset();
            setclaim_amount("");
            setclaim_date("")
        }
    }, [closed])

    useEffect(() => {
        if (leftAmount - parseFloat(claim_amount) < 0) {
            setError(true)
        } else {
            setError(false);
        }
    }, [claim_amount, setclaim_amount])

    return (
        <>
            {leftAmount <= 0 ?
                (
                    <div style={{
                        height: 600,
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-around",
                        flexDirection: "column",
                        alignItems: "center"
                    }}>
                        <img src={emptyImage} style={{ height: 250, width: 200, borderRadius: 12 }} alt="" />
                        <h2>All claims exhausted</h2>
                    </div>
                ) :
                (
                    <>
                        <div className={styles.card_header}>
                            <h2 className={styles.card_title}>Make Claim</h2>
                            <Alert variant="danger">
                                <strong></strong>
                            </Alert>
                            <fieldset className="border p-2 mb-2">
                                <legend className={styles.details_title}>Claim Details [{offer?.offer_detail?.policy_number}]</legend>
                                <table className="table">
                                    <tbody>
                                        <tr>
                                            <td>Facultative offer</td>
                                            <td>{offer?.facultative_offer}%</td>
                                        </tr>
                                        <tr>
                                            <td>Facultative Sum Insured</td>
                                            <td>{offer?.offer_detail?.currency} {offer?.fac_sum_insured.toLocaleString(undefined, { maximumFractionDigits: 2 })} </td>
                                        </tr>
                                        <tr>
                                            <td>Claimable Amount</td>
                                            <td>{offer?.offer_detail?.currency} {leftAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })} </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </fieldset>
                        </div>
                        <div className={styles.card_body}>
                            <div className="row">
                                <table className="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th>Reinsurer className</th>
                                            <th>Participating %</th>
                                            <th>Fac. sum insured</th>
                                            <th>Reinsurer's share</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {offer?.offer_participant.map((participant, key) => {
                                            const calc = (parseFloat(participant.offer_participant_percentage) * parseFloat(claim_amount)) / 100;
                                            const share = isNaN(calc) ? "0" : calc.toLocaleString(undefined, { maximumFractionDigits: 2 })
                                            return (
                                                <tr>
                                                    <td>{participant.reinsurer.re_company_name}</td>
                                                    <td>{participant.offer_participant_percentage}</td>
                                                    <td>{offer?.offer_detail?.currency} {participant.participant_fac_sum_insured}</td>
                                                    <td>{offer?.offer_detail?.currency} {share}</td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                            {/* <fieldset className="border p-1"> */}
                            <div className="row">
                                <form onSubmit={handleMakeClain} className="col-md-12">
                                    <legend style={{ fontSize: 16 }} className="w-auto">Claim Details</legend>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="">Enter amount to be claimed</label>
                                                <input type="number" value={claim_amount} onChange={e => setclaim_amount(e.target.value)} className="form-control" placeholder="Claim amount" required />
                                                {error && <p className="text-danger">{`Claim amount cannot exceed  ${leftAmount}`}</p>}
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="">Claim date</label>
                                                <input type="date" value={claim_date} onChange={e => setclaim_date(e.target.value)} className="form-control" placeholder="Claim amount" required />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <button type="submit" className="btn btn-primary w-md btn-sm float-right">Make claim</button>
                                    </div>
                                </form>
                            </div>
                            {/* </fieldset> */}
                        </div>
                    </>
                )}
        </>
    )
}

export default MakeClaim
