/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { useHistory } from 'react-router-dom'

const VewOfferHeader = ({ data }) => {
    const history = useHistory()
    return (
        <>
            <div className="row">
                <div className="col-12">
                    <div className="page-title-box d-flex align-items-center justify-content-between">
                        <h4 className="mb-0 font-size-18">
                            Policy Number:{" "}
                            {data?.findSingleOffer.offer_detail.policy_number} - Offer
                            Status:{" "}
                            <span
                                style={{ letterSpacing: 5 }}
                                className={`badge w-md badge-${data?.findSingleOffer.offer_status === "OPEN"
                                    ? "primary"
                                    : data?.findSingleOffer.offer_status === "CLOSED"
                                        ? "success"
                                        : "warning"
                                    } p-1 font-size-11`}
                            >
                                {data.findSingleOffer.offer_status}
                            </span>
                        </h4>

                        <div className="page-title-right">
                            <ol className="breadcrumb m-0">
                                <li
                                    onClick={() => history.goBack()}
                                    className="breadcrumb-item link-hover"
                                >
                                    <a>Create Slip</a>
                                </li>
                                <li className="breadcrumb-item active">View Offer</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default VewOfferHeader
