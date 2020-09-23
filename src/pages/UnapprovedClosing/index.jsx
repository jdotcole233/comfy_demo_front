import React, { useEffect, useState } from 'react'
import OfferListing from '../CreateSlip/OfferListing'
import Header from './Header'
import { columns } from '../CreateClosing/columns'
import { useQuery } from 'react-apollo'
import { OFFERS } from '../../graphql/queries'
import { Loader } from '../../components'
import OfferButtons from './components/OfferButtons'

const UnApproved = () => {

    const [offerListing, setOfferListing] = useState([])

    const { data, loading } = useQuery(OFFERS, {
        variables: {
            offer_status: ["CLOSED"],
            approval_status: "UNAPPROVED"
        }
    })


    useEffect(() => {
        if (data) {
            console.log(data.offers)
            const list = [];
            [...data.offers.offers].map((offer) => {
                const row = {
                    policy_number: offer.offer_detail?.policy_number,
                    insured: offer.offer_detail?.insured_by,
                    sum_insured:
                        offer.offer_detail?.currency +
                        " " +
                        offer.sum_insured.toLocaleString(undefined, {
                            maximumFractionDigits: 2,
                        }),
                    insurance_company: offer.insurer.insurer_company_name,
                    premium:
                        offer.offer_detail?.currency +
                        " " +
                        offer.premium.toLocaleString(undefined, { maximumFractionDigits: 2 }),
                    participants: offer.offer_participant.length,
                    cob: offer.classofbusiness.business_name,
                    offer_date: new Date(offer.created_at).toDateString(),
                    actions: <OfferButtons offer={offer} />
                }
                list.push(row);
                return row;
            })
            setOfferListing(list);
        }
    }, [data])



    if (loading) return <Loader />

    return (
        <div className="page-content">
            <Header />
            <OfferListing title="Unapproved Closings" recent={offerListing} hideTab columns={columns} />
        </div>
    )
}

export default UnApproved
