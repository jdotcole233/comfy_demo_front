import React, { useMemo } from "react";
import { Datatable } from "../../../components";
import { treatyColumns } from "./columns";
import moment from "moment";
import TreatyButtons from "./TreatyButtons";
import { useBrokerDetailsContext } from "../provider/BrokerDetailsProvider";

const BrokerDetailTreaties = ({}) => {
  const { broker } = useBrokerDetailsContext();
  const treaties = useMemo(() => {
    const list = [];
    if (broker && broker.re_broker_participations) {
      broker.re_broker_participations.map(
        ({ treaty, surplus_participation, xl_particiation }, i) => {
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
                _payments={surplus_participation || xl_particiation}
                reinsurer_id={broker?.reinsurer_id}
              />
            ),
          };
          list.push(row);
          return treaty;
        }
      );
    }
    return list;
  }, [broker]);
  return (
    <div className="col-md-12">
      <h4 className=" mb-4">Treaties</h4>
      <div className="card">
        <div className="card-body">
          <Datatable data={treaties} entries={5} columns={treatyColumns} />
        </div>
      </div>
    </div>
  );
};

export default BrokerDetailTreaties;
