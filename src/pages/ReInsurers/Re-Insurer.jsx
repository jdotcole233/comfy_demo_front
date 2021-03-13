/* eslint-disable no-throw-literal */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { useMutation } from 'react-apollo'
import { REMOVE_REINSURER } from '../../graphql/mutattions'
import { REINSURERS } from '../../graphql/queries'
import swal from 'sweetalert'
import { AuthContext } from '../../context/AuthContext'
import { create_reinsurer_access, delete_reinsurer_access } from '../../layout/adminRoutes'
import { useReinsurer } from '../../context/ReinsurersProvider'

function ReInsurer({ data, openAssociateModal }) {
    const { state: { user } } = useContext(AuthContext)
    const { selectReinsurer } = useReinsurer()
    const [removeInsurer] = useMutation(REMOVE_REINSURER, {
        variables: {
            id: data.reinsurer_id
        },
        refetchQueries: [{ query: REINSURERS }]
    })
    const history = useHistory()
    const handleDeleteReinsurer = reinsurer => {
        swal({
            closeOnClickOutside: false,
            closeOnEsc: false,
            icon: "warning",
            title: "Warning",
            text: `Are you sure you want to delete ${reinsurer.re_company_name}?`,
            buttons: ["No", {
                text: "Yes",
                closeModal: false,
            }],
        })
            .then(name => {
                if (!name) throw null;
                return removeInsurer();
            })
            .then(json => {
                swal("Sucess", "Reinsurer removed Successfully", "success");
            })
            .catch(err => {
                if (err) {
                    swal("Oh noes!", "The AJAX request failed!", "error");
                } else {
                    swal.stopLoading();
                    swal.close();
                }
            });
    }

    const onSelectReinsurer = (reinsurer) => {
        selectReinsurer(reinsurer, () => {
            history.push({
                pathname: "/admin/re-insurers-detail/recent"
            })
        })
    }
    
    return (
        <div className="col-xl-3 col-md-3 col-sm-6">
            <div className="card text-center">
                <div className="card-body">
                    <div className="avatar-md mx-auto mb-4">
                        <span className="avatar-title rounded-circle p-auto bg-soft-primary text-primary font-size-16">
                            {data.re_abbrv}
                        </span>
                    </div>
                    <h5 className="font-size-15"><a href="#" className="text-dark">{data.re_company_name}</a></h5>
                </div>
                <div className="card-footer bg-transparent border-top">
                    <div  className="contact-links d-flex font-size-20">
                        <a onClick={() => onSelectReinsurer(data)} className="flex-fill link-hover" data-toggle="tooltip" data-placement="top" title="View"><i className="bx bx-pie-chart-alt"></i></a>
                        {create_reinsurer_access.includes(user?.position) &&
                            <div className="flex-fill link-hover" onClick={() => openAssociateModal(data, !0)}>
                                <a data-toggle="tooltip" data-placement="top" title="Add Associate"><i className="bx bx-user-circle"></i></a>
                            </div>
                        }
                        {delete_reinsurer_access.includes(user?.position) &&
                         <div onClick={() => handleDeleteReinsurer(data)} className="flex-fill link-hover">
                            <i className="bx bx-trash-alt"></i>
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReInsurer
