/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import { Datatable } from '../../components'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

const OfferListing = ({
    setInputOffer,
    recent,
    all,
    columns,
    title,
    handleLoadMore,
    fetching,
    hideTab,
    allTotal = 0
}) => {
    const [tab] = useState(0)

    // const handleTabChange = useCallback((el) => setTab(el), [tab])

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
                            <Tabs selectedTabClassName="nav-item active" defaultIndex={0} selectedIndex={tab} onSelect={(index) => alert(index)}>
                                <TabList className="nav nav-tabs nav-tabs-custom">
                                    <Tab>
                                        <span className="nav-item">
                                            <a className={`nav-link ${tab === 0 ? "active" : ""}`}>Recent</a>
                                        </span>
                                    </Tab>
                                    <Tab className="nav-item" selectedClassName="active">
                                        <a className="nav-link">All</a>
                                    </Tab>
                                </TabList>

                                <TabPanel>
                                    <Datatable data={recent} columns={columns} />
                                </TabPanel>
                                <TabPanel>
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
                                </TabPanel>
                            </Tabs>
                        </div>
                    </div >
                </div >
            </div>

        </div>
    )
}

export default OfferListing
