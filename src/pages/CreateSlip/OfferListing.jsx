/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
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
    allTotal,
    path
}) => {
    const [_tab, setTab] = useState("recent")
    const { tab } = useParams()

    useEffect(() => {
        if (typeof tab !== "undefined") {
            // alert(tab)
            setTab(tab)
        }
    }, [])

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
                                {!hideTab &&
                                    <div className="d-flex w-auto justify-content-between">
                                        <ul className="nav nav-tabs nav-tabs-custom kek-nav-items-pointer">
                                            <li className="nav-item ">
                                                <Link to={path + "/recent"} className={`nav-link ${_tab === "recent" ? "active" : ""}`}>Recent</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link to={path + "/all"} className={`nav-link ${_tab === "all" ? "active" : ""}`}>All</Link>
                                            </li>
                                        </ul>
                                    </div>}
                            </div>
                            {tab === "recent" && (
                                <div>
                                    <Datatable data={recent} columns={columns} />
                                </div>)}
                            {tab === "all" && (
                                <div>
                                    <div className="d-flex w-auto justify-content-end">
                                        {all.length < allTotal &&
                                            <button className="btn btn-primary btn-sm w-md " onClick={() => handleLoadMore(all.length)}>
                                                {fetching ? "Loading 50 ..." : "Load More (50)"}
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
