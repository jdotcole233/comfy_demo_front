/* eslint-disable react/jsx-no-target-blank */
import React, { Fragment, useContext } from 'react'
import "./styles/preview.css"
import { BASE_URL_LOCAL } from '../../graphql'
import { AuthContext } from '../../context/AuthContext'
import { getCurrencyFullName } from '../../components'

const downloadAccess = [
    'CEO',
    'General Manager',
    // 'Senior Broking Officer',
    // 'Finance Executive',
    'System Administrator'
]

function PreviewCoverNote({ offer, reinsurer }) {
    const { state: ctx } = useContext(AuthContext)
    const showDate = (offer) => {
        const from = new Date(offer?.offer_detail?.period_of_insurance_from)
        const to = new Date(offer?.offer_detail?.period_of_insurance_to)
        return `${from.getDate()}/${from.getMonth() + 1}/${from.getFullYear()} ${to.getDate()}/${to.getMonth() + 1}/${to.getFullYear()}`
    }
    return (
        <Fragment>
            <div className="row m-2">
                {(offer?.approval_status === "APPROVED" || downloadAccess.includes(ctx?.user?.position)) && <a target="_blank" href={`${BASE_URL_LOCAL}/generate_closing_slip/${btoa(JSON.stringify({
                    offer_id: offer?.offer_id,
                    reinsurer_id: reinsurer?.reinsurer.reinsurer_id
                }))}`} className="btn btn-sm btn-primary w-md">
                    <i className="bx bxs-file-pdf"></i> Save
            </a>}
            </div>
            <div style={{ boxShadow: "1px 2px 2px 5px #f2f2f2" }} className="preview-card container-fluid  text-black bg-white">
                <div className="row">
                    <img className="" src={require('../../assets/banner.png')} alt="kek letter head" />
                    <div className="col-md-12 text-align-center mt-3 mb-3">
                        <h3 style={{ textAlign: "center", color: "#000", textDecoration: "underline" }}>
                            FACULTATIVE CLOSING
                        </h3>
                    </div>

                    <div className="col-md-12 ml-md-4">
                        <div className="row mb-2">
                            <div className="col-md-4 col-4 col-sm-4 col-4 col-xs-4">
                                <h3 className="dark-text">To:</h3>
                            </div>
                            <div className="col-md-8 col-8 col-sm-8 col-8 col-xs-8">
                                <h3 className="dark-text-value">{reinsurer?.reinsurer.re_company_name}</h3>
                            </div>
                        </div>
                        <div className="row mb-2">
                            <div className="col-md-4 col-4 col-sm-4 col-4 col-xs-4">
                                <h3 className="dark-text">Type:</h3>
                            </div>
                            <div className="col-md-8 col-8 col-sm-8 col-8 col-xs-8">
                                <h3 className="dark-text-value">{offer?.classofbusiness.business_name.toUpperCase().replace("FLEET", "").toLowerCase()}</h3>
                            </div>
                        </div>
                        {["Motor Comprehensive", "Motor Comprehensive Fleet"].includes(offer?.classofbusiness.business_name) &&
                            <div className="row mb-2">
                                <div className="col-md-4 col-4 col-sm-4 col-4 col-xs-4">
                                    <h3 className="dark-text">REGISTRATION:</h3>
                                </div>
                                <div className="col-md-8 col-8 col-sm-8 col-8 col-xs-8">
                                    <h3 className="dark-text-value">
                                        {
                                            JSON.parse(
                                                offer?.offer_detail.offer_details
                                            ).find((el) => el.keydetail === "Vehicle Reg No." || el.keydetail === "Vehicle Reg No")
                                                ?.value
                                        }
                                    </h3>
                                </div>
                            </div>
                        }
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
                                <h3 className="dark-text-value">{offer?.insurer.insurer_company_name}</h3>
                            </div>
                        </div>
                        <div className="row mb-2">
                            <div className="col-md-4 col-4 col-sm-4 col-xs-4">
                                <h3 className="dark-text">Insured:</h3>
                            </div>
                            <div className="col-md-8 col-8 col-sm-8 col-xs-8">
                                <h3 className="dark-text-value">{offer?.offer_detail.insured_by}</h3>
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
                                <h3 className="dark-text-value">{getCurrencyFullName(offer?.offer_detail.currency)}</h3>
                            </div>
                        </div>
                    </div>
                    {/* Summary of Trial Balance */}
                    <div className="col-md-12">
                        <table className="table table-borderless">
                            <thead>
                                <tr className="trial-balance-tr">
                                    <th></th>
                                    <th>Debit</th>
                                    <th>Credit</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="trial-balance-tr">
                                    <td>100% Premium</td>
                                    <td></td>
                                    <td>{offer?.premium?.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
                                </tr>
                                <tr className="trial-balance-tr">
                                    <td>Facultative Premium</td>
                                    <td></td>
                                    <td>{reinsurer?.participant_fac_premium?.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
                                </tr>
                                <tr className="trial-balance-tr">
                                    <td>Less Commission ({reinsurer?.offer_extra_charges?.agreed_commission}%)</td>
                                    <td>{reinsurer?.offer_extra_charges?.agreed_commission_amount?.toLocaleString(undefined, { maximumFractionDigits: 2 }) || "NIL"}</td>
                                    <td></td>
                                </tr>
                                <tr className="trial-balance-tr">
                                    <td>Brokerage ({reinsurer?.offer_extra_charges?.agreed_brokerage_percentage}%)</td>
                                    <td>{reinsurer?.offer_extra_charges?.brokerage_amount?.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
                                    <td></td>
                                </tr>
                                <tr className="trial-balance-tr">
                                    <td>NIC Levy ({reinsurer?.offer_extra_charges?.nic_levy}%)</td>
                                    <td>{reinsurer?.offer_extra_charges?.nic_levy_amount?.toLocaleString(undefined, { maximumFractionDigits: 2 }) || "NIL"}</td>
                                    <td></td>
                                </tr>
                                <tr className="trial-balance-tr">
                                    <td>Withholding Tax ({reinsurer?.offer_extra_charges?.withholding_tax}%)</td>
                                    <td>{reinsurer?.offer_extra_charges?.withholding_tax_amount?.toLocaleString(undefined, { maximumFractionDigits: 2 }) || "NIL"}</td>
                                    <td></td>
                                </tr>
                                <tr className="trial-balance-tr">
                                    <td>Balance Due to Reinsurers</td>
                                    <td></td>
                                    <td>{reinsurer?.offer_amount?.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
                                </tr>
                                <tr className="trial-balance-tr">
                                    <td>Facultative Premium payable in full at inception</td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr className="trial-balance-tr">
                                    <td>Your reinsurance participation</td>
                                    <td>100% of {reinsurer?.offer_participant_percentage}%</td>
                                    <td></td>
                                </tr>
                                <tr className="trial-balance-tr">
                                    <td className="balance">Balance Due to you </td>
                                    <td className="balance"></td>
                                    <td className="balance">{offer?.offer_detail.currency} {reinsurer?.offer_amount?.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="col-md-5 col-8 col-sm-8 col-xs-8">
                        <p className="date-text">Date: {new Date().toLocaleDateString()}</p>
                    </div>
                </div>
            </div>
        </Fragment >
    )
}

export default PreviewCoverNote
