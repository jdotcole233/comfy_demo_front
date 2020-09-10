import React from 'react'
import { Link } from 'react-router-dom'

const InsurerComponent = ({ data }) => {
    const [insurer, setInsurer] = React.useState({})

    React.useEffect(() => {
        if (data) {
            console.log(JSON.parse(atob(JSON.parse(data.system_notification.notification_content).data)))
            setInsurer(JSON.parse(atob(JSON.parse(data.system_notification.notification_content).data)))
        }
    }, [data])
    if (insurer.hasOwnProperty("assoc_email")) {
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
                                <td>{insurer?.assoc_first_name} {insurer?.assoc_last_name}</td>
                                <th>Associate Position</th>
                                <td>{insurer?.position}</td>
                            </tr>
                            <tr>
                                <th>Associate Email</th>
                                <td>{insurer?.assoc_email}</td>
                                <th>Phone</th>
                                <td>{insurer?.assoc_primary_phonenumber} , {insurer?.assoc_secondary_phonenumber}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="container">
                    <Link to={{
                        pathname: "/admin/insurers-details",
                        state: { insurer_id: insurer?.insurer_id }
                    }} className="btn btn-sm w-md btn-success">Go to Insurer</Link>
                </div>
            </div>
        )
    } else if (insurer.hasOwnProperty("insurer_company_email")) {
        return (
            <div className="container-fluid">
                <div className="alert row alert-warning">
                    {JSON.parse(data.system_notification.notification_content).message}
                </div>
                <div className="h-1/3">
                    <div className="avatar-lg mx-auto mb-4">
                        <span className="avatar-title rounded-circle p-auto bg-soft-primary text-primary font-size-16">
                            {insurer?.insurer_abbrv}
                        </span>
                    </div>
                </div>
                <div className="container">
                    <table className="table-borderless table">
                        <tbody>
                            <tr>
                                <th>Company Name</th>
                                <td>{insurer?.insurer_company_name}</td>
                                <th>Company Website</th>
                                <td>{insurer?.insurer_company_website}</td>
                            </tr>
                            <tr>
                                <th>Company Email</th>
                                <td>{insurer?.insurer_company_email}</td>
                                <th>Address</th>
                                <td>{insurer?.address?.suburb} - {insurer?.address?.region}, {insurer?.address?.country}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="container">
                    <Link to={{
                        pathname: "/admin/insurers-details",
                        state: { insurer_id: insurer?.insurer_id }
                    }} className="btn btn-sm w-md btn-success">Go to Insurer</Link>
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

export default InsurerComponent
