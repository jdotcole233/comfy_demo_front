/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useContext, useMemo, useState } from 'react';
import { useQuery } from 'react-apollo';
import { INSURERS } from '../graphql/queries';


const InsurerContext = createContext();

export function useInsurer() {
    return useContext(InsurerContext)
}

export function InsurerProvider({ children }) {
    const [_insurer, setInsurer] = useState(() => {
        const _ = localStorage.getItem("kek-insurer")
        return _ ? JSON.parse(_) : null
    });
    const { data, loading } = useQuery(INSURERS);

    const insurers = useMemo(() => {
        if (data && data.insurers) {
            return data.insurers
        }
        return []
    }, [data])

    const selectInsurer = (insurer, cb) => {
        localStorage.setItem("kek-insurer", JSON.stringify(insurer));
        setInsurer(insurer)
        if (cb) return cb()
    }

    const insurer = _insurer


    const associates = insurers.map(el => el.insurer_associates).flat().length

    return (
        <InsurerContext.Provider value={{ insurers, loading, associates, selectInsurer, insurer }}>
            {children}
        </InsurerContext.Provider>
    )
}
