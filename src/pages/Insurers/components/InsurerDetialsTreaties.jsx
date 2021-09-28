import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import TreatyButtons from "./TreatyButtons";
import CreateTreatyButton from "./CreateTreatyButton";
import { treatyColumns } from "../dummy";
import { Datatable } from "../../../components";
import GeneratePaymentSchedulePluginButton from "../../BrokerGeneratePaymentSchedule/components/GeneratePaymentSchedulePluginButton";
import { useAuth } from "../../../context/AuthContext";
import { generateList } from "../../../utils";

const InsurerDetialsTreaties = ({ refetch, insurer = {} }) => {
  const { type } = useSelector((state) => state.insurer);
  const [status, setStatus] = useState("UNPAID");
  const { user } = useAuth();
  const treaties = useMemo(() => {
    const list = [];
    if (insurer && insurer.treaties) {
      insurer.treaties.map((treaty) => {
        const currency =
          treaty?.treaty_program?.treaty_type === "PROPORTIONAL"
            ? JSON.parse(treaty?.treaty_details ?? "[]").find(
                (el) => el.keydetail.toLowerCase() === "currency"
              )?.value
            : treaty?.currency;
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
          currency: currency,
          status: treaty.treaty_payment_status,
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

  const isFinExec = user?.user_role?.position === "Finance Executive";

  return type === "Treaty" ? (
    <div className="col-md-12">
      <div className="card">
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <h4 className="card-title mb-4">Treaties</h4>
            <div>
              <GeneratePaymentSchedulePluginButton {...insurer} />
              <CreateTreatyButton refetch={refetch} insurer={insurer} />
            </div>
          </div>
          <div className="">
            {isFinExec && (
              <div className="row mb-3">
                <div
                  className="btn-group"
                  role="group"
                  aria-label="Basic example"
                >
                  <button
                    onClick={() => setStatus("UNPAID")}
                    type="button"
                    className={`btn btn-${
                      status !== "UNPAID" ? "secondary" : "success"
                    }`}
                  >
                    Unpaid
                  </button>
                  <button
                    onClick={() => setStatus("PARTPAYMENT")}
                    type="button"
                    className={`btn btn-${
                      status !== "PARTPAYMENT" ? "secondary" : "success"
                    }`}
                  >
                    Partpayment
                  </button>
                  <button
                    onClick={() => setStatus("PAID")}
                    type="button"
                    className={`btn btn-${
                      status !== "PAID" ? "secondary" : "success"
                    }`}
                  >
                    Paid
                  </button>
                </div>
              </div>
            )}
          </div>
          <Datatable
            btn
            entries={5}
            hover
            striped
            responsive
            bordered
            data={generateList(treaties, status, user?.user_role?.position)}
            columns={treatyColumns}
          />
        </div>
      </div>
    </div>
  ) : null;
};

export default InsurerDetialsTreaties;
