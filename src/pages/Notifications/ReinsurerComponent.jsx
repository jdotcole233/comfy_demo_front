import React from 'react'
import { Link } from 'react-router-dom'


const ReinsurerComponent = ({ data }) => {
    const [insurer, setInsurer] = React.useState({})

    React.useEffect(() => {
        if (data) {
            console.log(JSON.parse(atob(JSON.parse(data.system_notification.notification_content).data)))
            setInsurer(JSON.parse(atob(JSON.parse(data.system_notification.notification_content).data)))
        }
    }, [data])
    if (insurer.hasOwnProperty("rep_email")) {
        return (
            <div className="container-fluid">
                <div className="alert row alert-warning">
                    {JSON.parse(data.system_notification.notification_content).message}
                </div>
                <div className="container">
                    <table className="table-borderless table">
                        <tbody>
                            <tr>
                                <th>Associate Name</th>
                                <td>{insurer?.rep_first_name} {insurer?.rep_last_name}</td>
                                <th>Associate Position</th>
                                <td>{insurer?.position}</td>
                            </tr>
                            <tr>
                                <th>Associate Email</th>
                                <td>{insurer?.rep_email}</td>
                                <th>Phone</th>
                                <td>{insurer?.rep_primary_phonenumber} , {insurer?.rep_secondary_phonenumber}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="container">
                    <Link to={{
                        pathname: "/admin/insurers-details",
                        state: { insurer_id: insurer?.insurer_id }
                    }} className="btn btn-sm w-md btn-success">Go to Reinsurer</Link>
                </div>
            </div>
        )
    } else if (insurer.hasOwnProperty("re_company_email")) {
        return (
            <div className="container-fluid">
                <div className="alert row alert-warning">
                    {JSON.parse(data.system_notification.notification_content).message}
                </div>
                <div className="h-1/3">
                    <div className="avatar-lg mx-auto mb-4">
                        <span className="avatar-title rounded-circle p-auto bg-soft-primary text-primary font-size-16">
                            {insurer?.re_abbrv}
                        </span>
                    </div>
                </div>
                <div className="container">
                    <table className="table-borderless table">
                        <tbody>
                            <tr>
                                <th>Company Name</th>
                                <td>{insurer?.re_company_name}</td>
                                <th>Company Website</th>
                                <td>{insurer?.re_company_website}</td>
                            </tr>
                            <tr>
                                <th>Company Email</th>
                                <td>{insurer?.re_company_email}</td>
                                <th>Address</th>
                                <td>{insurer?.address?.suburb} - {insurer?.address?.region}, {insurer?.address?.country}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="container">
                    <Link to={{
                        pathname: "/admin/re-insurers-detail",
                        state: { data: { reinsurer_id: insurer?.reinsurer_id } }
                    }} className="btn btn-sm w-md btn-success">Go to Reinsurer</Link>
                </div>
            </div>
        )
    } else {
        return (
            <div className="container-fluid">
                <div className="alert row alert-warning">
                    {JSON.parse(data.system_notification.notification_content).message}
                </div>
            </div>
        )
    }
}

export default ReinsurerComponent
