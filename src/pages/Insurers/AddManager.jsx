/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-throw-literal */
import React, { useEffect } from 'react'
import swal from 'sweetalert'
import { useMutation } from 'react-apollo';
import { CREATE_INSURER_REP } from '../../graphql/mutattions';
import { INSURERS } from '../../graphql/queries';
import styles from './styles/ViewInsurerOffer.module.css'
import { useForm } from 'react-hook-form'



function AddManager({ details, toggle, closed }) {
    const { register, handleSubmit, errors, setValue, reset } = useForm({
        defaultValues: {
            first_name: "",
            last_name: "",
            email: "",
            phone_sec: "",
            phone_pri: "",
            position: "",
            insurer_id: details?.insurer_id
        }
    })
    useEffect(() => {
        if (!closed) {
            reset()
        }
    }, [closed])

    useEffect(() => {
        if (details) {
            console.log(details)
            setValue("insurer_id", details.insurer_id)
        }
    }, [details])

    const [createAssociate] = useMutation(CREATE_INSURER_REP, {
        refetchQueries: [{ query: INSURERS }]
    })




    const handleAddManager = values => {
        console.log(values)
        swal({
            closeOnClickOutside: false,
            closeOnEsc: false,
            icon: "warning",
            title: "Are you sure you want to add " + values.first_name + "?",
            text: ``,
            buttons: ["No", {
                text: "Yes",
                closeModal: false
            }],
        })
            .then(btn => {
                if (!btn) throw null
                createAssociate({
                    variables: values
                }).then(json => {
                    toggle();
                    swal("Sucess", "Manager added Successfully", "success");
                })
                    .catch(err => {
                        if (err) {
                            console.log(err)
                            swal("Oh noes!", "The AJAX request failed!", "error");
                        } else {
                            swal.stopLoading();
                            swal.close();
                        }
                    });;
            })

    }


    return (
        <div>
            <div className={styles.card_header}>
                <h2 className={styles.card_title}>Add Manager</h2>

                <fieldset className="border p-2 mb-2">
                    <legend className={styles.details_title}>Insurer Details</legend>
                    <table className="table">
                        <tbody>
                            <tr>
                                <td>Company name</td>
                                <td>{details?.insurer_company_name}</td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td>{details?.insurer_company_email}</td>
                            </tr>
                            <tr>
                                <td>Website</td>
                                <td>{details?.insurer_company_website}</td>
                            </tr>
                        </tbody>
                    </table>
                </fieldset>
            </div>
            <form onSubmit={handleSubmit(handleAddManager)} method="POST" className={styles.card_body}>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="">First Name</label>
                            <input name="first_name" ref={register({ required: "Required" })} type="text" className="form-control" placeholder="First Name" />
                            {errors.first_name && <p className="text-danger">{errors.first_name.message}</p>}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="">Last Name</label>
                            <input type="hidden" name="insurer_id" ref={register({ required: "Required" })} />
                            <input name="last_name" ref={register({ required: "Required" })} type="text" className="form-control" placeholder="Last Name" />
                            {errors.last_name && <p className="text-danger">{errors.last_name.message}</p>}
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="form-group">
                            <label htmlFor="">Email</label>
                            <input name="email" ref={register({ required: "Required" })} type="email" className="form-control" placeholder="Email" />
                            {errors.email && <p className="text-danger">{errors.email.message}</p>}
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="form-group alert alert-danger">
                            <p>Phone numbers should be prepended with country code <br />
                        Eg. 233506339153
                        </p>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="">Primary Phone number</label>
                            <input ref={register({
                                required: "Required", pattern: {
                                    value: /^\d{12}$/,
                                    message: "Phone number must meet standard"
                                }
                            })} name="phone_pri" type="text" className="form-control" placeholder="Primary Phone number" />
                            {errors["phone_pri"] && <p className="text-danger">{errors["phone_pri"].message}</p>}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="">Secondary Phone number</label>
                            <input name="phone_sec" ref={register({
                                required: false, pattern: {
                                    value: /^\d{12}$/,
                                    message: "Phone number must meet standard"
                                }
                            })} type="text" className="form-control" placeholder="Secondary Phone number" />
                            {errors["phone_sec"] && <p className="text-danger">{errors["phone_sec"].message}</p>}
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="form-group">
                            <label htmlFor="position">Position</label>
                            <select className="form-control" name="position" ref={register({ required: "Required" })} >
                                <option value="">choose a position</option>
                                <option value="Manager">Manager</option>
                            </select>
                            {errors.email && <p className="text-danger">{errors.email.message}</p>}
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="form-group d-flex justify-content-end">
                            <button
                                type="submit"
                                className="btn btn-sm btn-primary w-md">
                                Add Manager
                        </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default AddManager


