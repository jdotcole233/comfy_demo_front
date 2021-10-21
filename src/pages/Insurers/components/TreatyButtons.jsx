/* eslint-disable no-throw-literal */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo, useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { Drawer, Modal } from "../../../components";
import {
  DELETE_TREATY,
  REMOVE_NONPROPORTIONAL_PAYMENT,
  REMOVE_PROPORTIONAL_PAYMENT,
} from "../../../graphql/queries/treaty";
import AddTreatyPaymentForm from "./AddTreatyPaymentForm";
import UpdateTreatyForm from "./UpdateTreatyForm";
import _ from "lodash";
import DistributeTreatyPayment from "../DistributeTreatyPayment";
import { INSURER } from "../../../graphql/queries";
import { ButtonGroup, DropdownButton, Dropdown } from "react-bootstrap";
import ProportionalTreatyPayments from "../subComponents/ProportionalTreatyPayments";
import NonProportionalTreatyPayments from "../subComponents/NonProportionalTreatyPayments";
import ReceiveablePayments from "./ReceiveablePayments";
import { BASE_URL_LOCAL } from "../../../graphql";

const TreatyButtons = ({ treaty, insurer, refetch }) => {
  const [payment, setPayment] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showeditTreatyDrawer, setShoweditTreatyDrawer] = useState(false);
  const [showPayments, setShowPayments] = useState(false);
  const [showAddPayment, setShowAddPayment] = useState(false);
  const [showBtn, setShowBtn] = useState(true);
  const [showDistributePaymentDrawer, setShowDistributePaymentDrawer] =
    useState(false);

  const treaty_id = treaty?.treaty_id;
  const isProp = treaty?.treaty_program?.treaty_type === "PROPORTIONAL";

  const togglePayments = () => setShowPayments((prev) => !prev);
  const toggleAddpayment = () => {
    setShowAddPayment((prev) => !prev);
  };

  const toggleDistributePayments = (payment) => {
    setShowDistributePaymentDrawer((prev) => !prev);
  };

  const [removeProportionalPayment] = useMutation(REMOVE_PROPORTIONAL_PAYMENT, {
    refetchQueries: [
      { query: INSURER, variables: { id: insurer?.insurer_id } },
    ],
  });

  const [removeTreaty] = useMutation(DELETE_TREATY, {
    refetchQueries: [
      { query: INSURER, variables: { id: insurer?.insurer_id } },
    ],
  });

  const [removeNonProportionalPayment] = useMutation(
    REMOVE_NONPROPORTIONAL_PAYMENT,
    {
      refetchQueries: [
        { query: INSURER, variables: { id: insurer?.insurer_id } },
      ],
    }
  );

  const payments = useMemo(() => {
    if (treaty) {
      const payments =
        treaty.treaty_program &&
        treaty.treaty_program.treaty_type === "PROPORTIONAL"
          ? treaty.treaty_p_payments
          : treaty.treaty_np_payments;

      return payments?.map((payment) => {
        const obj = JSON.parse(payment?.treaty_payment_details || "{}");
        return {
          type:
            obj?.payment_type === "Cheque"
              ? obj?.payment_type +
                " - " +
                obj.payment_from?.cheque_number +
                " "
              : obj?.payment_type,
          bank_name: obj?.payment_from?.bank_name,
          beneficiary_bank: obj?.payment_to,
          payment_amount: payment?.treaty_payment_amount?.toLocaleString(
            undefined,
            { maximumFractionDigits: 2 }
          ),
          created_at: payment.created_at,
          updated_at: payment.updated_at,
          section: payment.uuid || payment.treaty_accountstreaty_account_id,
          actions: (
            <>
              <button
                onClick={() => handleShowEditpaymentDrawer(payment)}
                className="btn btn-sm m-1 btn-info mr-1"
              >
                View
              </button>
              <button
                onClick={() => handleRemovePayment(payment)}
                className="btn btn-sm m-1  btn-danger "
              >
                Remove
              </button>
              <button
                // onClick={() => handleGenerateReceipt(payment)}
                className="btn m-1 btn-sm btn-primary  mx-1"
              >
                Clear Cheque
              </button>
              <button
                onClick={() => handleGenerateReceipt(payment)}
                className="btn m-1 btn-sm btn-success  mx-1"
              >
                Generate Receipt
              </button>
            </>
          ),
        };
      });
    }

    return [];
  }, [treaty]);

  const handleShowEditpaymentDrawer = (payment) => {
    setPayment(payment);
    setShowEditModal(true);
    setShowPayments(false);
  };

  const handleRemovePayment = (payment) => {
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
      if (payment.treaty_p_payment_id) {
        removeProportionalPayment({
          variables: { id: payment?.treaty_p_payment_id },
        })
          .then((res) => {
            swal("Hurray!!", "Payment removed successfully", "success");
          })
          .catch((err) => {
            swal("Hurray!!", "Payment not removed successfully", "success");
          });
      } else {
        removeNonProportionalPayment({
          variables: { id: payment?.uuid },
        })
          .then((res) => {
            swal("Hurray!!", "Payment removed successfully", "success");
          })
          .catch((err) => {
            swal("Hurray!!", "Payment not removed successfully", "success");
          });
      }
    });
  };
  const handleGenerateReceipt = (payment) => {
    window.open(
      `${BASE_URL_LOCAL}/treaty_payment_receipt/${btoa(
        JSON.stringify({
          treaty_id: treaty?.treaty_id,
          treaty_payment_id:
            payment.treaty_n_p_payment_id || payment?.treaty_p_payment_id,
        })
      )}`,
      "_blank"
    );
  };

  useEffect(() => {
    if (treaty) {
      //if offer payment szie is > 0
      if (treaty.treaty_participants.length > 0) {
        // setShowBtn(!0)
        //if offer payment last index of payment details is == null
        if (
          treaty?.treaty_participants[0]?.treaty_participant_payments?.length >
          0
        ) {
          if (
            _.isNull(
              treaty.treaty_participants[0].treaty_participant_payments[
                treaty.treaty_participants[
                  treaty.treaty_participants.length - 1
                ].treaty_participant_payments.length - 1
              ].participant_payment_details
            )
          ) {
            setShowBtn(!!0);
          } else {
            setShowBtn(!0);
          }
        }
      }
    }
  }, [treaty]);

  const handleDeleteTreaty = () => {
    swal({
      closeOnClickOutside: false,
      closeOnEsc: false,
      icon: "warning",
      title: `Are you sure you want to remove this treaty ?`,
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
      removeTreaty({
        variables: {
          id: treaty?.treaty_id,
          treaty_type: isProp ? "PROPORTIONAL" : "NONPROPORTIONAL",
        },
      })
        .then((res) => {
          swal("Hurray!!", "Treaty removed successfully", "success");
        })
        .catch((err) => {
          swal("Hurray!!", "Treaty not removed successfully", "success");
        });
    });
  };

  const hasPercentage = (value) => {
    return _.isNumber(value.treaty_participation_percentage);
  };

  const allParticipantsActive =
    treaty?.treaty_participants?.some(hasPercentage);

  return (
    <div>
      <>
        <Link
          to={{
            pathname: "/admin/treaty-programs/overview",
            state: { treaty_id },
          }}
          className="btn btn-sm btn-success m-1"
        >
          {" "}
          View Treaty
        </Link>
        {treaty?.treaty_claims?.length > 0 ? (
          <ReceiveablePayments
            refetch={refetch}
            isProp={isProp}
            treaty={treaty}
            insurer={insurer}
          />
        ) : null}

        {isProp && treaty?.treaty_accounts?.length > 0 && (
          <DropdownButton
            className="mr-1"
            variant="warning"
            size="sm"
            as={ButtonGroup}
            id="dropdown-basic-button"
            title={isProp ? "Payments" : "M&D Payments"}
          >
            {treaty?.treaty_p_payments.length > 0 && (
              <Dropdown.Item onClick={togglePayments}>
                View Payments
              </Dropdown.Item>
            )}

            {showBtn && treaty?.treaty_payment_status !== "PAID" && (
              <Dropdown.Item onClick={() => setShowAddPayment(true)}>
                Make Payments
              </Dropdown.Item>
            )}
            {!showBtn && (
              <Dropdown.Item onClick={toggleDistributePayments}>
                Distribute Payment
              </Dropdown.Item>
            )}
          </DropdownButton>
        )}

        {!isProp && allParticipantsActive && (
          <DropdownButton
            className="mr-1"
            variant="warning"
            size="sm"
            as={ButtonGroup}
            id="dropdown-basic-button"
            title={isProp ? "Receipt" : "M&D Payments"}
          >
            {!isProp && treaty?.treaty_np_payments.length > 0 ? (
              <Dropdown.Item onClick={togglePayments}>
                View Payments
              </Dropdown.Item>
            ) : null}

            {showBtn && treaty?.treaty_payment_status !== "PAID" && (
              <Dropdown.Item onClick={() => setShowAddPayment(true)}>
                Make {isProp ? "Receipt" : "Payment"}
              </Dropdown.Item>
            )}
            {!showBtn && (
              <Dropdown.Item onClick={toggleDistributePayments}>
                Distribute {isProp ? "Receipt" : "Payment"}
              </Dropdown.Item>
            )}
          </DropdownButton>
        )}
        <button
          onClick={() => setShoweditTreatyDrawer((prev) => !prev)}
          className="btn btn-sm btn-primary m-1"
        >
          Edit
        </button>
        <button onClick={handleDeleteTreaty} className="btn btn-sm">
          <i className="bx bx-trash text-danger"></i>
        </button>
      </>

      <Drawer
        width="40%"
        isvisible={showeditTreatyDrawer}
        toggle={() => setShoweditTreatyDrawer((prev) => !prev)}
      >
        {showeditTreatyDrawer && (
          <UpdateTreatyForm
            treaty={treaty}
            insurer={insurer}
            setOpenDrawer={setShoweditTreatyDrawer}
          />
        )}
      </Drawer>

      <Drawer
        width="40%"
        isvisible={showEditModal}
        toggle={() => setShowEditModal(false)}
      >
        {showEditModal && (
          <AddTreatyPaymentForm
            edit={payment}
            toggleAddpayment={() => setShowEditModal(false)}
            insurer={insurer}
            treaty={treaty}
          />
        )}
      </Drawer>

      <Drawer width="40%" isvisible={showAddPayment} toggle={toggleAddpayment}>
        {showAddPayment && (
          <AddTreatyPaymentForm
            toggleAddpayment={toggleAddpayment}
            insurer={insurer}
            treaty={treaty}
          />
        )}
      </Drawer>

      <Drawer
        isvisible={showDistributePaymentDrawer}
        width="50%"
        toggle={() => setShowDistributePaymentDrawer(false)}
      >
        {showDistributePaymentDrawer && (
          <DistributeTreatyPayment
            data={treaty}
            insurer_id={insurer?.insurer_id}
            setShow={setShowDistributePaymentDrawer}
            showFlag={showBtn}
          />
        )}
      </Drawer>

      <Modal centered size="xl" show={showPayments} onHide={togglePayments}>
        <Modal.Header closeButton>Payments</Modal.Header>
        {isProp && (
          <ProportionalTreatyPayments payments={payments} treaty={treaty} />
        )}
        {!isProp && (
          <NonProportionalTreatyPayments payments={payments} treaty={treaty} />
        )}
      </Modal>
    </div>
  );
};

export default TreatyButtons;
