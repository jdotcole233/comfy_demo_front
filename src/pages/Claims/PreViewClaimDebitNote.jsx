/* eslint-disable react/jsx-no-target-blank */
import React, { Fragment } from 'react'
import "./styles/preview.css"
import { BASE_URL_LOCAL } from '../../graphql'



function PreviewCoverNote({ offer, shares, claim }) {
    const showDate = (offer) => {
        const from = new Date(offer?.offer_detail?.period_of_insurance_from)
        const to = new Date(offer?.offer_detail?.period_of_insurance_to)
        return <h1 className="dark-text-value">{`${from.getDate()}/${from.getMonth() + 1}/${from.getFullYear()}`} {" - "} {`${to.getDate()}/${to.getMonth() + 1}/${to.getFullYear()}`}</h1>
    }
    return (
        <Fragment>
            <div className="row m-2">
                <a target="_blank" href={`${BASE_URL_LOCAL}/claimdebitnote/${btoa(JSON.stringify({
                    offer_id: offer?.offer_id,
                    reinsurer_id: shares?.reinsurer_id,
                    offer_claim_participant_id: shares?.offer_claim_participant_id
                }))}`} className="btn btn-sm btn-primary w-md">
                    <i className="bx bxs-file-pdf"></i> Save
                </a>
            </div>
            <div className="preview-card container-fluid p-4 text-black bg-white">
                <div className="row">
                    <div className="col-md-6 col-6">

                    </div>
                    <div className="col-md-6 col-6" style={{ display: 'flex', justifyContent: "center", alignItems: 'center' }}>
                        <img width={100} height={100} src={require("../../assets/logo.png")} alt="company name" />
                    </div>
                    <div className="col-md-12 mt-3 mb-3">
                        <h3 style={{ textAlign: "center", color: "#000", textDecoration: "underline" }}>VISAL RE:FACULTATIVE CLAIM DEBIT NOTE</h3>
                    </div>
                    <div className="col-md-10 col-sm-12 col-xs-12 ml-md-4">
                        <div className="row mb-2">
                            <div className="col-md-4 col-4 col-sm-4 col-4 col-xs-4">
                                <h3 className="dark-text">To:</h3>
                            </div>
                            <div className="col-md-8 col-8 col-sm-8 col-8 col-xs-8">
                                <h3 className="dark-text-value">{shares?.re_company_name.toUpperCase()}</h3>
                            </div>
                        </div>
                        <div className="row mb-2">
                            <div className="col-md-4 col-4 col-sm-4 col-4 col-xs-4">
                                <h3 className="dark-text">TYPE:</h3>
                            </div>
                            <div className="col-md-8 col-8 col-sm-8 col-8 col-xs-8">
                                <h3 className="dark-text-value">{offer?.classofbusiness.business_name.toUpperCase().replace("FLEET","")}</h3>
                            </div>
                        </div>
                        <div className="row mb-2">
                            <div className="col-md-4 col-4 col-sm-4 col-xs-4">
                                <h3 className="dark-text">REINSURED:</h3>
                            </div>
                            <div className="col-md-8 col-8 col-sm-8 col-xs-8">
                                <h3 className="dark-text-value">{offer?.insurer.insurer_company_name.toUpperCase()}</h3>
                            </div>
                        </div>
                        <div className="row mb-2">
                            <div className="col-md-4 col-4 col-sm-4 col-xs-4">
                                <h3 className="dark-text">INSURED :</h3>
                            </div>
                            <div className="col-md-8 col-8 col-sm-8 col-xs-8">
                                <h3 className="dark-text-value">{offer?.offer_detail.insured_by.toUpperCase()}</h3>
                            </div>
                        </div>
                        <div className="row mb-2">
                            <div className="col-md-4 col-4 col-sm-4 col-xs-4">
                                <h3 className="dark-text">PERIOD:</h3>
                            </div>
                            <div className="col-md-8 col-8 col-sm-8 col-xs-8">
                                <h3 className="dark-text-value">{showDate(offer)}</h3>
                            </div>
                        </div>
                        <div className="row mb-2">
                            <div className="col-md-4 col-4 col-sm-4 col-xs-4">
                                <h3 className="dark-text">CURRENCY:</h3>
                            </div>
                            <div className="col-md-8 col-8 col-sm-8 col-xs-8">
                                <h3 className="dark-text-value">{offer?.offer_detail.currency}</h3>
                            </div>
                        </div>

                    </div>
                    <div className="col-md-10 col-sm-12 ml-md-4">
                        <div className="mt-3 mb-2">
                            <h3 style={{ color: "#000", fontSize: 18 }}>Claim apportioned and settled as follows: </h3>
                        </div>
                        <div className="row mb-2">
                            <div className="col-md-8 col-8 col-sm-8 col-xs-8">
                                <h3 className="dark-text"> Claim amount :</h3>
                            </div>
                            <div className="col-md-4 col-4 col-sm-4 col-xs-4">
                                <h3 className="dark-text-value">{claim?.claim_amount}</h3>
                            </div>
                        </div>
                        <div className="row mb-2">
                            <div className="col-md-8 col-8 col-sm-8 col-xs-8">
                                <h3 className="dark-text"> Your reinsurance participation :</h3>
                            </div>
                            <div className="col-md-4 col-4 col-sm-4 col-xs-4">
                                <h3 className="dark-text-value">{shares?.offer_participant_percentage}% of 100%</h3>
                            </div>
                        </div>
                        <div className="row mb-2 border-bottom border-bottom-2">
                            <div className="col-md-8 col-8 col-sm-8 col-xs-8">
                                <h3 className="dark-text" style={{ fontWeight: "bolder" }}>Amount Due from you:</h3>
                            </div>
                            <div className="col-md-4 col-4 col-sm-4 col-xs-4">
                                <h3 className="dark-text-value" style={{ fontWeight: "bolder" }}>{shares?.claim_share}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default PreviewCoverNote
