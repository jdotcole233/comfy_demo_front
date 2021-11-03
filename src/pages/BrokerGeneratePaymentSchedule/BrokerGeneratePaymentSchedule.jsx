import { Loader, PageHeader, Selector } from "../../components";
import React from "react";
import currencies from "../../assets/currencies.json";
import { noteOptions } from "../TreatyPrograms/columns";
import { useState } from "react";
import { BASE_URL_LOCAL } from "../../graphql";
import { useParams } from "react-router-dom";
import { useMemo } from "react";
import { useForm } from "react-hook-form";

const installmentTypes = [
  { label: "Installment", value: "Installment" },
  { label: "Quarterly", value: "QUARTERLY" },
];

const BrokerGeneratePaymentSchedule = () => {
  const { id } = useParams();
  const { register, handleSubmit, setValue, errors, clearError } = useForm();
  const [treaty_type, setTreaty_type] = useState(null);
  const [_currencies, setCurrencies] = useState([]);
  const [quarters, setQuarters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [show, setShow] = useState(false);
  const [generate, setGenerate] = useState(false);

  const data = useMemo(
    () =>
      Buffer.from(
        JSON.stringify({
          insurer_id: parseInt(Buffer.from(id, "base64").toString("ascii")),
          currency: _currencies?.map((currency) => currency.value),
          from,
          to,
          account_periods:
            treaty_type?.value === "NONPROPORTIONAL"
              ? null
              : quarters?.map((quarter) => quarter.value),
          installment_type: treaty_type?.value === "NONPROPORTIONAL" ? "" : "",
        })
      ).toString("base64"),
    [show]
  );

  const handleOnLoadStart = () => {
    alert("Start");
    setLoading(true);
  };
  const onLoad = () => {
    setLoading(false);
  };

  const handleGenerate = () => {
    setLoading(true);
    setGenerate((prev) => !prev);
    setShow(true);
  };

  const handleCurrencyChange = (value) => {
    setCurrencies(value);
    if (value) clearError("currencies");
  };

  const handleTreatyTypeChange = (value) => {
    setTreaty_type(value);
    if (value) clearError("treaty_type");
  };

  const handleQurterChange = (value) => {
    setQuarters(value);
    if (value) clearError("quarters");
  };

  const handleInstallmentTypeChange = (value) => {
    setValue("installment_type", value);
    if (value) clearError("installment_type");
  };

  return (
    <div className="w-full">
      {/* <PageHeader name="Generate  schedule" url="/admin/insurers-details/recent/" base="Broker session" /> */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">Generate Premium Transfer Schedule </div>
        </div>
        <form onSubmit={handleSubmit(handleGenerate)} className="card-body">
          <div className="row">
            <div className="col-md-6">
              <label htmlFor="Treaty Program">Treaty Type</label>
              <Selector
                label="Insurers"
                onChange={handleTreatyTypeChange}
                options={[
                  { label: "Proportional", value: "PROPORTIONAL" },
                  { label: "Non-proportional", value: "NONPROPORTIONAL" },
                ]}
              />
              <input
                type="hidden"
                name="treaty_type"
                onChange={(e) => setValue("treaty_type", e.target.value)}
                value={treaty_type?.label}
                ref={register({ required: "Required" })}
              />
              {errors.treaty_type && (
                <p className="text-danger">{errors?.treaty_type?.message}</p>
              )}
            </div>
            <div className="col-md-6">
              <label htmlFor="Treaty Program">Select cuurency</label>
              <Selector
                label="Insurers"
                onChange={handleCurrencyChange}
                isMulti
                options={[
                  ...Object.values(currencies).map((currency) => ({
                    label: currency.name,
                    value: currency.code,
                  })),
                ]}
              />
              <input
                type="hidden"
                name="currencies"
                onChange={(e) => setValue("currencies", e.target.value)}
                value={JSON.stringify(_currencies ? _currencies[0]?.label : "")}
                ref={register({ required: "Required" })}
              />
              {errors.currencies && (
                <p className="text-danger">{errors?.currencies?.message}</p>
              )}
            </div>
            {treaty_type ? (
              <>
                {treaty_type.value === "PROPORTIONAL" ? (
                  <div className="col-md-12 mt-4">
                    <label htmlFor="Treaty Program">Quarters</label>
                    <Selector
                      isMulti
                      value={quarters}
                      onChange={handleQurterChange}
                      options={noteOptions}
                    />
                    <input
                      type="hidden"
                      name="quarters"
                      value={JSON.stringify(quarters ? quarters[0]?.label : "")}
                      ref={register({ required: "Required" })}
                    />
                    {errors.quarters && (
                      <p className="text-danger">{errors?.quarters?.message}</p>
                    )}
                  </div>
                ) : (
                  <div className="col-md-12 mt-4">
                    <label htmlFor="Treaty Program">Installment type</label>
                    <Selector isMulti options={installmentTypes} />
                  </div>
                )}
              </>
            ) : null}
            <div className="col-md-6 mt-4">
              <label htmlFor="Treaty Program">Treaty Period from</label>
              <input
                type="date"
                name="from"
                ref={register({ required: "Required" })}
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="form-control"
              />
              {errors.from && (
                <p className="text-danger">{errors?.from?.message}</p>
              )}
            </div>
            <div className="col-md-6 mt-4">
              <label htmlFor="Treaty Program">Treaty Period to</label>
              <input
                type="date"
                name="to"
                ref={register({ required: "Required" })}
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="form-control"
              />
              {errors.to && (
                <p className="text-danger">{errors?.to?.message}</p>
              )}
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
              <button
                disabled={show}
                type="submit"
                className="btn btn-sm btn-primary"
              >
                Generate Premium Schedule
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="card">
        <div className="card-header d-flex align-itemsp-center justify-content-between">
          <span className="card-title">Preview: Premium Transfer Schedule</span>
          <span
            onClick={() => setShow(false)}
            className="btn btn-square btn-success"
          >
            Generate again
          </span>
        </div>
        <div className="card-body">
          {loading ? <Loader /> : ""}
          {show && (
            <iframe
              src={`${BASE_URL_LOCAL}/treaty_premium_transfer/${data}`}
              onLoadStart={handleOnLoadStart}
              onLoad={onLoad}
              width="100%"
              height={800}
              frameborder="0"
            ></iframe>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrokerGeneratePaymentSchedule;
