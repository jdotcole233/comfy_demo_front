import React, { createContext, useContext, useMemo, useState } from 'react';
import { useQuery } from 'react-apollo';
import { TREATIES } from '../graphql/queries/treaty';

const TreatyProgramsContext = createContext()

export function useTreatyPrograms() {
    return useContext(TreatyProgramsContext);
}

export function TreatyProgramsProvider({ children }) {
    const [search, setSearch] = useState("")
    const { data, loading } = useQuery(TREATIES, {
        // pollInterval: 2000
    });

    const total = data?.treatyPrograms?.length

    const treatyPrograms = useMemo(() => {
        if (data && data.treatyPrograms) {
            return data.treatyPrograms.filter(item => {
                const itemToSearch = search.toLowerCase();
                const checkingItem = item.treaty_name.toLowerCase();
                return checkingItem.includes(itemToSearch);
            })
        }
        return []
    }, [data, search])

    function handleSearch(event) {
        const { value } = event.target;
        setSearch(value);
    }

    return (
        <TreatyProgramsContext.Provider value={{ loading, treatyPrograms, search, handleSearch, total }}>
            {children}
        </TreatyProgramsContext.Provider>
    )
}
