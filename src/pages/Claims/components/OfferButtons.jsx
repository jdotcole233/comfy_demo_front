/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-throw-literal */
import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { useMutation } from "react-apollo";
import { Alert } from "react-bootstrap";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import { Datatable, Drawer, Editor, Modal } from "../../../components";
import { AuthContext } from "../../../context/AuthContext";
import {
  REMOVE_CLAIM_AMOUNT,
  UPDATE_CLAIM_AMOUNT,
} from "../../../graphql/mutattions";
import { ALLOFFERS, OFFERS } from "../../../graphql/queries";
import {
  deleteAccessRoles,
  editAccessRoles,
} from "../../../layout/adminRoutes";
import ClaimRequest from "../ClaimRequest";
import { claimsColumns, distributionsColumns } from "../columns";
import MakeClaim from "../MakeClaim";
import PreviewClaimDebitNote from "../PreViewClaimDebitNote";
import SendSingleDebitNote from "../SendSingleClaimDebitNote";
import styles from "../styles/card.module.css";
import ClaimsButtons from "./ClaimsButtons";

const OfferButtons = ({ offer }) => {
  const {
    state: { user },
  } = useContext(AuthContext);
  const { register, setValue, errors, handleSubmit } = useForm();
  const [makeClaimDrawer, setMakeClaimDrawer] = useState(false);
  const [showClaimDebitNote, setShowClaimDebitNote] = useState(false);
  const [claims, setClaims] = useState([]);
  const [claimsDistribution, setClaimsDistribution] = useState([]);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [offerOverview, setOfferOverview] = useState(null);
  const [distributionList, setDistributionList] = useState(null);
  const [viewDistribution, setViewDistribution] = useState(false);
  const [showUpdateClaimAmount, setShowUpdateClaimAmount] = useState(false);
  const [selectedClaim, setSelectedClaim] = useState(null);
  const [selectedShare, setSelectedShare] = useState(null);
  const [showClaimRequest, setShowClaimRequest] = useState(false);
  const [showSingleClaimSendBox, setShowSingleClaimSendBox] = useState(false);
  const [claimComment, setClaimComment] = useState("");
  const [showClaimsModal, setShowClaimsModal] = useState(false);
  const [skip] = useState(0);

  const [updateClaimAmount] = useMutation(UPDATE_CLAIM_AMOUNT, {
    refetchQueries: [
      {
        query: OFFERS,
        variables: {
          offer_status: ["CLOSED"],
          skip,
        },
      },
      {
        query: ALLOFFERS,
        variables: {
          offer_status: ["CLOSED"],
          skip,
        },
      },
    ],
  });

  const [removeClaim] = useMutation(REMOVE_CLAIM_AMOUNT, {
    refetchQueries: [
      {
        query: OFFERS,
        variables: {
          offer_status: ["CLOSED"],
          skip,
        },
      },
      {
        query: ALLOFFERS,
        variables: {
          offer_status: ["CLOSED"],
          skip,
        },
      },
    ],
  });

  const handleViewClaimsModal = (offer) => {
    setSelectedOffer(offer);
    setShowClaimsModal(!showClaimsModal);
  };

  const handleViewMakeClaimDrawer = (offer) => {
    setSelectedOffer(offer);
    setMakeClaimDrawer(true);
  };

  const handleViewClaimRequest = (offer) => {
    setSelectedOffer(offer);
    setShowClaimRequest(!showClaimRequest);
  };

  const handleUpdateClaimAmount = (values) => {
    swal({
      icon: "warning",
      closeOnClickOutside: false,
      title: "Are you sure ?",
      buttons: ["No", { text: "Yes", closeModal: false }],
    }).then((input) => {
      if (!input) throw null;
      updateClaimAmount({
        variables: {
          claim_id: selectedClaim?.offer_claim_id,
          data: {
            offer_id: selectedOffer?.offer_id,
            claim_amount: values.claim_amount,
            claim_date: values.claim_date,
            claim_comment: values.claim_comment,
          },
        },
      })
        .then((res) => {
          setShowClaimsModal(false);
          setShowUpdateClaimAmount(false);
          swal("Success", "Claim removed successfully", "success");
          // refetch()
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

  useEffect(() => {
    if (selectedOffer) {
      const rows = [];
      selectedOffer.offer_claims.map((claim) => {
        const row = {
          claim_amount:
            selectedOffer?.offer_detail?.currency + " " + claim.claim_amount,
          claim_date: new Date(claim.claim_date).toDateString(),
          created_at: new Date(claim.created_at).toDateString(),
          actions: (
            <ClaimsButtons
              offer={offer}
              claim={claim}
              closeParent={setShowClaimsModal}
            />
          ),
        };
        rows.push(row);
        return row;
      });
      setClaims(rows);
    }
  }, [selectedOffer]);

  return (
    <>
      <button
        onClick={() => handleViewClaimsModal(offer)}
        className="btn btn-danger btn-sm m-1"
      >
        View claims
      </button>
      {offer?.payment_status !== "UNPAID" && (
        <button
          onClick={() => handleViewMakeClaimDrawer(offer)}
          className="btn btn-primary btn-sm m-1"
        >
          Make claim
        </button>
      )}
      {offer?.payment_status !== "UNPAID" && (
        <button
          onClick={() => handleViewClaimRequest(offer)}
          className="btn btn-success mt-1 btn-sm m-1"
        >
          Claim Request
        </button>
      )}

      {/* Create business modal */}
      <Drawer
        width="40%"
        toggle={() => setMakeClaimDrawer(!makeClaimDrawer)}
        isvisible={makeClaimDrawer}
      >
        <MakeClaim
          offer={selectedOffer}
          toggle={() => setMakeClaimDrawer(!makeClaimDrawer)}
        />
      </Drawer>

      {/* Show Drawer for claim request */}
      <Drawer
        width="50%"
        isvisible={showClaimRequest}
        toggle={() => setShowClaimRequest(!showClaimRequest)}
      >
        <ClaimRequest
          offer={selectedOffer}
          toggle={() => setShowClaimRequest(!showClaimRequest)}
        />
      </Drawer>

      <Modal
        show={showUpdateClaimAmount}
        onHide={() => setShowUpdateClaimAmount(false)}
      >
        <Modal.Header className="bg-soft-dark" closeButton>
          <p>
            {" "}
            Update Claim amount (
            <strong>{`${selectedOffer?.offer_detail?.currency} ${selectedClaim?.claim_amount}`}</strong>
            ) made on{" "}
            <strong>
              {new Date(selectedClaim?.claim_date).toDateString()}
            </strong>
          </p>
        </Modal.Header>
        <Modal.Body className="bg-soft-dark">
          <Alert variant="danger">
            <p>
              <strong>
                Changes made on this claim will affect all reinsurers'
                participation
              </strong>
            </p>
          </Alert>
          <form
            onSubmit={handleSubmit(handleUpdateClaimAmount)}
            className="row"
          >
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="">Claim Amount</label>
                <input
                  name="claim_amount"
                  ref={register({ required: "Required" })}
                  type="number"
                  className="form-control"
                />
                {errors.claim_amount && (
                  <p className="text-danger">{errors.claim_amount.message}</p>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="">Claim Date</label>
                <input
                  name="claim_date"
                  ref={register({ required: "Required" })}
                  type="date"
                  className="form-control"
                />
                {errors.claim_date && (
                  <p className="text-danger">{errors.claim_date.message}</p>
                )}
              </div>
            </div>
            {claimComment && (
              <div className="col-md-12">
                <div className="form-group">
                  <label htmlFor="">Claim Date</label>
                  <Editor
                    value={claimComment}
                    onChange={(value) => setClaimComment(value)}
                  />
                  <input
                    type="hidden"
                    value={claimComment}
                    name="claim_comment"
                    ref={register({ required: false })}
                  />
                </div>
              </div>
            )}
            {!claimComment && (
              <div className="col-md-12">
                <div className="form-group">
                  <label htmlFor="">Claim Date</label>
                  <Editor
                    value={claimComment}
                    onChange={(value) => setClaimComment(value)}
                  />
                  <input
                    type="hidden"
                    value={claimComment}
                    name="claim_comment"
                    ref={register({ required: false })}
                  />
                </div>
              </div>
            )}
            <div className="col-md-12">
              <div className="form-group">
                <input
                  type="submit"
                  className="btn btn-primary btn-block btn-sm"
                  value="Update"
                />
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>

      <Modal
        size="xl"
        show={showClaimsModal}
        onHide={() => setShowClaimsModal(!showClaimsModal)}
      >
        <Modal.Header closeButton>
          Claim History [{selectedOffer?.offer_detail?.policy_number}] -{" "}
          {selectedOffer?.insurer?.insurer_company_name}
        </Modal.Header>
        <Modal.Body>
          <fieldset className="border p-2 mb-2">
            <legend className={styles.details_title}>Details </legend>
            <table className="table">
              <tbody>
                <tr>
                  <td>Facultative offer</td>
                  <td>{selectedOffer?.facultative_offer}%</td>
                </tr>
                <tr>
                  <td>Facultative Sum Insured</td>
                  <td>
                    {selectedOffer?.offer_detail?.currency}{" "}
                    {selectedOffer?.fac_sum_insured.toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    })}{" "}
                  </td>
                </tr>
                <tr>
                  <td>Facultative Premium</td>
                  <td>
                    {selectedOffer?.offer_detail?.currency}{" "}
                    {selectedOffer?.fac_premium.toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    })}{" "}
                  </td>
                </tr>
              </tbody>
            </table>
          </fieldset>
          <Datatable columns={claimsColumns} data={claims} />
        </Modal.Body>
      </Modal>

      {/*  */}
    </>
  );
};

export default OfferButtons;
