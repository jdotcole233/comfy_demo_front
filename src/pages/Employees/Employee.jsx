/* eslint-disable no-throw-literal */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import swall from 'sweetalert2'
import { useMutation } from 'react-apollo';
import { REMOVE_EMPLOYEE, RESET_CREDENTIALS } from '../../graphql/mutattions/employees';
import { EMPLOYEES } from '../../graphql/queries/employees';
import swal from 'sweetalert';

export default function Employees({ data, openViewEmployee }) {


    const [removeEmployee] = useMutation(REMOVE_EMPLOYEE, {
        variables: { employee_id: data.employee_id },
        refetchQueries: [{ query: EMPLOYEES }]
    });

    const [resetEmployeePassword] = useMutation(RESET_CREDENTIALS, {
        variables: { employee_id: data.employee_id }
    });

    const handleResetEmployeeCredentials = () => {
        swal({
            icon: "warning",
            title: "Reset Employee Password",
            text: `This action would reset the employee's password`,
            buttons: ["No", { text: "Yes", closeModal: false }],
            closeOnClickOutside: false,
            closeOnEsc: false
        }).then(input => {
            if (!input) throw {}
            resetEmployeePassword().then(res => swal("Success", "Employee credentials reset successful", "success"))
                .catch(err => {
                    if (err) {
                        swal("Whoops!!", "Somehing went wrong", 'error')
                    } else {
                        swal.stopLoading();
                        swal.close()
                    }
                })
        })
        // swall.fire({
        //     icon: "warning",
        //     allowEscapeKey: false,
        //     title: "Reset Employee Password",
        //     text: `This action would reset the employee's password`,
        //     showCancelButton: true,
        //     confirmButtonText: "Yes",
        //     cancelButtonText: "No",
        //     reverseButtons: true,
        //     showLoaderOnConfirm: true,
        //     allowOutsideClick: false,
        // }).then(input => {
        //     if (!input.value) throw {}
        //     return resetEmployeePassword().then(res => res.json())
        //         .catch(err => new Error(err))

        // }).then(res => swall.fire("Success", "Employee credentials reset successful", "success"))
        //     .catch(err => swall.fire("Whoops!!", "Something went wrong", "error"));
    }

    const handleRemoveEmployee = () => {
        swall.fire({
            icon: "warning",
            allowOutsideClick: false,
            allowEscapeKey: false,
            title: "Delete Employee",
            text: `This action would completely remove employee details from system`,
            buttons: ["No", { text: "Yes", closeModal: false }],
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "No",
            reverseButtons: true,
            showLoaderOnConfirm: true,
            preConfirm: () => {
                return removeEmployee().then(res => res)
                    .catch(err => new Error(err))
            }
        }).then(input => {
            if(!input.isConfirmed) return
            swall.fire("Success", "Employee deleted successfully", "success")
        }).catch(err => swall.fire("Whoops!!", "Something went wrong", "error"));
    }

    return (
        <div className="col-xl-4 col-sm-6">
            <div className="card">
                <div className="card-body">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="text-lg-center">
                                <div className="avatar-lg mr-3 mx-lg-auto mb-4 float-left float-lg-none">
                                    <span className="avatar-title rounded-circle bg-soft-primary text-primary font-size-16">
                                        {data.emp_abbrv}
                                    </span>
                                </div>
                                {/* <h5 className="mb-1 font-size-15 text-truncate">Marion Burton</h5>
                                <a href="#" className="text-muted">@Skote</a> */}
                            </div>
                        </div>

                        <div className="col-lg-8">
                            <div>
                                {/* <a href="invoices-detail.html" className="d-block text-primary mb-2">Invoice #14251</a> */}
                                <h5 className="text-truncate">{data.employee_first_name} {data.employee_last_name}</h5>
                                <p className="text-muted" >{data.user.position}</p>
                                <h5 className="font-size-14 text-truncate" data-toggle="tooltip" data-placement="top" title="" data-original-title="Amount"><i className="bx bx-envelope mr-1 text-primary"></i> {data.employee_email}</h5>
                                <h5 className="font-size-14" data-toggle="tooltip" data-placement="top" title="" data-original-title="Due Date"><i className="bx bx-calendar mr-1 text-primary"></i> {data.employee_phonenumber}</h5>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="card-footer bg-transparent border-top">
                    <div className="contact-links d-flex font-size-20">
                        <div onClick={() => openViewEmployee(data)} className="flex-fill d-flex  p-1 justify-content-center link-hover" data-toggle="tooltip" data-placement="top" title="View">
                            <i className="bx bx-show-alt"></i>
                        </div>
                        <div onClick={handleResetEmployeeCredentials} className="flex-fill d-flex justify-content-center p-1 link-hover" data-toggle="tooltip" data-placement="top" title="Reset Credentials">
                            <i className='bx bx-reset'></i>
                        </div>
                        <div onClick={handleRemoveEmployee} className="flex-fill d-flex justify-content-center p-1 link-hover" data-toggle="tooltip" data-placement="top" title="Delete">
                            <i className="bx bx-trash-alt"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
