/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import moment from 'moment'
import { useHistory } from 'react-router-dom'

const NotificationMiniCard = ({ notification }) => {
    const history = useHistory()
    const handleClickedNotification = () => {
        history.push({ pathname: "/admin/notifications", state: { notification } })
    }
    return (
        <div onClick={handleClickedNotification} className="text-reset notification-item">
            <div className="media">
                <div className="avatar-xs mr-3">
                    <span className="avatar-title bg-white  font-size-16">
                        <i className={`text-success bx bx-${notification?.system_notification?.notification_type?.includes("SYSTEM") ? "cog" : "bell"}`}></i>
                    </span>
                </div>
                <div className="media-body">
                    <h6 className="mt-0 mb-1 truncate">{JSON.parse(notification?.system_notification?.notification_content || null)?.title}</h6>
                    <div className="font-size-12 text-muted">
                        <p className="mb-1 truncate" style={{ textOverflow: "elipsis" }}>
                            {JSON.parse(notification?.system_notification?.notification_content || null)?.message}
                        </p>
                        <p className="mb-0">
                            <i className="mdi mdi-clock-outline"></i> {" " + moment(notification?.system_notification?.created_at).fromNow()}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotificationMiniCard
