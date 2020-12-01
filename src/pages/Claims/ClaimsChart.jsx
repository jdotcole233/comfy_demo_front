import React, { useState, useEffect } from 'react'
import Chart from 'react-apexcharts'
import { useQuery } from 'react-apollo';
import { CLAIM_OVERVIEW } from '../../graphql/queries';


const currency_key = {
    GHC: "total_cedis",
    USD: "total_dollar",
    EUR: "total_euros",
    GBP: "total_pounds",
}


const generateArray = (data, curr) => {
    const keys = Object.keys(data);
    const newKeys = keys.map(key => parseInt(key)).sort((a, b) => a - b)
    const arr = newKeys.map(key => {
        return data[(key < 10) ? ("0" + key) : key][currency_key[curr]]
    })
    return arr
}

const ClaimsChart = () => {
    const [currency, setCurrency] = useState("GHC")
    const [offerOverview, setOfferOverview] = useState(null);

    const { data: overview } = useQuery(CLAIM_OVERVIEW, { fetchPolicy: "network-only" });

    useEffect(() => {
        if (overview) {
            const data = JSON.parse(overview.claimOverview);

            setOfferOverview(data.claimOverview);
        }
    }, [overview]);

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
                data: offerOverview ? generateArray(offerOverview.total_claims_per_month, currency) : [42, 85, 101, 56, 37, 105, 38, 58, 92, 82, 72, 32],
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
        series: offerOverview ? [...offerOverview.top_five_businesses.slice(0, 5).map(t => parseFloat(t.total_claims))] : [44, 55, 13, 33],
        labels: offerOverview ? [...offerOverview.top_five_businesses.slice(0, 5).map(t => t.insurer_company_name)] : ['Apple', 'Mango', 'Orange', 'Watermelon']
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
                                <Chart height={300} width="100%" type="donut" options={options1} series={options1.series} />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    )
}

export default ClaimsChart
