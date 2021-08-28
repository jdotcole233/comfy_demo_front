/* eslint-disable no-throw-literal */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, Fragment } from "react";
import { Alert } from "react-bootstrap";
import styles from "../styles/ViewInsurerOffer.module.css";
import { useForm } from "react-hook-form";
import { useQuery } from "react-apollo";
import { INSURER_TREATY_PROGRAMS } from "../../../graphql/queries/treaty";
import { Selector, CurrencyOption, Input, Loader } from "../../../components";
import currencies from "../../../assets/currencies.json";
import {
  ADD_DEDUCTION_TO_TREATY,
  UPDATE_INSURER_TREATY,
} from "../../../graphql/queries/treaty";
import { useMutation } from "react-apollo";
import swal from "sweetalert";
import { FaPlus, FaMinus } from "react-icons/fa";
import { programTypeOptions } from "../dummy";
import { v4 } from "uuid";
import { INSURER } from "../../../graphql/queries";
import ErrorPage from "../../../components/ErrorPage";
import { createExtendedTreatyDetails } from "./CreateTreatyForm";

const prepTreatyValues = (values, detials, limitLayers, treaty, typeObj) => {
  return {
    treaty: {
      treaty_details: JSON.stringify(detials),
      treaty_extended_details: createExtendedTreatyDetails(
        typeObj.value,
        values
      ),
      currency: values?.currency,
      treaty_associate_deductionstreaty_associate_deduction_id:
        values?.treaty_associate_deductionstreaty_associate_deduction_id,
      insurersinsurer_id: values?.insurersinsurer_id,
      treaty_programstreaty_program_id:
        values?.treaty_programstreaty_program_id,
      layer_limit: JSON.stringify(limitLayers),
    },
    treaty_id: treaty?.treaty_id,
  };
};

const UpdateTreatyForm = ({ insurer, setOpenDrawer, treaty }) => {
  const { register, errors, handleSubmit, reset, setValue } = useForm();
  const _form = useForm();
  const [currency, setCurrency] = useState(null);
  const [deductionCreated, setDeductionCreated] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [createDeduction, setCreateDeduction] = useState(false);
  const [treatyDetials, setTreatyDetials] = useState([]);
  const [selectedProgramType, setSelectedProgramType] = useState(null);
  const [limitLayers, setLimitLayers] = useState([]);
  const [surpluses, setSurpluses] = useState([]);
  const [oldInsurerId, setOldInsurerId] = useState(false);

  const { data, loading, error, refetch } = useQuery(INSURER_TREATY_PROGRAMS, {
    variables: {
      id: insurer?.insurer_id,
    },
    fetchPolicy: "network-only",
  });

  const [addDeduction] = useMutation(ADD_DEDUCTION_TO_TREATY);
  const [createTreaty] = useMutation(UPDATE_INSURER_TREATY, {
    refetchQueries: [
      { query: INSURER, variables: { id: insurer?.insurer_id } },
    ],
  });

  useEffect(() => {
    if (treaty && data) {
      setValue("commission", treaty?.treaty_deduction?.commission);
      setValue("nic_levy", treaty?.treaty_deduction?.nic_levy);
      setValue("treaty_period_to", treaty?.treaty_deduction?.treaty_period_to);
      setValue(
        "treaty_period_from",
        treaty?.treaty_deduction?.treaty_period_from
      );
      setValue("brokerage", treaty?.treaty_deduction?.brokerage);
      setValue("withholding_tax", treaty?.treaty_deduction?.withholding_tax);
      _form.setValue(
        "treaty_programstreaty_program_id",
        treaty?.treaty_program?.treaty_program_id
      );
      _form.setValue("currency", treaty?.currency);
      _form.setValue("treaty_reference", treaty?.treaty_reference);
      setCurrency(treaty?.currency);
      setTreatyDetials(JSON.parse(treaty?.treaty_details));
      setOldInsurerId({
        label: data?.insurerTreatyProgram.find(
          (_treaty) =>
            _treaty.treaty_program_id ===
            treaty?.treaty_program?.treaty_program_id
        )?.treaty_name,
        value: data?.insurerTreatyProgram.find(
          (_treaty) =>
            _treaty.treaty_program_id ===
            treaty?.treaty_program?.treaty_program_id
        ),
      });
      let __ = data?.insurerTreatyProgram.find(
        (_treaty) =>
          _treaty.treaty_program_id ===
          treaty?.treaty_program?.treaty_program_id
      );
      _form.setValue(
        "treaty_associate_deductionstreaty_associate_deduction_id",
        __?.treaty_associate_deductions[0]?.treaty_associate_deduction_id
      );
      setSelectedProgramType({
        label: programTypeOptions.find(
          (option) => option.value === treaty?.treaty_program?.treaty_type
        )?.label,
        value: treaty?.treaty_program?.treaty_type,
      });
      setLimitLayers(JSON.parse(treaty?.layer_limit || "[]"));
      const _surp = JSON.parse(treaty?.layer_limit || "[]");
      _surp.shift();
      setSurpluses(_surp);
    }
  }, [treaty, data]);

  const handleProgramChange = (program) => {
    _form.setValue(
      "treaty_programstreaty_program_id",
      program ? program.value.treaty_program_id : ""
    );
    setSelectedProgram(program ? program : null);
    if (program) {
      _form.clearError("treaty_programstreaty_program_id");
    }
  };

  const handleProgramTypeChange = (program) => {
    _form.setValue("treaty_type", program ? program.value : "");
    setSelectedProgramType(program ? program : null);
    if (program) {
      _form.clearError("treaty_type");
    }

    const layer = {
      uuid: v4(),
      limit: "",
      deductible: "",
      m_and_d_premium: "",
      installment_type: "",
      outgoing_payment_staus: "UNPAID",
    };
    setLimitLayers([layer]);
  };

  const handleCurrencyChange = (value) => {
    _form.setValue("currency", value ? value.value.code : "");
    setCurrency(value ? value.value.code : "");
    if (value) {
      _form.clearError("currency");
    }
  };

  useEffect(() => {
    if (selectedProgram) {
      if (selectedProgram.value.treaty_associate_deductions.length > 0) {
        const _deduction =
          selectedProgram.value?.treaty_associate_deductions[0];
        console.log(_deduction);
        setCreateDeduction(false);
        setValue("commission", _deduction?.commission);
        setValue("nic_levy", _deduction?.nic_levy);
        setValue("brokerage", _deduction?.brokerage);
        setValue("withholding_tax", _deduction?.withholding_tax);
        setValue("treaty_period_from", _deduction?.treaty_period_from);
        setValue("treaty_period_to", _deduction?.treaty_period_to);
        // alert(_deduction?.treaty_associate_deduction_id);
        _form.setValue(
          "treaty_associate_deductionstreaty_associate_deduction_id",
          _deduction?.treaty_associate_deduction_id
        );
      } else {
        setCreateDeduction(true);
        reset();
      }
    }
  }, [selectedProgram]);

  useEffect(() => {
    if (selectedProgram) {
      setTreatyDetials(
        JSON.parse(selectedProgram.value.treaty_details || "[]")
      );
    }
  }, [selectedProgram]);
  const onSubmitDeductionForm = (values) => {
    // alert(JSON.stringify(values))
    swal({
      closeOnClickOutside: false,
      closeOnEsc: false,
      icon: "warning",
      title: `Are you sure you want to add this deduction ?`,
      text: ``,
      buttons: [
        "No",
        {
          text: "Yes",
          closeModal: false,
        },
      ],
    }).then((input) => {
      if (!input) throw null;
      addDeduction({
        variables: {
          deductions: values,
        },
      })
        .then((_) => {
          swal("Hurray!!", "Deduction added successfully", "success");
          setDeductionCreated(true);
          setCreateDeduction(false);
        })
        .catch((err) => {
          swal("Whhoops!!", "Deduction not added successfully", "error");
        });
    });
  };

  const handleDetailsChange = (e, index) => {
    const { value } = e.target;
    const inputs = [...treatyDetials];
    inputs[index]["value"] = value;
    console.log(inputs[index]);
    setTreatyDetials(inputs);
  };

  const onSubmitTreatyForm = (values) => {
    const variables = prepTreatyValues(
      values,
      treatyDetials,
      selectedProgramType?.value === "PROPORTIONAL"
        ? [
            {
              ...JSON.parse(treaty?.layer_limit || "[]").shift(),
              commission: treaty?.treaty_deduction?.commission,
            },
            ...surpluses,
          ]
        : limitLayers,
      treaty,
      selectedProgramType
    );
    swal({
      closeOnClickOutside: false,
      closeOnEsc: false,
      icon: "warning",
      title: `Are you sure you want to update this treaty ?`,
      text: ``,
      buttons: [
        "No",
        {
          text: "Yes",
          closeModal: false,
        },
      ],
    }).then((input) => {
      if (!input) throw null;
      createTreaty({
        variables,
      })
        .then(({ data: { updateTreaty } }) => {
          if (updateTreaty) {
            swal("Hurray!!", "Treaty Updated successfully", "success");
            setOpenDrawer(false);
            setTreatyDetials([]);
            _form.reset();
            reset();
            setSelectedProgram(null);
            setDeductionCreated(false);
            setCreateDeduction(false);
            setCurrency(null);
          } else {
            swal("Whhoops!!", "Treaty not updated successfully", "error");
          }
        })
        .catch((err) => {
          swal("Whhoops!!", "Treaty not updated successfully", "error");
        });
    });
  };

  const addlayer = () => {
    const layer = {
      uuid: v4(),
      limit: "",
      deductible: "",
      m_and_d_premium: "",
      installment_type: "",
      outgoing_payment_staus: "UNPAID",
    };
    setLimitLayers((prev) => [...prev, layer]);
  };

  const removelayer = () => {
    if (limitLayers.length > 1) {
      const _ = [...limitLayers];
      _.pop();
      setLimitLayers(_);
    }
  };

  const removeParticularLayer = (id) => {
    const _ = [...limitLayers];
    _.splice(id, 1);
    setLimitLayers(_);
  };

  const onLimitValueChange = (e, key) => {
    const { value, name } = e.target;
    const _ = [...limitLayers];
    _[key][name] = value;
    setLimitLayers(_);
  };

  const onSurplusValueChange = (e, key) => {
    const { value, name } = e.target;
    const _ = [...surpluses];
    _[key][name] = value;
    setSurpluses(_);
  };

  const removeParticularSurplus = (id) => {
    const _ = [...surpluses];
    _.splice(id, 1);
    setSurpluses(_);
  };

  const removeSurplus = () => {
    if (surpluses.length > 0) {
      const _ = [...surpluses];
      _.pop();
      setSurpluses(_);
    }
  };

  const addSurplus = () => {
    const surplus = {
      surpulus_uuid: v4(),
      commission: "",
      outgoing_payment_staus: "UNPAID",
    };
    setSurpluses((prev) => [...prev, surplus]);
  };

  if (loading) return <Loader />;

  if (error) return <ErrorPage loading={loading} refetch={refetch} />;

  return (
    <form onSubmit={_form.handleSubmit(onSubmitTreatyForm)}>
      <div className={styles.card_header}>
        <h2 className={styles.card_title}>Update Treaty</h2>
        <Alert variant="danger"></Alert>
        <fieldset className="border p-2 mb-2">
          <legend className={styles.details_title}>Insurer Description</legend>
          <table className="table">
            <tbody>
              <tr>
                <td>Name</td>
                <td>{insurer?.insurer_company_name}</td>
              </tr>
            </tbody>
          </table>
        </fieldset>
      </div>

      <div className="row mb-2">
        <div className="col-md-12">
          <label htmlFor="Treaty Program">Treaty Ref#</label>
          <input
            type="text"
            placeholder="Treaty Ref#"
            className="form-control"
            name="treaty_reference"
            ref={_form.register({ required: false })}
          />
          {_form.errors.treaty_reference && (
            <p className="text-danger">
              {_form.errors.treaty_reference.message}
            </p>
          )}
        </div>
      </div>

      <div className="row mb-2">
        <div className="col-md-12">
          <label htmlFor="Treaty Program">Treaty Type</label>
          <Selector
            value={selectedProgramType}
            placeholder="Treaty Type"
            onChange={handleProgramTypeChange}
            options={[
              { label: "Proportional", value: "PROPORTIONAL" },
              { label: "Nonproportional", value: "NONPROPORTIONAL" },
            ]}
          />
          <input
            type="hidden"
            name="treaty_type"
            ref={_form.register({ required: true })}
            value={selectedProgramType?.value}
            defaultValue={selectedProgramType?.value}
          />
          {_form.errors.treaty_type && (
            <p className="text-danger">{_form.errors.treaty_type.message}</p>
          )}
        </div>
      </div>

      <div className="row mb-2">
        <div className="col-md-12">
          <label htmlFor="Treaty Program">Treaty Program</label>
          <Selector
            value={selectedProgram ? selectedProgram : oldInsurerId}
            placeholder="Treaty Program"
            onChange={handleProgramChange}
            options={
              data
                ? data.insurerTreatyProgram.map((insurer) => ({
                    label: insurer.treaty_name,
                    value: insurer,
                  }))
                : []
            }
          />
          <input
            type="hidden"
            name="insurersinsurer_id"
            ref={_form.register({ required: true })}
            value={insurer?.insurer_id}
          />
          <input
            type="hidden"
            name="treaty_programstreaty_program_id"
            ref={_form.register({ required: "Treaty Program required" })}
            value={
              selectedProgram?.value?.treaty_program_id ||
              oldInsurerId?.value?.treaty_program_id
            }
          />
          <input
            type="hidden"
            name="treaty_associate_deductionstreaty_associate_deduction_id"
            ref={_form.register({ required: "Treaty Program required" })}
          />
          {_form.errors.treaty_programstreaty_program_id && (
            <p className="text-danger">
              {_form.errors.treaty_programstreaty_program_id.message}
            </p>
          )}
        </div>
      </div>
      {createDeduction && (
        <Alert variant="danger">
          <p>
            {" "}
            Sorry, no deductions set for {selectedProgram?.label}. Create
            Deductions in order to proceed with treaty.{" "}
          </p>
        </Alert>
      )}
      <fieldset className="border p-2 mb-2">
        <legend className={styles.details_title}>Deductions</legend>
        <form onSubmit={handleSubmit(onSubmitDeductionForm)} className="row">
          {selectedProgramType &&
            selectedProgramType?.value === "PROPORTIONAL" && (
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="Type of goods">Commision (%)</label>
                  <input
                    disabled={!createDeduction}
                    type="number"
                    step="any"
                    defaultValue={treaty?.treaty_deduction?.commission}
                    ref={register({ required: "Provide commission" })}
                    name="commission"
                    className="form-control"
                    placeholder="Commision"
                  />
                  {errors.commission && (
                    <p className="text-danger">{errors.commission.message}</p>
                  )}
                </div>
              </div>
            )}
          <div
            className={`col-md-${
              selectedProgramType &&
              selectedProgramType?.value === "PROPORTIONAL"
                ? "6"
                : "12"
            }`}
          >
            <div className="form-group">
              <label htmlFor="Type of goods">Brokerage (%)</label>
              <input
                disabled={!createDeduction}
                type="number"
                step="any"
                ref={register({ required: "Provide brokerage" })}
                name="brokerage"
                className="form-control"
                placeholder="Brokerage"
              />
              {errors.brokerage && (
                <p className="text-danger">{errors.brokerage.message}</p>
              )}
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="Type of goods">NIC Levy</label>
              <input
                disabled={!createDeduction}
                ref={register({ required: "Provide NIC Levy" })}
                name="nic_levy"
                type="number"
                step="any"
                className="form-control"
                placeholder="NIC Levy"
              />
              {errors.nic_levy && (
                <p className="text-danger">{errors.nic_levy.message}</p>
              )}
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="Type of goods">Withholding Tax (%)</label>
              <input
                disabled={!createDeduction}
                name="withholding_tax"
                ref={register({ required: "Provide Withholding tax" })}
                type="number"
                step="any"
                className="form-control"
                placeholder="Withholding Tax"
              />
              {errors.withholding_tax && (
                <p className="text-danger">{errors.withholding_tax.message}</p>
              )}
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="Type of goods">Period From</label>
              <input
                disabled={!createDeduction}
                name="treaty_period_from"
                ref={register({ required: "Provide period from" })}
                type="date"
                className="form-control"
                placeholder="Premium"
              />
              {errors.treaty_period_from && (
                <p className="text-danger">
                  {errors.treaty_period_from.message}
                </p>
              )}
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="Type of goods">Period To</label>
              <input
                disabled={!createDeduction}
                name="treaty_period_to"
                ref={register({ required: "Provide period to" })}
                type="date"
                className="form-control"
                placeholder="Facultative Offer"
              />
              {errors.treaty_period_to && (
                <p className="text-danger">{errors.treaty_period_to.message}</p>
              )}
            </div>
          </div>

          <div className="col-md-12">
            <div className="form-group">
              <input
                type="hidden"
                value={selectedProgram?.value?.treaty_program_id}
                name="treaty_programstreaty_program_id"
                ref={register({ required: true })}
              />
              {createDeduction && !deductionCreated && (
                <input
                  type="submit"
                  className="btn btn-primary btn-sm form-control my-2"
                  value={`Create Deduction`}
                />
              )}
            </div>
          </div>
        </form>
      </fieldset>

      {(selectedProgram || oldInsurerId) && treatyDetials?.length > 0 ? (
        <fieldset className="w-auto p-2 border">
          <legend className={styles.details_title}>Treaty details</legend>
          <div className="row">
            {treatyDetials?.map((cob, key) => (
              <div className="col-md-6" key={key}>
                <div className="form-group">
                  <label htmlFor="Type of goods">{cob.keydetail}</label>
                  <input
                    ref={_form.register({ required: "Required" })}
                    value={cob.value}
                    name={`${cob.keydetail}`}
                    onChange={(e) => handleDetailsChange(e, key)}
                    type="text"
                    className="form-control"
                    placeholder={cob.keydetail}
                  />
                  {_form.errors[`${cob.keydetail}`] && (
                    <p className="text-danger">
                      {_form.errors[`${cob.keydetail}`].message}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </fieldset>
      ) : null}
      <div className="row mt-2">
        <div className="col-md-12">
          <label htmlFor="Type of goods">Currency</label>
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
          <input
            ref={_form.register({
              required: "Currency is required",
            })}
            type="hidden"
            name="currency"
            list="currencies"
            placeholder="Currency"
            className="form-control"
          />

          {_form.errors.currency && (
            <p className="text-danger">{_form.errors.currency.message}</p>
          )}
        </div>
      </div>

      {selectedProgramType &&
      selectedProgramType?.value === "NONPROPORTIONAL" ? (
        <fieldset className="border p-2 mb-2 mt-4">
          <legend className={styles.details_title}>
            Nonproportional details
          </legend>
          <div className="row">
            <div className="col-md-12">
              <Input
                label="Retained Premium Income"
                placeholder="Retained Premium Income"
                defaultValue={treaty?.treaty_np_detail?.egrnpi}
                name="egrnpi"
                type="number"
                step="any"
                ref={_form.register({ required: "Required" })}
              />
              {errors.egrnpi && (
                <p className="text-danger">{errors.egrnpi.message}</p>
              )}
            </div>
          </div>
        </fieldset>
      ) : null}

      {selectedProgramType && selectedProgramType?.value === "PROPORTIONAL" && (
        <Fragment>
          <div className="d-flex justify-content-between my-2 mt-4">
            <div>
              <h4>Surplus(es)</h4>
            </div>
            <div>
              <button
                onClick={addSurplus}
                type="button"
                className="btn btn-primary mr-2"
              >
                <FaPlus color="#fff" />
              </button>
              {surpluses.length > 0 && (
                <button
                  onClick={removeSurplus}
                  type="button"
                  className="btn btn-danger"
                >
                  <FaMinus color="#fff" />
                </button>
              )}
            </div>
          </div>

          {surpluses.map((surplus, key) => (
            <fieldset className="w-auto p-2 border" key={key}>
              <legend className={styles.details_title}>
                Surplus {key + 2}
              </legend>
              <div className="row">
                <div className="col-md-12 d-flex justify-content-end">
                  {key > 0 && (
                    <button
                      onClick={() => removeParticularSurplus(key)}
                      className="btn btn-link text-danger"
                    >
                      Remove
                    </button>
                  )}
                </div>
                <div className="col-md-12">
                  <Input
                    label="Commission"
                    placeholder="Commission"
                    type="number"
                    step="any"
                    name="commission"
                    value={surplus.commission}
                    // defaultValue={}
                    onChange={(e) => onSurplusValueChange(e, key)}
                  />
                </div>
              </div>
            </fieldset>
          ))}
        </Fragment>
      )}

      {selectedProgramType && selectedProgramType.value === "PROPORTIONAL" ? (
        <fieldset className="border p-2 mb-2 mt-4">
          <legend className={styles.details_title}>Proportional details</legend>
          <div className="row">
            <div className="col-md-6">
              <Input
                label="Profit Commission (%)"
                placeholder="Profit Commission (%)"
                type="number"
                step="any"
                name="profit_commission"
                ref={_form.register({ required: "Required" })}
                defaultValue={
                  treaty?.treaty_proportional_detail?.profit_commission
                }
              />
              {errors.profit_commission && (
                <p className="text-danger">
                  {errors.profit_commission.message}
                </p>
              )}
            </div>
            <div className="col-md-6">
              <Input
                label="Reinsurers Management Expense (%)"
                placeholder="Reinsurers Management Expense (%)"
                type="number"
                step="any"
                name="re_mgmt_expense"
                ref={_form.register({ required: "Required" })}
                defaultValue={
                  treaty?.treaty_proportional_detail?.re_mgmt_expense
                }
              />
              {errors.re_mgmt_expense && (
                <p className="text-danger">{errors.re_mgmt_expense.message}</p>
              )}
            </div>
            <div className="col-md-12">
              <Input
                label="Retained Premium Income"
                placeholder="Retained Premium Income"
                type="text"
                // step="any"
                name="ernpi"
                ref={_form.register({ required: "Required" })}
                defaultValue={treaty?.treaty_proportional_detail?.ernpi}
              />
              {errors.ernpi && (
                <p className="text-danger">{errors.ernpi.message}</p>
              )}
            </div>
          </div>

          {/* Fieldset for Portfolio */}

          <fieldset className="border p-2 mb-2">
            <legend className={styles.details_title}>
              Portfolio percentages
            </legend>
            <div className="row">
              <div className="col-md-6">
                <Input
                  label="Withdrawal %"
                  placeholder="Withdrawal %"
                  type="number"
                  step="any"
                  name="withdrawal_percentage"
                  ref={_form.register({ required: "Required" })}
                  defaultValue={
                    JSON.parse(
                      treaty?.treaty_proportional_detail?.portfolio_entry
                    )?.withdrawal_percentage
                  }
                />
                {errors.withdrawal_percentage && (
                  <p className="text-danger">
                    {errors.withdrawal_percentage.message}
                  </p>
                )}
              </div>
              <div className="col-md-6">
                <Input
                  label="Withdrawal loss %"
                  placeholder="Withdrawal loss %"
                  type="number"
                  step="any"
                  name="withdrawal_loss_percentage"
                  ref={_form.register({ required: "Required" })}
                  defaultValue={
                    JSON.parse(
                      treaty?.treaty_proportional_detail?.portfolio_entry
                    )?.withdrawal_loss_percentage
                  }
                />
                {errors.withdrawal_loss_percentage && (
                  <p className="text-danger">
                    {errors.withdrawal_loss_percentage.message}
                  </p>
                )}
              </div>
              <div className="col-md-6">
                <Input
                  label="Assumption %"
                  placeholder="Assumption %"
                  type="number"
                  step="any"
                  name="assumption_percentage"
                  ref={_form.register({ required: "Required" })}
                  defaultValue={
                    JSON.parse(
                      treaty?.treaty_proportional_detail?.portfolio_entry
                    )?.assumption_percentage
                  }
                />
                {errors.assumption_percentage && (
                  <p className="text-danger">
                    {errors.assumption_percentage.message}
                  </p>
                )}
              </div>
              <div className="col-md-6">
                <Input
                  label="Assumption loss %"
                  placeholder="Assumption loss %"
                  type="number"
                  step="any"
                  name="assumption_loss_percentage"
                  ref={_form.register({ required: "Required" })}
                  defaultValue={
                    JSON.parse(
                      treaty?.treaty_proportional_detail?.portfolio_entry
                    )?.assumption_loss_percentage
                  }
                />
                {errors.assumption_loss_percentage && (
                  <p className="text-danger">
                    {errors.assumption_loss_percentage.message}
                  </p>
                )}
              </div>
            </div>
          </fieldset>
        </fieldset>
      ) : null}

      {selectedProgramType && selectedProgramType?.value === "NONPROPORTIONAL" && (
        <Fragment>
          <div className="d-flex justify-content-between mt-3 my-2">
            <div>
              <h4>Limit layers</h4>
            </div>
            <div>
              <button
                onClick={addlayer}
                type="button"
                className="btn btn-primary mr-2"
              >
                <FaPlus color="#fff" />
              </button>
              <button
                onClick={removelayer}
                type="button"
                className="btn btn-danger"
              >
                <FaMinus color="#fff" />
              </button>
            </div>
          </div>

          {limitLayers.map((layer, key) => (
            <fieldset className="w-auto p-2 border" key={key}>
              <legend className={styles.details_title}>
                Limit layer {key + 1}
              </legend>
              <div className="row">
                <div className="col-md-12 d-flex justify-content-end">
                  {key > 0 && (
                    <button
                      onClick={() => removeParticularLayer(key)}
                      className="btn btn-link text-danger"
                    >
                      Remove
                    </button>
                  )}
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="Type of goods">Limit</label>
                    <input
                      value={layer.limit}
                      name="limit"
                      onChange={(e) => onLimitValueChange(e, key)}
                      type="number"
                      step="any"
                      placeholder="Limit"
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="Type of goods">Deductible</label>
                    <input
                      value={layer.deductible}
                      name="deductible"
                      onChange={(e) => onLimitValueChange(e, key)}
                      type="number"
                      step="any"
                      placeholder="Deductible"
                      className="form-control"
                    />
                  </div>
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-md-6">
                  <div className="form-group mt-2">
                    <label htmlFor="M&D Premium">M&D Premium</label>
                    <input
                      name="m_and_d_premium"
                      value={layer.m_and_d_premium}
                      onChange={(e) => onLimitValueChange(e, key)}
                      className="form-control"
                      type="number"
                      step="any"
                      placeholder="M&D Premium"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group mt-2">
                    <label htmlFor="Installments">Installments</label>
                    <select
                      className="form-control"
                      name="installment_type"
                      value={layer.installment_type}
                      onChange={(e) => onLimitValueChange(e, key)}
                      id="installment_type"
                    >
                      <option value="">Select ...</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                    </select>
                  </div>
                </div>
                {key === 0 && (
                  <div className="col-md-12">
                    <fieldset className="border p-2 mb-2">
                      <legend className={styles.details_title}>
                        Burning cost rate
                      </legend>
                      <div className="row">
                        <div className="col-md-6">
                          <Input
                            label="Minimum rate"
                            type="number"
                            step="any"
                            placeholder="Minimum rate"
                            value={layer.min_rate}
                            name="min_rate"
                            onChange={(e) => onLimitValueChange(e, key)}
                          />
                        </div>
                        <div className="col-md-6">
                          <Input
                            label="Maximum rate"
                            placeholder="Maximum rate"
                            type="number"
                            step="any"
                            value={layer.max_rate}
                            name="max_rate"
                            onChange={(e) => onLimitValueChange(e, key)}
                          />
                        </div>
                      </div>
                    </fieldset>
                    {/*  */}
                    <fieldset className="border p-2 mb-2">
                      <legend className={styles.details_title}>
                        Loading factor
                      </legend>
                      <div className="row">
                        <div className="col-md-6">
                          <Input
                            label="Numerator"
                            placeholder="Numerator"
                            type="number"
                            step="any"
                            value={layer.numerator}
                            name="numerator"
                            onChange={(e) => onLimitValueChange(e, key)}
                          />
                        </div>
                        <div className="col-md-6">
                          <Input
                            label="Denominator"
                            placeholder="Denominator"
                            type="number"
                            step="any"
                            value={layer.denominator}
                            name="denominator"
                            onChange={(e) => onLimitValueChange(e, key)}
                          />
                        </div>
                      </div>
                    </fieldset>
                  </div>
                )}
                {key > 0 && (
                  <div className="col-md-12">
                    <Input
                      label="Adjustable rate"
                      placeholder="Adjustable rate"
                      type="number"
                      step="any"
                      value={layer.adjust_rate}
                      name="adjust_rate"
                      onChange={(e) => onLimitValueChange(e, key)}
                    />
                  </div>
                )}
              </div>
            </fieldset>
          ))}
        </Fragment>
      )}
      <div className="row mt-3">
        <div className="col-md-12">
          <input
            type="submit"
            className="btn btn-primary btn-sm form-control"
            value={`Update Treaty`}
          />
        </div>
      </div>
    </form>
  );
};

export default UpdateTreatyForm;
