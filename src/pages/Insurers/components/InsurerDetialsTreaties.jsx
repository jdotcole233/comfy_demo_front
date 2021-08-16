import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import TreatyButtons from "./TreatyButtons";
import CreateTreatyButton from "./CreateTreatyButton";
import { treatyColumns } from "../dummy";
import { Datatable } from "../../../components";

const InsurerDetialsTreaties = ({ refetch, insurer = {} }) => {
  const { type } = useSelector((state) => state.insurer);

  const treaties = useMemo(() => {
    const list = [];
    if (insurer) {
      insurer.treaties.map((treaty) => {
        const row = {
          ...treaty,
          employee: `${treaty?.employee?.employee_first_name} ${treaty?.employee?.employee_last_name}`,
          period: `${moment(
            treaty?.treaty_deduction?.treaty_period_from
          ).format("DD-MMM, YY")} to ${moment(
            treaty?.treaty_deduction?.treaty_period_to
          ).format("DD-MMM, YY")}`,
          treaty_program: treaty.treaty_program?.treaty_name,
          program_type: treaty.treaty_program?.treaty_type,
          treaty_payment_status: (
            <span
              style={{ letterSpacing: 5, padding: 3 }}
              className={`badge badge-soft-${
                treaty?.treaty_payment_status === "PARTPAYMENT"
                  ? "primary"
                  : treaty.treaty_payment_status === "UNPAID"
                  ? "danger"
                  : "success"
              } font-size-11`}
            >
              {treaty.treaty_payment_status}
            </span>
          ),
          actions: (
            <TreatyButtons
              refetch={refetch}
              treaty={treaty}
              insurer={insurer}
            />
          ),
        };
        list.push(row);
        return treaty;
      });
    }
    return list;
  }, [insurer, refetch]);

  return type === "Treaty" ? (
    <div className="col-md-12">
      <div className="card">
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <h4 className="card-title mb-4">Treaties</h4>
            <CreateTreatyButton refetch={refetch} insurer={insurer} />
          </div>
          <Datatable
            btn
            entries={5}
            hover
            striped
            responsive
            bordered
            data={treaties}
            columns={treatyColumns}
          />
        </div>
      </div>
    </div>
  ) : null;
};

export default InsurerDetialsTreaties;
