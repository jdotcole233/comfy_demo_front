import { useMutation } from "@apollo/client";
import React from "react";
import { useMemo, useState } from "react";
import swal from "sweetalert";
import { Modal } from "../../../components";
import { RENEW_FAC_OFFER } from "../../../graphql/mutattions/renewal";
import {
  RenewFacOffer,
  RenewFacOfferVariables,
} from "../../../graphql/mutattions/__generated__/RenewFacOffer";
import { OFFERS } from "../../../graphql/queries";

interface Props {
  offer: Record<string, any>;
}

const OfferRenewal = ({ offer }: Props) => {
  const [showPrompt, setShowPrompt] = useState(false);

  const [renew] = useMutation<RenewFacOffer, RenewFacOfferVariables>(
    RENEW_FAC_OFFER,
    {
      refetchQueries: [
        { query: OFFERS, variables: { offer_status: ["CLOSED"], skip: 0 } },
      ],
    }
  );

  const hasEndorsement = useMemo(
    () => offer?.endorsements?.length > 0,
    [offer]
  );

  const onRenewClicked = () => {
    // setShowPrompt(true);
    swal({
      title: "Are you sure?",
      text: hasEndorsement
        ? "Renewal will be initialized from last know endorsement."
        : "Do you wish to process to renew offer ?",
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
