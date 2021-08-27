/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { useMemo, useState } from 'react'
import Chart from 'react-apexcharts';
import _ from 'lodash'

const TreatyOverview = ({ participants = [], treaty = {} }) => {
    const [currentIndex, setCurrentIndex] = useState(1)
    const data = _.mapValues(_.groupBy(participants, 'layer_number'), list => list.map(item => _.omit(item, 'layer_number')))
    const actualLayers = Object.keys(data);


    const pieChartList = useMemo(() => {
        const series = [];
        const labels = [];
        if (treaty?.treaty_program?.treaty_type === "NONPROPORTIONAL") {
            if (data[`${currentIndex}`] && data[`${currentIndex}`].length > 0) {
                data[`${currentIndex}`].map((reinsurer) => {
                    series.push(reinsurer.treaty_participation_percentage || 0);
                    labels.push(reinsurer.reinsurer.re_company_name);
                    return null
                });
            }
        } else {
            if (participants.length > 0) {
                participants.map((reinsurer) => {
                    series.push(reinsurer.treaty_participation_percentage || 0);
                    labels.push(reinsurer.reinsurer.re_company_name);
                    return null
                });
            }
        }


        return { series, labels }
    }, [currentIndex, data, participants, treaty?.treaty_program?.treaty_type])


    const options = {
        series: [44, 55, 13, 33],
        labels: ['Reinsurer 1', 'Reinsurer 2', 'Reinsurer 3', 'Reinsurer 4']
    }

    const changeLayer = (key) => {
        setCurrentIndex(key)
    }

    return (
        <div className="card">
            <div className="card-body">
                <h4 className="card-title mb-3">Overview</h4>
                {treaty?.treaty_program?.treaty_type === "NONPROPORTIONAL" && <ul className="nav nav-tabs nav-tabs-custom mb-3">
                    {actualLayers.map((_, key) => (
                        <li key={key} onClick={() => changeLayer(parseInt(_))} className="nav-item btn">
                            <div className={`nav-link ${parseInt(_) === currentIndex ? "active" : ""}`} href="#">{`Layer ${_}`}</div>
                        </li>
                    ))}
                </ul>}
                <div>
                    <div id="overview-chart" className="apex-charts" dir="ltr">
                        {pieChartList ?
                            <Chart height="250" options={pieChartList} series={pieChartList.series} type="pie" />
                            : <Chart height="250" options={options} series={options.series} type="pie" />
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TreatyOverview
