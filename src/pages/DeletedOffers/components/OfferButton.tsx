import { useMutation } from "@apollo/client";
import React from "react";
import swal from "sweetalert";
import { REINSTATE_FAC_OFFER } from "../../../graphql/mutattions/renewal";
import {
  ReinstateFacOffer,
  ReinstateFacOfferVariables,
} from "../../../graphql/mutattions/__generated__/ReinstateFacOffer";
import { ReinsitementOffers } from "../../../graphql/queries/reinstatement";

interface IProps {
  offer: any;
}

const OfferButton = ({ offer }: IProps) => {
  const [reinstate] = useMutation<
    ReinstateFacOffer,
    ReinstateFacOfferVariables
  >(REINSTATE_FAC_OFFER, {
    refetchQueries: [{ query: ReinsitementOffers }],
  });

  const handleReinstate = () => {
    swal({
      title: "Are you sure?",
      text: `Reinstating this offer will allow you to make modifications to this offer. \n\n NB:All reinstated offers are moved to the "Create Slip" session`,
      icon: "warning",
      buttons: {
        cancel: {
          text: "Cancel",
          value: null,
          visible: true,
          className: "btn",
          closeModal: true,
        },
        confirm: {
          text: "Reinstate",
          value: true,
          closeModal: false,
          className: "btn btn-success",
        },
      },
      dangerMode: true,
    })
      .then((willReinstate) => {
        if (willReinstate) {
          reinstate({
            variables: {
              id: offer.offer_id,
            },
          })
            .then((res) => {
              swal("Reinstated!", "Offer reinstated successfully", "success");
            })
            .catch((err) => {
              swal("Error", err.message, "error");
            });
        }
      })
      .catch((err) => {
        console.log(err);
        swal("Error", err.message, "error");
      });
  };
  return (
    <>
      <button
        onClick={handleReinstate}
        className="btn btn-warning btn-sm w-md btn-square"
      >
        Reinstate Offer
      </button>
    </>
  );
};

export default OfferButton;
