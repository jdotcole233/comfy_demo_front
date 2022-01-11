import { useQuery } from "@apollo/client";
import { INSURERS } from "../../../graphql/queries";
import { Insurers } from "../../../graphql/queries/__generated__/Insurers";

export const useInsurers = () => {
  const { data, loading, error } = useQuery<Insurers>(INSURERS, {
    fetchPolicy: "network-only",
  });
  return { insurers: data?.insurers, loading, error };
};
