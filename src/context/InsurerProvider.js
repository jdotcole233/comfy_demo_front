/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useContext, useMemo } from 'react';
import { useQuery } from 'react-apollo';
import { INSURERS } from '../graphql/queries';


const InsurerContext = createContext();

export function useInsurer() {
    return useContext(InsurerContext)
}

export function InsurerProvider({ children }) {


    const { data, loading } = useQuery(INSURERS);

    const insurers = useMemo(() => {
        if (data && data.insurers) {
            return data.insurers
        }
        return []
    }, [data])


    const associates = insurers.map(el => el.insurer_associates).flat().length

    return (
        <InsurerContext.Provider value={{ insurers, loading, associates }}>
            {children}
        </InsurerContext.Provider>
    )
}
