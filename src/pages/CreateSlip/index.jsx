import React, { useState, useEffect, memo, useMemo } from 'react';
import { Drawer, Loader } from '../../components'
import InputOffer from './InputOffer';
import { useQuery } from 'react-apollo';
import { OFFERS, ALLOFFERS } from '../../graphql/queries';
import OfferButtons from './components/OfferButtons'
import OfferListing from './OfferListing';
import Header from './Header';
import OfferOverView from './OfferOverView';
import { columns } from './columns';

export default memo(() => {
    const [inputOffer, setInputOffer] = useState(false)
    const [offerListing, setOfferListing] = useState([]);
    const [offerOverview, setOfferOverview] = useState(null);
    const [skip] = useState(0)
    const [allOffersData, setAllOffers] = useState([])
    const { data: recentOffers, loading } = useQuery(OFFERS, {
        variables: {
            offer_status: ["OPEN", "PENDING"],
        },
        fetchPolicy: "network-only",
        // pollInterval: 1000 
    });

    const { data: allOffers, fetchMore, loading: fetching } = useQuery(ALLOFFERS, {
        variables: {
            offer_status: ["OPEN", "PENDING"],
            skip
        },
        fetchPolicy: "cache-and-network"
    })


    const handleLoadMore = (skip) => {
        fetchMore({
            variables: {
                offer_status: ["OPEN", "PENDING"],
                skip: skip + 2
            },
            updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prev;
                console.log("Prev", prev.offers_all.offers)
                console.log("Now", fetchMoreResult.offers_all.offers)
                fetchMoreResult.offers_all.offers = [
                    ...prev.offers_all.offers,
                    ...fetchMoreResult.offers_all.offers
                ];
                return fetchMoreResult
            }
        })
    }

    useEffect(() => {
        if (allOffers) {
            // console.log([...allOffers.offers_all.offers].length)
            const list = [];
            [...allOffers.offers_all.offers].map((offer) => {
                const row = {
                    policy_number: offer.offer_detail?.policy_number,
                    insured: offer.offer_detail?.insured_by,
                    sum_insured: offer.offer_detail?.currency + " " + offer.sum_insured.toLocaleString(undefined, { maximumFractionDigits: 2 }),
                    insurance_company: offer.insurer.insurer_company_name,
                    rate: offer.rate,
                    offer_status: (
                        <span style={{ letterSpacing: 3 }} className={`badge badge-${offer.offer_status === "OPEN" ? "primary" : offer.offer_status === "PENDING" ? "danger" : "success"} font-size-11`}>{offer.offer_status}</span>
                    ),
                    approval_status: (
                        <span style={{ letterSpacing: 3 }} className={`badge badge-${offer.approval_status === "UNAPPROVED" ? "primary" : offer.approval_status === "DELETE" ? "danger" : "warning"} font-size-11`}>{offer.approval_status}</span>
                    ),
                    cob: offer.classofbusiness.business_name,
                    offer_date: new Date(offer.created_at).toDateString(),
                    actions: <OfferButtons offer={offer} />
                }
                list.push(row);
                return row;
            })
            setAllOffers(list);
        }
    }, [allOffers])


    useEffect(() => {
        if (recentOffers) {
            const list = [];
            [...recentOffers.offers.offers].map((offer) => {
                const row = {
                    policy_number: offer.offer_detail?.policy_number,
                    insured: offer.offer_detail?.insured_by,
                    sum_insured: offer.offer_detail?.currency + " " + offer.sum_insured.toLocaleString(undefined, { maximumFractionDigits: 2 }),
                    insurance_company: offer.insurer.insurer_company_name,
                    rate: offer.rate,
                    offer_status: (
                        <span style={{ letterSpacing: 3 }} className={`badge badge-${offer.offer_status === "OPEN" ? "primary" : offer.offer_status === "PENDING" ? "danger" : "success"} font-size-11`}>{offer.offer_status}</span>
                    ),
                    approval_status: (
                        <span style={{ letterSpacing: 3 }} className={`badge badge-${offer.approval_status === "UNAPPROVED" ? "primary" : offer.approval_status === "DELETE" ? "danger" : "warning"} font-size-11`}>{offer.approval_status}</span>
                    ),
                    cob: offer.classofbusiness.business_name,
                    offer_date: new Date(offer.created_at).toDateString(),
                    actions: <OfferButtons offer={offer} />
                }
                list.push(row);
                return row;
            })
            setOfferListing(list);
            setOfferOverview(JSON.parse(recentOffers.offerOverview).offer_overview);
        }
    }, [recentOffers])


    const total = useMemo(() => allOffers?.offers_all?.total, [allOffers])


    if (loading) {
        return <Loader />
    }

    return !loading && recentOffers ? (
        <div className="page-content">
            <Header offerListing={{ length: total }} offerOverview={offerOverview} />
            <OfferOverView offerOverview={offerOverview} />



            <OfferListing
                recent={offerListing}
                handleLoadMore={handleLoadMore}
                all={allOffersData}
                title="Offer Listing"
                setInputOffer={setInputOffer}
                fetching={fetching}
                columns={columns}
                allTotal={total}
            />

            {/* Input Offer  Drawer */}
            <Drawer isvisible={inputOffer} width="40%" toggle={() => setInputOffer(!inputOffer)}>
                <InputOffer toggle={() => setInputOffer(!inputOffer)} />
            </Drawer>
        </div >
    ) : null;
})