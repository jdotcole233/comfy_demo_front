/* eslint-disable no-throw-literal */
import React, { useState, useContext } from "react";
import { DropdownButton, ButtonGroup, Dropdown } from "react-bootstrap";
import swal from "sweetalert";
import { useMutation } from "@apollo/client";
import { DELETE_OFFER } from "../../../graphql/mutattions";
import { OFFERS } from "../../../graphql/queries";
import { useHistory } from "react-router-dom";
import { Drawer } from "../../../components";
import EditOffer from "../EditOffer";
import GenerateSlip from "../GenerateSlip";
import { AuthContext } from "../../../context/AuthContext";
import {
  deleteAccessRoles,
  editAccessRoles,
} from "../../../layout/adminRoutes";
import OfferComments from "../OfferComments";

const OfferButtons = ({ offer }) => {
  const {
    state: { user },
  } = useContext(AuthContext);
  const history = useHistory();
  const [editOfferDrawer, setEditOfferDrawer] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [generateSlip, setGenerateSlip] = useState(false);
  const [viewComments, setViewComments] = useState(false);
  const handleShowEditDrawer = () => {
    setSelectedOffer(JSON.stringify(offer));
    setEditOfferDrawer(!editOfferDrawer);
  };

  const handleShowCommentsDrawer = () => {
    setSelectedOffer(JSON.stringify(offer));
    setViewComments(!viewComments);
  };

  const handleGenerateSlip = () => {
    setGenerateSlip(!generateSlip);
  };

  // Delete Offer Mutation
  const [deleteoffer] = useMutation(DELETE_OFFER, {
    refetchQueries: [
      { query: OFFERS, variables: { offer_status: ["OPEN", "PENDING"] } },
    ],
  });

  const handleDeleteOffer = () => {
    swal({
      closeOnClickOutside: false,
      closeOnEsc: true,
      icon: "warning",
      title: "Delete offer?",
      text: `This action will remove offer with policy number ${offer?.offer_detail?.policy_number} completely from the system`,
      buttons: ["Cancel", { text: "Agree", closeModal: false }],
    }).then((input) => {
      if (!input) throw {};
      deleteoffer({
        variables: { id: offer?.offer_id },
      })
        .then((res) => {
          swal("Success", "Offer Deleted successfully", "success");
        })
        .catch((err) => {
          if (err) {
            swal("Oh noes!", "The AJAX request failed!", "error");
          } else {
            swal.stopLoading();
            swal.close();
          }
        });
    });
  };

  const offer_id = offer?.offer_id;

  return (
    <div>
      <>
        <DropdownButton
          className="mr-1 mb-1"
          variant="danger"
          size="sm"
          as={ButtonGroup}
          id="dropdown-basic-button"
          title="Offer Action"
        >
          <Dropdown.Item
            onClick={() => {
              history.push({
                pathname: "/admin/view-offer",
                state: { offer_id },
              });
            }}
          >
            {/* <Link className="text-dark" to={{}}> */}
            View offer
            {/* </Link> */}
          </Dropdown.Item>
          {editAccessRoles.includes(user?.position) && (
            <Dropdown.Item onClick={handleShowEditDrawer}>
              Edit offer
            </Dropdown.Item>
          )}
          {deleteAccessRoles.includes(user?.position) && (
            <Dropdown.Item onClick={handleDeleteOffer}>
              Delete offer
            </Dropdown.Item>
          )}
          <Dropdown.Item onClick={handleShowCommentsDrawer}>
            View Comments
          </Dropdown.Item>
        </DropdownButton>
        <button onClick={handleGenerateSlip} className="btn btn-primary btn-sm">
          Generate Slip
        </button>
      </>
      {/* Edit Offer Drawer */}
      {editOfferDrawer && (
        <Drawer
          isvisible={editOfferDrawer}
          width="40%"
          toggle={() => setEditOfferDrawer(!editOfferDrawer)}
        >
          <EditOffer
            offer={selectedOffer}
            offer_id={offer_id}
            toggle={() => setEditOfferDrawer(!editOfferDrawer)}
          />
        </Drawer>
      )}

      {/* Generate Slip Drawer */}
      <Drawer
        isvisible={generateSlip}
        width="50%"
        toggle={() => setGenerateSlip(!generateSlip)}
      >
        <GenerateSlip offer={offer} />
      </Drawer>

      {/* Offer Comments */}
      <Drawer
        isvisible={viewComments}
        width="40%"
        toggle={() => setViewComments(!viewComments)}
      >
        <OfferComments
          offer={offer}
          closed={!viewComments}
          setClose={setViewComments}
        />
      </Drawer>
    </div>
  );
};

export default OfferButtons;
