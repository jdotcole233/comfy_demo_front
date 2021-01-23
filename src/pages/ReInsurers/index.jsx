import React from 'react'
import { ReinsurersProvider } from '../../context/ReinsurersProvider'
import ReInsurers from './Reinsurers'

const Index = () => {
    return (
        <ReinsurersProvider>
            <ReInsurers />
        </ReinsurersProvider>
    )
}

export default Index
