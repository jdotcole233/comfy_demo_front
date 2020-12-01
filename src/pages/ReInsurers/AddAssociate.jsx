/* eslint-disable no-throw-literal */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react'
import swal from 'sweetalert'
import { useMutation } from 'react-apollo';
import { CREATE_ASSOCIATE } from '../../graphql/mutattions';
import { REINSURERS } from '../../graphql/queries';
import styles from './styles/ViewReinsurerOffer.module.css'
import { Alert } from 'react-bootstrap'
import { DrawerContext } from '../../components/Drawer';




function AddAssociate({ details, toggle }) {
    const { closed } = useContext(DrawerContext);
    const [formInputs, setFormInputs] = useState({
        first_name: "",
        last_name: "",
        phone_pri: "",
        phone_sec: "",
        email: "",
        position: "",
        reinsurer_id: ""
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
                reinsurer_id: ""
            })
        }
    }, [closed])
    useEffect(() => {
        if (details) {
            setFormInputs({
                ...formInputs,
                reinsurer_id: details.reinsurer_id
            })
        }
    }, [details])

    const [createAssociate] = useMutation(CREATE_ASSOCIATE, {
        variables: {
            ...formInputs
        },
        refetchQueries: [{ query: REINSURERS }]
    })


    const handleFormInputChange = e => {
        const { name, value } = e.target;
        const newFormInputs = {
            ...formInputs,
            [name]: value
        };
        setFormInputs(newFormInputs)
    }

    const handleAddAssociate = e => {
        e.preventDefault()
        console.log()
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
                swal("Sucess", "Associate added Successfully", "success");
            })
            .catch(err => {
                if (err) {
                    swal("Sorry!!", err.message.replace("GraphQL error:",""), "error");
                } else {
                    swal.stopLoading();
                    swal.close();
                }
            });
    }


    return (
        <div>
            <div className={styles.card_header}>
                <h2 className={styles.card_title}>Add Associate</h2>
                <Alert variant="danger">
                    <strong></strong>
                </Alert>
                <fieldset className="border p-2 mb-2">
                    <legend className={styles.details_title}>Reinsurer Details</legend>
                    <table className="table">
                        <tbody>
                            <tr>
                                <td>Company name</td>
                                <td>{details?.re_company_name}</td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td>{details?.re_company_email}</td>
                            </tr>
                            <tr>
                                <td>Website</td>
                                <td>{details?.re_company_website}</td>
                            </tr>
                        </tbody>
                    </table>
                </fieldset>
            </div>
            <form onSubmit={handleAddAssociate} className={styles.card_body}>
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
                            <input name="phone_pri" value={formInputs.phone_pri} onChange={handleFormInputChange} type="text" className="form-control" placeholder="Primary Phone number" required />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="">Secondary Phone number</label>
                            <input name="phone_sec" value={formInputs.phone_sec} onChange={handleFormInputChange} type="text" className="form-control" placeholder="Secondary Phone number" />
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="form-group">
                            <label htmlFor="position">Position</label>
                            <select className="form-control" name="position" value={formInputs.position} onChange={handleFormInputChange} required>
                                <option value="">choose a position</option>
                                <option value="Manager">Manager</option>
                                <option value="Underwriter">Underwriter</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="form-group d-flex justify-content-end">
                            <button
                                type="submit"
                                className="btn btn-sm btn-primary w-md">
                                Add Associate
                        </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default AddAssociate


