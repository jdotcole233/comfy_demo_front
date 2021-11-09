/* eslint-disable no-throw-literal */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/client";
import swal from "sweetalert";
import { REMOVE_INSURER } from "../../graphql/mutattions";
import { INSURERS } from "../../graphql/queries";
import { AuthContext } from "../../context/AuthContext";
import {
  create_insurer_access,
  delete_insurer_access,
} from "../../layout/adminRoutes";
import { useInsurer } from "../../context/InsurerProvider";

function Insurer({ data, openManagerDrawer }) {
  const {
    state: { user },
  } = useContext(AuthContext);
  const { selectInsurer } = useInsurer();
  const history = useHistory();
  const [removeInsurer] = useMutation(REMOVE_INSURER, {
    variables: {
      id: data.insurer_id,
    },
    refetchQueries: [{ query: INSURERS }],
  });

  const handleDeleteInsurer = (reinsurer) => {
    swal({
      closeOnClickOutside: false,
      closeOnEsc: false,
      icon: "warning",
      title: "Warning",
      text: `Are you sure you want to delete ${reinsurer.insurer_company_name}?`,
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
        return removeInsurer();
      })
      .then((json) => {
        swal("Sucess", "Reinsurer removed Successfully", "success");
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

  const onSelectInsurer = (insurer) => {
    selectInsurer(insurer, () => {
      history.push({
        pathname: "/admin/insurers-details/recent",
        state: { insurer_id: data.insurer_id },
      });
    });
  };

  return (
    <div className="col-xl-3 col-sm-6">
      <div className="card text-center">
        <div className="card-body">
          <div className="avatar-md mx-auto mb-4">
            <span className="avatar-title rounded-circle p-auto bg-soft-primary text-primary font-size-16">
              {data.insurer_abbrv}
            </span>
          </div>
          <h5 className="font-size-15">
            <a href="#" className="text-dark">
              {data.insurer_company_name}
            </a>
          </h5>
          {data?.remainders.length ? (
            <button className="border-0 badge badge-soft-danger badge-danger font-size-13">
              {data?.remainders?.length} UNPAID POLICIES
            </button>
          ) : null}
        </div>
        <div className="card-footer bg-transparent border-top">
          <div className="contact-links d-flex font-size-20">
            {create_insurer_access.includes(user?.user_role?.position) && (
              <div
                onClick={() => openManagerDrawer(data, !0)}
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
            <div
              onClick={() => onSelectInsurer(data)}
              className="link-hover flex-fill"
              data-toggle="tooltip"
              data-placement="top"
              title="View"
            >
              <i className="bx bx-pie-chart-alt"></i>
            </div>
            {delete_insurer_access.includes(user?.user_role?.position) && (
              <div
                onClick={() => handleDeleteInsurer(data)}
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
  );
}

export default Insurer;
