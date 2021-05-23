/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import styles from "./styles/ViewInsurerOffer.module.css";
import { useQuery } from "react-apollo";
import { FETCH_CLASS_OF_BUSINESS } from "../../graphql/queries";
import { Editor } from "../../components";

export default function ViewInsurerOffer({ data }) {
  const [details, setDetails] = useState(null);
  const [selectedClassOfBusiness, setSelectedClassOfBusiness] = useState(null);
  const { data: classOfBusinesses, loading: businessLoading } = useQuery(
    FETCH_CLASS_OF_BUSINESS
  );

  useEffect(() => {
    if (data && classOfBusinesses) {
      setDetails(data);
      console.log(data);
      chooseSelectedBusiness(data.classofbusiness?.business_name);
    }
  }, [data, classOfBusinesses]);

  const handleBusinessSelected = (event) => {
    const { value } = event.target;
    chooseSelectedBusiness(value);
  };

  const chooseSelectedBusiness = (value) => {
    const business = classOfBusinesses.classOfBusinesses.find(
      (business_x) => business_x.business_name === value
    );
    if (business) {
      setSelectedClassOfBusiness(business);
    } else {
      setSelectedClassOfBusiness(null);
    }
  };

  return !details ? null : (
    <>
      <div className={styles.card_header}>
        <h2 className={styles.card_title}>View facultative placement slip</h2>
      </div>
      <div className={styles.card_body}>
        <div className="row">
          {details?.offer_retrocedent && (
            <div className="col-md-12">
              <div className="form-group">
                <label htmlFor="BusinessClass">Retrocedent</label>
                <input
                  value={details?.offer_retrocedent?.reinsurer?.re_company_name}
                  type="text"
                  name="business_class"
                  className="form-control"
                  list="insurance_companies"
                  placeholder="Insurance company"
                  readOnly
                />
                <datalist id="insurance_companies">
                  <select name="business_class" id="" className="form-control">
                    <option value="Regency Nem Insurance Ghana Ltd">
                      Regency Nem Insurance Ghana Ltd
                    </option>
                    <option value="Marine Cargo">Marine Cargo</option>
                  </select>
                </datalist>
              </div>
            </div>
          )}
          <div className="col-md-12">
            <div className="form-group">
              <label htmlFor="BusinessClass">Insurance Company</label>
              <input
                value={details?.insurer?.insurer_company_name}
                type="text"
                name="business_class"
                className="form-control"
                list="insurance_companies"
                placeholder="Insurance company"
                readOnly
              />
              <datalist id="insurance_companies">
                <select name="business_class" id="" className="form-control">
                  <option value="Regency Nem Insurance Ghana Ltd">
                    Regency Nem Insurance Ghana Ltd
                  </option>
                  <option value="Marine Cargo">Marine Cargo</option>
                </select>
              </datalist>
            </div>
          </div>
          <div className="col-md-12">
            <div className="form-group">
              <label htmlFor="BusinessClass">Business Class</label>
              <input
                value={details?.classofbusiness?.business_name}
                onChange={handleBusinessSelected}
                type="text"
                name="business_class"
                className="form-control"
                list="class_of_businesses"
                placeholder="Insurance company"
                readOnly
              />
              <datalist id="class_of_businesses">
                <select
                  onChange={handleBusinessSelected}
                  name="business_class"
                  id=""
                  className="form-control"
                >
                  {businessLoading ? <option value="Loading..."></option> : ""}
                  {classOfBusinesses &&
                    classOfBusinesses.classOfBusinesses.map((business, key) => (
                      <option
                        key={key}
                        onClick={handleBusinessSelected}
                        id={business.class_of_business_id}
                        value={business.business_name}
                        readOnly
                      />
                    ))}
                </select>
              </datalist>
            </div>
          </div>
        </div>
        {selectedClassOfBusiness ? (
          <fieldset className="w-auto p-2 border-form">
            <legend className={styles.details_title}>
              Business class details
            </legend>
            <div className="row">
              {JSON.parse(details?.offer_detail.offer_details).map(
                (detail, key) => {
                  return (
                    <div key={key} className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="Type of goods">
                          {detail.keydetail}
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          value={detail.value}
                          placeholder={detail.keydetail}
                          readOnly
                        />
                      </div>
                    </div>
                  );
                }
              )}
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
                  type="text"
                  value={details?.offer_detail?.policy_number}
                  className="form-control"
                  placeholder="Policy no."
                  readOnly
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="Type of goods">Insured</label>
                <input
                  type="text"
                  className="form-control"
                  value={details?.offer_detail?.insured_by}
                  placeholder="Insured"
                  readOnly
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="Type of goods">Sum Insured</label>
                <input
                  type="text"
                  className="form-control"
                  value={details?.sum_insured}
                  placeholder="Sum Insured"
                  readOnly
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="Type of goods">Rate</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Rate"
                  value={details?.rate || "0.0"}
                  onChange={() => {}}
                  readOnly
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="Type of goods">Premium</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Premium"
                  value={details?.premium}
                  readOnly
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="Type of goods">Facultative Offer</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Facultative Offer"
                  value={details?.facultative_offer}
                  readOnly
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="Type of goods">Commision</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Commision"
                  value={details?.commission}
                  readOnly
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="Type of goods">Brokerage</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Brokerage"
                  value={details?.brokerage}
                  readOnly
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="currency">Currency</label>
                <input
                  type="text"
                  value={details?.offer_detail?.currency}
                  className="form-control"
                  readOnly
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="Type of goods">Co-Insurance Share (%)</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Co-Insurance Share"
                  value={details?.co_insurance_share || "0.0"}
                  onChange={() => {}}
                />
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group">
                <label htmlFor="Payment Type">Payment Type</label>
                <p>
                  {details?.offer_detail?.payment_type
                    ? Object.keys(
                        JSON.parse(details?.offer_detail?.payment_type)
                      )[0]
                    : "instalment"}
                </p>
                <select
                  className="form-control"
                  name="payment_type"
                  value={
                    details?.offer_detail?.payment_type
                      ? Object.keys(
                          JSON.parse(details?.offer_detail?.payment_type)
                        )[0]
                      : "instalment"
                  }
                  id=""
                >
                  <option value="payable_in_full">Payable in full</option>
                  <option value="instalment">Instalment</option>
                </select>
              </div>
            </div>

            {details?.offer_detail?.payment_type &&
              Object.keys(
                JSON.parse(details?.offer_detail?.payment_type)
              )[0] === "instalment" && (
                <div className="col-md-12 mb-3">
                  <label htmlFor="">No. of instalments</label>
                  <input
                    type="number"
                    name="no_of_installments"
                    value={
                      Object.values(
                        JSON.parse(details?.offer_detail?.payment_type)
                      )[0]
                    }
                    min={1}
                    className="form-control"
                  />
                </div>
              )}

            <div className="col-md-12">
              <div className="form-check">
                <input
                  type="checkbox"
                  checked={details?.exchange_rate}
                  className="form-check-input"
                />
                <label className="form-check-label" htmlFor="exampleCheck1">
                  Add Exchange rate
                </label>
              </div>
            </div>
            {details?.exchange_rate && (
              <div className="col-md-12 mt-2">
                <div className="form-group alert alert-danger text-danger w-auto ">
                  Premium and Deductions on all documents will be affected by
                  this exchange rate value
                </div>
              </div>
            )}
            {details?.exchange_rate && (
              <>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="">Exchange Currency</label>
                    <input
                      type="text"
                      value={details?.exchange_rate?.ex_currency}
                      className="form-control"
                      readOnly
                    />

                    {/* {errors.ex_currency && <p className="text-danger">{errors.ex_currency.message}</p>} */}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="Type of goods">
                      Exchange rate {details?.exchange_rate?.ex_rate}{" "}
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="0.000001"
                      value={details?.exchange_rate?.ex_rate}
                      name="ex_rate"
                      className="form-control"
                      placeholder="Exchange rate"
                    />
                    {/* {errors.ex_rate && <p className="text-danger">{errors.ex_rate.message}</p>} */}
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
                  type="text"
                  value={details?.offer_detail?.period_of_insurance_from}
                  className="form-control"
                  placeholder="From"
                  readOnly
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="Type of goods">To</label>
                <input
                  type="text"
                  value={details?.offer_detail?.period_of_insurance_to}
                  className="form-control"
                  placeholder="To"
                  readOnly
                />
              </div>
            </div>
          </div>
        </fieldset>
        {details?.offer_detail?.offer_comment && (
          <fieldset className="w-auto p-2 border-form">
            <legend className={styles.details_title}>Comment</legend>
            <div className="form-grpup">
              {/* <JoditEditor value={details?.offer_detail?.offer_comment || ""} onChange={() => { }} /> */}
              <Editor
                value={details?.offer_detail?.offer_comment?.toString() || ""}
                onChange={() => {}}
              />
              {/* <textarea hidden name="" id="" cols="30" rows="10" value={details?.offer_detail?.offer_comment} className="form-control" readOnly></textarea> */}
            </div>
          </fieldset>
        )}
        {details?.offer_detail?.information_comment && (
          <fieldset className="w-auto p-2  border-form">
            <legend className={styles.details_title}>NKORL</legend>
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <Editor
                    value={details?.offer_detail?.information_comment?.toString()}
                    onChange={() => {}}
                  />
                  {/* <textarea hidden rows={10} ref={register({ required: nkrol })} value={infoContent} name="information_comment" className="form-control" placeholder="Add Comment" ></textarea> */}
                  {/* {errors.information_comment && <p className="text-danger">{errors.information_comment.message}</p>} */}
                </div>
              </div>
            </div>
          </fieldset>
        )}
      </div>
    </>
  );
}
