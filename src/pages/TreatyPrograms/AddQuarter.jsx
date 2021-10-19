/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-throw-literal */
import React, { useEffect, useState } from "react";
import { useMutation } from "react-apollo";
import { useForm } from "react-hook-form";
import { ADD_QUARTER, TREATY } from "../../graphql/queries/treaty";
import { noteOptions } from "./columns";
import swal from "sweetalert";
import currencies from "../../assets/currencies.json";
import { CurrencyOption, Drawer, Selector } from "../../components";
import _ from "lodash";

const generateNewOptions = (notes = []) => {
  const existingNotes = notes.reduce((_, curr) => {
    _.push(curr.account_periods);
    return _;
  }, []);
  // console.log(existingNotes)
  const newOptions = noteOptions.filter(
    (note) => !existingNotes.includes(note.value)
  );
  return newOptions;
};

const AddQuarter = ({
  treaty_id,
  remainingPercentage,
  notes = [],
  isProp,
  surpluses = [],
  treaty = {},
}) => {
  const [showModal, setShowModal] = useState(false);
  const [addExchangeRate, setAddExchangeRate] = useState(false);
  const [ex_currency, setExCurrency] = useState(null);
  const [surplusCommissions, setSurplusCommission] = useState([]);
  const [currency, setCurrency] = useState(null)

  const [addTreaty] = useMutation(ADD_QUARTER, {
    refetchQueries: [{ query: TREATY, variables: { treaty_id } }],
  });

  const { handleSubmit, register, errors, reset, setValue, clearError } =
    useForm();

  useEffect(() => {
    if (surpluses && showModal) {
      const __surp = surpluses.map((el) => ({
        surpulus_uuid: el.surpulus_uuid,
        gross_premium: "",
      }));
      setSurplusCommission(__surp);
    }
  }, [surpluses, showModal]);

  const onSubmit = (values) => {
    const exchange_rate = addExchangeRate
      ? JSON.stringify({
        rate: values.ex_rate,
        currency: values.ex_currency,
      })
      : null;
    const data = {
      ..._.omit(values, [
        "ex_rate",
        "ex_currency",
        ...surplusCommissions.map((_, id) => `gross_premium_${id}`),
      ]),
      exchange_rate,
      surpulus_data: surplusCommissions,
    };

    swal({
      closeOnClickOutside: false,
      closeOnEsc: false,
      icon: "warning",
      title: `Are you sure you want to add this quarter?`,
      buttons: [
        "No",
        {
          text: "Yes",
          closeModal: false,
        },
      ],
    }).then((input) => {
      if (!input) throw null;
      addTreaty({
        variables: {
          data,
        },
      })
        .then(({ data: { addQuarterForTreaty } }) => {
          if (!addQuarterForTreaty) {
            swal(
              "Whoops!!",
              "Quarter Could not be added successfully",
              "error"
            );
          } else {
            swal("Hurray!!", "Quarter added successfully", "success");
            reset();
            setShowModal(false);
          }
        })
        .catch((err) => {
          swal("System Error", "Sorry had a glitch to deal with ", "error");
        });
    });
  };

  const handleExCurrencyChange = (value) => {
    setValue("ex_currency", value ? value.value.code : "");
    setExCurrency(value ? value.value.code : "");
    if (value) {
      clearError("ex_currency");
    }
  };


  const handleCurrencyChange = (value) => {
    setValue("currency", value ? value.value.code : "");
    setCurrency(value ? value.value.code : "");
    if (value) {
      clearError("ex_currency");
    }
  };

  const onGrossPremiumChange = (key, _surplus, evt) => {
    const { value } = evt.target;
    const __ = [...surplusCommissions];
    __[key] = {
      ..._surplus,
      gross_premium: value,
    };
    setSurplusCommission(__);
  };

  useEffect(() => {
    if (!showModal) {
      const __surp = surplusCommissions.map((el) => ({
        surpulus_uuid: el.surpulus_uuid,
        gross_premium: "",
      }));
      setSurplusCommission(__surp);
    }
  }, [showModal]);

  return !isProp ? null : (
    <>
      <div className="col-md-6">
        <div className="card mini-stats-wid">
          <div className="card-body">
            <div className="media">
              <div className="mr-3 align-self-center"></div>
              <div className="media-body">
                <p className="text-muted mb-2">File Quarterly Statement</p>
                {/* Disable button with this disabled={!associates.length} */}
                <button
                  disabled={remainingPercentage || notes.length >= 4}
                  onClick={() => setShowModal(!showModal)}
                  className="btn btn-primary btn-sm w-md"
                >
                  Add Quarter
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Drawer
        isvisible={showModal}
        toggle={() => setShowModal(!showModal)}
        width="40%"
      >
        {showModal && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="alert alert-warning">
              <p>
                This session will allow you to create a quarterly statement for{" "}
                <b>{treaty?.treaty_program?.treaty_name}</b> with reference
                number <b>{treaty?.treaty_reference}</b> and period{" "}
                <b>
                  {new Date(
                    treaty?.treaty_deduction?.treaty_period_from
                  ).toDateString()}{" "}
                  to{" "}
                  {new Date(
                    treaty?.treaty_deduction?.treaty_period_to
                  ).toDateString()}
                </b>
              </p>
              <span>
                <b>NOTE:</b>
                <p>
                  Account year is dependent on the year the quarter statement is
                  being filed{" "}
                </p>
              </span>
            </div>
            <div className="row">
              <div className="col-md-12 mb-2">
                <label htmlFor="form-group">Select currency</label>
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
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="">Quarter</label>
                  <select
                    name="account_periods"
                    ref={register({ required: "Select Quater" })}
                    id="account_periods"
                    className="form-control"
                  >
                    <option value="">Select quarter</option>
                    {generateNewOptions(notes).map((note, key) => (
                      <option key={key} value={note.value}>
                        {note.label}
                      </option>
                    ))}
                  </select>
                  <input
                    name="treatiestreaty_id"
                    ref={register({ required: "Required" })}
                    type="hidden"
                    value={treaty_id}
                    placeholder="Gross Premium"
                  />
                  {errors.account_periods && (
                    <p className="text-danger">
                      {errors.account_periods.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="Claim Settled">Claim Settled</label>
                  <input
                    name="claim_settled"
                    ref={register({ required: "Required" })}
                    type="number"
                    step="any"
                    className="form-control"
                    placeholder="Claim Settled"
                  />
                  {errors.claim_settled && (
                    <p className="text-danger">
                      {errors.claim_settled.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="Gross Premium">Account year</label>
                  <input
                    name="account_year"
                    ref={register({ required: "Required" })}
                    type="text"
                    className="form-control"
                    placeholder="Account year"
                  />
                  {errors.account_year && (
                    <p className="text-danger">{errors.account_year.message}</p>
                  )}
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="Gross Premium">Cash loss</label>
                  <input
                    name="cash_loss"
                    ref={register({ required: "Required" })}
                    type="number"
                    className="form-control"
                    step="any"
                    placeholder="Cash loss"
                  />
                  {errors.cash_loss && (
                    <p className="text-danger">{errors.cash_loss.message}</p>
                  )}
                </div>
              </div>
              <div className="col-md-12 mx-3">
                <div className="form-group ml-2">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    onChange={(e) => setAddExchangeRate(e.target.checked)}
                  />
                  <label className="form-check-label" htmlFor="exampleCheck1">
                    Add Exchange rate
                  </label>
                </div>
              </div>
            </div>

            {addExchangeRate && (
              <div className="row ">
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="Type of goods">Exchange Currency</label>
                    <Selector
                      value={
                        ex_currency
                          ? {
                            label: Object.values(currencies).find(
                              (eel) => eel.code === ex_currency
                            )?.name,
                          }
                          : ""
                      }
                      components={{ Option: CurrencyOption }}
                      onChange={handleExCurrencyChange}
                      options={[
                        ...Object.values(currencies).map((currency) => ({
                          label: currency.name,
                          value: currency,
                        })),
                      ]}
                    />
                    <input
                      ref={register({
                        required: addExchangeRate,
                      })}
                      type="hidden"
                      name="ex_currency"
                      placeholder="Currency"
                      className="form-control"
                    />
                    {errors.ex_currency && (
                      <p className="text-danger">
                        {errors.ex_currency.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="Type of goods">Exchange rate </label>
                    <input
                      type="number"
                      min="0"
                      step="any"
                      ref={register({ required: addExchangeRate })}
                      name="ex_rate"
                      className="form-control"
                      placeholder="Exchange rate"
                    />
                    {errors.ex_rate && (
                      <p className="text-danger">{errors.ex_rate.message}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            <div className="row">
              {surplusCommissions.map((surplus, surplusId) => (
                <div
                  className={`col-md-${surplusId + 1 >= surpluses.length && surplusId % 2 === 0
                    ? "12"
                    : "6"
                    }`}
                >
                  <fieldset className="border w-auto p-2 mb-2">
                    <legend className="font-size-13">
                      Surplus {surplusId + 1}
                    </legend>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group">
                          <label htmlFor="Gross Premium">
                            Gross Premium - commission{" "}
                            {surpluses[surplusId]?.commission}%
                          </label>
                          <input
                            name={`gross_premium_${surplusId}`}
                            type="number"
                            step="any"
                            className="form-control"
                            placeholder="Gross Premium"
                            ref={register({ required: "Required" })}
                            value={surplus.gross_premium}
                            onChange={(e) =>
                              onGrossPremiumChange(surplusId, surplus, e)
                            }
                          />
                          {errors[`gross_premium_${surplusId}`] && (
                            <p className="text-danger">
                              {errors[`gross_premium_${surplusId}`].message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </fieldset>
                </div>
              ))}
            </div>

            <div className="row"></div>

            <div className="form-group">
              <button className="btn btn-primary btn-block" type="submit">
                Add Quarter
              </button>
            </div>
          </form>
        )}
      </Drawer>
    </>
  );
};

export default AddQuarter;
