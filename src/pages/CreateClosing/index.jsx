/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, memo, useMemo } from 'react'
import { CurrencyValues, Datatable, Loader } from '../../components'
import { useQuery } from 'react-apollo';
import { OFFERS } from '../../graphql/queries';
import { columns } from './columns';
import { generateClosingOffers } from './actions.js'

function ClosingOffer() {
    const [offerOverview, setOfferOverview] = useState(null);
    const { data: offers, loading } = useQuery(OFFERS, {
        variables: {
            offer_status: ["CLOSED"]
        },
        fetchPolicy: "network-only"
    });


    useMemo(() => {
        if (offers) {
            setOfferOverview(JSON.parse(offers.offerOverview).offer_overview);
        }
    }, [offers])


    const closedOffers = useMemo(() => generateClosingOffers({
        arr: offers,
    }), [offers])




    return (
        <>
            {loading && <Loader />}
            {!loading && offers && <div className="page-content">
                <div className="col-xl-12 mt-">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card mini-stats-wid">
                                <div className="card-body">
                                    <div className="media">
                                        <div className="media-body">
                                            <p className="text-muted font-weight-medium">Total closed offers</p>
                                            <h4 className="mb-0">{closedOffers?.length}</h4>
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
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-6">
                            <h3>Closing Overview</h3>
                        </div>
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="card mini-stats-wid">
                                <div className="card-body">
                                    <div className="media">
                                        <div className="media-body">
                                            <p className="text-muted font-weight-medium">
                                                Facultative Sum Insured
                                        </p>
                                            <CurrencyValues data={offerOverview?.total_fac_sum_insured} />
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
                        <div className="col-md-6">
                            <div className="card mini-stats-wid">
                                <div className="card-body">
                                    <div className="media">
                                        <div className="media-body">
                                            <p className="text-muted font-weight-medium">
                                                Facultative Premium
                                        </p>
                                            <CurrencyValues data={offerOverview?.total_fac_premium} />
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
                        <div className="col-md-6">
                            <div className="card mini-stats-wid">
                                <div className="card-body">
                                    <div className="media">
                                        <div className="media-body">
                                            <p className="text-muted font-weight-medium">
                                                Sum Insured
                                        </p>
                                            <CurrencyValues data={offerOverview?.total_sum_insured} />
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
                        <div className="col-md-6">
                            <div className="card mini-stats-wid">
                                <div className="card-body">
                                    <div className="media">
                                        <div className="media-body">
                                            <p className="text-muted font-weight-medium">
                                                Premium
                                        </p>
                                            <CurrencyValues data={offerOverview?.total_premium} />
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
                </div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-6">
                            <h3>Closing List</h3>
                        </div>
                    </div>
                </div>
                <div className="container-fluid mt-2">
                    <div className="row" >
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-body">
                                    <ul className="nav nav-tabs nav-tabs-custom">
                                        <li className="nav-item">
                                            <a className="nav-link active">Recent</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link">All</a>
                                        </li>
                                    </ul>

                                    <div className="mt-4">
                                        <Datatable entries={5} columns={columns} data={closedOffers} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
        </>
    )
}

export default memo(ClosingOffer)
