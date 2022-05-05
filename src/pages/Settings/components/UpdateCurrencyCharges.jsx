import React, { Fragment, useState } from 'react'
import { Drawer } from '../../../components'
import CurrencyRates from './CurrencyRates'

const UpdateCurrencyCharges = () => {
    const [showDrawer, setShowDrawer] = useState(false)
    const handleToggle = () => setShowDrawer(prev => !prev)
    return (
        <Fragment>
            <button onClick={handleToggle} className="btn  btn-primary btn-sm w-md mr-1">Update Currency rates</button>


            <Drawer isvisible={showDrawer} width="40%" toggle={handleToggle} >
                <CurrencyRates />
            </Drawer>

        </Fragment>
    )
}

export default UpdateCurrencyCharges
