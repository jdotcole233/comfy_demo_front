import React, { createContext, useContext, useMemo } from 'react';
import { useQuery } from "@apollo/client";
import { OFFERS } from '../graphql/queries';
import { generateClosingOffers } from '../pages/CreateClosing/actions';

const ClosedOffersContext = createContext();

export function useCloseOffers() {
    return useContext(ClosedOffersContext);
}

export function CloseOffersProvider({ children }) {

    const { data, loading } = useQuery(OFFERS, {
        variables: {
            offer_status: ["CLOSED"]
        }
    })

    const offers = useMemo(() => {
        if (data) return generateClosingOffers({ arr: data })
        return []
    }, [data])

    const overview = useMemo(() => {
        if (data && data.offerOverview) {
            return JSON.parse(data.offerOverview).offer_overview
        }
        return null
    }, [data])

    return (
        <ClosedOffersContext.Provider value={{ loading, offers, overview }}>
            {children}
        </ClosedOffersContext.Provider>
    )
}
