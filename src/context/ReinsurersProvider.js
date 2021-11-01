/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, createContext, useMemo, useState } from 'react'
import { useQuery } from "@apollo/client";
import { REINSURERS } from '../graphql/queries';

const ReinsurersContext = createContext();

export function useReinsurer() {
    return useContext(ReinsurersContext);
}

export function ReinsurersProvider({ children }) {
    const [_reinsurer, setInsurer] = useState(() => {
        const _ = localStorage.getItem("kek-reinsurer")
        return _ ? JSON.parse(_) : null
    });
    const { data, loading } = useQuery(REINSURERS);

    const reinsurers = useMemo(() => {
        if (data && data.reinsurers) {
            return data.reinsurers;
        }
        return []
    }, [data]);

    const selectReinsurer = (reinsurer, cb) => {
        localStorage.setItem("kek-reinsurer", JSON.stringify(reinsurer));
        setInsurer(reinsurer)
        if (cb) return cb()
    }

    const reinsurer = _reinsurer

    return (
        <ReinsurersContext.Provider value={{ reinsurers, loading, selectReinsurer, reinsurer }}>
            {children}
        </ReinsurersContext.Provider>
    )
}
