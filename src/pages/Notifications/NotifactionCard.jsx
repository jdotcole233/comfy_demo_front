import React from 'react'
import moment from 'moment'

const NotifactionCard = ({ notification, onSelect, deleteNotif }) => {
    return (
        <div  className="media my-3 border-1 border p-2" >
            <div className="avatar-xs mr-3">
                <span className="avatar-title bg-primary rounded-circle font-size-16">
                    <i className={`bx bx-${notification.system_notification.notification_type.includes("SYSTEM") ? "cog" : "bell"}`}></i>
                </span>
            </div>
            <div className="media-body">
                <h6 onClick={() => onSelect(notification)} style={{ cursor: "pointer" }} className="truncate mt-0 mb-1">{JSON.parse(notification.system_notification.notification_content).title}</h6>
                <div className="font-size-12 text-muted">
                    <p className="mb-1 truncate">
                        {JSON.parse(notification.system_notification.notification_content).message}
                    </p>
                    <div className="d-flex justify-content-between align-items-center">
                        <p className="mb-0">
                            <i className="mdi mdi-clock-outline"></i>

                            {" " + moment(notification.system_notification.created_at).fromNow()}
                        </p>
                        <button onClick={() => deleteNotif(notification?.employee_notification_id)} className="btn link-hover"><i className="bx bx-trash text-danger"></i></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotifactionCard
