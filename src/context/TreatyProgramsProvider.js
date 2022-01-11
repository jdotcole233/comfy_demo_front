import React, { createContext, useContext, useMemo, useState } from "react";
import { useQuery } from "@apollo/client";
import { TREATIES } from "../graphql/queries/treaty";

const TreatyProgramsContext = createContext();

export function useTreatyPrograms() {
  return useContext(TreatyProgramsContext);
}

export function TreatyProgramsProvider({ children }) {
  const [search, setSearch] = useState("");
  const [insurers, setInsurers] = useState([]);
  const { data, loading } = useQuery(TREATIES, {
    // pollInterval: 2000
  });

  const total = data?.treatyPrograms?.length;

  const treatyPrograms = useMemo(() => {
    if (data && data.treatyPrograms) {
      return data.treatyPrograms
        .filter((item) =>
          insurers.length ? insurers.includes(item.insurer?.insurer_id) : true
        )
        .filter((item) => {
          const itemToSearch = search.toLowerCase();
          const checkingItem = item.treaty_name.toLowerCase();
          const insurerName = item.insurer?.insurer_company_name?.toLowerCase();
          return (
            checkingItem.includes(itemToSearch) ||
            insurerName.includes(itemToSearch)
          );
        });
    }
    return [];
  }, [data, search, insurers]);

  function handleSearch(event) {
    const { value } = event.target;
    setSearch(value);
  }

  function handleFilter(values) {
    setInsurers(values);
  }

  return (
    <TreatyProgramsContext.Provider
      value={{
        loading,
        treatyPrograms,
        search,
        handleSearch,
        total,
        setInsurers,
        handleFilter,
      }}
    >
      {children}
    </TreatyProgramsContext.Provider>
  );
}
