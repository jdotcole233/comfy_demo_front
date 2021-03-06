/* eslint-disable react/jsx-no-target-blank */
import React, { useContext } from "react";
import "./styles/preview.css";
import { BASE_URL_LOCAL } from "../../graphql";
import { AuthContext } from "../../context/AuthContext";
import { getCurrencyFullName } from "../../components";
import PreviewLogo from "../../components/PreviewLogo";

const downloadAccess = [
  "CEO",
  "General Manager",
  // 'Senior Broking Officer',
  // 'Finance Executive',
  "System Administrator",
];

function PreviewCoverNote({ offer }) {
  const { state: ctx } = useContext(AuthContext);
  const showDate = (offer) => {
    if (!offer?.offer_detail?.period_of_insurance_from) return "TBA";
    const from = new Date(offer?.offer_detail?.period_of_insurance_from);
    const to = new Date(offer?.offer_detail?.period_of_insurance_to);
    return `${from.getDate()}/${
      from.getMonth() + 1
    }/${from.getFullYear()} ${to.getDate()}/${
      to.getMonth() + 1
    }/${to.getFullYear()}`;
  };
  return (
    <div>
      <div className="row m-2">
        {(offer?.approval_status === "APPROVED" ||
          downloadAccess.includes(ctx?.user?.user_role?.position)) && (
          <a
            target="_blank"
            href={`${BASE_URL_LOCAL}/generate_debit_slip/${btoa(
              JSON.stringify({ offer_id: offer?.offer_id })
            )}`}
            className="btn btn-sm btn-primary w-md"
          >
            <i className="bx bxs-file-pdf"></i> Save
          </a>
        )}
      </div>
      <div
        style={{ boxShadow: "1px 2px 2px 5px #f2f2f2" }}
        className="preview-card container-fluid text-black bg-white"
      >
        <PreviewLogo />
        <div className="row">
          {/* <img className="" src={require('../../assets/banner.png')} alt="kek letter head" /> */}
          <div className="col-md-6">
            <address>
              <p style={{ lineHeight: 0 }}>
                Our Ref:{" "}
                {`${
                  offer?.employee?.emp_abbrv
                }/KEKRE/${new Date().getFullYear()}`}
              </p>
              <p>{new Date().toDateString()}</p>
              <address>
                The Managing Director <br />
                {offer?.insurer.insurer_company_name}, <br />
                {/* {offer?.insurer.insurer_address.suburb}.  <br /> */}
                {offer?.insurer.insurer_address.region},{" "}
                {offer?.insurer.insurer_address.country} <br />
                {new Date().toDateString()}
              </address>
            </address>
          </div>
          <div
            className="col-md-6"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* <img width={100} height={100} src={require("../../assets/logo.png")} alt="company name" /> */}
          </div>
          <div className="col-md-12 text-align-center mt-3 mb-3">
            <h3
              style={{
                textAlign: "center",
                color: "#000",
                textDecoration: "underline",
              }}
            >
              Debit Note
            </h3>
          </div>
          <div className="col-md-10 col-12 col-sm-12 col-xs-12 ml-4">
            <div className="row mb-2">
              <div className="col-md-6 col-4 col-sm-4 col-4 col-xs-4">
                <h3 className="dark-text">Type:</h3>
              </div>
              <div className="col-md-6 col-8 col-sm-8 col-8 col-xs-8">
                <h3 className="dark-text-value">
                  {offer?.classofbusiness.business_name
                    .toUpperCase()
                    .replace("FLEET", "")
                    .toLowerCase()}
                </h3>
              </div>
            </div>
            {["Motor Comprehensive", "Motor Comprehensive Fleet"].includes(
              offer?.classofbusiness.business_name
            ) && (
              <div className="row mb-2">
                <div className="col-md-6 col-4 col-sm-4 col-4 col-xs-4">
                  <h3 className="dark-text">REGISTRATION:</h3>
                </div>
                <div className="col-md-6 col-8 col-sm-8 col-8 col-xs-8">
                  <h3 className="dark-text-value">
                    {
                      JSON.parse(offer?.offer_detail.offer_details).find(
                        (el) =>
                          el.keydetail === "Vehicle Reg No." ||
                          el.keydetail === "Vehicle Reg No"
                      )?.value
                    }
                  </h3>
                </div>
              </div>
            )}
            <div className="row mb-2">
              <div className="col-md-6 col-4 col-sm-4 col-4 col-xs-4">
                <h3 className="dark-text">Form:</h3>
              </div>
              <div className="col-md-6 col-8 col-sm-8 col-8 col-xs-8">
                <h3 className="dark-text-value">
                  As Original and/ Slip Policy Reins
                </h3>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-md-4 col-4 col-sm-4 col-xs-4">
                <h3 className="dark-text">Reinsured:</h3>
              </div>
              <div className="col-md-8 col-8 col-sm-8 col-xs-8">
                <h3 className="dark-text-value">
                  {offer?.insurer.insurer_company_name}
                </h3>
              </div>
            </div>
            {offer?.offer_retrocedent && (
              <div className="row mb-2">
                <div className="col-md-4 col-4 col-sm-4 col-xs-4">
                  <h3 className="dark-text">Retrocedent:</h3>
                </div>
                <div className="col-md-8 col-8 col-sm-8 col-xs-8">
                  <h3 className="dark-text-value">
                    {offer?.offer_retrocedent?.reinsurer?.re_company_name}
                  </h3>
                </div>
              </div>
            )}
            <div className="row mb-2">
              <div className="col-md-6 col-6 col-sm-6 col-xs-12">
                <h3 className="dark-text">Insured :</h3>
              </div>
              <div className="col-md-6 col-8 col-sm-8 col-xs-8">
                <h3 className="dark-text-value">
                  {offer?.offer_detail.insured_by}
                </h3>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-md-6 col-6 col-sm-6 col-xs-12">
                <h3 className="dark-text">Period:</h3>
              </div>
              <div className="col-md-6 col-8 col-sm-8 col-xs-8">
                <h3 className="dark-text-value">{showDate(offer)}</h3>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-md-6 col-6 col-sm-6 col-xs-12">
                <h3 className="dark-text">Currency:</h3>
              </div>
              <div className="col-md-6 col-8 col-sm-8 col-xs-8">
                <h3 className="dark-text-value">
                  {getCurrencyFullName(offer?.offer_detail.currency)}
                </h3>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-md-6 col-6 col-sm-6 col-xs-12">
                <h3 className="dark-text">100% Premium:</h3>
              </div>
              <div className="col-md-6 col-8 col-sm-8 col-xs-8">
                <h3 className="dark-text-value">
                  {offer?.exchange_rate?.ex_currency}{" "}
                  {offer?.premium.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })}
                </h3>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-md-6 col-6 col-sm-6 col-xs-12">
                <h3 className="dark-text">Original Offer:</h3>
              </div>
              <div className="col-md-6 col-8 col-sm-8 col-xs-8">
                <h3 className="dark-text-value">
                  {offer?.facultative_offer}% of 100.00%
                </h3>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-md-6 col-6 col-sm-6 col-xs-12">
                <h3 className="dark-text">Placed Offer:</h3>
              </div>
              <div className="col-md-6 col-8 col-sm-8 col-xs-8">
                <h3 className="dark-text-value">
                  {offer?.placed_offer}% of 100.00%
                </h3>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-md-6 col-6 col-sm-6 col-xs-12">
                <h3 className="dark-text">Facultative Premium:</h3>
              </div>
              <div className="col-md-6 col-8 col-sm-8 col-xs-8">
                <h3 className="dark-text-value">
                  {offer?.exchange_rate?.ex_currency}{" "}
                  {offer?.fac_premium.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })}
                </h3>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-md-6 col-6 col-sm-6 col-xs-12">
                <h3 className="dark-text">Payable</h3>
              </div>
              <div className="col-md-6 col-8 col-sm-8 col-xs-8">
                <h3 className="dark-text-value">In full at inception</h3>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-md-6 col-6 col-sm-6 col-xs-12">
                <h3 className="dark-text">Commission:</h3>
              </div>
              <div className="col-md-6 col-8 col-sm-8 col-xs-8">
                <h3 className="dark-text-value">
                  {offer?.exchange_rate?.ex_currency}{" "}
                  {offer?.commission_amount.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })}
                </h3>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-md-6 col-6 col-sm-6 col-xs-12">
                <h3 style={{ fontWeight: "bolder" }} className="dark-text">
                  Amount now due to KEK RE:
                </h3>
              </div>
              <div className="col-md-6 col-8 col-sm-8 col-xs-8">
                <h3
                  style={{ fontWeight: "bolder" }}
                  className="dark-text-value"
                >
                  {offer?.exchange_rate?.ex_currency}{" "}
                  {(
                    parseFloat(offer?.fac_premium) -
                    parseFloat(offer?.commission_amount)
                  ).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PreviewCoverNote;
