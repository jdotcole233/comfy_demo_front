import React, { useEffect, useMemo, useState } from 'react'
import Header from './Header'
import { columns, _columns } from './columns'
import { useQuery } from 'react-apollo'
import { OFFERS } from '../../graphql/queries'
import { Datatable, Loader } from '../../components'
import OfferButtons from './components/OfferButtons'
import { ENDORSEMENTS } from '../../graphql/queries/endorsements'
import EndorsementButtons from './components/EndorsementButtons'

const UnApproved = () => {

    const [offerListing, setOfferListing] = useState([]);
    const [activeTab, setActiveTab] = useState(0)

    const { data, loading, startPolling, stopPolling } = useQuery(OFFERS, {
        variables: {
            offer_status: ["CLOSED"],
            approval_status: "UNAPPROVED"
        },
        fetchPolicy: "network-only",
        pollInterval: 1000
    });


    const { data: endorsementData } = useQuery(ENDORSEMENTS, {
        fetchPolicy: "network-only",
    });

    const endorsements = useMemo(() => {
        if (endorsementData && endorsementData.allUnapprovedEndorsements) {
            return endorsementData.allUnapprovedEndorsements.map((offer) => ({
                policy_number: offer.offer_endorsement_detail?.policy_number,
                insured: offer.offer_endorsement_detail?.insured_by,
                sum_insured:
                    offer.offer_endorsement_detail?.currency +
                    " " +
                    offer.sum_insured.toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                    }),
                insurance_company: offer.insurer.insurer_company_name,
                premium:
                    offer.offer_detail?.currency +
                    " " +
                    offer.premium.toLocaleString(undefined, { maximumFractionDigits: 2 }),
                participants: offer.offer.offer_participant.filter((el) => el.offer_participant_percentage !== 0).length,
                cob: offer?.classofbusiness?.business_name,
                offer_date: new Date(offer.created_at).toDateString(),
                actions: <EndorsementButtons offer={offer.offer} endorsement={offer} />
            }))
        }

        return []
    }, [endorsementData])



    const myStartPolling = () => startPolling(1000)

    useEffect(() => {
        window.addEventListener('focus', myStartPolling);
        window.addEventListener('blur', stopPolling);

        // Specify how to clean up after this effect:
        return () => {
            window.removeEventListener('focus', startPolling);
            window.removeEventListener('blur', stopPolling);
        };
    });


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
                    participants: offer.offer_participant.filter((el) => el.offer_participant_percentage !== 0).length,
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
            <Header closedOffers={offerListing} />
            <div className="container-fluid">
                <div className="row">
                    <div className="d-flex my-2">
                        <div onClick={() => setActiveTab(0)} className={`${activeTab === 0 ? "kek-tab-active" : "kek-tab"}`}>
                            <span>Offers</span>
                            <span className="kek-badge kek-badge-success">new</span>
                        </div>
                        <div onClick={() => setActiveTab(1)} className={`${activeTab === 1 ? "kek-tab-active" : "kek-tab"}`}>
                            Endorsements
                        </div>
                    </div>

                </div>
            </div>
            <div className="card">
                <div className="card-body">
                    <Datatable
                        data={activeTab === 0 ? offerListing : endorsements}
                        columns={activeTab === 0 ? columns : _columns}
                    />
                </div>
            </div>
        </div>
    )
}

export default UnApproved
