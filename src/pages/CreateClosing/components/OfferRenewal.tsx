import { useMutation } from "@apollo/client";
import React from "react";
import { useMemo } from "react";
import swal from "sweetalert";
import { RENEW_FAC_OFFER } from "../../../graphql/mutattions/renewal";
import {
  RenewFacOffer,
  RenewFacOfferVariables,
} from "../../../graphql/mutattions/__generated__/RenewFacOffer";
import { OFFERS } from "../../../graphql/queries";
import _ from "lodash";

interface Props {
  offer: Record<string, any>;
}

const OfferRenewal = ({ offer }: Props) => {
  const [renew] = useMutation<RenewFacOffer, RenewFacOfferVariables>(
    RENEW_FAC_OFFER,
    {
      refetchQueries: [
        { query: OFFERS, variables: { offer_status: ["CLOSED"], skip: 0 } },
      ],
    }
  );

  const hasEndorsement = useMemo(
    () => _.last(offer?.offer_endorsements) || null,
    [offer]
  );

  const onRenewClicked = () => {
    swal({
      title: "Are you sure?",
      text: hasEndorsement
        ? "Renewal will be initialized from last know endorsement."
        : "Do you wish to process to renew offer ?",
      // text: JSON.stringify(hasEndorsement),
      icon: "warning",
      buttons: {
        cancel: { text: "Abort", value: false, visible: true },
        confirm: { text: "Continue", value: true, closeModal: false },
      },
    })
      .then((willRenew) => {
        if (willRenew) {
          renew({ variables: { id: offer?.offer_id } })
            .then(() => {
              swal("Renewed!", "Offer renewed successfully", "success");
            })
            .catch(() => {
              swal("Error!", "Offer renewal failed", "error");
            });
        }
      })
      .catch((e) => {
        swal("Error!", "Offer renewal failed", "error");
      });
  };

  return (
    <>
      <button
        onClick={onRenewClicked}
        className="btn btn-sm w-md btn-success mb-1 mr-1"
      >
        Renew Offer
      </button>
    </>
  );
};

export default OfferRenewal;
