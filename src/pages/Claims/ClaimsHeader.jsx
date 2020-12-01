import React from 'react'
import { useQuery } from 'react-apollo';
import { OverViewCard } from '../../components'
import { CLAIM_OVERVIEW } from '../../graphql/queries';

const ClaimsHeader = () => {
    const { data: overview } = useQuery(CLAIM_OVERVIEW, { fetchPolicy: "network-only" });
    return (
        <div className="col-xl-12 mt-">
            <div className="row">
                <div className="col-md-12">
                    <div className="card mini-stats-wid">
                        <div className="card-body">
                            <div className="media">
                                <div className="media-body">
                                    <p className="text-muted font-weight-medium">Overall Claims</p>
                                    <h4 className="mb-0">{overview ? JSON.parse(overview?.claimOverview).claimOverview.total_claims : 0}</h4>
                                </div>

                                <div className="mini-stat-icon avatar-sm rounded-circle bg-primary align-self-center">
                                    <span className="avatar-title">
                                        <i className="bx bx-copy-alt font-size-24"></i>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <OverViewCard title="Overall claims by currency" value={overview ? JSON.parse(overview?.claimOverview).claimOverview.total_claim_amounts : 0} />
                <OverViewCard title="Total Claims" value={overview ? JSON.parse(overview?.claimOverview).claimOverview.total_claims : {}} />


            </div>
        </div>
    )
}

export default ClaimsHeader
