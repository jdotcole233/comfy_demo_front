import { Loader, PageHeader, Selector } from "../../components";
import React from "react";
import currencies from "../../assets/currencies.json";
import { noteOptions } from "../TreatyPrograms/columns";
import { useState } from "react";
import { BASE_URL_LOCAL } from "../../graphql";
import { useParams } from "react-router-dom"
import { useMemo } from "react";

const installmentTypes = [
  { label: "Installment", value: "Installment" },
  { label: "Quarterly", value: "QUARTERLY" },
];

const BrokerGeneratePaymentSchedule = () => {
  const { id } = useParams();
  const [treaty_type, setTreaty_type] = useState(null);
  const [_currencies, setCurrencies] = useState([]);
  const [quarters, setQuarters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [show, setShow] = useState(false);
  const [generate, setGenerate] = useState(false);

  const data = useMemo(() => Buffer.from(JSON.stringify({
    insurer_id: parseInt(Buffer.from(id, 'base64').toString('ascii')),
    currency: _currencies.map(currency => currency.value),
    from,
    to,
    account_periods: treaty_type?.value === "NONPROPORTIONAL" ? null : quarters.map(quarter => quarter.value),
    installment_type: treaty_type?.value === "NONPROPORTIONAL" ? "" : ""
  })).toString("base64"), [show]);

  const handleOnLoadStart = () => {
    alert("Start")
    setLoading(true);
  }
  const onLoad = () => {
    setLoading(false)
    // setGenerate(false)
  }


  const handleGenerate = () => {
    setLoading(true);
    setGenerate(prev => !prev)
    setShow(true)
  }

  return (
    <div className="page-content">
      <PageHeader name="Generate  schedule" base="Broker session" />
      <div className="card mt-4">
        <div className="card-header">
          <div className="card-title">Generate  schedule</div>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <label htmlFor="Treaty Program">Treaty Type</label>
              <Selector label="Insurers" onChange={value => setTreaty_type(value)} options={[{ label: "Proportional", value: "PROPORTIONAL" }, { label: "Non-proportional", value: "NONPROPORTIONAL" }]} />
            </div>
            <div className="col-md-6">
              <label htmlFor="Treaty Program">Select cuurency</label>
              <Selector label="Insurers" onChange={(value) => setCurrencies(value ? value : [])} isMulti options={[
                ...Object.values(currencies).map((currency) => ({
                  label: currency.name,
                  value: currency.code,
                })),
              ]} />
            </div>
            {treaty_type ? <>
              {treaty_type.value === "PROPORTIONAL" ? <div className="col-md-12 mt-4">
                <label htmlFor="Treaty Program">Quarters</label>
                <Selector isMulti value={quarters} onChange={values => setQuarters(values ? values : [])} options={noteOptions} />
              </div> :
                <div className="col-md-12 mt-4">
                  <label htmlFor="Treaty Program">Installment type</label>
                  <Selector isMulti options={installmentTypes} />
                </div>}
            </> : null}
            <div className="col-md-6 mt-4">
              <label htmlFor="Treaty Program">Treaty Period from</label>
              <input type="date" value={from} onChange={e => setFrom(e.target.value)} className="form-control" />
            </div>
            <div className="col-md-6 mt-4">
              <label htmlFor="Treaty Program">Treaty Period to</label>
              <input type="date" value={to} onChange={e => setTo(e.target.value)} className="form-control" />
            </div>
          </div>
          {/* {JSON.stringify({
            insurer_id: parseInt(Buffer.from(id, 'base64').toString('ascii')),
            currency: _currencies.map(currency => currency.value),
            from,
            to,
            account_periods: treaty_type?.value === "NONPROPORTIONAL" ? null : quarters.map(quarter => quarter.value),
            installment_type: treaty_type?.value === "NONPROPORTIONAL" ? "" : ""
          }, null, 2)} */}
          <div className="row">
            <div className="col-md-12 mt-4">
              <button disabled={show} onClick={handleGenerate} className="btn btn-sm btn-primary">
                Generate schedule
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header d-flex align-itemsp-center justify-content-between">
          <span className="card-title">Payment Schedule</span>
          <span onClick={() => setShow(false)} className="btn btn-square btn-success">Generate again</span>
        </div>
        <div className="card-body">
          {loading ? <Loader /> : ""}
          {show && <iframe src={`${BASE_URL_LOCAL}/treaty_premium_transfer/${data}`} onLoadStart={handleOnLoadStart} onLoad={onLoad} width="100%" height={800} frameborder="0"></iframe>}
        </div>
      </div>

    </div>
  );
};

export default BrokerGeneratePaymentSchedule;
