/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-throw-literal */
import React, { useState, useRef, useContext, useEffect } from "react";
import styles from "./styles/inputOffer.module.css";
import { useForm } from "react-hook-form";
import { useQuery, useMutation } from "@apollo/client";
import { INPUT_OFFER_QUERIES, OFFERS } from "../../graphql/queries";
import currencies from "../../assets/currencies.json";
import {
  CREATE_INPUT_OFFER,
  CREATE_FLEET_OFFER,
} from "../../graphql/mutattions";
import swal from "sweetalert";
import { DrawerContext } from "../../components/Drawer";
import {
  Selector,
  Modal,
  Datatable,
  CurrencyOption,
  InsurerOption,
  Editor,
  ReinsurerOption,
} from "../../components";
import { AuthContext } from "../../context/AuthContext";
import { previewTable } from "./columns";

export const prepVariables = (values, offerDetails, employee_id) => {
  const variable = {
    class_of_business_id: values.class_of_business_id,
    insurer_id: values.insurer_id,
    reinsurer_id: values.reinsurer_id,
    rate: values.rate,
    commission: values.commission,
    brokerage: values.brokerage,
    facultative_offer: values.facultative_offer,
    sum_insured: values.sum_insured,
    premium: values.premium,
    policy_number: values.policy_number,
    insured_by: values.insured_by,
    period_of_insurance_from: values.period_of_insurance_from,
    period_of_insurance_to: values.period_of_insurance_to,
    currency: values.currency,
    offer_comment: values.offer_comment || " ",
    information_comment: values.information_comment || " ",
    ex_currency: values.ex_currency || " ",
    ex_rate: values.ex_rate || " ",
    employee_id,
    offer_details: JSON.stringify(offerDetails),
    co_insurance_share: values.co_insurance_share,
    payment_type: {
      [values.payment_type]:
        values.payment_type === "payable_in_full"
          ? "Facultative Premium payable in full at inception"
          : values.no_of_installments,
    },
  };

  return variable;
};

export default function InputOffer({ toggle }) {
  const { closed } = useContext(DrawerContext);
  const payment_typeRef = useRef({});
  const { state } = useContext(AuthContext);
  const [nkrol, setNkrol] = useState(false);
  const [addExchangeRate, setAddExchangeRate] = useState(false);
  const [showPreviewModal, setshowPreviewModal] = useState(false);
  const formRef = useRef();
  const { data } = useQuery(INPUT_OFFER_QUERIES);
  const [selectedInsurer, setSelectedInsurer] = useState(null);
  const [selectedReinsurer, setSelectedReinsurer] = useState(null);
  const { register, errors, handleSubmit, reset, setValue, clearError, watch } =
    useForm();
  payment_typeRef.current = watch("payment_type", "");
  const [classOfBusiness, setClassOfBusiness] = useState(null);
  const [offerDetails, setofferDetails] = useState([]);
  const [content, setContent] = useState("");
  const [isFleetType, setIsFleetType] = useState(false);
  const [fleetData, setFleetData] = useState([]);
  const [editData, setEditData] = useState(null);
  const [currency, setCurrency] = useState(null);
  const [ex_currency, setExCurrency] = useState(null);
  const [updateIndex, setUpdateIndex] = useState(-1);
  const [infoContent, setInfoContent] = useState("");
  const [showInstallmentDropdown, setShowInstallmentDropdown] = useState(false);
  const [createFR, setCreateFR] = useState(false);

  const [createFleetOfferMutation, { loading: creatingFleet }] = useMutation(
    CREATE_FLEET_OFFER,
    {
      refetchQueries: [
        { query: INPUT_OFFER_QUERIES },
        {
          query: OFFERS,
          variables: { offer_status: ["OPEN", "PENDING"] },
        },
      ],
    }
  );

  const [createOffer] = useMutation(CREATE_INPUT_OFFER, {
    refetchQueries: [
      { query: INPUT_OFFER_QUERIES },
      {
        query: OFFERS,
        variables: { offer_status: ["OPEN", "PENDING"] },
      },
    ],
  });

  useEffect(() => {
    if (editData) {
      setValue("policy_number", editData?.policy_number); //insurance_company
      setValue("insurer_id", editData?.insurer_id); //insurance_company
      setValue("class_of_business_id", editData?.class_of_business_id); //insurance_company
      setClassOfBusiness({
        label: data?.classOfBusinesses.find(
          (el) => el.class_of_business_id === editData.class_of_business_id
        ).business_name,
      });
      setValue("commission", editData.commission);
      setValue("brokerage", editData.brokerage);
      setValue("facultative_offer", editData.facultative_offer);
      setValue("sum_insured", editData.sum_insured);
      setValue("premium", editData.premium);
      setValue("rate", editData.rate);
      setValue("insured_by", editData.insured_by);
      setValue("currency", editData.currency);
      setValue("offer_comment", editData.offer_comment);
      setContent(editData.offer_comment);
      setofferDetails(JSON.parse(editData.offer_details));
      setValue("period_of_insurance_from", editData.period_of_insurance_from);
      setValue("period_of_insurance_to", editData.period_of_insurance_to);
      setSelectedInsurer({
        label: data?.insurers.find(
          (el) => el.insurer_id === editData.insurer_id
        )?.insurer_company_name,
      });
      setCurrency(editData.currency);
    }
  }, [editData]);

  const handleUpdateRecord = (data, index) => {
    setEditData(data);
    setUpdateIndex(index);
    setshowPreviewModal(false);
    toggle();
  };

  const handleRemoveRecord = (key) => {
    swal({
      icon: "warning",
      title: "Remove fleet entity ?",
      text: "This action removes fleet entity from list",
      buttons: ["No", { text: "Yes" }],
    }).then((input) => {
      if (!input) throw {};
      const _ = [...fleetData];
      _.splice(key, 1);
      setFleetData(_);
    });
  };

  const handleCurrencyChange = (value) => {
    setValue("currency", value ? value.value.code : "");
    setCurrency(value ? value.value.code : "");
    if (value) {
      clearError("currency");
    }
  };

  const handleExCurrencyChange = (value) => {
    setValue("ex_currency", value ? value.value.code : "");
    setExCurrency(value ? value.value.code : "");
    if (value) {
      clearError("ex_currency");
    }
  };

  const handleInsuranceCompanyChange = (value) => {
    setValue("insurer_id", value ? value.value.insurer_id : "");
    setSelectedInsurer(value ? value : "");
    if (value) {
      clearError("insurer_id");
    }
  };

  const handleRetrocedentChange = (value) => {
    setValue("reinsurer_id", value ? value.value.reinsurer_id : "");
    setSelectedReinsurer(value ? value : "");
    if (value) {
      clearError("reinsurer_id");
    }
  };

  const handleCommentChange = (value) => {
    setValue("offer_comment", value);
    setContent(value);
    if (value) {
      clearError("offer_comment");
    }
  };

  const handleInfoCommentChange = (value) => {
    setValue("information_comment", value);
    setInfoContent(value);
    if (value) {
      clearError("information_comment");
    }
  };

  useEffect(() => {
    if (closed) {
      reset();
      setSelectedInsurer(null);
      setCurrency(null);
      setClassOfBusiness(null);
    }
  }, [closed, reset]);

  const handleClassOfBusinessChange = (cob) => {
    setValue("class_of_business_id", cob ? cob.value.class_of_business_id : "");
    setClassOfBusiness(cob ? cob : null);
    setofferDetails(cob ? JSON.parse(cob.value.business_details) : []);
    if (cob && cob.label === "Motor Comprehensive Fleet") {
      setIsFleetType(true);
    } else {
      setIsFleetType(false);
    }
  };

  const handleDetailsChange = (e, index) => {
    const { value } = e.target;
    const inputs = [...offerDetails];
    inputs[index]["value"] = value;
    setofferDetails(inputs);
  };

  const updateRecord = (values) => {
    swal({
      icon: "warning",
      title: "update fleet entity ?",
      text: "Do you wish to update this fleet entity?",
      buttons: ["No", { text: "Yes" }],
    }).then((input) => {
      if (!input) throw {};
      const _ = [...fleetData];
      const variable = prepVariables(
        values,
        offerDetails,
        state.user.employee.employee_id
      );
      _[updateIndex] = variable;
      setFleetData(_);
      toggle();
      setshowPreviewModal((prev) => !prev);
      setEditData(null);
    });
  };

  const handleFleetSubmit = (values) => {
    swal({
      icon: "warning",
      title: "Add more",
      text: "Do you wish to add another fleet entity?",
      buttons: ["No", { text: "Yes" }],
    }).then((input) => {
      if (!input) {
        const variable = prepVariables(
          values,
          offerDetails,
          state.user.employee.employee_id
        );
        setFleetData((prev) => [...prev, variable]);
        toggle();
        setshowPreviewModal((prev) => !prev);
      } else {
        const variable = prepVariables(
          values,
          offerDetails,
          state.user.employee.employee_id
        );
        setFleetData((prev) => [...prev, variable]);
      }
    });
  };

  const createFleetOffer = () => {
    swal({
      icon: "warning",
      title: "Are you sure you want to create offer ?",
      closeOnClickOutside: false,
      closeOnEsc: false,
      buttons: [
        "No",
        {
          text: "Yes",
          closeModal: false,
        },
      ],
    }).then((input) => {
      if (!input) throw {};
      createFleetOfferMutation({ variables: { data: fleetData } })
        .then((res) => {
          swal("Success", "Facultative offer Created Successfully", "success");
          formRef.current.reset();
          setSelectedInsurer(null);
          setshowPreviewModal(false);
          reset();
          setClassOfBusiness(null);
          setofferDetails([]);
          setCurrency(null);
          setEditData(null);
          setIsFleetType(false);
          setContent("");
          setFleetData([]);
        })
        .catch((err) => {
          if (err) {
            swal("Oh noes!", "The AJAX request failed!", "error");
          } else {
            swal.stopLoading();
            swal.close();
          }
        });
    });
  };

  const handleCreateOffer = (values) => {
    const variables = prepVariables(
      values,
      offerDetails,
      state.user.employee.employee_id
    );
    swal({
      icon: "warning",
      title: "Are you sure you want to create offer ?",
      closeOnClickOutside: false,
      closeOnEsc: false,
      buttons: [
        "No",
        {
          text: "Yes",
          closeModal: false,
        },
      ],
    }).then((input) => {
      if (!input) throw {};
      createOffer({ variables })
        .then((res) => {
          swal("Success", "Facultative offer Created Successfully", "success");
          formRef.current.reset();
          setSelectedInsurer(null);
          setSelectedReinsurer(null);
          setCreateFR(false);
          toggle();
        })
        .catch((err) => {
          if (err) {
            swal("Oh noes!", "The AJAX request failed!", "error");
          } else {
            swal.stopLoading();
            swal.close();
          }
        });
    });
  };

  useEffect(() => {
    if (payment_typeRef.current === "instalment") {
      setShowInstallmentDropdown(true);
    } else {
      setShowInstallmentDropdown(false);
    }
  }, [payment_typeRef.current, setShowInstallmentDropdown]);

  return (
    <form
      onSubmit={handleSubmit(
        !isFleetType
          ? handleCreateOffer
          : editData
          ? updateRecord
          : handleFleetSubmit
      )}
      ref={formRef}
    >
      <div className={styles.card_header}>
        <h2 className={styles.card_title}>Create facultative placement slip</h2>
      </div>
      <div className={styles.card_body}>
        <div className="row">
          <div className="col-md-12 mb-3">
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                onChange={(e) => setCreateFR(e.target.checked)}
                value={createFR}
              />
              <label className="form-check-label" htmlFor="exampleCheck1">
                Create offer for retrocedent
              </label>
            </div>
          </div>
          {/* Retrocedent listing on condition */}
          {createFR && (
            <div className="col-md-12">
              <div className="form-group">
                <label htmlFor="BusinessClass">Retrocedent</label>
                <Selector
                  value={selectedReinsurer}
                  placeholder="Retrocedent"
                  onChange={handleRetrocedentChange}
                  components={{ Option: ReinsurerOption }}
                  options={
                    data
                      ? data.reinsurers.map((reinsurer) => ({
                          label: reinsurer.re_company_name,
                          value: reinsurer,
                        }))
                      : []
                  }
                />
                <input
                  ref={register({
                    required: "Retrocedent is required",
                  })}
                  type="hidden"
                  name="reinsurer_id"
                />
                {errors.reinsurer_id && (
                  <p className="text-danger">{errors.reinsurer_id.message}</p>
                )}
              </div>
            </div>
          )}

          <div className="col-md-12">
            <div className="form-group">
              <label htmlFor="BusinessClass">
                {createFR ? "Reinsured" : "Insurance Company"}
              </label>
              <Selector
                value={selectedInsurer}
                placeholder={createFR ? "Reinsured" : "Insurance Company"}
                onChange={handleInsuranceCompanyChange}
                components={{ Option: InsurerOption }}
                options={
                  data
                    ? data.insurers.map((insurer) => ({
                        label: insurer.insurer_company_name,
                        value: insurer,
                      }))
                    : []
                }
              />
              <input
                ref={register({
                  required: `${
                    createFR ? "Reinsured" : "Insurance Company"
                  } is required`,
                })}
                type="hidden"
                name="insurer_id"
              />
              {errors.insurer_id && (
                <p className="text-danger">{errors.insurer_id.message}</p>
              )}
            </div>
          </div>
          <div className="col-md-12">
            <div className="form-group">
              <label htmlFor="BusinessClass">Business Class</label>
              <Selector
                value={classOfBusiness}
                onChange={handleClassOfBusinessChange}
                options={
                  data
                    ? data.classOfBusinesses.map((cob) => ({
                        label: cob.business_name,
                        value: cob,
                      }))
                    : []
                }
                placeholder="Business Class"
              />
              <input
                ref={register({
                  required: "Business class is required",
                })}
                type="hidden"
                name="class_of_business_id"
              />

              {errors.class_of_business_id && (
                <p className="text-danger">
                  {errors.class_of_business_id.message}
                </p>
              )}
            </div>
          </div>
        </div>
        {classOfBusiness ? (
          <fieldset className="w-auto p-2  border-form">
            <legend className={styles.details_title}>
              Business class details
            </legend>
            <div className="row">
              {offerDetails.map((cob, key) => (
                <div className="col-md-6" key={key}>
                  <div className="form-group">
                    <label htmlFor="Type of goods">{cob.keydetail}</label>
                    <input
                      ref={register({ required: "Required" })}
                      value={cob.value}
                      name={`${cob.keydetail}`}
                      onChange={(e) => handleDetailsChange(e, key)}
                      type="text"
                      className="form-control"
                      placeholder={cob.keydetail}
                    />
                    {errors[`${cob.keydetail}`] && (
                      <p className="text-danger">
                        {errors[`${cob.keydetail}`].message}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </fieldset>
        ) : null}

        <fieldset className="w-auto p-2 border-form">
          <legend className={styles.details_title}>Offer Details</legend>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="Type of goods">Policy no.</label>
                <input
                  name="policy_number"
                  ref={register({ required: false })}
                  type="text"
                  className="form-control"
                  placeholder="Policy no."
                />
                {errors.policy_number && (
                  <p className="text-danger">{errors.policy_number.message}</p>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="Type of goods">Insured</label>
                <input
                  name="insured_by"
                  ref={register({ required: "Provide insured by" })}
                  type="text"
                  className="form-control"
                  placeholder="Insured"
                />
                {errors.insured_by && (
                  <p className="text-danger">{errors.insured_by.message}</p>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="Type of goods">Sum Insured</label>
                <input
                  ref={register({ required: "Provide sum insured" })}
                  min="0"
                  step="any"
                  name="sum_insured"
                  type="number"
                  className="form-control"
                  placeholder="Sum Insured"
                />
                {errors.sum_insured && (
                  <p className="text-danger">{errors.sum_insured.message}</p>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="Type of goods">Rate (%)</label>
                <input
                  name="rate"
                  ref={register({ required: false })}
                  min="0"
                  step="any"
                  type="number"
                  className="form-control"
                  placeholder="Rate"
                />
                {errors.rate && (
                  <p className="text-danger">{errors.rate.message}</p>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="Type of goods">Premium</label>
                <input
                  name="premium"
                  ref={register({ required: "Provide premium" })}
                  min="0"
                  step="any"
                  type="number"
                  className="form-control"
                  placeholder="Premium"
                />
                {errors.premium && (
                  <p className="text-danger">{errors.premium.message}</p>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="Type of goods">Facultative Offer (%)</label>
                <input
                  name="facultative_offer"
                  min="0"
                  step="any"
                  ref={register({ required: "Provide facultative offer" })}
                  type="number"
                  className="form-control"
                  placeholder="Facultative Offer"
                />
                {errors.facultative_offer && (
                  <p className="text-danger">
                    {errors.facultative_offer.message}
                  </p>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="Type of goods">Commision (%)</label>
                <input
                  type="number"
                  min="0"
                  step="any"
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
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="Type of goods">Preliminary Brokerage (%)</label>
                <input
                  type="number"
                  min="0"
                  step="any"
                  ref={register({ required: "Provide preliminary brokerage" })}
                  name="brokerage"
                  className="form-control"
                  placeholder="Preliminary Brokerage"
                />
                {errors.brokerage && (
                  <p className="text-danger">{errors.brokerage.message}</p>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
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
                  ref={register({
                    required: "Currency is required",
                  })}
                  type="hidden"
                  name="currency"
                  list="currencies"
                  placeholder="Currency"
                  className="form-control"
                />
                {errors.currency && (
                  <p className="text-danger">{errors.currency.message}</p>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="Type of goods">Co-Insurance share (%)</label>
                <input
                  type="number"
                  min="0"
                  step="any"
                  ref={register({ required: false })}
                  name="co_insurance_share"
                  className="form-control"
                  placeholder="Co-Insurance share"
                />
                {errors.co_insurance_share && (
                  <p className="text-danger">
                    {errors.co_insurance_share.message}
                  </p>
                )}
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group">
                <label htmlFor="Payment Type">Payment Type</label>
                <select
                  className="form-control"
                  name="payment_type"
                  ref={register({ required: "Required" })}
                  id=""
                >
                  <option value="payable_in_full">Payable in full</option>
                  <option value="instalment">Instalment</option>
                </select>
                {errors.payment_type && (
                  <p className="text-danger">{errors.payment_type.message}</p>
                )}
              </div>
            </div>

            {/* When instalment is selected  */}
            {showInstallmentDropdown && (
              <div className="col-md-12 mb-3">
                <label htmlFor="">No. of instalments</label>
                <input
                  ref={register({ required: "Required" })}
                  type="number"
                  name="no_of_installments"
                  min={1}
                  className="form-control"
                />
                {errors.no_of_installments && (
                  <p className="text-danger">
                    {errors.no_of_installments.message}
                  </p>
                )}
              </div>
            )}

            <div className="col-md-12">
              <div className="form-check">
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
            {addExchangeRate && (
              <div className="col-md-12 mt-2">
                <div className="form-group alert alert-danger text-danger w-auto ">
                  Premium and Deductions on all documents will be affected by
                  this exchange rate value
                </div>
              </div>
            )}
            {addExchangeRate && (
              <>
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
              </>
            )}
          </div>
        </fieldset>
        <fieldset className="w-auto p-2 border-form">
          <legend className={styles.details_title}>Period Of Insurance</legend>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="Type of goods">From</label>
                <input
                  type="date"
                  ref={register({ required: false })}
                  name="period_of_insurance_from"
                  className="form-control"
                  placeholder="From"
                />
                {errors.period_of_insurance_from && (
                  <p className="text-danger">
                    {errors.period_of_insurance_from.message}
                  </p>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="Type of goods">To</label>
                <input
                  type="date"
                  ref={register({ required: false })}
                  name="period_of_insurance_to"
                  className="form-control"
                  placeholder="To"
                />
                {errors.period_of_insurance_to && (
                  <p className="text-danger">
                    {errors.period_of_insurance_to.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </fieldset>
        <fieldset className="w-auto p-2  border-form">
          <legend className={styles.details_title}>Comment</legend>
          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <Editor value={content} onChange={handleCommentChange} />
                <textarea
                  hidden
                  rows={10}
                  ref={register({ required: false })}
                  name="offer_comment"
                  className="form-control"
                  placeholder="Add Comment"
                ></textarea>
              </div>
            </div>
          </div>
        </fieldset>
        <div className="w-auto p-2">
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
              onChange={(e) => setNkrol(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              Include NKORL information to placing slip
            </label>
          </div>
        </div>
        {nkrol && (
          <fieldset className="w-auto p-2  border-form">
            <legend className={styles.details_title}>NKORL</legend>
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <Editor
                    value={infoContent}
                    onChange={handleInfoCommentChange}
                  />
                  <textarea
                    hidden
                    rows={10}
                    ref={register({ required: nkrol })}
                    name="information_comment"
                    className="form-control"
                    placeholder="Add Comment"
                  ></textarea>
                </div>
                {errors.information_comment && (
                  <p className="text-danger">
                    {errors.information_comment.message}
                  </p>
                )}
              </div>
            </div>
          </fieldset>
        )}
        <div className="form-group">
          <input
            type="submit"
            className="btn btn-primary btn-sm form-control my-2"
            value={
              editData
                ? "Update Offer"
                : isFleetType
                ? "Add Offer"
                : "Create Offer"
            }
          />
        </div>
      </div>
      <CountFloat size={fleetData.length} />

      {/* Preview Modal */}

      <Modal
        show={showPreviewModal}
        size="xl"
        onHide={() => setshowPreviewModal((prev) => !prev)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Preview Fleet Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Datatable
            columns={previewTable}
            data={fleetData.map((item, id) => ({
              ...item,
              sum_insured: item.currency + " " + item.sum_insured,
              premium: item.currency + " " + item.premium,
              period:
                item.period_of_insurance_from +
                " - " +
                item.period_of_insurance_to,
              offer_details: JSON.stringify(
                JSON.parse(item.offer_details).reduce(
                  (o, curr) => ({ ...o, [curr.keydetail]: curr.value }),
                  {}
                )
              ),
              actions: (
                <>
                  <button
                    onClick={() => handleUpdateRecord(item, id)}
                    className="btn btn-sm w-md btn-info"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleRemoveRecord(id)}
                    className="btn btn-link"
                  >
                    Remove
                  </button>
                </>
              ),
            }))}
          />
        </Modal.Body>
        <Modal.Footer>
          <button
            disabled={creatingFleet}
            onClick={createFleetOffer}
            className="btn btn-sm w-md btn-primary"
          >
            Create Offer
          </button>
        </Modal.Footer>
      </Modal>

      {/* End of Preview Modal */}
    </form>
  );
}

const CountFloat = ({ size }) => {
  return size ? (
    <div
      style={{
        backgroundColor: "#F14646",
        height: 30,
        width: 30,
        borderRadius: 15,
        position: "fixed",
        bottom: 30,
        right: 10,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <span style={{ color: "#fff", fontWeight: "bolder" }}>{size}</span>
    </div>
  ) : null;
};
