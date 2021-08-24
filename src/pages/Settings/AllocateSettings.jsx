import React from "react";
import SettingsCard from "./components/SettingsCard";
import { clients, dashboard, offers, others } from "./../../layout/adminRoutes";

const AllocateSettings = () => {
  const routes = [...dashboard, ...offers, ...clients, ...others];

  return (
    <div>
      {routes.map(({ name, icon, functionalities }, id) => (
        <SettingsCard
          functionalities={functionalities}
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
