import React, { useState } from 'react'
import Chart from 'react-apexcharts'

function GraphOverview() {
    const [currency, setCurrency] = useState("GHC");

    const options = {
        chart: { height: 300, type: "bar", toolbar: { show: !1 } },
        plotOptions: {
            bar: { horizontal: !1, columnWidth: "14%", endingShape: "rounded" },
        },
        dataLabels: { enabled: !1 },
        stroke: { show: !0, width: 2, colors: ["transparent"] },
        series: [
            {
                name: "Revenue",
                data: [42, 85, 101, 56, 37, 105, 38, 58, 92, 82, 72, 32],
            },
        ],
        xaxis: {
            categories: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
            ],
        },
        yaxis: { title: { text: `${currency} (thousands)` } },
        fill: { opacity: 1 },
        colors: ["#556ee6"],
    }

    const options1 = {
        series: [44, 55, 13, 33],
        labels: ['Apple', 'Mango', 'Orange', 'Watermelon']
    }

    return (
        <div className="container-fluid">
            <div className="card">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="row">
                                <div className="col-md-6">
                                    <h4 className="card-title mb-4">Total Claims</h4>
                                </div>
                                <div className="col-md-6">
                                    <div className="row">
                                        <div className="col-md-2">
                                            <label htmlFor="">Filter</label>
                                        </div>
                                        <div className="col-md-10">
                                            <select name="" className="form-control" onChange={(e) => setCurrency(e.target.value)} id="">
                                                <option value="GHC">GHC</option>
                                                <option value="USD">USD</option>
                                                <option value="GBP">GBP</option>
                                                <option value="EUR">EUR</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="revenue-chart" className="apex-charts">
                                <Chart height={300} options={options} series={options.series} type="bar" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <h4 className="card-title mb-4">Top 5 companies</h4>
                            <div id="revenue-chart" className="apex-charts">
                                <Chart height={300} type="donut" options={options1} series={options1.series} />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default GraphOverview
