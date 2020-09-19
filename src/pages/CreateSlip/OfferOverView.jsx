import React from 'react'
import { OverViewCard } from '../../components'

const OfferOverView = ({ offerOverview }) => {
    return (
        <div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6">
                        <h3>Offer Overview</h3>
                    </div>
                </div>
            </div>
            <div className="container-fluid">
                <div className="row">
                    <OverViewCard title="Facultative Sum Insured" value={offerOverview?.total_fac_sum_insured} />
                    <OverViewCard title="Facultative Premium" value={offerOverview?.total_fac_premium} />
                    <OverViewCard title="Sum Insured" value={offerOverview?.total_sum_insured} />
                    <OverViewCard title="Premium" value={offerOverview?.total_premium} />
                </div></div>

        </div>
    )
}

export default OfferOverView
