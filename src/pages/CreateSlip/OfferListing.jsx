/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import { Datatable } from '../../components'

const OfferListing = ({ setInputOffer, loading, offerListing, columns, title }) => {
    const [tab, setTab] = useState(0)
    return (
        <div className="row">
            <div className="col-md-12">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-6">
                            <h3>{title}</h3>
                        </div>
                        <div className="col-md-6" style={{ display: 'flex', justifyContent: "flex-end" }}>
                            {setInputOffer && typeof setInputOffer === "function" ? (
                                <button onClick={() => {
                                    setInputOffer(true)
                                }
                                } className="btn btn-rounded btn-primary btn-sm w-md">Input offer</button>
                            ) : null}
                        </div>
                    </div>
                </div>
                <div className="container-fluid mt-2">
                    <div className="card">
                        <div className="card-body">
                            <div className="row mb-3">
                                <ul className="nav nav-tabs nav-tabs-custom">
                                    <li className="nav-item">
                                        <a onClick={() => setTab(0)} className={`nav-link ${tab === 0 ? "active" : ""}`}>Recent</a>
                                    </li>
                                    <li className="nav-item">
                                        <a onClick={() => setTab(1)} className={`nav-link ${tab === 1 ? "active" : ""}`}>All</a>
                                    </li>
                                </ul>
                            </div>
                            {!loading ? (<Datatable data={offerListing} columns={columns} />) : null}
                        </div>
                    </div >
                </div >
            </div>

        </div>
    )
}

export default OfferListing
