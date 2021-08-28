/* eslint-disable no-throw-literal */
// import moment from "moment";
import React, { useCallback, useMemo, useState } from "react";
import { Fragment } from "react";
import { BottomDrawer, Datatable, Drawer } from "../../../components";
import { treatyClaimsClaimsColumns } from "../../TreatyClaims/columns";
import _ from "lodash";
// import AddTreatyPaymentForm from "./AddTreatyPaymentForm";
import { useInsurerProps } from "../providers/InsurerProvider";
import AddReceiveablePaymentForm from "./AddReceiveablePaymentForm";
import NonProportionalTreatyPayments from "../subComponents/NonProportionalTreatyPayments";
import { money } from "../../../utils";
import swal from "sweetalert";
import { INSURER } from "../../../graphql/queries";
import { REMOVE_RECEIVABLE_PAYMENT } from "../../../graphql/queries/treaty";
// import { GET_INSURER } from "../../../redux/types/InsurerTypes";
// import { useDispatch } from "react-redux";
import { useMutation } from "react-apollo";

const ClaimsListing = ({ claims = [], treaty, setShow }) => {
  // const dispatch = useDispatch();
  const { insurer } = useInsurerProps();
  const [currentIndex, setCurrentIndex] = useState(1);
  const [showAddPayment, setShowAddPayment] = useState(undefined);
  const [showPayments, setShowPayments] = useState(false);
  const [removePayment] = useMutation(REMOVE_RECEIVABLE_PAYMENT, {
    refetchQueries: [
      { query: INSURER, variables: { id: insurer?.insurer_id } },
    ],
  });

  // console.log("claims", claims);

  const _claims = useMemo(() => {
    if (claims) {
      return claims?.map((el) => ({
        ...el,
        actions: (
          <>
            <button
              onClick={() => setShowAddPayment(el)}
              className="btn btn-sm btn-info btn-square"
            >
              Make Payment
            </button>

            <button
              onClick={() => {
                setShowPayments(el);
                setShow(false);
              }}
              className="btn btn-sm btn-primary btn-square ml-1"
            >
              View Payments
            </button>
          </>
        ),
      }));
    }
    return [];
  }, [claims, setShow]);

  const handleRemovePayment = useCallback(
    (payment) => {
      swal({
        closeOnClickOutside: false,
        closeOnEsc: false,
        icon: "warning",
        title: `Are you sure you want to remove this payment ?`,
        text: ``,
        buttons: [
          "No",
          {
            text: "Yes",
            closeModal: false,
          },
        ],
      }).then((input) => {
        if (!input) throw null;
        removePayment({
          variables: { id: payment?.receivable_payment_id },
        })
          .then((res) => {
            swal("Hurray!!", "Payment removed successfully", "success");
          })
          .catch((err) => {
            swal("Hurray!!", "Payment not removed successfully", "success");
          });
      });
    },
    [removePayment]
  );

  const payments = useMemo(() => {
    if (showPayments && showPayments?.receivable_payments) {
      return showPayments?.receivable_payments?.map((payment) => {
        const obj = JSON.parse(payment.payment_detail || "{}");
        // console.log(payment);
        return {
          reinsurer: payment?.treaty_participant?.reinsurer?.re_company_name,
          type:
            obj?.payment_type === "Cheque"
              ? obj?.payment_type + " - " + obj?.cheque_number + " "
              : obj?.payment_type,
          bank_name: obj?.bank_name,
          beneficiary_bank: obj?.beneficiary_bank_name,
          payment_amount: money(payment?.payment_amount),
          payment_amount_: payment?.payment_amount,
          created_at: payment.created_at,
          updated_at: payment.updated_at,
          section: payment.uuid,
          actions: (
            <>
              {/* <button
                onClick={() => setSelectedPayment(payment)}
                className="btn btn-sm  btn-info mr-1"
              >
                View
              </button> */}
              <button
                onClick={() => handleRemovePayment(payment)}
                className="btn btn-sm  btn-danger "
              >
                Remove
              </button>
            </>
          ),
        };
      });
    }

    return [];
  }, [handleRemovePayment, showPayments]);

  const layeredClaims = useMemo(() => {
    if (_claims) {
      return _.groupBy(_claims, "layer_number");
    }
    return {};
  }, [_claims]);

  const actualLayers = Object.keys(layeredClaims);

  const changeLayer = (key) => {
    setCurrentIndex(key);
  };

  return (
    <Fragment>
      <div className="px-3 pt-4">
        <ul className="nav nav-tabs nav-tabs-custom mb-2">
          {actualLayers.map((_, key) => (
            <li
              key={key}
              onClick={() => changeLayer(parseInt(_))}
              className="nav-item btn"
            >
              <div
                className={`nav-link ${
                  parseInt(_) === currentIndex ? "active" : ""
                }`}
                href="#"
              >{`Layer ${_}`}</div>
            </li>
          ))}
        </ul>
        <Datatable
          entries={5}
          columns={treatyClaimsClaimsColumns}
          data={layeredClaims[`${currentIndex}`]}
        />
      </div>

      <Drawer
        width="40%"
        isvisible={showAddPayment}
        toggle={() => setShowAddPayment(undefined)}
      >
        <AddReceiveablePaymentForm
          toggleAddpayment={() => setShowAddPayment(false)}
          treaty={treaty}
          insurer={insurer}
          claim={showAddPayment}
        />
      </Drawer>
      <BottomDrawer
        zIndex={2003}
        height="50%"
        isvisible={showPayments}
        toggle={() => setShowPayments(false)}
      >
        {showPayments && (
          <NonProportionalTreatyPayments
            treaty={treaty}
            payments={payments}
            layers={JSON.parse(treaty?.layer_limit ?? "[]")}
          />
        )}
      </BottomDrawer>
    </Fragment>
  );
};

export default ClaimsListing;
