/* eslint-disable no-throw-literal */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useForm } from 'react-hook-form';
import styles from './styles/inputOffer.module.css'
import { dateBuilder } from './Treaty'
import { Alert } from 'react-bootstrap'
import { useMutation } from "@apollo/client";
import { ADD_DEDUCTION_TO_TREATY, UPDATE_TREATY_DEDUCTION, TREATIES } from '../../graphql/queries/treaty';
import swal from 'sweetalert';
import { useEffect } from 'react';

const NewDeduction = ({ treaty, close, deduction }) => {
    const { register, errors, handleSubmit, reset, setValue } = useForm()

    const [addDeduction] = useMutation(ADD_DEDUCTION_TO_TREATY, {
        refetchQueries: [{ query: TREATIES }]
    })

    const [updateDeduction] = useMutation(UPDATE_TREATY_DEDUCTION, {
        refetchQueries: [{ query: TREATIES }]
    })

    useEffect(() => {
        if (deduction) {
            // alert("Deduction Here")
            setValue("commission", deduction?.commission)
            setValue("brokerage", deduction?.brokerage)
            setValue("nic_levy", deduction?.nic_levy)
            setValue("withholding_tax", deduction?.withholding_tax)
            setValue("treaty_period_from", deduction?.treaty_period_from)
            setValue("treaty_period_to", deduction?.treaty_period_to)
        }
    }, [deduction])

    const onSubmit = (values) => {
        swal({
            closeOnClickOutside: false,
            closeOnEsc: false,
            icon: "warning",
            title: `Are you sure you want to add this deduction ?`,
            text: ``,
            buttons: ["No", {
                text: "Yes",
                closeModal: false
            }],
        })
            .then(input => {
                if (!input) throw null;
                addDeduction({
                    variables: {
                        deductions: values
                    }
                }).then(res => {
                    swal("Hurray!!", "Deduction added successfully", "success");
                    reset();
                    close()
                }).catch(err => {
                    swal("Whhoops!!", "Deduction not added successfully", "error")
                })
            })
    }

    const onSubmitEdit = (values) => {
        swal({
            closeOnClickOutside: false,
            closeOnEsc: false,
            icon: "warning",
            title: `Are you sure you want to update this deduction ?`,
            text: ``,
            buttons: ["No", {
                text: "Yes",
                closeModal: false
            }],
        })
            .then(input => {
                if (!input) throw null;
                updateDeduction({
                    variables: {
                        deductions: values,
                        deduction_id: deduction?.treaty_associate_deduction_id
                    }
                }).then(res => {
                    swal("Hurray!!", "Deduction upadted successfully", "success");
                    reset();
                    close()
                }).catch(err => {
                    swal("Whhoops!!", "Deduction not updated successfully", "error")
                })
            })
    }

    return (
        <form onSubmit={handleSubmit(deduction ? onSubmitEdit : onSubmit)}>
            <div className={styles.card_header}>
                <h2 className={styles.card_title}>{deduction ? "Edit" : "Add"} Deduction</h2>

                <fieldset className="border p-2 mb-2">
                    <legend className={styles.details_title}>Treaty Description</legend>
                    <table className="table">
                        <tbody>
                            <tr>
                                <td>Treaty Program</td>
                                <td>{treaty?.treaty_name}</td>
                            </tr>
                            <tr>
                                <td>Ceding Company</td>
                                <td>{treaty?.insurer?.insurer_company_name}</td>
                            </tr>
                            <tr>
                                <td>Last Known Period</td>
                                <td>{treaty?.treaty_associate_deductions.length > 0 ? dateBuilder(treaty?.treaty_associate_deductions[0]) : "N/A"}</td>
                            </tr>
                        </tbody>
                    </table>
                </fieldset>
            </div>
            <Alert variant="danger">
                <p>Deductions will be set for the full period of this treaty program. It will affect all computations on {treaty?.treaty_name}  </p>
            </Alert>
            <fieldset className="border p-2 mb-2">
                <legend className={styles.details_title}>Deductions</legend>
                <div className="row">
                    {treaty && treaty?.treaty_type === "PROPORTIONAL" && <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="Type of goods">Commision (%)</label>
                            <input type="text" ref={register({ required: "Provide commission" })} name="commission" className="form-control" placeholder="Commision" />
                            {errors.commission && <p className="text-danger">{errors.commission.message}</p>}
                        </div>
                    </div>}
                    <div className={`col-md-${treaty && treaty?.treaty_type === "PROPORTIONAL" ? "6" : "12"}`}>
                        <div className="form-group">
                            <label htmlFor="Type of goods">Brokerage (%)</label>
                            <input type="text" ref={register({ required: "Provide brokerage" })} name="brokerage" className="form-control" placeholder="Brokerage" />
                            {errors.brokerage && <p className="text-danger">{errors.brokerage.message}</p>}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="Type of goods">NIC Levy</label>
                            <input ref={register({ required: "Provide NIC Levy" })} name="nic_levy" type="text" className="form-control" placeholder="NIC Levy" />
                            {errors.nic_levy && <p className="text-danger">{errors.nic_levy.message}</p>}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="Type of goods">Withholding Tax (%)</label>
                            <input name="withholding_tax" ref={register({ required: "Provide Withholding tax" })} type="text" className="form-control" placeholder="Withholding Tax" />
                            {errors.withholding_tax && <p className="text-danger">{errors.withholding_tax.message}</p>}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="Type of goods">Period From</label>
                            <input name="treaty_period_from" ref={register({ required: "Provide period from" })} type="date" className="form-control" placeholder="Premium" />
                            {errors.treaty_period_from && <p className="text-danger">{errors.treaty_period_from.message}</p>}

                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="Type of goods">Period To</label>
                            <input name="treaty_period_to" ref={register({ required: "Provide period to" })} type="date" className="form-control" placeholder="Facultative Offer" />
                            {errors.treaty_period_to && <p className="text-danger">{errors.treaty_period_to.message}</p>}

                        </div>
                    </div>


                </div>
                <div className="form-group">
                    <input type="hidden" value={treaty?.treaty_program_id} name="treaty_programstreaty_program_id" ref={register({ required: true })} />
                    <input type="submit" className="btn btn-primary btn-sm form-control my-2" value={`${deduction ? "Update" : "Create"} Deduction`} />
                </div>
            </fieldset>
        </form>
    )
}

export default NewDeduction
