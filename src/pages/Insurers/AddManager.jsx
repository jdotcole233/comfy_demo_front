/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-throw-literal */
import React, { useState, useEffect, useContext } from 'react'
import swal from 'sweetalert'
import { useMutation } from 'react-apollo';
import { CREATE_INSURER_REP } from '../../graphql/mutattions';
import { INSURERS } from '../../graphql/queries';
import styles from './styles/ViewInsurerOffer.module.css'
import { DrawerContext } from '../../components/Drawer';



function AddManager({ details, toggle }) {
    const { closed } = useContext(DrawerContext);
    const [errors, setErros] = useState({})
    const [formInputs, setFormInputs] = useState({
        first_name: "",
        last_name: "",
        phone_pri: "",
        phone_sec: "",
        email: "",
        position: "",
        insurer_id: ""
    });
    useEffect(() => {
        if (closed) {
            setFormInputs({
                first_name: "",
                last_name: "",
                phone_pri: "",
                phone_sec: "",
                email: "",
                position: "",
                insurer_id: ""
            })
        }
    }, [closed])

    useEffect(() => {
        if (details) {
            setFormInputs({
                ...formInputs,
                insurer_id: details.insurer_id
            })
        }
    }, [details])

    const [createAssociate] = useMutation(CREATE_INSURER_REP, {
        variables: {
            ...formInputs
        },
        refetchQueries: [{ query: INSURERS }]
    })


    const validatePhoneNumber = e => {
        let regexp = /^\d{13}$/
        const { value, name } = e.target
        if (!value) {
            setErros(prev => ({
                ...prev,
                [name]: null
            }))
            return
        }
        if (!regexp.test(value)) {
            setErros(prev => ({
                ...prev,
                [name]: { message: "Wrong phone number" }
            }))
        } else {
            setErros(prev => ({
                ...prev,
                [name]: null
            }))
        }
    }

    const handleFormInputChange = e => {
        const { name, value } = e.target;
        const newFormInputs = {
            ...formInputs,
            [name]: value
        };
        setFormInputs(newFormInputs)
    }

    const handleAddManager = e => {
        e.preventDefault()
        swal({
            closeOnClickOutside: false,
            closeOnEsc: false,
            icon: "warning",
            title: "Are you sure you want to add" + formInputs.first_name + "?",
            text: ``,
            buttons: ["No", {
                text: "Yes",
                closeModal: false
            }],
        })
            .then(btn => {
                if (!btn) throw null
                return createAssociate();
            })
            .then(json => {
                setFormInputs({
                    first_name: "",
                    last_name: "",
                    phone_pri: "",
                    phone_sec: "",
                    email: "",
                    position: ""
                })
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
            });
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
            <form onSubmit={handleAddManager} method="POST" className={styles.card_body}>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="">First Name</label>
                            <input name="first_name" value={formInputs.first_name} onChange={handleFormInputChange} type="text" className="form-control" placeholder="First Name" required />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="">Last Name</label>
                            <input name="last_name" value={formInputs.last_name} onChange={handleFormInputChange} type="text" className="form-control" placeholder="Last Name" required />
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="form-group">
                            <label htmlFor="">Email</label>
                            <input name="email" value={formInputs.email} onChange={handleFormInputChange} type="email" className="form-control" placeholder="Email" required />
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
                            <input onKeyUp={validatePhoneNumber} name="phone_pri" value={formInputs.phone_pri} onChange={handleFormInputChange} type="text" className="form-control" placeholder="Primary Phone number" required />
                            {errors["phone_pri"] && <p className="text-danger">{errors["phone_pri"].message}</p>}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="">Secondary Phone number</label>
                            <input onKeyUp={validatePhoneNumber} name="phone_sec" value={formInputs.phone_sec} onChange={handleFormInputChange} type="text" className="form-control" placeholder="Secondary Phone number" />
                            {errors["phone_sec"] && <p className="text-danger">{errors["phone_sec"].message}</p>}
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="form-group">
                            <label htmlFor="position">Position</label>
                            <select className="form-control" name="position" value={formInputs.position} onChange={handleFormInputChange} required>
                                <option value="">choose a position</option>
                                <option value="Manager">Manager</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="form-group d-flex justify-content-end">
                            <button
                                type="submit"
                                // onClick={handleAddManager}
                                // disabled={validateInputs(formInputs)}
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


