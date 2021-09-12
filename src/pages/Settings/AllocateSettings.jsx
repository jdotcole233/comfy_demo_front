import React, { useState } from "react";
import SettingsCard from "./components/SettingsCard";
import {
  clients,
  offers,
  others,
  menus,
  treaty,
} from "./../../layout/adminRoutes";
import { useMutation } from "react-apollo";
import { UPDATE_USER_ROLE } from "../../graphql/mutattions/settings";
import { USER_ROLES } from "../../graphql/queries/settings";
import swal from "sweetalert";

const AllocateSettings = ({ role, setShow }) => {
  const routes = [...offers, ...clients, ...others, ...treaty, ...menus];
  const [priviledges, setPriviledges] = useState(() => {
    return JSON.parse(atob(role?.privileges) ?? "[]");
  });
  const [update] = useMutation(UPDATE_USER_ROLE, {
    refetchQueries: [{ query: USER_ROLES }],
  });

  // const privileges = JSON.parse(atob(role?.privileges) ?? "[]");
  // console.log(privileges);4
  // TODO: list functionalities for each role when clicked

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
            setShow && setShow(false);
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
      <div>
        <h2>Role: {role?.position} privileges</h2>
      </div>
      <div className="alert alert-danger">
        <p>
          Select one or more components from the list below. The components you
          select for a particular role will determine what a user can access or
          not in the system.
        </p>
        <p>
          Note: The component already <b>ticked</b> has been assigned to a said
          role in the system. To prevent the user from accessing such a feature,{" "}
          <b>untick</b> the component by clicking on the tick icon followed by a
          save action.
        </p>

        <p>
          These Changes will take effect after the user logs out and logs back
          in to the system.
        </p>
      </div>
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
      <div className="row p-2">
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
