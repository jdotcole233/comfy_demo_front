import React, { useState } from "react";
import SettingsCard from "./components/SettingsCard";
import { clients, offers, others } from "./../../layout/adminRoutes";
import { useMutation } from "react-apollo";
import { UPDATE_USER_ROLE } from "graphql/mutattions/settings";
import { USER_ROLES } from "graphql/queries/settings";
import swal from "sweetalert";

const AllocateSettings = ({ role }) => {
  const routes = [...offers, ...clients, ...others];
  const [priviledges, setPriviledges] = useState([]);
  const [update] = useMutation(UPDATE_USER_ROLE, {
    refetchQueries: [{ query: USER_ROLES }],
  });

  // const privileges = JSON.parse(atob(role?.privileges) ?? "[]");
  // console.log(privileges);4

  const handleSubmit = () => {
    swal({
      icon: "warning",
      title: "Are you sure?",
      text: "Once allocated, you can't change it!",
      buttons: ["No", { text: "Yes", closeModal: false }],
    }).then((input) => {
      if (input) {
        update({
          variables: {
            user_role_id: role.user_role_id,
            position: role.position,
            privileges: btoa(JSON.stringify(priviledges)),
          },
        })
          .then((res) => {
            swal("Success!", "Privileges updated!", "success");
            swal.stopLoading();
            swal.close();
          })
          .catch((err) => {
            swal("Error!", "Privileges not updated", "error");
            swal.stopLoading();
            swal.close();
          });
      }
    });
  };

  return (
    <div>
      {/* {btoa(JSON.stringify(priviledges))} */}
      {routes.map(({ name, icon, functionalities }, id) => (
        <SettingsCard
          functionalities={functionalities}
          active={priviledges.includes(name)}
          setPrivileges={setPriviledges}
          icon={icon}
          name={name}
          key={id}
        />
      ))}
      <div className="row pl-3">
        <button
          onClick={handleSubmit}
          className="btn btn-block btn-sm btn-primary btn-square"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default AllocateSettings;
