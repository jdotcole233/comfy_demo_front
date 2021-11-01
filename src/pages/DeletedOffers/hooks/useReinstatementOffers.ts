import { useQuery } from "@apollo/client"
import { ReinsitementOffers } from "../../../graphql/queries/reinstatement"
import { ReinstatmentOffers } from "../../../graphql/queries/__generated__/ReinstatmentOffers"


export const useReinstatementOffers = () => {
    const { data, loading, error } = useQuery<ReinstatmentOffers>(ReinsitementOffers);
    return { offers: data?.reinstate_offers, loading, error };
}