import moment from "moment";
import React from "react";
import { useMemo } from "react";
import { useQuery } from "@apollo/client";
import { TreatyClaimsButtons } from "../../components";
import { TREATY_CLAIMS } from "../../graphql/queries/treaty";
import TreatyClaimsProvider from "./Providers/TreatyClaimsProvider";
import TreatyClaims from "./TreatyClaims";

export default () => {
  const { data, loading } = useQuery(TREATY_CLAIMS);

  const claims = useMemo(() => {
    if (data && data?.all_treaties)
      return data.all_treaties.map((treaty, i) => ({
        ...treaty,
        employee: `${treaty?.employee.employee_first_name} ${treaty?.employee.employee_last_name}`,
        period: `${moment(treaty?.treaty_deduction?.treaty_period_from).format(
          "DD-MMM, YY"
        )} to ${moment(treaty?.treaty_deduction?.treaty_period_to).format(
          "DD-MMM, YY"
        )}`,
        treaty_program: treaty.treaty_program?.treaty_name,
        program_type: treaty.treaty_program?.treaty_type,
        reinsured: treaty?.insurer?.insurer_company_name,
        treaty_payment_status: (
          <span
            style={{ letterSpacing: 5, padding: 3 }}
            className={`badge badge-soft-${treaty?.treaty_payment_status === "PARTPAYMENT"
              ? "primary"
              : treaty.treaty_payment_status === "UNPAID"
                ? "danger"
                : "success"
              } font-size-11`}
          >
            {treaty.treaty_payment_status}
          </span>
        ),
        actions: <TreatyClaimsButtons treaty={treaty} />,
      }));
    return [];
  }, [data]);

  const count = useMemo(() => {
    if (data && data?.all_treaties) return data?.all_treaties?.length;
    return 0;
  }, [data]);

  return (
    <TreatyClaimsProvider value={{ claims, count, loading }}>
      <TreatyClaims />
    </TreatyClaimsProvider>
  );
};
