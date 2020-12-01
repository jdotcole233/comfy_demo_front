/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useCallback } from 'react'
import { Datatable } from '../../components'

const OfferListing = ({
    setInputOffer,
    recent,
    all,
    columns,
    title,
    handleLoadMore,
    fetching,
    hideTab,
    allTotal
}) => {
    const [tab, setTab] = useState(0)

    const handleTabChange = useCallback((el) => setTab(el), [tab])

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
                                {!hideTab && <div className="d-flex w-auto justify-content-between">
                                    <ul className="nav nav-tabs nav-tabs-custom">
                                        <li className="nav-item">
                                            <a onClick={() => handleTabChange(0)} className={`nav-link ${tab === 0 ? "active" : ""}`}>Recent</a>
                                        </li>
                                        {/* <li className="nav-item">
                                            <a onClick={() => handleTabChange(1)} className={`nav-link ${tab === 1 ? "active" : ""}`}>All</a>
                                        </li> */}
                                    </ul>
                                </div>}
                            </div>
                            {tab === 0 && (
                                <div>
                                    <Datatable data={recent} columns={columns} />
                                </div>)}
                            {tab === 1 && (
                                <div>
                                    <div className="d-flex w-auto justify-content-end">
                                        {all.length < allTotal &&
                                            <button className="btn btn-primary btn-sm w-md " onClick={() => handleLoadMore(all.length)}>
                                                {fetching ? "loading ..." : "load More"}
                                                {fetching}
                                            </button>
                                        }
                                    </div>
                                    <Datatable data={all} columns={columns} />
                                </div>
                            )}
                        </div>
                    </div >
                </div >
            </div>

        </div>
    )
}

export default OfferListing
