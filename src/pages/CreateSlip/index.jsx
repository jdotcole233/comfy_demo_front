import React, { useState, useEffect, memo } from 'react';
import { Drawer, CurrencyValues, Datatable, Loader } from '../../components'
import InputOffer from './InputOffer';
import { columns } from './columns';
import { useQuery } from 'react-apollo';
import { OFFERS } from '../../graphql/queries';
import OfferButtons from './components/OfferButtons'

export default memo(() => {
    const [inputOffer, setInputOffer] = useState(false)
    const [offerListing, setOfferListing] = useState([]);
    const [offerOverview, setOfferOverview] = useState(null);
    const { data: offers, loading, called } = useQuery(OFFERS, {
        variables: {
            offer_status: ["OPEN", "PENDING"]
        },
        fetchPolicy: "network-only"
    });



    useEffect(() => {
        if (offers) {
            const list = [];
            [...offers.offers].map((offer) => {
                const row = {
                    policy_number: offer.offer_detail?.policy_number,
                    insured: offer.offer_detail?.insured_by,
                    sum_insured: offer.offer_detail?.currency + " " + offer.sum_insured.toLocaleString(undefined, { maximumFractionDigits: 2 }),
                    insurance_company: offer.insurer.insurer_company_name,
                    rate: offer.rate,
                    offer_status: (
                        <span style={{ letterSpacing: 3 }} className={`badge badge-soft-${offer.offer_status === "OPEN" ? "primary" : offer.offer_status === "PENDING" ? "danger" : "success"} font-size-11`}>{offer.offer_status}</span>
                    ),
                    cob: offer.classofbusiness.business_name,
                    offer_date: new Date(offer.created_at).toDateString(),
                    actions: <OfferButtons offer={offer} />
                }
                list.push(row);
                return row;
            })
            setOfferListing(list);
            setOfferOverview(JSON.parse(offers.offerOverview).offer_overview);
        }
    }, [offers])


    if (loading) {
        return <Loader />
    }

    return !loading && called && offers ? (
        <div className="page-content">
            <div className="col-xl-12 mt-">
                <div className="row">
                    <div className="col-md-6">
                        <div className="card mini-stats-wid">
                            <div className="card-body">
                                <div className="media">
                                    <div className="media-body">
                                        <p className="text-muted font-weight-medium">Total Offers</p>
                                        <h4 className="mb-0">{offerListing.length}</h4>
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
                    <div className="col-md-6">
                        <div className="card mini-stats-wid">
                            <div className="card-body">
                                <div className="media">
                                    <div className="media-body">
                                        <p className="text-muted font-weight-medium">Pending Offers</p>
                                        <h4 className="mb-0">{offerOverview?.total_pending}</h4>
                                    </div>

                                    <div className="avatar-sm rounded-circle bg-primary align-self-center mini-stat-icon">
                                        <span className="avatar-title rounded-circle bg-primary">
                                            <i className="bx bx-archive-in font-size-24"></i>
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
                        <h3>Offer Overview</h3>
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
                        <h3>Offer Listing</h3>
                    </div>
                    <div className="col-md-6" style={{ display: 'flex', justifyContent: "flex-end" }}>
                        <button onClick={() => {
                            setInputOffer(!inputOffer)
                        }
                        } className="btn btn-primary btn-sm w-md">Input offer</button>
                    </div>
                </div>
            </div>
            <div className="container-fluid mt-2">
                <div className="card">
                    {!loading ? (<div className="card-body">
                        <Datatable data={offerListing} columns={columns} />
                    </div>) : null}
                </div >
            </div >


            {/* Input Offer  Drawer */}
            <Drawer isvisible={inputOffer} width="40%" toggle={() => setInputOffer(!inputOffer)}>
                <InputOffer toggle={() => setInputOffer(!inputOffer)} />
            </Drawer>
        </div >
    ) : null;
})