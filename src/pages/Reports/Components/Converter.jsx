import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import currencies from "../../../assets/currencies.json";
import { Selector, CurrencyOption } from "../../../components";
import { useMutation } from "react-apollo";
import { GENERATE_REPORT } from "../../../graphql/queries/reports";

const Converter = ({ available_cuurencies, formData, onGenerateFinished }) => {
  const [showModla, setShowModla] = useState(false);
  const [currency, setCurrency] = useState("");
  const [convert_from, setConvertFrom] = useState([]);

  const [generate, { loading }] = useMutation(GENERATE_REPORT);

  const handleCurrencyChange = (value) => {
    setCurrency(value ? value.value.code : "");
  };

  useEffect(() => {
    if (available_cuurencies) {
      setConvertFrom((prev) => [
        ...available_cuurencies.map((el) => ({
          currency: el,
          rate: el === currency ? 1 : "",
        })),
      ]);
    }
  }, [available_cuurencies, currency]);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    const newData = convert_from;
    // console.log(newData[+name])
    newData[+name].rate = value;
    setConvertFrom([...newData]);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const data = {
      ...formData,
      convert_to: currency,
      convert_from,
    };
    generate({ variables: { data } })
      .then((res) => {
        setShowModla((c) => !c);
        onGenerateFinished(res);
      })
      .catch((err) => {});
  };

  return (
    <div>
      {available_cuurencies.length ? (
        <button
          onClick={() => setShowModla((c) => !c)}
          type="button"
          className="font-size-16 btn btn-sm waves-effect waves-light w-md btn-warning"
        >
          <i className="bx bx-transfer  mr-2"></i>
          Convert
        </button>
      ) : null}
      <Modal size="lg" show={showModla} onHide={() => setShowModla((c) => !c)}>
        <Modal.Header closeButton>
          <Modal.Title>Currency Converter</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row alert alert-danger">
            All currency values in the brokerage statement will be converted
            based on the specified rate(s).
          </div>
          <form onSubmit={handleSubmit} className="row">
            <div className="col-md-12">
              <div className="form-group">
                <label htmlFor="convert_to">Convert to</label>
                <Selector
                  value={
                    currency
                      ? {
                          label: Object.values(currencies).find(
                            (eel) => eel.code === currency
                          )?.name,
                        }
                      : ""
                  }
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
            {currency &&
              convert_from.map((cf, k) => (
                <div className="row col-md-12 mb-1" key={k}>
                  <div className="col-md-5">
                    <label htmlFor="from">{cf.currency}</label>
                    <input
                      type="text"
                      value={1}
                      className="form-control"
                      placeholder={cf}
                      readOnly
                    />
                  </div>
                  <div className="col-md-1">to</div>
                  <div className="col-md-6">
                    <label htmlFor="">{currency ? currency : "?"}</label>
                    <input
                      type="number"
                      name={k}
                      value={currency === cf.currency ? 1 : cf.rate}
                      onChange={handleChange}
                      className="form-control"
                      placeholder={currency ? currency : "?"}
                      required
                    />
                  </div>
                </div>
              ))}
            <div className="col-md-12 d-flex justify-content-end py-3">
              <button
                disabled={!currency}
                className="btn btn-sm w-md waves-effect waves-light btn-warning"
              >
                {loading && <i className="bx bx-hourglass bx-spin mr-2"></i>}
                Convert
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Converter;
