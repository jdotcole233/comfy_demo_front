import React from 'react'

const Header = ({ closedOffers, endorsements, treaties }) => {
    return (
        <div>
            <div className="col-xl-12 mt-">
                <div className="row">
                    <div className="col-md-4">
                        <div className="card mini-stats-wid">
                            <div className="card-body">
                                <div className="media">
                                    <div className="media-body">
                                        <p className="text-muted font-weight-medium">Total unapproved offers</p>
                                        <h4 className="mb-0">{closedOffers?.length}</h4>
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
                    <div className="col-md-4">
                        <div className="card mini-stats-wid">
                            <div className="card-body">
                                <div className="media">
                                    <div className="media-body">
                                        <p className="text-muted font-weight-medium">Total unapproved endorsements</p>
                                        <h4 className="mb-0">{endorsements?.length || 0}</h4>
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
                    <div className="col-md-4">
                        <div className="card mini-stats-wid">
                            <div className="card-body">
                                <div className="media">
                                    <div className="media-body">
                                        <p className="text-muted font-weight-medium">Total unapproved Treaties</p>
                                        <h4 className="mb-0">{treaties?.length}</h4>
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
                </div>
            </div>

        </div>
    )
}

export default Header
