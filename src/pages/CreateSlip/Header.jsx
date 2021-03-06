import React from 'react'

const Header = ({ offerListing, offerOverview }) => {
    return (
        <div className="col-xl-12 mt-">
            <div className="row">
                <div className="col-md-6">
                    <div className="card mini-stats-wid">
                        <div className="card-body">
                            <div className="media">
                                <div className="media-body">
                                    <p className="text-muted font-weight-medium">Total Offers</p>
                                    <h4 className="mb-0">{offerListing.length}</h4>
                                </div>

                                <div className="mini-stat-icon avatar-sm  bg-success align-self-center">
                                    <span className="avatar-title bg-success">
                                        <i className="bx bx-copy-alt font-size-24"></i>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card mini-stats-wid">
                        <div className="card-body">
                            <div className="media">
                                <div className="media-body">
                                    <p className="text-muted font-weight-medium">Pending Offers</p>
                                    <h4 className="mb-0">{offerOverview?.total_pending}</h4>
                                </div>

                                <div className="avatar-sm  bg-success align-self-center mini-stat-icon">
                                    <span className="avatar-title  bg-success">
                                        <i className="bx bx-archive-in font-size-24"></i>
                                    </span>
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
