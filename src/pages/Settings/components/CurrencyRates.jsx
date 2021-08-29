/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import currencies from "../../../assets/currencies.json";
import { Selector, CurrencyOption } from "../../../components";

const CurrencyRates = () => {
  const [convert_from, setConvert_form] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState(null);

  useEffect(() => {
    if (currencies) {
      setConvert_form((prev) => [
        ...Object.values(currencies).map((el) => ({
          currency: el.code,
          rate: el.code === selectedCurrency ? 1 : "",
        })),
      ]);
    }
  }, [currencies]);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    const newData = convert_from;
    // console.log(newData[+name])
    newData[+name].rate = value;
    setConvert_form([...newData]);
  };

  const handleCurrencyChange = (value) => {
    // setValue("currency", value ? value.value.code : "");
    setSelectedCurrency(value ? value.value.code : "");
  };

  return (
    <div className="">
      <div className=" w-full col-md-12">
        <div className="form-group">
          <Selector
            components={{ Option: CurrencyOption }}
            onChange={handleCurrencyChange}
            options={[
              ...Object.values(currencies).map((currency) => ({
                label: currency.name,
                value: currency,
              })),
            ]}
          />
        </div>
      </div>
      {convert_from.map((cf, k) => (
        <div className="row col-md-12 mb-1" key={k}>
          <div className="col-md-5">
            <label htmlFor="from">{cf.currency}</label>
            <input
              type="text"
              value={1}
              className="form-control"
              placeholder={cf.currency}
              readOnly
            />
          </div>
          <div className="col-md-1">to</div>
          <div className="col-md-6">
            <label htmlFor="">
              {selectedCurrency ? selectedCurrency : "?"}
            </label>
            <input
              type="number"
              name={k}
              value={selectedCurrency === cf.currency ? 1 : cf.rate}
              onChange={handleChange}
              className="form-control"
              placeholder={selectedCurrency ? selectedCurrency : "?"}
              required
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CurrencyRates;
