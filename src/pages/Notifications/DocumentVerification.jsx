import React from 'react'

const DocumentVerification = ({ data }) => {
    return (
        <div>
            <div className="row alert alert-warning">
                {JSON.parse(data?.system_notification?.notification_content)?.message}
            </div>
        </div>
    )
}

export default DocumentVerification
