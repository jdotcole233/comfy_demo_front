import React, { Fragment, useState } from 'react'
import { Drawer } from '../../../components'
// import CurrencyRates from './CurrencyRates'
import SMSComponent from './SMSComponent'

const TestSms = () => {
    const [showDrawer, setShowDrawer] = useState(false)
    const handleToggle = () => setShowDrawer(prev => !prev)
    return (
        <Fragment>
            <button onClick={handleToggle} className="btn  btn-primary btn-sm w-md mr-1">Test SMS</button>


            <Drawer isvisible={showDrawer} width="40%" toggle={handleToggle} >
                <SMSComponent />
            </Drawer>

        </Fragment>
    )
}

export default TestSms
