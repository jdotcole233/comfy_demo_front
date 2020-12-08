/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, createContext, useMemo } from 'react'
import { useQuery } from 'react-apollo';
import { REINSURERS } from '../graphql/queries';

const ReinsurersContext = createContext();

export function useReinsurer() {
    return useContext(ReinsurersContext);
}

export function ReinsurersProvider({ children }) {
    const { data, loading } = useQuery(REINSURERS);

    const reinsurers = useMemo(() => {
        if (data && data.reinsurers) {
            return data.reinsurers;
        }
        return []
    }, [data]);

    return (
        <ReinsurersContext.Provider value={{ reinsurers, loading }}>
            {children}
        </ReinsurersContext.Provider>
    )
}
