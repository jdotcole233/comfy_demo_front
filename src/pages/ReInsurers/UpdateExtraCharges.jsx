/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-throw-literal */
import React, { useContext } from 'react'
import swal from 'sweetalert'
import { useMutation } from 'react-apollo';
import { UPDATE_EXTRA_CHARGE } from '../../graphql/mutattions';
import { REINSURERS } from '../../graphql/queries';
import styles from './styles/ViewReinsurerOffer.module.css'
import { Alert } from 'react-bootstrap'
import { useForm } from 'react-hook-form'

import { DrawerContext } from '../../components/Drawer';





function UpdateExtraCharges({ details, toggle }) {
    const { closed } = useContext(DrawerContext);
    const { setValue, errors, handleSubmit, register, reset } = useForm()
    const [updateCharge] = useMutation(UPDATE_EXTRA_CHARGE, {
        refetchQueries: [{ query: REINSURERS }]
    })

    React.useEffect(() => {
        if (details) {
            setValue("withholding_tax", details?.offer_extra_charges?.withholding_tax)
            setValue("agreed_brokerage_percentage", details?.offer_extra_charges?.agreed_brokerage_percentage)
            setValue("agreed_commission", details?.offer_extra_charges?.agreed_commission)
            setValue("nic_levy", details?.offer_extra_charges?.nic_levy)
            setValue("offer_extra_charge_id", details?.offer_extra_charges?.offer_extra_charge_id)
        }
    }, [details])


    React.useEffect(() => {
        if (closed) {
            // reset();
        }
    }, [closed, reset])


    const handleUpdateExtraCharges = values => {
        swal({
            closeOnClickOutside: false,
            closeOnEsc: false,
            icon: "warning",
            title: "Are you sure you want to update extra charge ?",
            text: ``,
            buttons: ["No", {
                text: "Yes",
                closeModal: false
            }],
        })
            .then(btn => {
                if (!btn) throw null
                const data = { ...values }
                delete data.offer_extra_charge_id
                return updateCharge({
                    variables: { id: values.offer_extra_charge_id, participatant_id: details.offer_participant_id, data: { offer_id: details.offersoffer_id, reinsurer_data: data } }
                });
            })
            .then(json => {
                toggle();
                // reset()
                swal("Sucess", "Extra charge updated Successfully", "success");
            })
            .catch(err => {
                if (err) {
                    swal("Oh noes!", "The AJAX request failed!", "error");
                    // console.log(err)
                } else {
                    swal.stopLoading();
                    swal.close();
                }
            });
    }


    return (
        <div>
            <div className={styles.card_header}>
                <h2 className={styles.card_title}>Update Deduction Charges</h2>
                <Alert variant="danger">
                    <strong></strong>
                </Alert>
                <fieldset className="border p-2 mb-2">
                    <legend className={styles.details_title}>Offer Details</legend>
                    <table className="table">
                        <tbody>
                            <tr>
                                <td>Offer/Policy number</td>
                                <td>{details?.reinsurer_offers_only?.offer_detail.policy_number}</td>
                            </tr>
                            <tr>
                                <td>Insurer</td>
                                <td>{details?.reinsurer_offers_only?.insurer.insurer_company_name}</td>
                            </tr>
                            <tr>
                                <td>Offer Date</td>
                                <td>{details?.reinsurer_offers_only?.created_at}</td>
                            </tr>
                        </tbody>
                    </table>
                </fieldset>
            </div>
            <form onSubmit={handleSubmit(handleUpdateExtraCharges)} className={styles.card_body}>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="">With-holding Tax</label>
                            <input ref={register({ required: "Required" })} min="0" step="0.01" name="withholding_tax" type="number" className="form-control" placeholder="With-holding Tax" />
                            {errors.withholding_tax && <p className="text-danger">{errors.withholding_tax.message}</p>}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="">NIC levy</label>
                            <input ref={register({ required: "Required" })} min="0" step="0.01" name="nic_levy" type="number" className="form-control" placeholder="NIC levy" />
                            {errors.nic_levy && <p className="text-danger">{errors.nic_levy.message}</p>}
                            <input type="hidden" ref={register({ required: "Required" })} name="offer_extra_charge_id" />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="">Agreed Brokerage</label>
                            <input ref={register({ required: "Required" })} min="0" step="0.01" name="agreed_brokerage_percentage" type="number" className="form-control" placeholder="Agreed Brokerage" />
                            {errors.agreed_brokerage_percentage && <p className="text-danger">{errors.agreed_brokerage_percentage.message}</p>}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="">Agreed Commission</label>
                            <input ref={register({ required: "Required" })} min="0" step="0.01" name="agreed_commission" type="number" className="form-control" placeholder="Agreed Commission" />
                            {errors.agreed_commission && <p className="text-danger">{errors.agreed_commission.message}</p>}
                        </div>
                    </div>
                </div>
                <div className="col-md-12">
                    <div className="form-group d-flex justify-content-end">
                        <button
                            type="submit"
                            className="btn btn-sm btn-primary w-md">
                            Update charges
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default UpdateExtraCharges


