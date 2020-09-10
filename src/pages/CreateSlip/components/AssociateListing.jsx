/* eslint-disable no-throw-literal */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import { associatesColumns } from '../columns'
import { Datatable } from '../../../components'
import { deleteAccessRoles } from '../../../layout/adminRoutes';
import swal from 'sweetalert';
import { useMutation } from 'react-apollo';
import { REMOVE_ASSOCIATE_FROM_PARTICIPATION } from '../../../graphql/mutattions';
import { SINGLE_OFFER } from '../../../graphql/queries';

const AssociateListing = ({ data, state, user }) => {

    const [associates, setAssociates] = useState([])
    const [removeAssociate] = useMutation(REMOVE_ASSOCIATE_FROM_PARTICIPATION, {
        refetchQueries: [{ query: SINGLE_OFFER, variables: { offer_id: state?.offer_id } }],
    });



    useEffect(() => {
        if (data) {
            const list = [];
            data.findSingleOffer.offer_associates.map((associate) => {
                const row = {
                    company_email:
                        associate.reinsurer_representative.reinsurer.re_company_email,
                    company_name:
                        associate.reinsurer_representative.reinsurer.re_company_name,
                    rep_name:
                        associate.reinsurer_representative.rep_first_name +
                        " " +
                        associate.reinsurer_representative.rep_last_name,
                    rep_phone: [
                        associate.reinsurer_representative.rep_primary_phonenumber,
                        associate.reinsurer_representative.rep_secondary_phonenumber,
                    ].join(","),
                    rep_email: associate.reinsurer_representative.rep_email,
                    email_status: (
                        <span
                            style={{ letterSpacing: 3 }}
                            className={`badge badge-soft-${
                                associate.sent_status === "UNSENT" ? "danger" : "success"
                                }`}
                        >
                            {associate.sent_status}
                        </span>
                    ),
                    actions: (
                        <button
                            disabled={!deleteAccessRoles.includes(user?.position)}
                            onClick={() => handleRemoveAssociate(associate)}
                            className="btn btn-danger btn-sm w-md"
                        >
                            Remove
                        </button>
                    ),
                };
                list.push(row);
                return associate;
            });
            setAssociates(list);
        }
    }, [data]);

    const handleRemoveAssociate = (data) => {
        swal({
            icon: "warning",
            title: `Are you sure you wanto remove ${data.reinsurer_representative.rep_first_name} ${data.reinsurer_representative.rep_last_name} ?`,
            buttons: [
                "NO",
                {
                    text: "Yes",
                    closeModal: false,
                },
            ],
        }).then((input) => {
            if (!input) throw null;
            removeAssociate({
                variables: {
                    offer_to_associate_id: data.offer_to_associate_id,
                },
            })
                .then((res) => {
                    swal("Hurray", "Associate removed successfully", "success");
                })
                .catch((err) => {
                    if (err) {
                        console.log(err);
                        swal("Oh noes!", "The AJAX request failed!", "error");
                    } else {
                        swal.stopLoading();
                        swal.close();
                    }
                });
        });
    };


    return (
        <>
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title mb-4">Distribution List</h4>

                            <ul className="nav nav-tabs nav-tabs-custom">
                                <li className="nav-item">
                                    <a className="nav-link active" href="#">
                                        All
                    </a>
                                </li>
                            </ul>

                            <div className="mt-4">
                                <Datatable columns={associatesColumns} data={associates} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AssociateListing
