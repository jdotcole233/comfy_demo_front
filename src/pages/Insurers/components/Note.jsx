/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-throw-literal */
import React, { useState, useEffect } from "react";
import { ImFilePdf } from "react-icons/im";
import { CurrencyOption, Drawer, Selector } from "../../../components";
import { noteOptions } from "../../TreatyPrograms/columns";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import { useMutation } from "@apollo/client";
import {
  TREATY,
  UPDATE_QUARTER,
  REMOVE_QUARTER,
} from "../../../graphql/queries/treaty";
import { useInsurer } from "../../../context/InsurerProvider";

import _ from "lodash";
import currencies from "../../../assets/currencies.json";
import SurplusesDebitNote from "../../TreatyPrograms/Previews/SurplusesDebitNote";

export const getFlexibleName = (accountName) => {
  const name = noteOptions.find((note) => note.value === accountName)?.label;
  return name;
};

const generateNewOptions = (notes = []) => {
  const existingNotes = notes.reduce((_, curr) => {
    _.push(curr.account_periods);
    return _;
  }, []);
  const newOptions = noteOptions.filter(
    (note) => !existingNotes.includes(note.value)
  );
  return newOptions;
};

const Note = ({ note, notes, treaty_id, treaty, surpluses }) => {
  const { selectedNotes, chooseNote } = useInsurer();
  const [addExchangeRate, setAddExchangeRate] = useState(false);
  const [ex_currency, setExCurrency] = useState(null);
  const [showDrawer, setShowDrawer] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [surplusCommissions, setSurplusCommissions] = useState([]);
  const { handleSubmit, register, errors, reset, setValue, clearError } =
    useForm();

  useEffect(() => {
    if (note) {
      setSurplusCommissions(note?.treaty_account_deduction);
    }
  }, [note]);

  useEffect(() => {
    if (note && note.exchange_rate) {
      setAddExchangeRate(true);
      setExCurrency(JSON.parse(note.exchange_rate)?.currency);
      setValue("ex_rate", JSON.parse(note.exchange_rate)?.rate);
      setValue("ex_currency", JSON.parse(note.exchange_rate)?.currency);
    }
  }, [note]);

  const [updateTreaty] = useMutation(UPDATE_QUARTER, {
    refetchQueries: [{ query: TREATY, variables: { treaty_id } }],
  });

  const [removeTreaty] = useMutation(REMOVE_QUARTER, {
    refetchQueries: [{ query: TREATY, variables: { treaty_id } }],
  });

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
      surpulus_data: surplusCommissions.map((el) => ({
        // treaty_account_surpulus_id: el.treaty_account_surpulus_id,
        surpulus_uuid: el.surpulus_uuid,
        gross_premium: el.gross_premium,
        account_deduction_id: el.treaty_account_deduction_id,
        cash_loss: el.cash_loss,
        claim_settled: el.claim_settled,
      })),
    };
    swal({
      closeOnClickOutside: false,
      closeOnEsc: false,
      icon: "warning",
      title: `Are you sure you want to update this quarter?`,
      buttons: [
        "No",
        {
          text: "Yes",
          closeModal: false,
        },
      ],
    }).then((input) => {
      if (!input) throw null;
      updateTreaty({
        variables: {
          data,
          id: note?.treaty_account_id,
        },
      })
        .then(({ data: { updateQuarterForTreaty } }) => {
          if (!updateQuarterForTreaty) {
            swal(
              "Whoops!!",
              "Quarter Could not be updated successfully",
              "error"
            );
          } else {
            swal("Hurray!!", "Quarter updated successfully", "success");
            reset();
            setShowEdit(false);
          }
        })
        .catch((err) => {
          swal("System Error", "Sorry had a glitch to deal with ", "error");
        });
    });
  };

  const onGrossPremiumChange = (key, _surplus, evt) => {
    const { value } = evt.target;
    const __ = [...surplusCommissions];
    __[key] = {
      ..._surplus,
      gross_premium: value,
    };
    setSurplusCommissions(__);
  };

  const onCashLossChange = (key, _surplus, evt) => {
    const { value } = evt.target;
    const __ = [...surplusCommissions];
    __[key] = {
      ..._surplus,
      cash_loss: value,
    };
    setSurplusCommissions(__);
  };

  const onClaimSettledChange = (key, _surplus, evt) => {
    const { value } = evt.target;
    const __ = [...surplusCommissions];
    __[key] = {
      ..._surplus,
      claim_settled: value,
    };
    setSurplusCommissions(__);
  };

  const deleteNote = () => {
    swal({
      closeOnClickOutside: false,
      closeOnEsc: false,
      icon: "warning",
      text:
        note?.treaty_p_payments?.length > 0
          ? `${note?.treaty_p_payments?.length} payment(s) have been detected on this Quarter, Deleting it will remove all said payments. Do you want to proceed ?`
          : ``,
      title: `Are you sure you want to delete this quarter?`,
      buttons: [
        "No",
        {
          text: "Yes",
          closeModal: false,
        },
      ],
    }).then((input) => {
      if (!input) throw null;
      removeTreaty({
        variables: {
          // data: values,
          treaty_account_id: note?.treaty_account_id,
        },
      })
        .then(({ data: { removeQuarterForTreaty } }) => {
          if (!removeQuarterForTreaty) {
            swal(
              "Whoops!!",
              "Quarter Could not be deleted successfully",
              "error"
            );
          } else {
            swal("Hurray!!", "Quarter deleted successfully", "success");
            reset();
            setShowEdit(false);
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

  return (
    <>
      <div className="col-md-3 ">
        {/* {JSON.stringify(note)} */}
        <div className="card">
          <div
            style={{
              height: 20,
              width: 20,
              borderRadius: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={() => chooseNote(note?.treaty_account_id)}
            className={`p-2 btn ${_.includes(selectedNotes, note?.treaty_account_id)
              ? "bg-primary"
              : "bg-white"
              } position-absolute ml-2 mt-2`}
          >
            {/* <IoIosCheckmark color="#fff" size={20} /> */}
          </div>

          <div className="card-body d-flex flex-column justify-content-between align-items-center">
            <ImFilePdf size={30} />
            <p className="text-center">
              {getFlexibleName(note.account_periods)} Debit Note
            </p>
          </div>
          <div className="mx-3">
            <div className="row ">
              <div className="col-md-4 d-flex justify-content-center align-items-center">
                <button
                  onClick={() => setShowDrawer((prev) => !prev)}
                  className="btn btn-link"
                  href="#"
                >
                  Preview
                </button>
              </div>
              <div className="col-md-4 d-flex justify-content-center align-items-center">
                <button
                  onClick={() => setShowEdit((prev) => !prev)}
                  className="btn btn-link"
                  href="#"
                >
                  Edit
                </button>
              </div>

              <div className="col-md-4 d-flex justify-content-center align-items-center">
                <button onClick={deleteNote} className="btn btn-link" href="#">
                  <i className="bx bx-trash text-danger"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Drawer for Preview */}
      <Drawer
        isvisible={showDrawer}
        toggle={() => setShowDrawer((prev) => !prev)}
        width="50%"
      >
        <SurplusesDebitNote treaty={treaty} note={note} surpluses={surpluses} />
      </Drawer>

      {/* Sending Note */}

      <Drawer
        isvisible={showEdit}
        toggle={() => setShowEdit((prev) => !prev)}
        width="40%"
      >
        {showEdit && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="alert alert-warning">
              <p>
                This session will allow you to update quarterly statement for{" "}
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
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="">Quarter</label>
                  <select
                    name="account_periods"
                    ref={register({ required: "Select Quater" })}
                    id="account_periods"
                    defaultValue={note?.account_periods}
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
                    // value={treaty?.treaty_id}
                    value={treaty_id}
                    placeholder="Gross Premium"
                  />
                  {errors.account_periods && (
                    <p className="text-danger">
                      {errors.account_periods.message}
                    </p>
                  )}
                </div>
                <input
                  name="treatiestreaty_id"
                  ref={register({ required: "treatiestreaty_id Required" })}
                  type="hidden"
                  value={treaty_id}
                  placeholder="Gross Premium"
                />
                {/* <input
                name="account_deduction_id"
                ref={register({ required: "account_deduction_id Required" })}
                type="hidden"
                placeholder="Gross Premium"
              /> */}
                <input
                  name="participant_deduction_id"
                  ref={register({ required: false })}
                  type="hidden"
                  placeholder="Gross Premium"
                  value={0}
                />
                {errors.treatiestreaty_id && (
                  <p className="text-danger">
                    {errors.treatiestreaty_id.message}
                  </p>
                )}
                {/* {errors.account_deduction_id && (
                <p className="text-danger">
                {errors.account_deduction_id.message}
                </p>
              )} */}
                {errors.participant_deduction_id && (
                  <p className="text-danger">
                    {errors.participant_deduction_id.message}
                  </p>
                )}
                {errors.account_periods && (
                  <p className="text-danger">
                    {errors.account_periods.message}
                  </p>
                )}
              </div>
              {/* <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="Claim Settled">Claim Settled</label>
                  
                  <input
                    name="claim_settled"
                    ref={register({ required: "Required" })}
                    type="number"
                    defaultValue={note?.claim_settled}
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
                    defaultValue={note?.account_year}
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
                    defaultValue={note?.cash_loss}
                    className="form-control"
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
              <div className="row">
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
                        required: addExchangeRate ? "Required" : false,
                      })}
                      type="hidden"
                      name="ex_currency"
                      defaultValue={JSON.parse(note.exchange_rate)?.currency}
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
                      defaultValue={JSON.parse(note.exchange_rate)?.rate}
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
                      <div className="col-md-12">
                        <div className="form-group">
                          <label htmlFor="Gross Premium">Cash loss</label>
                          <input
                            name={`cash_loss_${surplusId}`}
                            ref={register({ required: "Required" })}
                            value={surplus.cash_loss}
                            type="number"
                            className="form-control"
                            step="any"
                            placeholder="Cash loss"
                            onChange={(e) =>
                              onCashLossChange(surplusId, surplus, e)
                            }
                          />
                          {errors[`cash_loss_${surplusId}`] && (
                            <p className="text-danger">{errors[`cash_loss_${surplusId}`].message}</p>
                          )}
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <label htmlFor="Claim Settled">Claim Settled</label>
                          <input
                            name={`claim_settled_${surplusId}`}
                            ref={register({ required: "Required" })}
                            value={surplus.claim_settled}
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

            <div className="form-group">
              <input
                className="form-control btn btn-primary"
                type="submit"
                value={`Update quarter`}
              />
            </div>
          </form>
        )}
      </Drawer>
    </>
  );
};

export default Note;
