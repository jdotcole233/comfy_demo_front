/* eslint-disable no-throw-literal */
import React, { useContext, useState } from 'react'
import { deleteAccessRoles } from '../../../layout/adminRoutes'
import { AuthContext } from '../../../context/AuthContext'
import { useMutation } from "@apollo/client";
import { DELETE_CLASS_OF_BUSINESS } from '../../../graphql/mutattions';
import { FETCH_CLASS_OF_BUSINESS } from '../../../graphql/queries';
import { Drawer } from '../../../components';
import { UpdateClassOfBusiness } from '../UpdateClassOfBusiness';
import swal from 'sweetalert'

const BusinessButtons = ({ value }) => {
    const { state: { user } } = useContext(AuthContext);
    const [selectedClassOfBusiness, setSelectedClassOfBusiness] = useState(null);
    const [showViewBusiness, setshowViewBusiness] = useState(false)
    const [deleteClassOfBusiness] = useMutation(DELETE_CLASS_OF_BUSINESS, {
        refetchQueries: [{ query: FETCH_CLASS_OF_BUSINESS }]
    })

    const handleViewClassOfBusiness = data => {
        setSelectedClassOfBusiness(data);
        setshowViewBusiness(true)
    }

    const handleDeleteClassOfBusiness = detail => {
        swal({
            closeOnClickOutside: false,
            closeOnEsc: false,
            icon: "warning",
            title: "Warning",
            text: `Are you sure you want to delete ${detail.business_name}?`,
            buttons: ["No", {
                text: "Yes",
                closeModal: false,
            }],
        })
            .then(name => {
                if (!name) throw null;
                deleteClassOfBusiness({
                    variables: {
                        id: detail.class_of_business_id
                    }
                }).then(json => {
                    swal("Sucess", "Class of Business removed Successfully", "success");
                })
                    .catch(err => {
                        if (err) {
                            swal("Oh noes!", "The AJAX request failed!", "error");
                        } else {
                            swal.stopLoading();
                            swal.close();
                        }
                    });;
            })

    }

    return (
        <>
            <button onClick={() => handleViewClassOfBusiness(value)} className="btn btn-sm btn-primary mr-2">View</button>
            {deleteAccessRoles.includes(user?.position) && <button onClick={() => handleDeleteClassOfBusiness(value)} className="btn btn-sm  btn-danger">Delete</button>}

            {/* View Business Modal */}
            <Drawer width="42%" toggle={() => setshowViewBusiness(!showViewBusiness)} isvisible={showViewBusiness}>
                <UpdateClassOfBusiness data={selectedClassOfBusiness} toggle={() => setshowViewBusiness(!showViewBusiness)} />
            </Drawer>
        </>
    )
}

export default BusinessButtons
