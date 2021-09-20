/* eslint-disable no-throw-literal */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Drawer } from "../../../components";
import { useAuth } from "../../../context/AuthContext";
import { DELETE_BROKER } from "../../../graphql/mutattions/brokers";
import { create_broker_access, delete_broker_access } from "../../../layout/adminRoutes";
import React, { useState } from "react";
import { Fragment } from "react";
import { useMutation } from "react-apollo";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import AddBrokerAssociateForm from "./AddBrokerAssociateForm";
// import AddBrokerForm from "./AddBrokerForm";

const Broker = ({ broker = {} }) => {
  const { user } = useAuth();
  const [openBroker, setOpenBroker] = useState(false);
  const [removeBroker] = useMutation(DELETE_BROKER, {
    variables: { id: broker.re_broker_id },
    refetchQueries: ["brokers"],
  });
  const handleDeleteBroker = (broker) => {
    swal({
      closeOnClickOutside: false,
      closeOnEsc: false,
      icon: "warning",
      title: "Warning",
      text: `Are you sure you want to delete ${broker?.re_broker_name}?`,
      buttons: [
        "No",
        {
          text: "Yes",
          closeModal: false,
        },
      ],
    })
      .then((name) => {
        if (!name) throw null;
        return removeBroker();
      })
      .then((json) => {
        swal("Sucess", "Broker removed Successfully", "success");
      })
      .catch((err) => {
        if (err) {
          swal("Oh noes!", "The AJAX request failed!", "error");
        } else {
          swal.stopLoading();
          swal.close();
        }
      });
  };

  return (
    <Fragment>
      <div className="col-xl-3 col-sm-6">
        <div className="card text-center">
          <div className="card-body">
            <div className="avatar-md mx-auto mb-4">
              <span className="avatar-title rounded-circle p-auto bg-soft-primary text-primary font-size-16">
                {broker?.broker_abbrv ?? "VR"}
              </span>
            </div>
            <h5 className="font-size-15">
              <a href="#" className="text-dark">
                {broker?.re_broker_name ?? "Visal Re"}
              </a>
            </h5>
            {broker?.remainders?.length ? (
              <button className="border-0 badge badge-soft-danger badge-danger font-size-13">
                {broker?.remainders?.length} UNPAID POLICIES
              </button>
            ) : null}
          </div>
          <div className="card-footer bg-transparent border-top">
            <div className="contact-links d-flex font-size-20">
              {create_broker_access.includes(user?.position) && (
                <div
                  onClick={() => setOpenBroker(broker)}
                  className="flex-fill link-hover"
                >
                  <a
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Add Manager"
                  >
                    <i className="bx bx-user-circle"></i>
                  </a>
                </div>
              )}
              <Link
                to={`/admin/brokers/details/${Buffer(
                  broker?.re_broker_id
                ).toString("base64")}`}
                className="link-hover flex-fill"
                data-toggle="tooltip"
                data-placement="top"
                title="View"
              >
                <i className="bx bx-pie-chart-alt"></i>
              </Link>
              {delete_broker_access.includes(user?.position) && (
                <div
                  onClick={() => handleDeleteBroker(broker)}
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Delete"
                  className="flex-fill link-hover"
                >
                  <i className="bx bx-trash-alt"></i>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Drawer
        isvisible={openBroker}
        width="40%"
        toggle={() => setOpenBroker(false)}
        setShow={setOpenBroker}
      >
        <AddBrokerAssociateForm broker={broker} />
      </Drawer>
    </Fragment>
  );
};

export default Broker;
