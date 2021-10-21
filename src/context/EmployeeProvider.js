import React, { createContext, useContext } from 'react';
import { useQuery } from "@apollo/client"
import { EMPLOYEES } from '../graphql/queries/employees';

const EmployeeContext = createContext();


export function useEmployee() {
    return useContext(EmployeeContext);
}

function EmployeeProvider({ children }) {

    const { data, loading } = useQuery(EMPLOYEES);

    const employees = data?.employees || []
    const length = data?.employees?.length || 0

    return (
        <EmployeeContext.Provider value={{ employees, length, loading }}>
            {children}
        </EmployeeContext.Provider>
    )
}

export default EmployeeProvider
