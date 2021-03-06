import React from 'react'
import { CurrencyValues } from '.'

const OverViewCard = ({ title, value, className = "col-md-6", icon = "bx bx-money" }) => {
    return (
        <div className={className}>
            <div className="card mini-stats-wid">
                <div className="card-body">
                    <div className="media">
                        <div className="media-body row">
                            <div className="col-md-6 d-flex align-items-center">
                                <p className="text-muted font-weight-medium">
                                    {title}
                                </p>
                            </div>
                            <div className="col-md-6 d-flex justify-content-end">
                                <div className="avatar-sm  bg-success align-self-center mini-stat-icon">
                                    <span className="avatar-title  bg-success">
                                        <i className={`${icon} font-size-24`}></i>
                                    </span>
                                </div>
                            </div>

                            <CurrencyValues data={value} />
                        </div>


                    </div>
                </div>
            </div>
        </div>
    )
}

export default OverViewCard
