/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react'
import { DASHBOARD_PIE_DATA } from '../../../graphql/queries'
import { useQuery } from 'react-apollo'
import { Modal } from 'react-bootstrap';

const Chart = () => {
    const [dateTypes] = useState(["month", "year", "week"])
    const [activeTab, setActiveTab] = useState("year")
    const [variables, setVariables] = useState({
        year: new Date().getFullYear(),
        month: ""
    })
    const [openMoreBusinessesModal, setOpenMoreBusinessesModal] = useState(false);
    const [options, setOptions] = useState({
        series: [],
        labels: []
    })
    const [businessStats, setBusinessStats] = useState([])

    const { data, refetch } = useQuery(DASHBOARD_PIE_DATA, {
        variables,
        fetchPolicy: 'network-only'
    });

    useEffect(() => {
        if (data) {
            // const series = [], labels = []
            // const arr = JSON.parse(data.dashboardByPieChartData);
            // setBusinessStats(arr.total_businesses);;
            // arr.total_businesses.slice(0, 5).map(business => {
            //     series.push(business.total_businesses);
            //     labels.push(business.business_name)
            //     return business;
            // });
            // setOptions({
            //     series,
            //     labels
            // })
        }
    }, [data])


    const handleChooseTimeFrame = type => {
        const date = new Date();
        const value = type === "month" ? date.getMonth() + 1 : date.getFullYear();
        if (type === "week") {
            setVariables({
                year: "",
                month: ""
            })
        } else if (type === "month") {
            setVariables({
                year: "",
                month: value
            })
        } else {
            setVariables({
                month: "",
                year: value
            })
        }
        refetch()
        setActiveTab(type)
    }

    return (
        <>
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title mb-4 float-sm-left">Top Businesses</h4>
                    <div className="float-sm-right">
                        <ul className="nav nav-pills">
                            {dateTypes.map((dateType, key) => (
                                <li onClick={() => handleChooseTimeFrame(dateType)} className="nav-item" key={key}>
                                    <a className={`nav-link link-hover ${dateType === activeTab ? "active" : ""}`}>
                                        {dateType.charAt(0).toLocaleUpperCase() + "" + dateType.substring(1, dateType.length)}
                                    </a>
                                </li>
                            ))}
                            {businessStats.length > 5 && <li className="nav-item">
                                <a className={`nav-link link-hover`} onClick={() => setOpenMoreBusinessesModal(!openMoreBusinessesModal)} >
                                    More
                                        </a>
                            </li>}
                        </ul>
                    </div>
                    <div className="clearfix"></div>
                    <div
                        id="stacked-column-chart"
                        className="apex-charts"
                        dir="ltr"
                    >
                        <Chart height="265" type="donut" options={options} series={options.series} />

                    </div>
                </div>
            </div>

            <Modal centered show={openMoreBusinessesModal} onHide={() => setOpenMoreBusinessesModal(!openMoreBusinessesModal)}>
                <Modal.Header closeButton>
                    other Business Stats
                </Modal.Header>
                <Modal.Body>
                    <table className="table table-bordered table-striped">
                        <thead>
                            <th>Business Class</th>
                            <th>Frequency</th>
                        </thead>
                        <tbody>
                            {businessStats.length > 5 && businessStats.slice(5, businessStats.length).map((stats, key) => (
                                <tr key={key}>
                                    <td>{stats.business_name}</td>
                                    <td>{stats.total_businesses}</td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default Chart
