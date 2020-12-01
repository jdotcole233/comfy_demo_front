import React from 'react'

const Header = ({ closedOffers }) => {
    return (
        <div>
            <div className="col-xl-12 mt-">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card mini-stats-wid">
                            <div className="card-body">
                                <div className="media">
                                    <div className="media-body">
                                        <p className="text-muted font-weight-medium">Total unapproved offers</p>
                                        <h4 className="mb-0">{closedOffers?.length}</h4>
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
                </div>
            </div>

        </div>
    )
}

export default Header
