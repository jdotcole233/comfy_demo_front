/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useQuery, useLazyQuery } from 'react-apollo';
import { INSURERS } from '../graphql/queries';
import useLocalStorage from '../hooks';
import _ from 'lodash';
import InsurerSendTreatyDebitNote from '../pages/Insurers/components/InsurerSendTreatyDebitNote';
// import { useLazyQuery } from '@apollo/client';
import { TREATY } from '../graphql/queries/treaty';


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
    const [treaty_id, setTreaty] = useLocalStorage("overview-id", "");
    const [selectedNotes, setSelectedNotes] = useLocalStorage("notes", [])
    const [fetchTreaty, { data: treatyData }] = useLazyQuery(TREATY, {
        variables: { treaty_id }
    });

    useEffect(() => {
        if (treaty_id) {
            fetchTreaty()
        }
    }, [treaty_id])

    const treaty = useMemo(() => {
        if (treatyData) {
            setTreaty(treaty_id);
            return treatyData.treaty
        }
        return null
    }, [treatyData])

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

    const chooseNote = (id) => {
        let __ = _.clone(selectedNotes);
        if (_.includes(__, id)) {
            __ = [...__.filter(el => el !== id)]
        } else {
            __.push(id)
        }

        setSelectedNotes(__)
    }

    const clearNotes = () => setSelectedNotes([])

    return (
        <InsurerContext.Provider value={{ insurers, loading, associates, selectInsurer, insurer, chooseNote, clearNotes, selectedNotes }}>
            {children}
            <InsurerSendTreatyDebitNote setDone={clearNotes} treaty={treaty} selectedNotes={selectedNotes} isvisible={selectedNotes && selectedNotes.length > 0} />
        </InsurerContext.Provider>
    )
}
