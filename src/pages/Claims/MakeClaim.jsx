/* eslint-disable no-throw-literal */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from "react";
import styles from "./styles/card.module.css";
import { Alert } from "react-bootstrap";
import { useMutation } from "react-apollo";
import { MAKE_CLAIM_ON_OFFER } from "../../graphql/mutattions";
import { ALLOFFERS, OFFERS } from "../../graphql/queries";
import swal from "sweetalert";
import emptyImage from "../../assets/empty.png";
import { DrawerContext } from "../../components/Drawer";
import { Editor } from "../../components";
import plural from "pluralize";

const MakeClaim = ({ offer, toggle }) => {
  const { closed } = useContext(DrawerContext);
  const [claim_amount, setclaim_amount] = useState(0);
  const [claim_date, setclaim_date] = useState("");
  const [error, setError] = useState(false);
  const [comments, setComments] = useState("");
  const [makeClaim] = useMutation(MAKE_CLAIM_ON_OFFER, {
    refetchQueries: [
      { query: OFFERS, variables: { offer_status: ["CLOSED"] } },
      { query: ALLOFFERS, variables: { offer_status: ["CLOSED"], skip: 0 } },
    ],
  });
  const hasEndorsement =
    offer?.offer_endorsements[offer?.offer_endorsements?.length - 1];
  const amountSpent = offer?.offer_claims.reduce(
    (total, currentClaim) => total + parseFloat(currentClaim.claim_amount),
    0
  );
  const leftAmount = parseFloat(offer?.fac_sum_insured) - amountSpent;
  const handleMakeClain = (event) => {
    event.preventDefault();
    const data = {
      claim_amount,
      claim_date,
      offer_id: offer?.offer_id,
      claim_comment: comments,
    };
    swal({
      icon: "warning",
      title:
        "Are you sure you want to make claim of " +
        offer?.offer_detail?.currency +
        " " +
        claim_amount +
        "?",
      buttons: ["No", { text: "Yes", closeModal: false }],
    }).then((input) => {
      if (!input) throw {};
      makeClaim({ variables: { data } })
        .then((res) => {
          swal("Success", "Claimed made successfully", "success");
          setclaim_amount("");
          setclaim_date("");
          toggle();
        })
        .catch((err) => {
          if (err) {
            // console.log(err)
            swal("Oh noes!", "The AJAX request failed!", "error");
          } else {
            swal.stopLoading();
            swal.close();
          }
        });
    });
  };
  useEffect(() => {
    if (closed) {
      // reset();
      setclaim_amount("");
      setclaim_date("");
    }
  }, [closed]);

  useEffect(() => {
    if (leftAmount - parseFloat(claim_amount) < 0) {
      setError(true);
    } else {
      setError(false);
    }
  }, [claim_amount, setclaim_amount]);

  return (
    <>
      {leftAmount <= 0 ? (
        <div
          style={{
            height: 600,
            width: "100%",
            display: "flex",
            justifyContent: "space-around",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            src={emptyImage}
            style={{ height: 250, width: 200, borderRadius: 12 }}
            alt=""
          />
          <h2>All claims exhausted</h2>
        </div>
      ) : (
        <>
          <div className={styles.card_header}>
            <h2 className={styles.card_title}>Make Claim</h2>
            <Alert variant="danger">
              <strong></strong>
            </Alert>
            <fieldset className="border-form p-2 mb-2">
              <legend className={styles.offer_title}>
                Claim offer [{offer?.offer_detail?.policy_number}]
              </legend>
              <table className="table">
                <tbody>
                  <tr>
                    <td>Facultative offer</td>
                    <td>{offer?.facultative_offer}%</td>
                  </tr>
                  <tr>
                    <td>Facultative Sum Insured</td>
                    <td>
                      {offer?.offer_detail?.currency}{" "}
                      {offer?.fac_sum_insured.toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                      })}{" "}
                    </td>
                  </tr>
                  <tr>
                    <td>Claimable Amount</td>
                    <td>
                      {offer?.offer_detail?.currency}{" "}
                      {leftAmount.toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                      })}{" "}
                    </td>
                  </tr>
                </tbody>
              </table>
            </fieldset>
          </div>
          {hasEndorsement && (
            <div className="alert alert-info">
              <div className="row">
                <h2 className="font-size-16">
                  Found{" "}
                  {plural(
                    "endorsement",
                    offer?.offer_endorsements?.length,
                    true
                  )}
                </h2>
              </div>
              <table className="table table-condensed">
                <thead>
                  <tr>
                    <th>Offer type</th>
                    <th>Date created</th>
                    <th>Fac. Premium</th>
                    <th>Commission</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-warning text-white">
                    <td>Original Offer</td>
                    <td>{new Date(offer?.created_at).toDateString()}</td>
                    <td
                      className={`${
                        String(offer?.fac_premium).charAt(0) === "-"
                          ? "text-danger"
                          : String(offer?.fac_premium).charAt(0) === "+"
                          ? "text-success"
                          : ""
                      }`}
                    >
                      {offer?.offer_detail?.currency} {offer?.fac_premium}
                    </td>
                    <td
                      className={`${
                        String(offer?.fac_premium).charAt(0) === "-"
                          ? "text-danger"
                          : String(offer?.fac_premium).charAt(0) === "+"
                          ? "text-success"
                          : ""
                      }`}
                    >
                      {offer?.offer_detail?.currency} {offer?.commission_amount}
                    </td>
                  </tr>
                  {offer?.offer_endorsements?.map((end, eID) => (
                    <tr key={eID}>
                      <td>Endorsement {eID + 1}</td>
                      <td>{new Date(end.created_at).toDateString()}</td>
                      <td
                        className={`${
                          String(end.fac_premium).charAt(0) === "-"
                            ? "text-danger"
                            : ""
                        }`}
                      >
                        {end.offer_endorsement_detail?.currency}{" "}
                        {end.fac_premium}
                      </td>
                      <td
                        className={`${
                          String(end.fac_premium).charAt(0) === "-"
                            ? "text-danger"
                            : ""
                        }`}
                      >
                        {end.offer_endorsement_detail?.currency}{" "}
                        {end.commission_amount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <div className={styles.card_body}>
            <div className="row">
              <table className="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>Reinsurer className</th>
                    <th>Participating %</th>
                    <th>Fac. sum insured</th>
                    <th>Reinsurer's share</th>
                  </tr>
                </thead>
                <tbody>
                  {offer?.offer_participant.map((participant, key) => {
                    const calc =
                      (parseFloat(participant.offer_participant_percentage) *
                        parseFloat(claim_amount)) /
                      100;
                    const share = isNaN(calc)
                      ? "0"
                      : calc.toLocaleString(undefined, {
                          maximumFractionDigits: 2,
                        });
                    return (
                      <tr>
                        <td>{participant.reinsurer.re_company_name}</td>
                        <td>{participant.offer_participant_percentage}</td>
                        <td>
                          {offer?.offer_detail?.currency}{" "}
                          {participant.participant_fac_sum_insured}
                        </td>
                        <td>
                          {offer?.offer_detail?.currency} {share}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {/* <fieldset className="border p-1"> */}
            <div className="row">
              <form onSubmit={handleMakeClain} className="col-md-12">
                <fieldset className="border-form p-2">
                  <legend className={styles.offer_title}>Claim offer</legend>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="">Enter amount to be claimed</label>
                        <input
                          type="number"
                          value={claim_amount}
                          onChange={(e) => setclaim_amount(e.target.value)}
                          className="form-control"
                          placeholder="Claim amount"
                          required
                        />
                        {error && (
                          <p className="text-danger">{`Claim amount cannot exceed  ${leftAmount}`}</p>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="">Claim date</label>
                        <input
                          type="date"
                          value={claim_date}
                          onChange={(e) => setclaim_date(e.target.value)}
                          className="form-control"
                          placeholder="Claim amount"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label htmlFor="">Comment</label>
                        {/* <textarea hidden required value={comments} id="" cols="30" rows="10"></textarea> */}
                        <Editor
                          value={comments}
                          onChange={(val) => setComments(val)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <button
                      type="submit"
                      className="btn btn-primary w-md btn-sm float-right"
                    >
                      Make claim
                    </button>
                  </div>
                </fieldset>
              </form>
            </div>
            {/* </fieldset> */}
          </div>
        </>
      )}
    </>
  );
};

export default MakeClaim;
