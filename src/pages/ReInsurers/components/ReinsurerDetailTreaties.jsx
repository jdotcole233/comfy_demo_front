import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { Datatable } from "../../../components";
import { treatyColumns } from "../columns";
import moment from "moment";
import TreatyButtons from "./TreatyButtons";

const ReinsurerDetailTreaties = ({ reinsurer }) => {
  const { type } = useSelector((state) => state.reinsurer);

  const treaties = useMemo(() => {
    const list = [];
    if (reinsurer) {
      reinsurer.treaty_participations.map(
        ({ treaty, treaty_participant_payments }, i) => {
          const row = {
            ...treaty,
            employee: `${treaty?.employee.employee_first_name} ${treaty?.employee.employee_last_name}`,
            period: `${moment(
              treaty?.treaty_deduction?.treaty_period_from
            ).format("DD-MMM, YY")} to ${moment(
              treaty?.treaty_deduction?.treaty_period_to
            ).format("DD-MMM, YY")}`,
            treaty_program: treaty?.treaty_program?.treaty_name,
            program_type: treaty?.treaty_program?.treaty_type,
            treaty_payment_status: (
              <span
                style={{ letterSpacing: 5, padding: 3 }}
                className={`badge badge-soft-${
                  treaty?.treaty_payment_status === "PARTPAYMENT"
                    ? "primary"
                    : treaty?.treaty_payment_status === "UNPAID"
                    ? "danger"
                    : "success"
                } font-size-11`}
              >
                {treaty?.treaty_payment_status}
              </span>
            ),
            actions: (
              <TreatyButtons
                treaty={treaty}
                _payments={treaty_participant_payments}
                reinsurer_id={reinsurer?.reinsurer_id}
              />
            ),
          };
          list.push(row);
          return treaty;
        }
      );
    }
    return list;
  }, [reinsurer]);

  return type === "Treaty" ? (
    <div className="col-md-12">
      <div className="card">
        <div className="card-body">
          <h4 className="card-title mb-4">Treaties</h4>
          <Datatable data={treaties} entries={5} columns={treatyColumns} />
        </div>
      </div>
    </div>
  ) : null;
};

export default ReinsurerDetailTreaties;
