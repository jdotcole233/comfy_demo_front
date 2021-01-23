import React from 'react'
import { ReinsurersProvider } from '../../context/ReinsurersProvider'
import ReinsurerDetail from './ReinsurerDetail'

const ReinsurerDetailWrapper = () => {
    return (
        <ReinsurersProvider>
            <ReinsurerDetail />
        </ReinsurersProvider>
    )
}

export default ReinsurerDetailWrapper
