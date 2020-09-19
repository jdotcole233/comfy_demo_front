/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, memo, useMemo } from 'react'
import { CurrencyValues, Datatable, Loader } from '../../components'
import { useQuery } from 'react-apollo';
import { OFFERS } from '../../graphql/queries';
import { columns } from './columns';
import { generateClosingOffers } from './actions.js'
import OfferOverView from './OfferOverView';
import OfferListing from '../CreateSlip/OfferListing';
import Header from './Header';

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
                <Header closedOffers={closedOffers} />

                <OfferOverView offerOverview={offerOverview} />

                <OfferListing offerListing={closedOffers} setInputOffer={null} columns={columns} />



            </div>}
        </>
    )
}

export default memo(ClosingOffer)
