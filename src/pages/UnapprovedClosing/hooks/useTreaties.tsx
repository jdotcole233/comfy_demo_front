import { useQuery } from "@apollo/client";
import moment from "moment";
import { TREATY_CLAIMS } from "../../../graphql/queries/treaties";

import React from "react";
import TreatiesButton from "../tabs/TreatiesButton";
import { TreatyType } from "../../../graphql/__generated__/globalTypes";
import {
  UnapporvedTreatyClaims,
  UnapporvedTreatyClaimsVariables,
  UnapporvedTreatyClaims_all_treaties,
} from "../../../graphql/queries/__generated__/unapporvedTreatyClaims";

export const useTreaties = (variables: UnapporvedTreatyClaimsVariables) => {
  const { data, loading, error } = useQuery<
    UnapporvedTreatyClaims,
    UnapporvedTreatyClaimsVariables
  >(TREATY_CLAIMS, {
    variables,
  });
  return {
    treaties: data?.all_treaties?.map((treaty) => ({
      ...treaty,
      employee: `${treaty?.employee?.employee_first_name} ${treaty?.employee?.employee_last_name}`,
      period: `${moment(treaty?.treaty_deduction?.treaty_period_from).format(
        "DD-MMM, YY"
      )} to ${moment(treaty?.treaty_deduction?.treaty_period_to).format(
        "DD-MMM, YY"
      )}`,
      treaty_program: treaty?.treaty_program?.treaty_name,
      program_type: treaty?.treaty_program?.treaty_type,
      reinsured: treaty?.insurer?.insurer_company_name,
      treaty_payment_status: (
        <span
          style={{ letterSpacing: 5, padding: 3 }}
          className={`badge badge-soft-${
            treaty?.treaty_program?.treaty_type === TreatyType["PROPORTIONAL"]
              ? "primary"
              : "success"
          } font-size-11`}
        >
          {treaty?.treaty_program?.treaty_type}
        </span>
      ),
      actions: (
        <TreatiesButton
          treaty={treaty as UnapporvedTreatyClaims_all_treaties}
        />
      ),
    })),
    loading,
    error,
  };
};
