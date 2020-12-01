/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-throw-literal */
import React, { useState, useEffect, useContext } from 'react'
import { useMutation } from 'react-apollo'
import { UPDATE_INSURER_MANAGER, REMOVE_INSURER_MANAGER } from '../../../graphql/mutattions'
import { INSURER } from '../../../graphql/queries'
import swal from 'sweetalert'
import { useForm } from 'react-hook-form';
import { Modal } from 'react-bootstrap'
import { AuthContext } from '../../../context/AuthContext'
import { deleteAccessRoles, editAccessRoles } from '../../../layout/adminRoutes'

const ManagerButtons = ({ manager, state }) => {
    const { register, errors, handleSubmit, setValue } = useForm()
    const { state: { user } } = useContext(AuthContext)

    const [viewAssociate, setViewAssociate] = useState(false)
    const [selectedInsurer, setSelectedInsurer] = useState(null)
    const [updateManager] = useMutation(UPDATE_INSURER_MANAGER, {
        refetchQueries: [{ query: INSURER, variables: { id: state?.insurer_id } }]
    })

    const [removeManager] = useMutation(REMOVE_INSURER_MANAGER, {
        refetchQueries: [{ query: INSURER, variables: { id: state?.insurer_id } }]
    })


    useEffect(() => {
        if (selectedInsurer) {
            setValue("rep_first_name", selectedInsurer.assoc_first_name);
            setValue("rep_last_name", selectedInsurer.assoc_last_name);
            setValue("rep_email", selectedInsurer.assoc_email);
            setValue("position", selectedInsurer.position);
            setValue("rep_primary_phonenumber", selectedInsurer.assoc_primary_phonenumber);
            setValue("rep_secondary_phonenumber", selectedInsurer.assoc_secondary_phonenumber);
        }
    }, [selectedInsurer])

    const handleViewManager = manager => {
        setSelectedInsurer(manager)
        setViewAssociate(!viewAssociate)
    }

    const handleRemoveManager = manager => {
        setSelectedInsurer(manager)
        swal({
            closeOnClickOutside: false,
            closeOnEsc: false,
            icon: "warning",
            title: `Are you sure you want to remove ${manager.assoc_first_name} ?`,
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "No",

            buttons: ["No", { text: "Yes", closeModal: false }]
        }).then(input => {
            if (!input) throw {}
            removeManager({
                variables: {
                    id: manager.insurer_associate_id,
                }
            }).then(res => {
                swal("Success", "Manager removed successfully", "success");
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

    const handleUpdateManager = values => {
        swal({
            closeOnClickOutside: false,
            closeOnEsc: false,
            icon: "warning",
            title: `Are you sure you want to update ${selectedInsurer.assoc_first_name} ?`,
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "No",

            buttons: ["No", { text: "Yes", closeModal: false }]
        }).then(input => {
            if (!input) throw {};
            updateManager({
                variables: {
                    id: selectedInsurer.insurer_associate_id,
                    manager: {
                        ...values,
                        insurersinsurer_id: state?.insurer_id
                    }
                }
            }).then(res => {
                swal("Success", "Manager updated successfully", "success");
                setViewAssociate(false)
            }).catch(err => {
                if (err) {
                    swal("Sorry!!", err.message.replace("GraphQL error:",""), "error");
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
                <button onClick={() => handleViewManager(manager)} className="btn btn-sm btn-primary w-md mr-1">View</button>
                {deleteAccessRoles.includes(user?.position) && <button onClick={() => handleRemoveManager(manager)} className="btn btn-sm btn-danger w-md mr-1">Remove</button>}
            </>

            {/* View Manager Modal */}
            <Modal size="lg" show={viewAssociate} onHide={() => { setViewAssociate(!viewAssociate); setSelectedInsurer(null) }}>
                <Modal.Header closeButton>
                    View Manager
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit(handleUpdateManager)} className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="first_name">First name</label>
                                <input name="rep_first_name" ref={register({ required: "Required" })} type="text" className="form-control" placeholder="First name" />
                                {errors.rep_first_name && <p className="text-danger">{errors.rep_first_name.message}</p>}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="first_name">Last name</label>
                                <input name="rep_last_name" ref={register({ required: "Required" })} type="text" className="form-control" placeholder="Last name" />
                                {errors.rep_last_name && <p className="text-danger">{errors.rep_last_name.message}</p>}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="first_name">Primary phone number</label>
                                <input name="rep_primary_phonenumber" ref={register({ required: "Required" })} type="text" className="form-control" placeholder="Primary phone number" />
                                {errors.rep_primary_phonenumber && <p className="text-danger">{errors.rep_primary_phonenumber.message}</p>}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="first_name">Secondary Phone number</label>
                                <input name="rep_secondary_phonenumber" ref={register({ required: false })} type="text" className="form-control" placeholder="Secondary Phone number" />
                                {errors.rep_secondary_phonenumber && <p className="text-danger">{errors.rep_secondary_phonenumber.message}</p>}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="first_name">Email</label>
                                <input name="rep_email" type="email" ref={register({ required: "Required" })} className="form-control" placeholder="Email" />
                                {errors.rep_email && <p className="text-danger">{errors.rep_email.message}</p>}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="first_name">Position</label>
                                <select name="position" ref={register({ required: "Required" })} id="" className="form-control">
                                    <option value="">Position</option>
                                    <option value="Manager">Manager</option>
                                    <option value="Underwriter">Underwriter</option>
                                </select>
                                {errors.position && <p className="text-danger">{errors.position.message}</p>}
                            </div>
                        </div>
                        <div className="col-md-12 d-flex justify-content-end">
                            {/* <button type="button" onClick={() => setViewAssociate(!viewAssociate)} className="btn btn-danger btn-sm w-md mr-1">Close</button> */}
                            {editAccessRoles.includes(user?.position) && <button type="submit" className="btn btn-primary btn-sm w-lg">Save</button>}
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
            {/* /end of View Manager Modal */}
        </div>
    )
}

export default ManagerButtons
