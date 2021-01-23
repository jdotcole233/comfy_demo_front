import React from 'react'
import EmployeeProvider from '../../context/EmployeeProvider'
import Employees from './Employees'

function Index() {
    return (
        <EmployeeProvider>
            <Employees />
        </EmployeeProvider>
    )
}

export default Index
