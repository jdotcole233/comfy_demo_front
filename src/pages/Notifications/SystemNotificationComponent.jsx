import React from 'react'
import { Link } from 'react-router-dom'

const SystemNotificationComponent = ({ data }) => {
    const [offer, setOffer] = React.useState(null)
    const [paymentDetails, setpaymentDetails] = React.useState(null)

    React.useEffect(() => {
        if (data) {
            const __offer = atob(JSON.parse(data.system_notification.notification_content).data);
            console.log(JSON.parse(__offer))
            const _offer = JSON.parse(__offer);
            setOffer(_offer)
            setpaymentDetails(_offer.payment_details ? JSON.parse(JSON.parse(__offer).payment_details?.payment_details) : null)
        }
    }, [data])

    return (
        <div className="container-fluid">
            <div className="">
                <div className="row alert alert-warning">
                    <p>{JSON.parse(data.system_notification.notification_content).message}</p>
                </div>
            </div>
            <div className="row">
                <p>Offer: <strong>{offer?.policy_number}</strong> </p>
                <p className="mx-3">Offer status: <span style={{ letterSpacing: 3 }} className={`badge badge-${offer?.offer_status === "OPEN" ? "primary" : offer?.offer_status === "PENDING" ? "warning" : "success"} p-2 w-md`}>{offer?.offer_status}</span> </p>
            </div>
            <div className="row mb-2">
                <table className="table table-borderless">
                    <tbody>
                        <tr>
                            <td>Created By</td>
                            <td>{offer?.employee_name}</td>
                        </tr>
                        <tr>
                            <td>Created On</td>
                            <td>{new Date(offer?.created_at).toDateString()}</td>
                        </tr>
                        <tr>
                            <td>Class of Business</td>
                            <td>{offer?.class_of_business}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="row mb-2">
                <p>Offer Details</p>
                <table className="table table-borderless">
                    <tbody>
                        <tr>
                            <th>Policy #</th>
                            <td>{offer?.policy_number}</td>
                            <th>Insured</th>
                            <td>{offer?.insured_by}</td>
                        </tr>
                        <tr>
                            <th>Period of Insurance</th>
                            <td>{offer?.period_of_insurance}</td>
                            <th>Reinsured</th>
                            <td>{offer?.reinsured}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="row mb-2">
                <p>Offer</p>
                <table className="table table-borderless">
                    <tbody>
                        <tr>
                            <th>Fac. Premium</th>
                            <td>{offer?.currency} {offer?.fac_premium}</td>

                            <th>Brokerage</th>
                            <td>{offer?.brokerage} %</td>
                        </tr>
                        <tr>
                            <th>Fac. Sum Insured</th>
                            <td>{offer?.currency} {offer?.fac_sum_insured}</td>
                            <th>Commission</th>
                            <td>{offer?.commission} %</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* payment details */}

            {paymentDetails && <div className="row mb-2">
                <p>Payment Details</p>
                <table className="table table-borderless">
                    <tbody>
                        <tr>
                            <th>Amount Paid</th>
                            <td>{offer?.currency} {offer?.payment_details?.amount_paid}</td>
                            <th>Payment Date</th>
                            <td>{new Date(offer?.payment_details?.payment_date).toDateString()}</td>
                        </tr>
                        <tr>
                            <th>Payment Comment</th>
                            <td>{offer?.payment_details?.offer_payment_comment}</td>
                            <th>Payment Type</th>
                            <td>{paymentDetails?.payment_type}</td>
                        </tr>
                        <tr>
                            <th>Payment From</th>
                            <td>{paymentDetails?.payment_from?.bank_name}</td>
                            <th>Cheque Number</th>
                            <td>{paymentDetails?.payment_from?.cheque_number}</td>
                        </tr>
                        <tr>
                            <th>Payment to</th>
                            <td>{paymentDetails?.payment_to}</td>
                            {/* <th>Cheque Number</th>
                            <td></td> */}
                        </tr>
                    </tbody>
                </table>
            </div>}

            {offer?.offer_deductions && <div className="row">
                <p>Offer Deductions</p>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Reinsurer</th>
                            <th>Withholding Tax</th>
                            <th>Nic Levy</th>
                            <th>Agreed Brokerage</th>
                            <th>Agreed Commission</th>
                        </tr>
                    </thead>
                    <tbody>
                        {offer?.offer_deductions.map((deduction, key) => (
                            <tr key={key}>
                                <td>{deduction.reinsurer_name}</td>
                                <td>{deduction.deductions.withholding_tax}</td>
                                <td>{deduction.deductions.nic_levy}</td>
                                <td>{deduction.deductions.brokerage}</td>
                                <td>{deduction.deductions.commission}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>}

            <div className="row">
                {["PENDING", "OPEN"].includes(offer?.offer_status) && <Link to={{
                    pathname: "/admin/view-offer",
                    state: { offer_id: offer?.offer_id }
                }} className="btn btn-success btn-square btn-sm w-md">Go to Offer</Link>}
                {offer?.offer_status === "CLOSED" && <Link to="/admin/create-closing" className="btn btn-success btn-square btn-sm w-md">Go to Closing list</Link>}
                {paymentDetails && <Link to={{
                    pathname: "/admin/insurers-details",
                    state: { insurer_id: offer?.insurer_id }
                }} className="btn btn-warning btn-square ml-1 btn-sm w-md">Go to insurer</Link>}
            </div>
        </div>
    )
}

export default SystemNotificationComponent
