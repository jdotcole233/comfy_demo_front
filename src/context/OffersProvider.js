/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, createContext, useMemo } from 'react';
import { useQuery } from 'react-apollo';
import { OFFERS } from '../graphql/queries';
import OfferButtons from '../pages/CreateSlip/components/OfferButtons';


const OffersContext = createContext();

export function useOffer() {
    return useContext(OffersContext);
}

export function OffersProvider({ children }) {
    const { data, loading, error, called } = useQuery(OFFERS, {
        variables: {
            offer_status: ["OPEN", "PENDING"]
        },
    })


    const getPoliciesWithPolicyNumber = (policy_number) => {
        return offers.filter(offer => offer.offer_detail?.policy_number === policy_number)
    }

    const offers = useMemo(() => {
        if (data && data.offers) {
            return data.offers.map((offer) => {
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
                    actions: <OfferButtons offer={offer} getFleet={getPoliciesWithPolicyNumber} />,
                }
                return row;
            })
        }
        return []
    }, [data]);

    const overview = useMemo(() => {
        if (data && data.offerOverview) {
            return JSON.parse(data.offerOverview).offer_overview
        }
        return null
    }, [data])



    return (
        <OffersContext.Provider value={{ loading, error, offers, overview, called }}>
            {children}
        </OffersContext.Provider>
    )
}
