/* eslint-disable react/jsx-no-target-blank */
import React, { Fragment } from 'react'
import "./styles/preview.css"
import { BASE_URL_LOCAL } from '../../graphql'



function PreviewCoverNote({ offer }) {

    const showDate = (offer) => {
        const from = new Date(offer?.offer_detail?.period_of_insurance_from)
        const to = new Date(offer?.offer_detail?.period_of_insurance_to)
        return <h1 className="dark-text-value">{`${from.getDate()}/${from.getMonth() + 1}/${from.getFullYear()}`} {" - "} {`${to.getDate()}/${to.getMonth() + 1}/${to.getFullYear()}`}</h1>
    }

    return (
        <Fragment>
            <div className="row m-2">
                <a target="_blank" href={`${BASE_URL_LOCAL}/generate_cover_slip/${btoa(JSON.stringify({ offer_id: offer?.offer_id }))}`} className="btn btn-sm btn-primary w-md">
                    <i className="bx bxs-file-pdf"></i> Save
                </a>
            </div>
            <div className="preview-card container-fluid p-4 text-black bg-white">
                <div className="row">
                    <div className="col-md-6 col-6">
                        <address>
                            The Managing Director  <br />
                            {offer?.insurer.insurer_company_name}, <br />
                            {offer?.insurer.insurer_address.suburb}.  <br />
                            {offer?.insurer.insurer_address.region}, {offer?.insurer.insurer_address.country}  <br />

                            {new Date().toDateString()}
                        </address>
                    </div>
                    <div className="col-md-6 col-6" style={{ display: 'flex', justifyContent: "center", alignItems: 'center' }}>
                        <img width={100} height={100} src={require("../../assets/logo.png")} alt="company name" />
                    </div>
                    <div className="col-md-12 mt-3 mb-3">
                        <h3 style={{ textAlign: "center", color: "#000", textDecoration: "underline" }}>Cover Note</h3>
                    </div>
                    <div className="col-md-10 col-sm-12 col-xs-12 ml-md-4">
                        <div className="row mb-2">
                            <div className="col-md-4 col-4 col-sm-4 col-4 col-xs-4">
                                <h3 className="dark-text">POLICY TYPE:</h3>
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
                        <div className="row mb-2">
                            <div className="col-md-4 col-4 col-sm-4 col-xs-4">
                                <h3 className="dark-text">ANNUAL PREMIUM:</h3>
                            </div>
                            <div className="col-md-8 col-8 col-sm-8 col-xs-8">
                                <h3 className="dark-text-value">{offer?.premium.toLocaleString(undefined, { maximumFractionDigits: 2 })}</h3>
                            </div>
                        </div>
                        <div className="row mb-2">
                            <div className="col-md-4 col-4 col-sm-4 col-xs-4">
                                <h3 className="dark-text">OUR ORDER:</h3>
                            </div>
                            <div className="col-md-8 col-8 col-sm-8 col-xs-8">
                                <h3 className="dark-text-value">{offer?.facultative_offer}% of 100%</h3>
                            </div>
                        </div>
                        <div className="row mb-2">
                            <div className="col-md-4 col-4 col-sm-4 col-xs-4">
                                <h3 className="dark-text">FACULTATIVE PREMIUM:</h3>
                            </div>
                            <div className="col-md-8 col-8 col-sm-8 col-xs-8">
                                <h3 className="dark-text-value">{offer?.fac_premium.toLocaleString(undefined, { maximumFractionDigits: 2 })}</h3>
                            </div>
                        </div>

                    </div>
                    <div className="col-md-10 col-sm-12 ml-md-4">
                        <div className="mt-3 mb-2">
                            <h3 style={{ color: "#000", textDecoration: "underline", fontSize: 18 }}>REINSURANCE SECURITIES</h3>
                        </div>
                        {offer?.offer_participant.map((reinsurer, key) => (
                            <div className="row mb-2">
                                <div className="col-md-8 col-8 col-sm-8 col-xs-8">
                                    <h3 className="dark-text">{reinsurer.reinsurer.re_company_name} :</h3>
                                </div>
                                <div className="col-md-4 col-4 col-sm-4 col-xs-4">
                                    <h3 className="dark-text-value">{reinsurer.offer_participant_percentage}% of 100%</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default PreviewCoverNote
