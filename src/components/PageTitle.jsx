/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { useHistory } from 'react-router-dom'

function PageTitle({ name, base = "Dashboard" }) {
    const history = useHistory()
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <div className="page-title-box d-flex align-items-center justify-content-between">
                        <h4 className="mb-0 font-size-18">{name}</h4>

                        <div className="page-title-right">
                            <ol className="breadcrumb m-0">
                                <li onClick={() => history.goBack()} className="breadcrumb-item">
                                    <a>{base}</a>
                                </li>
                                <li className="breadcrumb-item active">{name === base ? "Home" : name}</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PageTitle
