import React, { Fragment } from "react";
import { Datatable } from "../../components";
import { deductionsColumns, deductionsColumns2 } from "./columns";
import DeductionButtons from "./DeductionButtons";
import { dateBuilder } from "./Treaty";

const ViewDeductions = ({ deductions, treaty, setOpenDeductions }) => {
  const data = deductions.map((el) => ({
    ...el,
    commission: el.commission || "N/A",
    period: dateBuilder(el),
    actions: (
      <DeductionButtons
        deduction={el}
        setOpenDeductions={setOpenDeductions}
        treaty={treaty}
      />
    ),
  }));

  return (
    <Fragment>
      <div className="d-flex mt-4 justify-content-between px-4 pt-2">
        <div className="d-flex flex-column justify-content-center ">
          <h4>{treaty?.treaty_name}</h4>
          <p>{treaty?.insurer?.insurer_company_name}</p>
          <p>
            {" "}
            Last Known Period:{" "}
            <span className="text-success">
              {treaty?.treaty_associate_deductions.length > 0
                ? dateBuilder(treaty?.treaty_associate_deductions[0])
                : null}
            </span>
          </p>
        </div>
        <div>
          <button
            onClick={setOpenDeductions}
            className="btn btn-sm w-md waves-effect btn-primary mt-3 mr-4"
          >
            New Deduction
          </button>
        </div>
      </div>

      <div className="mx-4">
        <Datatable
          entries={4}
          columns={
            treaty && treaty?.treaty_type === "PROPORTIONAL"
              ? deductionsColumns
              : deductionsColumns2
          }
          data={data}
        />
      </div>
    </Fragment>
  );
};

export default ViewDeductions;
