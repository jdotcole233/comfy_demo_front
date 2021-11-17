import React from "react";
import { useMutation } from "@apollo/client";
import swal from "sweetalert";
import { useAuth } from "../../../context/AuthContext";
import { REMOVE_BROKER_ASSOCIATE_FROM_TREATY } from "../../../graphql/mutattions/brokers";
import { TREATY } from "../../../graphql/queries/treaty";
import { deleteAccessRoles } from "../../../layout/adminRoutes";

const BrokerAssociateButtons = ({ associate, treaty }) => {
  const { user } = useAuth();
  const [removeBrokerAssociate] = useMutation(
    REMOVE_BROKER_ASSOCIATE_FROM_TREATY,
    {
      refetchQueries: [
        { query: TREATY, variables: { treaty_id: treaty?.treaty_id } },
      ],
    }
  );
  const handleRemoveAssociate = () => {
    swal({
      closeOnClickOutside: false,
      closeOnEsc: false,
      icon: "warning",
      title: `Are you sure you want to remove ${associate?.broker_associate?.re_broker_assoc_first_name} ?`,
      buttons: [
        "No",
        {
          text: "Yes",
          closeModal: false,
        },
      ],
    }).then((input) => {
      if (!input) throw null;
      removeBrokerAssociate({
        variables: {
          id: associate?.participation_to_broker_associate_id,
        },
      })
        .then((res) => {
          swal("Success", "Broker removed successfully", "success");
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
  return (
    <button
      disabled={
        ![...deleteAccessRoles, "Broking Officer"].includes(user?.user_role?.position)
      }
      onClick={() => handleRemoveAssociate()}
      className="btn "
    >
      <i className="bx bx-trash text-danger"></i>
    </button>
  );
};

export default BrokerAssociateButtons;
