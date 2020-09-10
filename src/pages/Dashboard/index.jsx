/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment, useState, useEffect, useContext } from 'react'
import Chart from 'react-apexcharts';
import { Link } from "react-router-dom"
import { Modal } from 'react-bootstrap';
import { CurrencyValues, Datatable, Loader } from '../../components'
import { useQuery } from 'react-apollo'
import { DASHBOARD } from '../../graphql/queries';
import { columns } from './columns'
import { AuthContext } from '../../context/AuthContext';
import OfferButtons from './components/OfferButtons'

const Dashboard = () => {
    const { state } = useContext(AuthContext)
    const [options, setOptions] = useState({
        series: [],
        labels: []
    })
    const [businessStats, setBusinessStats] = useState([])
    const [dateTypes] = useState(["month", "year", "week"])
    const [activeTab, setActiveTab] = useState("year")
    const [variables, setVariables] = useState({
        year: new Date().getFullYear(),
        month: ""
    })
    const { data, refetch, called } = useQuery(DASHBOARD, {
        variables,
        fetchPolicy: 'network-only'
    });
    const [openMoreBusinessesModal, setOpenMoreBusinessesModal] = useState(false);
    const [offerListing, setOfferListing] = useState([]);

    const [overView, setOverView] = useState(null)

    const handleChooseTimeFrame = type => {
        const date = new Date();
        const value = type === "month" ? date.getMonth() + 1 : date.getFullYear();
        if (type === "week") {
            setVariables({
                year: "",
                month: ""
            })
        } else if (type === "month") {
            setVariables({
                year: "",
                month: value
            })
        } else {
            setVariables({
                month: "",
                year: value
            })
        }
        refetch()
        setActiveTab(type)
    }



    useEffect(() => {
        if (data) {
            const series = [], labels = []
            const list = [];
            [...data.offers].map((offer) => {
                const row = {
                    policy_number: offer.offer_detail.policy_number,
                    insured: offer.offer_detail.insured_by,
                    sum_insured: offer.offer_detail.currency + " " + offer.sum_insured.toLocaleString(undefined, { maximumFractionDigits: 2 }),
                    insurance_company: offer.insurer.insurer_company_name,
                    rate: offer.rate,
                    offer_status: (
                        <span style={{ letterSpacing: 3 }} className={`badge badge-soft-${offer.offer_status === "OPEN" ? "primary" : offer.offer_status === "PENDING" ? "danger" : "success"} font-size-11`}>{offer.offer_status}</span>
                    ),
                    cob: offer.classofbusiness.business_name,
                    offer_date: new Date(offer.created_at).toDateString(),
                    actions: <OfferButtons offer={offer} />,
                }
                list.push(row);
                return row;
            })
            setOfferListing(list);
            setOverView(JSON.parse(data.offerOverview))
            const arr = JSON.parse(data.dashboardByPieChartData);
            setBusinessStats(arr.total_businesses);
            arr.total_businesses.slice(0, 5).map(business => {
                series.push(business.total_businesses);
                labels.push(business.business_name)
                return business;
            });
            setOptions({
                series,
                labels
            })
        }
    }, [data])




    if (!data) {
        return <Loader />
    }

    return called && data ? (
        <Fragment>
            <div className="page-content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="page-title-box d-flex align-items-center justify-content-between">
                                <h4 className="mb-0 font-size-18">Dashboard</h4>

                                <div className="page-title-right">
                                    <ol className="breadcrumb m-0">
                                        <li className="breadcrumb-item">
                                            <a >Dashboards</a>
                                        </li>
                                        <li className="breadcrumb-item active">Dashboard</li>
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
                                                <p>Visal-RE Dashboard</p>
                                            </div>
                                        </div>
                                        <div className="col-5 align-self-end">
                                            <img
                                                src="/assets/images/profile-img.png"
                                                alt=""
                                                className="img-fluid"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body pt-0">
                                    <div className="row">
                                        <div className="col-sm-4">
                                            <div className="avatar-lg mr-3 mx-lg-auto mb-4 profile-user-wid">
                                                <span className="avatar-title rounded-circle bg-soft-primary text-primary font-size-16">
                                                    {state?.user?.employee?.emp_abbrv}
                                                </span>
                                            </div>
                                            <h5 className="font-size-15 text-truncate">{state?.user?.employee?.employee_first_name} {state?.user?.employee?.employee_last_name}</h5>

                                        </div>

                                        <div className="col-sm-8">
                                            <div className="pt-4">

                                                <div className="mt-4">
                                                    <Link to={{ pathname: "/admin/profile" }}
                                                        className="btn btn-primary waves-effect waves-light btn-sm"
                                                    >
                                                        View Profile
                                                        <i className="mdi mdi-arrow-right ml-1"></i>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title mb-4">Monthly Brokerage Earning</h4>
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <p className="text-muted">This month</p>
                                            <CurrencyValues data={overView?.monthly_brokerage_earning} />

                                        </div>

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
                                                    <p className="text-muted font-weight-medium">Total Offers</p>
                                                    <h4 className="mb-0">{overView?.offer_overview?.total_offers}</h4>
                                                </div>

                                                <div className="mini-stat-icon avatar-sm rounded-circle bg-primary align-self-center">
                                                    <span className="avatar-title">
                                                        <i className="bx bx-copy-alt font-size-24"></i>
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
                                                    <p className="text-muted font-weight-medium">Total Pending offers</p>
                                                    <h4 className="mb-0">{overView?.offer_overview?.total_pending}</h4>
                                                </div>

                                                <div className="avatar-sm rounded-circle bg-primary align-self-center mini-stat-icon">
                                                    <span className="avatar-title rounded-circle bg-primary">
                                                        <i className="bx bx-time font-size-24"></i>
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
                                                    <p className="text-muted font-weight-medium">
                                                        Total Closed Offers
                      </p>
                                                    <h4 className="mb-0">{overView?.offer_overview?.total_closed}</h4>
                                                </div>

                                                <div className="avatar-sm rounded-circle bg-primary align-self-center mini-stat-icon">
                                                    <span className="avatar-title rounded-circle bg-primary">
                                                        <i className="bx bx-lock-alt font-size-24"></i>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="card mini-stats-wid">
                                        <div className="card-body">
                                            <div className="media">
                                                <div className="media-body">
                                                    <p className="text-muted font-weight-medium">
                                                        Total fac Premium</p>
                                                    <CurrencyValues data={overView?.offer_overview?.total_fac_premium} />
                                                </div>

                                                <div className="avatar-sm rounded-circle bg-primary align-self-center mini-stat-icon">
                                                    <span className="avatar-title rounded-circle bg-primary">
                                                        <i className="bx bx-money font-size-24"></i>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title mb-4 float-sm-left">Top Businesses</h4>
                                    <div className="float-sm-right">
                                        <ul className="nav nav-pills">
                                            {dateTypes.map((dateType, key) => (
                                                <li onClick={() => handleChooseTimeFrame(dateType)} className="nav-item" key={key}>
                                                    <a className={`nav-link link-hover ${dateType === activeTab ? "active" : ""}`}>
                                                        {dateType.charAt(0).toLocaleUpperCase() + "" + dateType.substring(1, dateType.length)}
                                                    </a>
                                                </li>
                                            ))}
                                            {businessStats.length > 5 && <li className="nav-item">
                                                <a className={`nav-link link-hover`} onClick={() => setOpenMoreBusinessesModal(!openMoreBusinessesModal)} >
                                                    More
                                        </a>
                                            </li>}
                                        </ul>
                                    </div>
                                    <div className="clearfix"></div>
                                    <div
                                        id="stacked-column-chart"
                                        className="apex-charts"
                                        dir="ltr"
                                    >
                                        <Chart height="265" type="donut" options={options} series={options.series} />

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>



                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title mb-4">Latest Offers</h4>
                                    <Datatable entries={5} columns={columns} data={offerListing.splice(0, 20)} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal centered show={openMoreBusinessesModal} onHide={() => setOpenMoreBusinessesModal(!openMoreBusinessesModal)}>
                <Modal.Header closeButton>
                    other Business Stats
                </Modal.Header>
                <Modal.Body>
                    <table className="table table-bordered table-striped">
                        <thead>
                            <th>Business Class</th>
                            <th>Frequency</th>
                        </thead>
                        <tbody>
                            {businessStats.length > 5 && businessStats.slice(5, businessStats.length).map((stats, key) => (
                                <tr key={key}>
                                    <td>{stats.business_name}</td>
                                    <td>{stats.total_businesses}</td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </Modal.Body>
            </Modal>
        </Fragment>
    ) : null
};


export default Dashboard;