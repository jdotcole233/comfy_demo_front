/* eslint-disable no-throw-literal */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, Fragment } from "react";
import { Modal, DropdownButton, ButtonGroup, Dropdown } from "react-bootstrap";
import { Drawer, Loader } from "../../../components";
import { useHistory, useLocation } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import {
  TREATY,
  ADD_TREATY_PERCENTAGE,
  REMOVE_REINSURER_FROM_TREATY_PARTICIPATION,
  REMOVE_ASOCIATE_TREATY,
} from "../../../graphql/queries/treaty";
import swal from "sweetalert";
import TreatyDebitNotes from "../../TreatyPrograms/TreatyDebitNotes";
import { useMemo } from "react";
import {
  editAccessRoles,
  deleteAccessRoles,
} from "../../../layout/adminRoutes";
import { useAuth } from "../../../context/AuthContext";
import AddQuarter from "../../TreatyPrograms/AddQuarter";
import TreatyOverview from "../../TreatyPrograms/TreatyOverview";
import Statements from "../../TreatyPrograms/Previews/Statements";
import TreatyOverviewSide from "../../TreatyPrograms/TreatyOverviewSide";
import { money } from "../../TreatyPrograms/Previews/CreditNote";
import EditLayer from "../../TreatyPrograms/EditLayer";
import NonProportionalStatements from "../../TreatyPrograms/Previews/NonProportionalStatements";
import LayersListing from "../../TreatyPrograms/components/LayersListing";
import EffectedWithListing from "../../TreatyPrograms/components/EffectedWithListing";
import EffectedWithListingAssociates from "../../TreatyPrograms/components/EffectedWithListingAssociates";
import _ from "lodash";
import SendReinsurerDocuments from "./SendReinsurerDocuments";
import AddPErcentageModal from "./AddPErcentageModal";
import SurplusListing from "./SurplusListing";
import AdjustmentStatement from "./AdjustmentStatement";
import GenerateList from "./GenerateList";
import InsurerDetailsParticipatinBrokers from "../brokercomponents/InsureDetailsParticipationgBrokers";
import InsurerDetailBrokerAssociates from "../brokercomponents/InsurerDetailBrokerAssociates";
import PreviewPlacing from "../../ViewTreaty/components/PreviewPlacing";
import PreviewCover from "../../ViewTreaty/components/PreviewCover";

const ViewTreaty = () => {
  const { user } = useAuth();
  // const { treaty } = useInsurer();
  const { state } = useLocation();
  const history = useHistory();
  // const [showCreateList, setshowCreateList] = useState(false);
  const [openStatementsDrawer, setOpenStatementsDrawer] = useState(false);
  const [addPercentageModal, setAddPercentageModal] = useState(false);
  const [currentLayer, setCurrentLayer] = useState(1);
  const [selectedReinsurer, setSelectedReinsurer] = useState(null);
  const [percentage, setPercentage] = useState("");
  const [percentageErrorEntry, setPercentageErrorEntry] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [showSendDocs, setShowSendDocs] = useState(false);

  useEffect(() => {
    if (!state) {
      history.replace("/admin/insurers");
    }
    console.log("State ID", state?.treaty_id);
  }, [state]);

  const { data, loading } = useQuery(TREATY, {
    variables: { treaty_id: state?.treaty_id },
    fetchPolicy: "network-only",
  });

  const isProp = data?.treaty?.treaty_program?.treaty_type === "PROPORTIONAL";
  const totalPercentage = data?.treaty?.order_hereon ?? 100;

  const [addPercentage] = useMutation(ADD_TREATY_PERCENTAGE, {
    variables: {
      treaty_participation_id: selectedReinsurer?.treaty_participation_id,
      percentage,
      treaty_id: state?.treaty_id,
      layer_number: isProp ? 0 : currentLayer,
      associate_deduction_id:
        data?.treaty?.treaty_deduction?.treaty_associate_deduction_id,
    },
    refetchQueries: [
      { query: TREATY, variables: { treaty_id: state?.treaty_id } },
    ],
  });

  const [removeReinsurer] = useMutation(
    REMOVE_REINSURER_FROM_TREATY_PARTICIPATION,
    {
      refetchQueries: [
        { query: TREATY, variables: { treaty_id: state?.treaty_id } },
      ],
    }
  );

  const [removeAssociate] = useMutation(REMOVE_ASOCIATE_TREATY, {
    refetchQueries: [
      { query: TREATY, variables: { treaty_id: state?.treaty_id } },
    ],
  });

  const { reinsurers, remainingPercentages, layers_, associates } =
    useMemo(() => {
      let reinsurers = [];

      const layers_ =
        JSON.parse(data?.treaty?.layer_limit || "[]").map((limit) => ({
          ...limit,
        })) || [];
      let associates = [];
      let remainingPercentages = {};
      // eslint-disable-next-line array-callback-return
      if (!isProp) {
        for (let index = 1; index <= layers_.length; index++) {
          remainingPercentages[`${index}`] = 0;
        }
      } else {
        remainingPercentages[`${currentLayer}`] = totalPercentage;
      }

      if (data) {
        reinsurers = data?.treaty?.treaty_participants?.map((participant) => {
          if (isProp) {
            remainingPercentages[`${currentLayer}`] -= _.isNull(
              participant.treaty_participation_percentage
            )
              ? 0
              : participant.treaty_participation_percentage;
          } else {
            remainingPercentages[`${participant.layer_number}`] += _.isNull(
              participant.treaty_participation_percentage
            )
              ? 0
              : participant.treaty_participation_percentage;
          }
          return {
            ...participant,
            ...participant.reinsurer,
            currency: data?.treaty?.currency,
            company_name: participant?.reinsurer?.re_company_name,
            company_email: participant?.reinsurer?.re_company_email,
            layer_number: participant?.layer_number,
            participant_percentage:
              participant?.treaty_participation_percentage || "N/A",
            actions: (
              <>
                <DropdownButton
                  className="mr-1 mb-1"
                  variant="primary"
                  size="sm"
                  as={ButtonGroup}
                  id="dropdown-basic-button"
                  title="Percentage"
                >
                  {participant.treaty_participation_percentage ? (
                    <Dropdown.Item
                      onClick={() => handleEditPercentage(participant)}
                      disabled={!editAccessRoles.includes(user?.user_role?.position)}
                    >
                      Edit
                    </Dropdown.Item>
                  ) : (
                    <Dropdown.Item
                      onClick={() => handleAddPercentage(participant)}
                    >
                      Add
                    </Dropdown.Item>
                  )}
                </DropdownButton>
                {participant?.treaty_participation_percentage &&
                  !_.isEmpty(participant.treaty_participant_deductions) ? (
                  <Fragment>
                    {isProp ? (
                      <button
                        onClick={() => handleOpenStatementsDrawer(participant)}
                        className="btn btn-info btn-sm w-md mr-1 mb-1"
                      >
                        Preview Documents
                      </button>
                    ) : (
                      <button
                        onClick={() => handleOpenStatementsDrawer(participant)}
                        className="btn btn-info btn-sm w-md mr-1 mb-1"
                      >
                        Preview Note
                      </button>
                    )}

                    <button
                      onClick={() => handleShowSendDocs(participant)}
                      className="btn btn-success btn-sm mb-1"
                    >
                      {isProp ? "Send Documents" : "Send Credit Note"}
                    </button>
                  </Fragment>
                ) : null}
                {[...deleteAccessRoles, "Broking Officer"].includes(
                  user?.user_role?.position
                ) && (
                    <button
                      onClick={() => handleRemoveReinsurer(participant)}
                      className="btn mb-1"
                    >
                      <i className="bx bx-trash text-danger"></i>
                    </button>
                  )}
              </>
            ),
          };
        });

        associates = data?.treaty?.treaty_to_associates?.map(
          (associate, key) => ({
            ...associate,
            company_email: associate?.reinsurer?.re_company_email,
            company_name: associate?.reinsurer?.re_company_name,
            rep_name:
              associate?.reinsurer_representative?.rep_first_name || "N/A" +
              " " +
              associate?.reinsurer_representative?.rep_last_name || "N/A",
            rep_phone: [
              associate?.reinsurer_representative?.rep_primary_phonenumber ?? "N/A",
              associate?.reinsurer_representative?.rep_secondary_phonenumber ?? "N/A",
            ].join(","),
            rep_email: associate?.reinsurer_representative?.rep_email,
            layer_number: associate?.layer_number,
            email_status: (
              <span
                style={{ letterSpacing: 3 }}
                className={`badge badge-soft-${associate.sent_status === "UNSENT" ? "danger" : "success"
                  }`}
              >
                {associate.sent_status}
              </span>
            ),
            actions: (
              <button
                disabled={
                  ![...deleteAccessRoles, "Broking Officer"].includes(
                    user?.user_role?.position
                  )
                }
                onClick={() => handleRemoveAssociate(associate)}
                className="btn "
              >
                <i className="bx bx-trash text-danger"></i>
              </button>
            ),
          })
        );
      }
      return { reinsurers, remainingPercentages, layers_, associates };
    }, [data, currentLayer]);

  const handleShowSendDocs = (participant) => {
    setShowSendDocs(true);
    setSelectedReinsurer(participant);
  };

  const handleRemoveAssociate = (data) => {
    swal({
      icon: "warning",
      title: `Are you sure you wanto remove ${data.reinsurer_representative.rep_first_name} ${data.reinsurer_representative.rep_last_name} ?`,
      buttons: [
        "NO",
        {
          text: "Yes",
          closeModal: false,
        },
      ],
    }).then((input) => {
      if (!input) throw null;
      removeAssociate({
        variables: {
          id: data.treaty_to_associate_id,
        },
      })
        .then((res) => {
          swal("Hurray", "Associate removed successfully", "success");
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

  const handleOpenStatementsDrawer = (participant) => {
    setSelectedReinsurer(participant);
    setOpenStatementsDrawer((prev) => !prev);
  };

  const handleEditPercentage = (participant) => {
    setSelectedReinsurer(participant);
    setIsEdit(true);
    setAddPercentageModal(!addPercentageModal);
  };
  const handleAddPercentage = (participant) => {
    setSelectedReinsurer(participant);
    setAddPercentageModal(true);
  };

  useEffect(() => {
    if (
      selectedReinsurer &&
      selectedReinsurer.treaty_participation_percentage
    ) {
      setPercentage(selectedReinsurer.treaty_participation_percentage);
    }
  }, [selectedReinsurer]);

  const handleRemoveReinsurer = (reinsurerData) => {
    const ids = associates
      .filter(
        (el) =>
          el.reinsurer?.reinsurer_id === reinsurerData.reinsurer?.reinsurer_id
      )
      .map((el) => el.treaty_to_associate_id);
    swal({
      closeOnClickOutside: false,
      closeOnEsc: false,
      icon: "warning",
      title: `Are you sure you want to remove ${reinsurerData.reinsurer.re_company_name} ?`,
      buttons: [
        "No",
        {
          text: "Yes",
          closeModal: false,
        },
      ],
    }).then((input) => {
      if (!input) throw null;
      removeReinsurer({
        variables: {
          id: reinsurerData?.treaty_participation_id,
          ids,
        },
      })
        .then((res) => {
          swal("Hurray", "Reinsurer removed successfully", "success");
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

  // handling change Percentage Value
  const handleChangePercentageValue = (event) => {
    const { value } = event.target;
    // alert(value);
    let availablePercenatge = 0;
    if (isProp) {
      availablePercenatge =
        remainingPercentages[`${currentLayer}`] +
        (selectedReinsurer.treaty_participation_percentage
          ? parseFloat(selectedReinsurer.treaty_participation_percentage)
          : 0);
    } else {
      availablePercenatge =
        remainingPercentages[`${currentLayer}`] -
        (selectedReinsurer.treaty_participation_percentage
          ? parseFloat(selectedReinsurer.treaty_participation_percentage)
          : 0);
      availablePercenatge = totalPercentage - availablePercenatge;
    }
    // console.log(availablePercenatge);
    if (parseFloat(value) <= parseFloat(availablePercenatge).toFixed(5)) {
      setPercentage(value);
      setPercentageErrorEntry(false);
    } else {
      setPercentage(selectedReinsurer?.treaty_participation_percentag);
      setPercentageErrorEntry(true);
    }
    // setPercentage(value);
  };

  const AddPercentage = (event) => {
    if (!percentage) {
      swal("Warning", "Please provide a value for percentage", "warning");
      return;
    }

    swal({
      closeOnClickOutside: false,
      closeOnEsc: false,
      icon: "warning",
      title: "Are you sure update percentage?",
      buttons: [
        "No",
        {
          text: "Yes",
          closeModal: false,
        },
      ],
    }).then((input) => {
      if (!input) throw null;
      addPercentage()
        .then(({ data }) => {
          if (data.addReinsurersParticipationPercentage) {
            swal("Hurray", "Percentage updated", "success");
            setPercentage("");
            setSelectedReinsurer(null);
            setAddPercentageModal(!addPercentageModal);
          } else {
            swal("Whoops!", "Something went wrong", "error");
          }
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

  const layers = useMemo(() => {
    if (data) {
      return JSON.parse(data?.treaty?.layer_limit || "[]")?.map(
        (_limit, index) => ({
          ..._limit,
          no: index + 1,
          deductible: money(parseFloat(_limit.deductible)),
          limit: money(parseFloat(_limit.limit)),
          m_and_d_premium: money(parseFloat(_limit.m_and_d_premium)),
          actions: (
            <EditLayer
              _layers={JSON.parse(data?.treaty?.layer_limit || "[]")}
              treaty={data?.treaty}
              percentage={remainingPercentages[`${index + 1}`]}
              index={index + 1}
              layer={_limit}
              insurer={data?.treaty?.insurer}
            />
          ),
        })
      );
    }
  }, [data]);

  const surpluses = useMemo(() => {
    if (data) {
      return JSON.parse(data?.treaty?.layer_limit || "[]")?.map(
        (_limit, index) => {
          if (index === 0) {
            _limit.commission = data?.treaty?.treaty_deduction?.commission;
          }
          return {
            ..._limit,
            no: index + 1,
            // actions: (
            //   <EditSurplus
            //     surpluses={JSON.parse(data?.treaty?.layer_limit || "[]")}
            //     treaty={data?.treaty}
            //     percentage={remainingPercentages[`${index + 1}`]}
            //     index={index + 1}
            //     surplus={_limit}
            //     insurer={data?.treaty?.insurer}
            //   />
            // ),
          };
        }
      );
    }
    return [];
  }, [data]);

  const allowAdjustment = useMemo(() => {
    if (data && data.treaty && data.treaty.treaty_participants?.length > 0) {
      return data?.treaty?.treaty_participants?.every(
        (el) => el.treaty_participation_percentage
      );
    }
    return false;
  }, [data]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="page-content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="page-title-box d-flex align-items-center justify-content-between">
              <h4 className="mb-0 font-size-18">
                Reference Number: {data?.treaty?.treaty_reference} - Program
                Type:{" "}
                <span
                  style={{ letterSpacing: 5 }}
                  className={`badge w-md badge-soft-${data?.treaty?.treaty_program?.treaty_type === "PROPORTIONAL"
                    ? "success"
                    : "warning"
                    } p-1 font-size-11`}
                >
                  {data?.treaty?.treaty_program?.treaty_type}
                </span>
              </h4>

              <div className="page-title-right">
                <ol className="breadcrumb m-0">
                  <li
                    onClick={() => history.goBack()}
                    className="breadcrumb-item link-hover"
                  >
                    <a>Treaties</a>
                  </li>
                  <li className="breadcrumb-item active">View Treaty</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-4">
            <TreatyOverviewSide treaty={data?.treaty} />
            <PreviewPlacing treaty={data?.treaty} />
            <PreviewCover treaty={data?.treaty} />
          </div>
          <div className="col-xl-8">
            <div className="row d-flex align-items-stretch">
              <GenerateList {...{ isProp, allowAdjustment, ...data }} />
              {!isProp && allowAdjustment && (
                <AdjustmentStatement {...data?.treaty} />
              )}
              {allowAdjustment && (
                <AddQuarter
                  isProp={isProp}
                  remainingPercentage={remainingPercentages[`${currentLayer}`]}
                  treaty_id={data?.treaty?.treaty_id}
                  notes={data?.treaty?.treaty_accounts}
                  surpluses={JSON.parse(data?.treaty?.layer_limit ?? "[]")}
                  treaty={data?.treaty}
                />
              )}
            </div>
            <TreatyDebitNotes
              treaty={data?.treaty}
              notes={data?.treaty?.treaty_accounts}
              treaty_id={data?.treaty?.treaty_id}
              isProp={isProp}
            />
            <TreatyOverview
              participants={data?.treaty?.treaty_participants || []}
              treaty={data?.treaty}
            />
          </div>
        </div>
        <LayersListing data={data} layers={layers} />
        <SurplusListing data={data} surpluses={surpluses} />
        <EffectedWithListing
          setLayer={setCurrentLayer}
          activeLayer={currentLayer}
          layers={layers_}
          treaty={data?.treaty}
          remainingPercentage={remainingPercentages}
          reinsurers={reinsurers}
        />
        <EffectedWithListingAssociates
          setLayer={setCurrentLayer}
          layers={layers_}
          activeLayer={currentLayer}
          treaty={data?.treaty}
          associates={associates}
        />
        <InsurerDetailsParticipatinBrokers treaty={data?.treaty} />
        <InsurerDetailBrokerAssociates treaty={data?.treaty} />
      </div>

      {/* Add percentage Modal */}
      <Modal
        centered
        show={addPercentageModal}
        onHide={() => setAddPercentageModal(!addPercentageModal)}
      >
        <Modal.Header closeButton>
          {!isEdit ? "Add" : "Edit"} percentage to{" "}
          {selectedReinsurer?.reinsurer.re_company_name}
        </Modal.Header>
        <AddPErcentageModal
          handleChangePercentageValue={handleChangePercentageValue}
          AddPercentage={AddPercentage}
          isEdit={isEdit}
          percentage={percentage}
          percentageErrorEntry={percentageErrorEntry}
        />
      </Modal>

      <Drawer
        width="50%"
        isvisible={openStatementsDrawer}
        toggle={() => setOpenStatementsDrawer(!openStatementsDrawer)}
      >
        {!isProp
          ? openStatementsDrawer && (
            <NonProportionalStatements
              treaty={data?.treaty}
              reinsurer={selectedReinsurer}
              reinsurers={data?.treaty?.treaty_participants}
              layer={currentLayer}
            />
          )
          : openStatementsDrawer && (
            <Statements treaty={data?.treaty} reinsurer={selectedReinsurer} />
          )}
      </Drawer>

      <Drawer
        width="50%"
        isvisible={showSendDocs}
        toggle={() => setShowSendDocs(false)}
      >
        {showSendDocs && (
          <SendReinsurerDocuments
            reinsurer={selectedReinsurer}
            total_participation_percentage={
              totalPercentage - remainingPercentages[`${currentLayer}`]
            }
            treaty={data?.treaty}
            layer={currentLayer}
            layers={layers[currentLayer - 1]}
            setShow={setShowSendDocs}
            isProp={isProp}
          />
        )}
      </Drawer>
    </div>
  );
};

export default ViewTreaty;
