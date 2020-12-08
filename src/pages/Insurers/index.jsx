import React from 'react';
import { InsurerProvider } from '../../context/InsurerProvider'
import Insurers from './Insurers'
function Index() {
    return (
        <InsurerProvider>
            <Insurers />
        </InsurerProvider>
    )
}

export default Index
