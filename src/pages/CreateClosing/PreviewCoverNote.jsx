/* eslint-disable react/jsx-no-target-blank */
import React, { Fragment, useContext } from 'react'
import "./styles/preview.css"
import { BASE_URL_LOCAL } from '../../graphql'
import { AuthContext } from '../../context/AuthContext'

const downloadAccess = ['CEO',
    'General Manager',
    // 'Senior Broking Officer',
    // 'Finance Executive',
    'System Administrator']

function PreviewCoverNote({ offer }) {
    const { state: ctx } = useContext(AuthContext)
    const showDate = (offer) => {
        const from = new Date(offer?.offer_detail?.period_of_insurance_from)
        const to = new Date(offer?.offer_detail?.period_of_insurance_to)
        return `${from.getDate()}/${from.getMonth() + 1}/${from.getFullYear()} ${to.getDate()}/${to.getMonth() + 1}/${to.getFullYear()}`
    }

    return (
        <Fragment>
            <div className="row m-2">
                {(offer?.approval_status === "APPROVED" || downloadAccess.includes(ctx?.user?.position)) && <a target="_blank" href={`${BASE_URL_LOCAL}/generate_cover_slip/${btoa(JSON.stringify({ offer_id: offer?.offer_id }))}`} className="btn btn-sm btn-primary w-md">
                    <i className="bx bxs-file-pdf"></i> Save
                </a>}
            </div>
            <div style={{ boxShadow: "1px 2px 2px 5px #f2f2f2" }} className="preview-card container-fluid p-4 text-black bg-white">
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
                        {/* <img width={100} height={100} src={require("../../assets/logo.png")} alt="company name" /> */}
                    </div>
                    <div className="col-md-12 mt-3 mb-3">
                        <h3 style={{ textAlign: "center", color: "#000", textDecoration: "underline" }}>Cover Note</h3>
                        <p style={{ textAlign: "center" }}>IN ACCORDANCE WITH YOUR INSTRUCTIONS WE HAVE EFFECTED REINSUREANCE WITH
                        UNDERWRITERS ON TERMS AND CONDITIONS AS DETAILED HEREIN</p>
                    </div>
                    <div className="col-md-10 col-sm-12 col-xs-12 ml-md-4">
                        <div className="row mb-2">
                            <div className="col-md-4 col-4 col-sm-4 col-4 col-xs-4">
                                <h3 className="dark-text">TYPE:</h3>
                            </div>
                            <div className="col-md-8 col-8 col-sm-8 col-8 col-xs-8">
                                <h3 className="dark-text-value">{offer?.classofbusiness.business_name.toUpperCase().replace("FLEET", "").toLowerCase()}</h3>
                            </div>
                        </div>
                        <div className="row mb-2">
                            <div className="col-md-4 col-4 col-sm-4 col-4 col-xs-4">
                                <h3 className="dark-text">Form:</h3>
                            </div>
                            <div className="col-md-8 col-8 col-sm-8 col-8 col-xs-8">
                                <h3 className="dark-text-value">As Original and/ Slip Policy Reins</h3>
                            </div>
                        </div>
                        <div className="row mb-2">
                            <div className="col-md-4 col-4 col-sm-4 col-xs-4">
                                <h3 className="dark-text">Reinsured:</h3>
                            </div>
                            <div className="col-md-8 col-8 col-sm-8 col-xs-8">
                                <h3 className="dark-text-value">{offer?.insurer.insurer_company_name.toUpperCase()}</h3>
                            </div>
                        </div>
                        <div className="row mb-2">
                            <div className="col-md-4 col-4 col-sm-4 col-xs-4">
                                <h3 className="dark-text">Insured :</h3>
                            </div>
                            <div className="col-md-8 col-8 col-sm-8 col-xs-8">
                                <h3 className="dark-text-value">{offer?.offer_detail.insured_by.toUpperCase()}</h3>
                            </div>
                        </div>
                        <div className="row mb-2">
                            <div className="col-md-4 col-4 col-sm-4 col-xs-4">
                                <h3 className="dark-text">Period:</h3>
                            </div>
                            <div className="col-md-8 col-8 col-sm-8 col-xs-8">
                                <h3 className="dark-text-value">{showDate(offer)}</h3>
                            </div>
                        </div>
                        <div className="row mb-2">
                            <div className="col-md-4 col-4 col-sm-4 col-xs-4">
                                <h3 className="dark-text">Currency:</h3>
                            </div>
                            <div className="col-md-8 col-8 col-sm-8 col-xs-8">
                                <h3 className="dark-text-value">{offer?.offer_detail.currency}</h3>
                            </div>
                        </div>
                        <div className="row mb-2">
                            <div className="col-md-4 col-4 col-sm-4 col-xs-4">
                                <h3 className="dark-text">Total Sum Insured:</h3>
                            </div>
                            <div className="col-md-8 col-8 col-sm-8 col-xs-8">
                                <h3 className="dark-text-value">{offer?.offer_detail.currency} {offer?.sum_insured.toLocaleString(undefined, { maximumFractionDigits: 2 })}</h3>
                            </div>
                        </div>
                        <div className="row mb-2">
                            <div className="col-md-4 col-4 col-sm-4 col-xs-4">
                                <h3 className="dark-text">100% Premium:</h3>
                            </div>
                            <div className="col-md-8 col-8 col-sm-8 col-xs-8">
                                <h3 className="dark-text-value">{offer?.premium.toLocaleString(undefined, { maximumFractionDigits: 2 })}</h3>
                            </div>
                        </div>
                        <div className="row mb-2">
                            <div className="col-md-4 col-4 col-sm-4 col-xs-4">
                                <h3 className="dark-text">Original Offer:</h3>
                            </div>
                            <div className="col-md-8 col-8 col-sm-8 col-xs-8">
                                <h3 className="dark-text-value">{offer?.facultative_offer}% of 100.00%</h3>
                            </div>
                        </div>
                        <div className="row mb-2">
                            <div className="col-md-4 col-4 col-sm-4 col-xs-4">
                                <h3 className="dark-text">Placed Offer:</h3>
                            </div>
                            <div className="col-md-8 col-8 col-sm-8 col-xs-8">
                                <h3 className="dark-text-value">{offer?.placed_offer}% of 100.00%</h3>
                            </div>
                        </div>
                        <div className="row mb-2">
                            <div className="col-md-4 col-4 col-sm-4 col-xs-4">
                                <h3 className="dark-text">Facultative Reinsurance:</h3>
                            </div>
                            <div className="col-md-8 col-8 col-sm-8 col-xs-8">
                                <h3 className="dark-text-value">{offer?.fac_sum_insured.toLocaleString(undefined, { maximumFractionDigits: 2 })}</h3>
                            </div>
                        </div>
                        <div className="row mb-2">
                            <div className="col-md-4 col-4 col-sm-4 col-xs-4">
                                <h3 className="dark-text">Facultative Premium:</h3>
                            </div>
                            <div className="col-md-8 col-8 col-sm-8 col-xs-8">
                                <h3 className="dark-text-value">{offer?.fac_premium.toLocaleString(undefined, { maximumFractionDigits: 2 })}</h3>
                            </div>
                        </div>
                        <div className="row mb-2">
                            <div className="col-md-4 col-4 col-sm-4 col-xs-4">
                                <h3 className="dark-text">Commission:</h3>
                            </div>
                            <div className="col-md-8 col-8 col-sm-8 col-xs-8">
                                <h3 className="dark-text-value">{offer?.commission.toLocaleString(undefined, { maximumFractionDigits: 2 })} %</h3>
                            </div>
                        </div>
                        <div className="row mb-2">
                            <div className="col-md-4 col-4 col-sm-4 col-xs-4">
                                <h3 className="dark-text">Information:</h3>
                            </div>
                            <div className="col-md-8 col-8 col-sm-8 col-xs-8">
                                {offer?.offer_detail?.information_comment ? <div className="dark-text-value" dangerouslySetInnerHTML={{ __html: offer?.offer_detail.information_comment }}>
                                </div> :
                                    <h3 className="dark-text-value">Subject to NKORL as at {new Date().toLocaleDateString()} and NIC's NPNC
                                    guidelines
                                </h3>}
                            </div>
                        </div>
                        <div className="row mb-2">
                            <div className="col-md-4 col-4 col-sm-4 col-xs-4">
                                <h3 className="dark-text">Taxes Payable By Reinsurers</h3>
                            </div>
                            <div className="col-md-8 col-8 col-sm-8 col-xs-8">
                                <h3 className="dark-text-value">National Insurance Commission Levy: 1.50%
                                Withholding Tax - 5.00% (Only applicable to Countries that do not have a Double Taxation Agreement with Ghana) </h3>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-10 col-sm-12 ml-md-4">
                        <div className="mt-3 mb-2">
                            {/* <h3 style={{ color: "#000", textDecoration: "underline", fontSize: 18 }}>RISK DESCRIPTION</h3> */}
                            {offer && JSON.parse(offer?.offer_detail.offer_details).map((detail, key) => {
                                let value = parseFloat(detail.value);
                                if (isNaN(value)) {
                                    value = detail.value
                                }
                                else if (detail.keydetail === "Year of Manufacture") {
                                    value = detail.value
                                }
                                else {
                                    value = value.toLocaleString(undefined, { maximumFractionDigits: 2 })
                                }
                                return (
                                    <div className="row" key={key}>
                                        <div className="col-md-4 col-4 col-sm-4 col-xs-4">
                                            <h3 className="dark-text">{detail.keydetail}:</h3>
                                        </div>
                                        <div className="col-md-8 col-8 col-sm-8 col-xs-8">
                                            <h3 className="dark-text-value">{value}</h3>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>


                    </div>
                    <div className="col-md-10 col-sm-12 ml-md-4">
                        <div className="mt-3 mb-2">
                            <h5 className="dark-text" dangerouslySetInnerHTML={{ __html: offer?.offer_detail.offer_comment }}></h5>
                        </div>


                    </div>
                    <div className="col-md-10 col-sm-12 ml-md-4">
                        <div className="mt-3 mb-2">
                            <h3 style={{ color: "#000", textDecoration: "underline", fontSize: 18 }}>SECURITY</h3>
                        </div>
                        {offer?.offer_participant.map((reinsurer, key) => !reinsurer.offer_participant_percentage ? null : (
                            <div key={key} className="row mb-2">
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
