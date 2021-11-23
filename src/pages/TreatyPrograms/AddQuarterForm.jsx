import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useForm } from "react-hook-form";
import {
  ADD_QUARTER,
  TREATY,
  TREATY_ACCOUNTS,
} from "../../graphql/queries/treaty";
import { noteOptions } from "./columns";
import swal from "sweetalert";
import currencies from "../../assets/currencies.json";
import { CurrencyOption, Drawer, Selector } from "../../components";
import _ from "lodash";

const AddQuarterForm = ({
  treaty_id,
  // surpluses = [],
  treaty,
  showModal,
}) => {
  const [addExchangeRate, setAddExchangeRate] = useState(false);
  const [ex_currency, setExCurrency] = useState(null);
  const [surplusCommissions, setSurplusCommission] = useState([]);
  const [surpluses, setSurpluses] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [notes, setNotes] = useState([]);

  const { data, loading, error } = useQuery(TREATY_ACCOUNTS, {
    variables: {
      insurer_id: treaty?.insurer?.insurer_id,
      treaty_program_name:
        treaty?.treaty_program?.treaty_name ?? "Not Specified",
      treaty_period_from: treaty?.treaty_deduction?.treaty_period_from,
      treaty_period_to: treaty?.treaty_deduction?.treaty_period_to,
      type: true,
    },
  });

  const [addTreaty] = useMutation(ADD_QUARTER, {
    refetchQueries: [{ query: TREATY, variables: { treaty_id } }],
  });

  const { handleSubmit, register, errors, reset, setValue, clearError } =
    useForm();

  useEffect(() => {
    if (data && activeIndex) {
      const _surpluses = JSON.parse(
        data?.fetchTreatyAccounts[activeIndex]?.layer_limit ?? "[]"
      );
      const __surp = _surpluses?.map((el) => ({
        surpulus_uuid: el.surpulus_uuid,
        gross_premium: "",
      }));
      setSurplusCommission(__surp);
      setSurpluses(_surpluses);
      setNotes(data?.fetchTreatyAccounts[activeIndex]?.quarters ?? []);
    }
  }, [data, activeIndex]);

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
        ...surplusCommissions.map((_, id) => `cash_loss_${id}`),
        ...surplusCommissions.map((_, id) => `claim_settled_${id}`),
      ]),
      exchange_rate,
      account_periods: noteOptions.find(
        (el) => el.label === values.account_periods
      )?.value,
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
            // setShow(false);
          }
        })
        .catch(() => {
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

  const onGrossPremiumChange = (key, _surplus, evt) => {
    const { value } = evt.target;
    const __ = [...surplusCommissions];
    __[key] = {
      ..._surplus,
      gross_premium: value,
    };
    setSurplusCommission(__);
  };

  const onCashLossChange = (key, _surplus, evt) => {
    const { value } = evt.target;
    const __ = [...surplusCommissions];
    __[key] = {
      ..._surplus,
      cash_loss: value,
    };
    setSurplusCommission(__);
  };

  const onClaimSettledChange = (key, _surplus, evt) => {
    const { value } = evt.target;
    const __ = [...surplusCommissions];
    __[key] = {
      ..._surplus,
      claim_settled: value,
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

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error</div>;
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="alert alert-warning">
          <p>
            This session will allow you to create a quarterly statement for{" "}
            <b>{treaty?.treaty_program?.treaty_name}</b> with reference number{" "}
            <b>{treaty?.treaty_reference}</b> and period{" "}
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
            <select
              className="form-control"
              onChange={(e) => setActiveIndex(e.target.value)}
            >
              <option value="">Select</option>
              {data?.fetchTreatyAccounts?.map((el, idx) => (
                <option key={idx} value={idx}>
                  {el?.currency}
                </option>
              ))}
            </select>
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
                {notes.map((note, key) => (
                  <option key={key} value={note}>
                    {note}
                  </option>
                ))}
              </select>
              <input
                name="treatiestreaty_id"
                ref={register({ required: "Required" })}
                type="hidden"
                value={data?.fetchTreatyAccounts[activeIndex]?.treaty_id}
                placeholder="Gross Premium"
              />
              {errors.account_periods && (
                <p className="text-danger">{errors.account_periods.message}</p>
              )}
            </div>
          </div>
          {/* <div className="col-md-6">
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
              </div> */}
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
          {/* <div className="col-md-6">
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
              </div> */}
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
                  <p className="text-danger">{errors.ex_currency.message}</p>
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
              className={`col-md-${
                surplusId + 1 >= surpluses.length && surplusId % 2 === 0
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
                        // value={surplus.gross_premium}
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
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="Gross Premium">Cash loss</label>
                      <input
                        name={`cash_loss_${surplusId}`}
                        ref={register({ required: "Required" })}
                        type="number"
                        className="form-control"
                        step="any"
                        placeholder="Cash loss"
                        onChange={(e) =>
                          onCashLossChange(surplusId, surplus, e)
                        }
                      />
                      {errors[`cash_loss_${surplusId}`] && (
                        <p className="text-danger">
                          {errors[`cash_loss_${surplusId}`].message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="Claim Settled">Claim Settled</label>
                      <input
                        name={`claim_settled_${surplusId}`}
                        ref={register({ required: "Required" })}
                        type="number"
                        step="any"
                        className="form-control"
                        placeholder="Claim Settled"
                        onChange={(e) =>
                          onClaimSettledChange(surplusId, surplus, e)
                        }
                      />
                      {errors[`claim_settled_${surplusId}`] && (
                        <p className="text-danger">
                          {errors[`claim_settled_${surplusId}`].message}
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
    </>
  );
};

export default AddQuarterForm;
