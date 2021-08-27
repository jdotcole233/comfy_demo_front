import React from "react";
import SettingsCard from "./components/SettingsCard";
import { clients, offers, others } from "./../../layout/adminRoutes";

const AllocateSettings = ({ role }) => {
  const routes = [...offers, ...clients, ...others];
  // const privileges = JSON.parse(role?.privileges ?? "[]");
  return (
    <div>
      {routes.map(({ name, icon, functionalities }, id) => (
        <SettingsCard
          functionalities={functionalities}
          // active={privileges.includes(name)}
          icon={icon}
          name={name}
          key={id}
        />
      ))}
      <div className="row pl-3">
        <button className="btn btn-block btn-sm btn-primary btn-square">
          Save
        </button>
      </div>
    </div>
  );
};

export default AllocateSettings;
