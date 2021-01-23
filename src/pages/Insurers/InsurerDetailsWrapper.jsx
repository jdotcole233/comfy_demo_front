import React from 'react'
import { InsurerProvider } from '../../context/InsurerProvider'
import InsurerDetail from './InsurersDetail'

const InsurerDetailsWrapper = () => {
    return (
        <InsurerProvider>
            <InsurerDetail />
        </InsurerProvider>
    )
}

export default InsurerDetailsWrapper
