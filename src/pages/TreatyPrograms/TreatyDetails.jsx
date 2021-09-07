import React from 'react'

const showDate = (offer) => {
    const from = new Date(offer?.offer_detail?.period_of_insurance_from)
    const to = new Date(offer?.offer_detail?.period_of_insurance_to)
    return `${from.getDate()}/${from.getMonth() + 1}/${from.getFullYear()}
    ${" - "}
    ${to.getDate()}/${to.getMonth() + 1}/${to.getFullYear()}`
}

const TreatyDetails = ({ data }) => {
    return (
        <div className="col-xl-4">
            <div className="card">
                <div className="card-header">
                    <h4 className="card-title">Offer Overview</h4>
                </div>
                <div className="card-body">
                    <div
                        className="row"
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            marginBottom: 10,
                        }}
                    >
                        <div
                            className="col-md-6"
                            style={{ display: "flex", alignItems: "center" }}
                        >
                            <h3 style={{ fontSize: 15, fontWeight: "lighter" }}>
                                Class of Business
                    </h3>
                        </div>
                        <div
                            className="col-md-6"
                            style={{ display: "flex", alignItems: "center" }}
                        >
                            <h3 style={{ fontSize: 15, fontWeight: "lighter" }}>
                                {data?.findSingleOffer?.classofbusiness.business_name}
                            </h3>
                        </div>
                    </div>
                    {["Motor Comprehensive", "Motor Comprehensive Fleet"].includes(data?.findSingleOffer?.classofbusiness.business_name)
                        ? (
                            <div
                                className="row"
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    marginBottom: 10,
                                }}
                            >
                                <div
                                    className="col-md-6"
                                    style={{ display: "flex", alignItems: "center" }}
                                >
                                    <h3 style={{ fontSize: 15, fontWeight: "lighter" }}>
                                        Vehicle Reg No.
                      </h3>
                                </div>
                                <div
                                    className="col-md-6"
                                    style={{ display: "flex", alignItems: "center" }}
                                >
                                    <h3 style={{ fontSize: 15, fontWeight: "lighter" }}>
                                        {
                                            JSON.parse(
                                                data?.findSingleOffer?.offer_detail.offer_details
                                            ).find((el) => el.keydetail === "Vehicle Reg No." || el.keydetail === "Vehicle Reg No")
                                                ?.value
                                        }
                                    </h3>
                                </div>
                            </div>
                        ) : null}
                    <div
                        className="row"
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            marginBottom: 10,
                        }}
                    >
                        <div
                            className="col-md-6"
                            style={{ display: "flex", alignItems: "center" }}
                        >
                            <h3 style={{ fontSize: 15, fontWeight: "lighter" }}>
                                Policy No.
                    </h3>
                        </div>
                        <div
                            className="col-md-6"
                            style={{ display: "flex", alignItems: "center" }}
                        >
                            <h3 style={{ fontSize: 15, fontWeight: "lighter" }}>
                                {data?.findSingleOffer?.offer_detail.policy_number}
                            </h3>
                        </div>
                    </div>
                    <div
                        className="row"
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            marginBottom: 10,
                        }}
                    >
                        <div
                            className="col-md-6"
                            style={{ display: "flex", alignItems: "center" }}
                        >
                            <h3 style={{ fontSize: 15, fontWeight: "lighter" }}>
                                Reinsured
                    </h3>
                        </div>
                        <div
                            className="col-md-6"
                            style={{ display: "flex", alignItems: "center" }}
                        >
                            <h3 style={{ fontSize: 15, fontWeight: "lighter" }}>
                                {data?.findSingleOffer?.insurer.insurer_company_name}
                            </h3>
                        </div>
                    </div>
                    <div
                        className="row"
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            marginBottom: 10,
                        }}
                    >
                        <div
                            className="col-md-6"
                            style={{ display: "flex", alignItems: "center" }}
                        >
                            <h3 style={{ fontSize: 15, fontWeight: "lighter" }}>
                                Insured
                    </h3>
                        </div>
                        <div
                            className="col-md-6"
                            style={{ display: "flex", alignItems: "center" }}
                        >
                            <h3 style={{ fontSize: 15, fontWeight: "lighter" }}>
                                {data?.findSingleOffer?.offer_detail.insured_by}
                            </h3>
                        </div>
                    </div>
                    <div
                        className="row"
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            marginBottom: 10,
                        }}
                    >
                        <div
                            className="col-md-6"
                            style={{ display: "flex", alignItems: "center" }}
                        >
                            <h3 style={{ fontSize: 15, fontWeight: "lighter" }}>
                                Period Of Insurance
                    </h3>
                        </div>
                        <div
                            className="col-md-6"
                            style={{ display: "flex", alignItems: "center" }}
                        >
                            <h3 style={{ fontSize: 15, fontWeight: "lighter" }}>
                                {showDate(data?.findSingleOffer)}
                            </h3>
                        </div>
                    </div>

                    <div
                        className="row"
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            marginBottom: 10,
                        }}
                    >
                        <div
                            className="col-md-6"
                            style={{ display: "flex", alignItems: "center" }}
                        >
                            <h3 style={{ fontSize: 15, fontWeight: "lighter" }}>
                                Rate
                    </h3>
                        </div>
                        <div
                            className="col-md-6"
                            style={{ display: "flex", alignItems: "center" }}
                        >
                            <h3 style={{ fontSize: 15, fontWeight: "lighter" }}>
                                {data?.findSingleOffer?.rate} %
                    </h3>
                        </div>
                    </div>

                    <div
                        className="row"
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            marginBottom: 10,
                        }}
                    >
                        <div
                            className="col-md-6"
                            style={{ display: "flex", alignItems: "center" }}
                        >
                            <h3 style={{ fontSize: 15, fontWeight: "lighter" }}>
                                Comission
                    </h3>
                        </div>
                        <div
                            className="col-md-6"
                            style={{ display: "flex", alignItems: "center" }}
                        >
                            <h3 style={{ fontSize: 15, fontWeight: "lighter" }}>
                                {data?.findSingleOffer?.commission}%
                    </h3>
                        </div>
                    </div>
                    <div
                        className="row"
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            marginBottom: 10,
                        }}
                    >
                        <div
                            className="col-md-6"
                            style={{ display: "flex", alignItems: "center" }}
                        >
                            <h3 style={{ fontSize: 15, fontWeight: "lighter" }}>
                                Fac. Offer
                    </h3>
                        </div>
                        <div
                            className="col-md-6"
                            style={{ display: "flex", alignItems: "center" }}
                        >
                            <h3 style={{ fontSize: 15, fontWeight: "lighter" }}>
                                {data?.findSingleOffer?.facultative_offer}%
                    </h3>
                        </div>
                    </div>
                    <div
                        className="row"
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            marginBottom: 10,
                        }}
                    >
                        <div
                            className="col-md-6"
                            style={{ display: "flex", alignItems: "center" }}
                        >
                            <h3 style={{ fontSize: 15, fontWeight: "lighter" }}>
                                Brokerage
                    </h3>
                        </div>
                        <div
                            className="col-md-6"
                            style={{ display: "flex", alignItems: "center" }}
                        >
                            <h3 style={{ fontSize: 15, fontWeight: "lighter" }}>
                                {data?.findSingleOffer?.brokerage}%
                    </h3>
                        </div>
                    </div>
                    <div
                        className="row"
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            marginBottom: 10,
                        }}
                    >
                        <div
                            className="col-md-6"
                            style={{ display: "flex", alignItems: "center" }}
                        >
                            <h3 style={{ fontSize: 15, fontWeight: "lighter" }}>
                                Premium
                    </h3>
                        </div>
                        <div
                            className="col-md-6"
                            style={{ display: "flex", alignItems: "center" }}
                        >
                            <h3 style={{ fontSize: 15, fontWeight: "lighter" }}>
                                {data?.findSingleOffer?.offer_detail.currency}{" "}
                                {data?.findSingleOffer?.premium.toLocaleString(
                                    undefined,
                                    { maximumFractionDigits: 2 }
                                )}
                            </h3>
                        </div>
                    </div>
                    <div
                        className="row"
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            marginBottom: 10,
                        }}
                    >
                        <div
                            className="col-md-6"
                            style={{ display: "flex", alignItems: "center" }}
                        >
                            <h3 style={{ fontSize: 15, fontWeight: "lighter" }}>
                                Sum Insured
                    </h3>
                        </div>
                        <div
                            className="col-md-6"
                            style={{ display: "flex", alignItems: "center" }}
                        >
                            <h3 style={{ fontSize: 15, fontWeight: "lighter" }}>
                                {data?.findSingleOffer?.offer_detail.currency}{" "}
                                {data?.findSingleOffer?.sum_insured.toLocaleString(
                                    undefined,
                                    { maximumFractionDigits: 2 }
                                )}
                            </h3>
                        </div>
                    </div>

                    <div
                        className="row"
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            marginBottom: 10,
                        }}
                    >
                        <div
                            className="col-md-6"
                            style={{ display: "flex", alignItems: "center" }}
                        >
                            <h3 style={{ fontSize: 15, fontWeight: "lighter" }}>
                                Fac. Sum Insured
                    </h3>
                        </div>
                        <div
                            className="col-md-6"
                            style={{ display: "flex", alignItems: "center" }}
                        >
                            <h3 style={{ fontSize: 15, fontWeight: "lighter" }}>
                                {data?.findSingleOffer?.offer_detail.currency}{" "}
                                {data?.findSingleOffer?.fac_sum_insured.toLocaleString(
                                    undefined,
                                    { maximumFractionDigits: 2 }
                                )}
                            </h3>
                        </div>
                    </div>
                    <div
                        className="row"
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            marginBottom: 10,
                        }}
                    >
                        <div
                            className="col-md-6"
                            style={{ display: "flex", alignItems: "center" }}
                        >
                            <h3 style={{ fontSize: 15, fontWeight: "lighter" }}>
                                Fac. Premium
                    </h3>
                        </div>
                        <div
                            className="col-md-6"
                            style={{ display: "flex", alignItems: "center" }}
                        >
                            <h3 style={{ fontSize: 15, fontWeight: "lighter" }}>
                                {data?.findSingleOffer?.offer_detail.currency}{" "}
                                {data?.findSingleOffer?.fac_premium.toLocaleString(
                                    undefined,
                                    { maximumFractionDigits: 2 }
                                )}
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default TreatyDetails
