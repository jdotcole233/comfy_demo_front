import React from "react";
import { InsurerProvider } from "../../context/InsurerProvider";
import ViewTreaty from "./components/ViewTreaty";

const ViewTreatyWrapper = () => {
  return (
    <InsurerProvider>
      <ViewTreaty />
    </InsurerProvider>
  );
};

export default ViewTreatyWrapper;
