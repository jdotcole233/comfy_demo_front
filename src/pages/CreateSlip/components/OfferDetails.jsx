import React from 'react'

const showDate = (offer) => {
    const from = new Date(offer?.offer_detail?.period_of_insurance_from)
    const to = new Date(offer?.offer_detail?.period_of_insurance_to)
    return `${from.getDate()}/${from.getMonth() + 1}/${from.getFullYear()}
    ${" - "}
    ${to.getDate()}/${to.getMonth() + 1}/${to.getFullYear()}`
}

const OfferDetails = ({ data }) => {
    return (
        <div className="col-xl-4">
            <div className="card">
                <div className="card-header ">
                    <h4 className="card-title">Offer Overview</h4>
                </div>
                <div className="card-body">

                    <OfferDeatilsRow label="Class of Business" value={data?.findSingleOffer?.classofbusiness.business_name} />


                    {["Motor Comprehensive", "Motor Comprehensive Fleet"].includes(data?.findSingleOffer?.classofbusiness.business_name)
                        ?
                        <OfferDeatilsRow label="Vehicle Reg No."
                            value={JSON.parse(
                                data?.findSingleOffer?.offer_detail.offer_details
                            ).find((el) => el.keydetail === "Vehicle Reg No." || el.keydetail === "Vehicle Reg No")
                                ?.value} />
                        : null
                    }






                    <OfferDeatilsRow label="Policy No." value={data?.findSingleOffer?.offer_detail.policy_number} />
                    <OfferDeatilsRow label="Reinsured" value={data?.findSingleOffer?.insurer.insurer_company_name} />
                    <OfferDeatilsRow label="Insured" value={data?.findSingleOffer?.offer_detail.insured_by} />

                    <OfferDeatilsRow label="Period Of Insurance" value={showDate(data?.findSingleOffer)} />
                    <OfferDeatilsRow label="Rate" value={`${data?.findSingleOffer?.rate}%`} />

                    <OfferDeatilsRow label="Comission"
                        value={`${data?.findSingleOffer?.offer_detail.currency} 
                                ${data?.findSingleOffer?.commission_amount.toLocaleString(
                            undefined,
                            { maximumFractionDigits: 2 }
                        )}`} />


                    <OfferDeatilsRow label="Fac. Offer" value={`${data?.findSingleOffer?.facultative_offer}%`} />
                    <OfferDeatilsRow label="Brokerage" value={`${data?.findSingleOffer?.brokerage}%`} />
                    <OfferDeatilsRow label="Premium"
                        value={`${data?.findSingleOffer?.offer_detail.currency} 
                                ${data?.findSingleOffer?.premium.toLocaleString(
                            undefined,
                            { maximumFractionDigits: 2 }
                        )}`} />

                    <OfferDeatilsRow label="Sum Insured"
                        value={`${data?.findSingleOffer?.offer_detail.currency} 
                                ${data?.findSingleOffer?.sum_insured.toLocaleString(
                            undefined,
                            { maximumFractionDigits: 2 }
                        )}`} />

                    <OfferDeatilsRow label="Fac. Sum Insured"
                        value={`${data?.findSingleOffer?.offer_detail.currency} 
                                ${data?.findSingleOffer?.fac_sum_insured.toLocaleString(
                            undefined,
                            { maximumFractionDigits: 2 }
                        )}`} />
                    <OfferDeatilsRow
                        label="Fac. Premium"
                        value={`${data?.findSingleOffer?.offer_detail.currency} 
                                ${data?.findSingleOffer?.fac_premium.toLocaleString(
                            undefined,
                            { maximumFractionDigits: 2 }
                        )}`} />
                </div>
            </div>
        </div>

    )
}

export default OfferDetails


const OfferDeatilsRow = ({ label, value }) => (
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
            <h3 style={{ fontSize: 15, fontWeight: "bold" }}>
                {label}
            </h3>
        </div>
        <div
            className="col-md-6"
            style={{ display: "flex", alignItems: "center" }}
        >
            <h3 style={{ fontSize: 15, fontWeight: "bolder" }}>
                {value}
            </h3>
        </div>
    </div>
)