/* eslint-disable no-throw-literal */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react'
import { Link, useLocation, useHistory } from 'react-router-dom'
import { Drawer, Datatable, Loader, OverViewCard } from '../../components'
import EditInsurer from './EditInsurer'
import f_dat, { managersColumn } from './dummy';
import { useQuery } from 'react-apollo'
import { INSURER } from '../../graphql/queries'
import OfferButtons from './components/Offerbuttons'
import ManagerButtons from './components/ManagerButtons'
import BrokerageComponent from './components/BrokerageComponent'
import Reschedule from './components/Reschedule';
import OfferListing from '../CreateSlip/OfferListing';


function InsurerDetail() {
    const history = useHistory();
    const { state } = useLocation()

    useEffect(() => {
        if (!state || !state.insurer_id) {
            history.push("/admin/insurers")
        }
    }, [state])


    const { data: insurer, loading } = useQuery(INSURER, {
        variables: {
            id: state?.insurer_id
        },
        fetchPolicy: "network-only"
    })


    const [showInsurerProfile, setShowInsurerProfile] = useState(false)
    const [rows, setRows] = useState([])
    const [managers, setManagers] = useState([])

    useEffect(() => {
        const list = [];
        if (insurer) {
            insurer.insurer.offers.map((offer, i) => {
                const row = {
                    name: offer.offer_detail?.policy_number,
                    insured: offer.offer_detail?.insured_by,
                    sum_insured: `${offer?.offer_detail?.currency} ${offer.sum_insured.toLocaleString(undefined, { maximumFractionDigits: 2 })}`,
                    f_sum_insured: `${offer?.offer_detail?.currency} ${offer.fac_sum_insured.toLocaleString(undefined, { maximumFractionDigits: 2 })}`,
                    comission: offer.commission,
                    cob: offer.classofbusiness.business_name,
                    offer_date: offer.created_at,
                    offer_status: (
                        <span style={{ letterSpacing: 5, padding: 3 }} className={`badge badge-${offer.offer_status === "OPEN" ? "primary" : offer.offer_status === "PENDING" ? "danger" : "success"} font-size-11`}>{offer.offer_status}</span>
                    ),
                    payment_status: (
                        <span style={{ letterSpacing: 5, padding: 3 }} className={`badge badge-${offer.payment_status === "PARTPAYMENT" ? "primary" : offer.payment_status === "UNPAID" ? "danger" : "success"} font-size-11`}>{offer.payment_status}</span>
                    ),
                    salary: <OfferButtons insurer={insurer} state={state} offer={offer} />,
                }
                list.push(row);
                return offer;
            })

        }
        setRows(list)
    }, [insurer])



    useEffect(() => {
        if (insurer) {
            const list = [];
            insurer.insurer.insurer_associates.map((manager, i) => {
                const row = {
                    name: `${manager.assoc_first_name} ${manager.assoc_last_name}`,
                    phone: `${manager.assoc_primary_phonenumber}, ${manager.assoc_secondary_phonenumber}`,
                    email: `${manager.assoc_email}`,
                    actions: <ManagerButtons manager={manager} state={state} />,
                }
                list.push(row);
                return insurer;
            })
            setManagers(list);
        }
    }, [insurer])




    if (loading) return <Loader />




    return (
        <div className="page-content">

            <div className="container-fluid">

                <div className="row">
                    <div className="col-12">
                        <div className="page-title-box d-flex align-items-center justify-content-between">
                            <h4 className="mb-0 font-size-18">Inusrer Details</h4>

                            <div className="page-title-right">
                                <ol className="breadcrumb m-0">
                                    <li className="breadcrumb-item"><Link to="/admin/insurers">Insurers</Link></li>
                                    <li className="breadcrumb-item active">Profile</li>
                                </ol>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-xl-4">
                        <div className="card overflow-hidden">
                            <div className="bg-soft-primary">
                                <div className="row">
                                    <div className="col-7">
                                        <div className="text-primary p-3">
                                            <h5 className="text-primary">Welcome Back !</h5>
                                            <p>It will seem like simplified</p>
                                        </div>
                                    </div>
                                    <div className="col-5 align-self-end">
                                        <img src="/assets/images/profile-img.png" alt="" className="img-fluid" />
                                    </div>
                                </div>
                            </div>
                            <div className="card-body pt-0">
                                <div className="row">
                                    <div className="col-sm-4">
                                        <div className="avatar-lg mr-3 mx-lg-auto mb-4 profile-user-wid">
                                            <span className="avatar-title rounded-circle bg-soft-primary text-primary font-size-16">
                                                {insurer?.insurer.insurer_abbrv}
                                            </span>
                                        </div>
                                        <h5 className="font-size-15 text-truncate">{insurer?.insurer.insurer_company_name}</h5>
                                    </div>

                                    <div className="col-sm-8">
                                        <div className="pt-4">

                                            <div className="row">
                                                <div className="col-6">
                                                    <h5 className="font-size-15">{insurer?.insurer.offers.length}</h5>
                                                    <p className="text-muted mb-0">Offers</p>
                                                </div>
                                                <div className="col-6">
                                                    <h5 className="font-size-15">{insurer?.insurer.insurer_overview?.total_paid}</h5>
                                                    <p className="text-muted mb-0">Paid</p>
                                                </div>
                                            </div>
                                            <div className="mt-4">
                                                <button onClick={() => setShowInsurerProfile(!showInsurerProfile)} className="btn btn-primary waves-effect waves-light btn-sm mr-1">View Profile <i className="mdi mdi-arrow-right ml-1"></i></button>
                                                <Reschedule id={state?.insurer_id} remainders={insurer?.insurer.remainders} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title mb-4">Other Information</h4>

                                <div className="table-responsive">
                                    <table className="table table-nowrap mb-0">
                                        <tbody>
                                            <tr>
                                                <th scope="row">Region:</th>
                                                <td>{insurer?.insurer.insurer_address.region}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">City :</th>
                                                <td>{insurer?.insurer.insurer_address.suburb}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">E-mail :</th>
                                                <td>{insurer?.insurer.insurer_company_email}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Website :</th>
                                                <td>{insurer?.insurer.insurer_company_website}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-8">

                        <div className="row">
                            <div className="col-md-4">
                                <div className="card mini-stats-wid">
                                    <div className="card-body">
                                        <div className="media">
                                            <div className="media-body">
                                                <p className="text-muted font-weight-medium">Closed Offers</p>
                                                <h4 className="mb-0">{insurer?.insurer.insurer_overview?.total_closed}</h4>

                                            </div>

                                            <div className="mini-stat-icon avatar-sm align-self-center rounded-circle bg-primary">
                                                <span className="avatar-title">
                                                    <i className="bx bx-check-circle font-size-24"></i>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card mini-stats-wid">
                                    <div className="card-body">
                                        <div className="media">
                                            <div className="media-body">
                                                <p className="text-muted font-weight-medium">Pending Offers</p>
                                                <h4 className="mb-0">{insurer?.insurer.insurer_overview?.total_pending}</h4>
                                            </div>

                                            <div className="avatar-sm align-self-center mini-stat-icon rounded-circle bg-primary">
                                                <span className="avatar-title">
                                                    <i className="bx bx-hourglass font-size-24"></i>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card mini-stats-wid">
                                    <div className="card-body">
                                        <div className="media">
                                            <div className="media-body">
                                                <p className="text-muted font-weight-medium">Unpaid Offers</p>
                                                <h4 className="mb-0">{insurer?.insurer.insurer_overview?.total_unpaid}</h4>
                                            </div>

                                            <div className="avatar-sm align-self-center mini-stat-icon rounded-circle bg-primary">
                                                <span className="avatar-title">
                                                    <i className="bx bx-money font-size-24"></i>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <OverViewCard title="Total Fac. Premium" value={JSON.parse(insurer?.insurer.insurer_overview?.total_fac_premium)} className="col-md-12" />
                            <OverViewCard title="Total Brokerage" value={JSON.parse(insurer?.insurer.insurer_overview?.total_brokerage_amt)} className="col-md-12" />

                        </div>

                    </div>
                </div>
                <BrokerageComponent insurer={insurer} />
                <OfferListing title="Offers" setInputOffer={1} offerListing={rows} columns={f_dat.columns} />
                <div className="">

                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title mb-4">Managers</h4>
                                <Datatable btn hover striped responsive bordered data={managers} columns={managersColumn} />
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* Edit Insurer */}
            <Drawer width="40%" isvisible={showInsurerProfile} toggle={() => setShowInsurerProfile(!showInsurerProfile)}>
                {showInsurerProfile && <EditInsurer closed={showInsurerProfile} data={insurer} toggle={() => setShowInsurerProfile(!showInsurerProfile)} />}
            </Drawer>
            {/* /end of edit insurer */}


        </div>
    )
}

export default InsurerDetail
