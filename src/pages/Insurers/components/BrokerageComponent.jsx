import React, { useState } from "react";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";

const currency_key = {
  GHC: "total_cedis",
  USD: "total_dollar",
  EUR: "total_euros",
  GBP: "total_pounds",
};

const generateArray = (data_string, curr) => {
  const data = JSON.parse(data_string);
  const keys = Object.keys(data);
  const newKeys = keys.map((key) => parseInt(key)).sort((a, b) => a - b);
  const arr = newKeys.map((key) => {
    return data[key < 10 ? "0" + key : key][currency_key[curr]];
  });
  return arr;
};

const BrokerageComponent = ({ insurer }) => {
  const [currency, setCurrency] = useState("GHC");
  const type = useSelector((state) => state.insurer.type);

  const data =
    type !== "Treaty"
      ? insurer.insurer.insurer_overview.brokerage_chart
      : insurer.insurer.insurer_overview.treaties_overview.brokerage_chart;

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
        data: insurer
          ? generateArray(data, currency)
          : [42, 85, 101, 56, 37, 105, 38, 58, 92, 82, 72, 32],
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
  };
  return (
    <div className="col-md-12">
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <h4 className="card-title mb-4">Brokerage</h4>
            </div>
            <div className="col-md-6">
              <div className="row">
                <div className="col-md-1">
                  <label htmlFor="">Filter</label>
                </div>
                <div className="col-md-11">
                  <select
                    name=""
                    className="form-control"
                    onChange={(e) => setCurrency(e.target.value)}
                    id=""
                  >
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
            <Chart
              height={300}
              options={options}
              series={options.series}
              type="bar"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrokerageComponent;
