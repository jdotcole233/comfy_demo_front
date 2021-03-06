import React from "react";
import ReactExport from "react-export-excel";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const CSVComponent = ({ reports, totals, type }) => {
  return (
    <ExcelFile
      filename={"Brokerage Statment"}
      element={
        <button className="btn btn-success btn-sm w-md waves-effect waves-light">
          <i className="bx bx-save mr-1"></i>
          save as excel
        </button>
      }
    >
      <ExcelSheet data={reports} name="Brokerage Statement">
        <ExcelColumn label="Policy # " value="policy_number" />
        <ExcelColumn
          label={
            type === "Reinsurer"
              ? "Reinsurer"
              : type === "All"
              ? "Insurer/Reinsurer"
              : "Insurer"
          }
          value={
            type === "Reinsurer"
              ? "re_company_name"
              : type === "All"
              ? "re_company_name"
              : "insurer_company_name"
          }
        />
        <ExcelColumn label="Insured" value="insured_by" />
        <ExcelColumn label="Business Name" value="business_name" />
        <ExcelColumn label="Currency" value="currency" />
        <ExcelColumn label="Total Sum Insured" value="sum_insured" />
        <ExcelColumn label="Fac. Sum Insured" value="fac_sum_insured" />
        <ExcelColumn label="Fac.Premium" value="fac_premium" />
        <ExcelColumn label="Brokerage" value="brokerage_amount" />
        <ExcelColumn label="Premium due KEK" value="expected_amount" />
        <ExcelColumn label="Outstanding premium" value="outstanding_amount" />
        <ExcelColumn label="Period of Insurance" value="period" />
        <ExcelColumn label="Placed Share" value="placed_offer" />
        <ExcelColumn label="Offer Status" value="offer_status" />
        <ExcelColumn label="Payment Status" value="payment_status" />
        <ExcelColumn label="Offer Date" value="offer_date" />
        <ExcelColumn label="Closed Date" value="closed_date" />
      </ExcelSheet>
      <ExcelSheet data={totals} name="Total Currencies">
        <ExcelColumn label="Currency" value="currency" />
        <ExcelColumn label="Fac. Sum Insured " value="fac_sum_insured" />
        <ExcelColumn label="Fac. Premium" value="fac_premium" />
        <ExcelColumn label="Brokerage" value="brokerage" />
      </ExcelSheet>
    </ExcelFile>
  );
};

export default CSVComponent;
