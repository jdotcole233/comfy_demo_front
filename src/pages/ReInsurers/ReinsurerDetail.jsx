/* eslint-disable no-throw-literal */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react'
import { Link, useLocation, useHistory } from 'react-router-dom'
import { Drawer, Datatable, Loader, OverViewCard } from '../../components'
import EditReinsurer from './EditResinsurer';
import { associatesColumnns, offersColumns } from './columns'
import { useQuery } from 'react-apollo';
import { REINSURER, REINSURER_OFFERS } from '../../graphql/queries'
import OfferButtons from './components/OfferButtons'
import AssociateButtons from './components/AssociateButtons'
import BrokerageComponent from './components/BrokerageComponent'
import OfferListing from '../CreateSlip/OfferListing';


function ReinsurerDetail() {
    const history = useHistory();
    const { state } = useLocation();
    const [showInsurerProfile, setShowInsurerProfile] = useState(false);
    const [associates, setAssociates] = useState([]);
    const [offerListing, setOfferListing] = useState([])
    const [allOfferListing, setAllOfferListing] = useState([])
    const [overview, setOverview] = useState(null)
    const [allTotalValue, setAllTotalValue] = useState(0)

    useEffect(() => {
        if (!state) {
            history.push("/admin/re-insurers")
        }
    }, [state])

    const { data, loading } = useQuery(REINSURER, {
        variables: {
            id: state?.reinsurer_id
        },
        fetchPolicy: "network-only"
    })
    const { data: reinsurer_offers, loading: fetching, fetchMore } = useQuery(REINSURER_OFFERS, {
        variables: {
            id: state?.reinsurer_id,
            skip: 0
        },
        fetchPolicy: "cache-and-network"
    })




    useEffect(() => {
        if (data) {
            const list = [];
            data.reinsurer.reinsurer_representatives.map((reinsurer, i) => {
                const row = {
                    name: `${reinsurer.rep_first_name} ${reinsurer.rep_last_name}`,
                    phone: `${reinsurer.rep_primary_phonenumber}, ${reinsurer.rep_secondary_phonenumber}`,
                    email: `${reinsurer.rep_email}`,
                    position: `${reinsurer.position}`,
                    actions: <AssociateButtons reinsurer={reinsurer} data={data} />,
                }
                list.push(row);
                return reinsurer;
            })
            setAssociates(list);
            setOverview(data.reinsurer.reinsurer_overview)
        }
    }, [data])

    useEffect(() => {
        if (reinsurer_offers) {
            const offers = [];
            reinsurer_offers.reinsurer_all_offers.offers.map((offer) => {
                const row = {
                    policy_no: offer.reinsurer_offers_only.offer_detail.policy_number,
                    company: offer.reinsurer_offers_only.insurer.insurer_company_name,
                    cob: offer.reinsurer_offers_only.classofbusiness.business_name,
                    participating_percentage: offer.offer_participant_percentage,
                    fac_sum_insured: offer.reinsurer_offers_only.fac_sum_insured.toLocaleString(undefined, { maximumFractionDigits: 2 }),
                    fac_premium: offer.reinsurer_offers_only.fac_premium.toLocaleString(undefined, { maximumFractionDigits: 2 }),
                    offer_status: (
                        <span style={{ letterSpacing: 3 }} className={`badge badge-${offer.reinsurer_offers_only.offer_status === "OPEN" ? "primary" : offer.reinsurer_offers_only.offer_status === "PENDING" ? "danger" : "success"} font-size-11`}>{offer.reinsurer_offers_only.offer_status}</span>
                    ),
                    brokerage: offer.reinsurer_offers_only.brokerage,
                    payment_status: (
                        <span style={{ letterSpacing: 3 }} className={`badge badge-${offer.reinsurer_offers_only.payment_status === "PART PAYMENT" ? "primary" : offer.reinsurer_offers_only.payment_status === "UNPAID" ? "danger" : "success"} font-size-11`}>{offer.reinsurer_offers_only.payment_status}</span>
                    ),
                    offer_date: offer.reinsurer_offers_only.created_at,
                    insured: offer.reinsurer_offers_only.offer_detail.insured_by,
                    actions: <OfferButtons type="all" data={reinsurer_offers} offer={offer} />,
                }
                offers.push(row)
                return offer;
            })
            setAllOfferListing(offers)
            setAllTotalValue(reinsurer_offers.reinsurer_all_offers.total)
        }
    }, [reinsurer_offers])

    useEffect(() => {
        if (data) {
            const offers = [];
            data.reinsurer.offers_participant.map((offer) => {
                const row = {
                    policy_no: offer.reinsurer_offers_only.offer_detail.policy_number,
                    company: offer.reinsurer_offers_only.insurer.insurer_company_name,
                    cob: offer.reinsurer_offers_only.classofbusiness.business_name,
                    participating_percentage: offer.offer_participant_percentage,
                    fac_sum_insured: offer.reinsurer_offers_only.fac_sum_insured.toLocaleString(undefined, { maximumFractionDigits: 2 }),
                    fac_premium: offer.reinsurer_offers_only.fac_premium.toLocaleString(undefined, { maximumFractionDigits: 2 }),
                    offer_status: (
                        <span style={{ letterSpacing: 3 }} className={`badge badge-${offer.reinsurer_offers_only.offer_status === "OPEN" ? "primary" : offer.reinsurer_offers_only.offer_status === "PENDING" ? "danger" : "success"} font-size-11`}>{offer.reinsurer_offers_only.offer_status}</span>
                    ),
                    brokerage: offer.reinsurer_offers_only.brokerage,
                    payment_status: (
                        <span style={{ letterSpacing: 3 }} className={`badge badge-${offer.reinsurer_offers_only.payment_status === "PART PAYMENT" ? "primary" : offer.reinsurer_offers_only.payment_status === "UNPAID" ? "danger" : "success"} font-size-11`}>{offer.reinsurer_offers_only.payment_status}</span>
                    ),
                    offer_date: offer.reinsurer_offers_only.created_at,
                    insured: offer.reinsurer_offers_only.offer_detail.insured_by,
                    actions: <OfferButtons data={data} offer={offer} />,
                }
                offers.push(row)
                return offer;
            })
            setOfferListing(offers)
        }
    }, [data])


    const handleLoadMore = (skip) => {
        fetchMore({
            variables: {
                id: state?.reinsurer_id,
                skip
            },
            updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prev;
                fetchMoreResult.reinsurer_all_offers.offers = [
                    ...prev.reinsurer_all_offers.offers,
                    ...fetchMoreResult.reinsurer_all_offers.offers
                ];
                // setSkip(p => p + 1)
                return fetchMoreResult
            }
        })
    }


    if (loading) return <Loader />

    return (
        <div className="page-content">

            <div className="container-fluid">

                <div className="row">
                    <div className="col-12">
                        <div className="page-title-box d-flex align-items-center justify-content-between">
                            <h4 className="mb-0 font-size-18">Re-inusrer Deatil</h4>

                            <div className="page-title-right">
                                <ol className="breadcrumb m-0">
                                    <li className="breadcrumb-item"><Link to="/admin/re-insurers">Re-Insurers</Link></li>
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
                                                {data?.reinsurer.re_abbrv}
                                            </span>
                                        </div>
                                        <h5 className="font-size-15 text-truncate">{data?.reinsurer.re_company_name}</h5>
                                    </div>

                                    <div className="col-sm-8">
                                        <div className="pt-4">

                                            <div className="row">
                                                <div className="col-6">
                                                    <h5 className="font-size-15">{overview?.total_paid}</h5>
                                                    <p className="text-muted mb-0">Paid</p>
                                                </div>
                                                <div className="col-6">
                                                    <h5 className="font-size-15">{overview?.total_unpaid}</h5>
                                                    <p className="text-muted mb-0">Unpaid</p>
                                                </div>
                                            </div>
                                            <div className="mt-4">
                                                <a onClick={() => setShowInsurerProfile(!showInsurerProfile)} className="btn btn-primary text-white waves-effect waves-light btn-sm">View Profile <i className="mdi mdi-arrow-right ml-1"></i></a>
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
                                                <td>{data?.reinsurer.reinsurer_address.region}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">City :</th>
                                                <td>{data?.reinsurer.reinsurer_address.suburb}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">E-mail :</th>
                                                <td>{data?.reinsurer.re_company_email}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Website :</th>
                                                <td>{data?.reinsurer.re_company_website}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-8">

                        <div className="row">
                            <div className="col-md-6">
                                <div className="card mini-stats-wid">
                                    <div className="card-body">
                                        <div className="media">
                                            <div className="media-body">
                                                <p className="text-muted font-weight-medium">Closed Offers</p>
                                                <h4 className="mb-0">{overview?.total_closed}</h4>
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
                            <div className="col-md-6">
                                <div className="card mini-stats-wid">
                                    <div className="card-body">
                                        <div className="media">
                                            <div className="media-body">
                                                <p className="text-muted font-weight-medium">Pending Offers</p>
                                                <h4 className="mb-0">{overview?.total_pending}</h4>
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


                            <OverViewCard title="Total Revenue" value={JSON.parse(overview?.total_fac_premium || null)} className="col-md-12" />
                            <OverViewCard title="Total Withholding Tax" value={JSON.parse(overview?.total_withholding_tax || null)} />
                            <OverViewCard title="Total NIC Levy" value={JSON.parse(overview?.total_nic_tax || null)} />

                        </div>

                    </div>
                </div>
                <BrokerageComponent data={data} />
                <OfferListing
                    title="Offers"
                    recent={offerListing}
                    all={allOfferListing}
                    allTotal={allTotalValue}
                    setInputOffer={1}
                    columns={offersColumns}
                    fetching={fetching}
                    handleLoadMore={handleLoadMore}
                />
                <div className="">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title mb-4">Associates</h4>
                                <Datatable columns={associatesColumnns} data={associates} />
                            </div>
                        </div>
                    </div>
                </div>


            </div>

            {/* Edit Reinsurer */}
            <Drawer width="40%" isvisible={showInsurerProfile} toggle={() => setShowInsurerProfile(!showInsurerProfile)}>
                {showInsurerProfile && <EditReinsurer closed={showInsurerProfile} data={data} toggle={() => setShowInsurerProfile(!showInsurerProfile)} />}
            </Drawer>

        </div>
    )
}

export default ReinsurerDetail
