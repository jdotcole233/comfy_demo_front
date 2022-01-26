import React, { Fragment, useState } from "react";
import { Drawer } from "../../components";
import NewTreaty from "../Insurers/components/NewTreaty";

const CreateTreatyPrgrams = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <Fragment>
      <button
        onClick={() => setOpenDrawer((prev) => !prev)}
        className="btn btn-sm w-md waves-effect btn-success"
      >
        Create Treaty Progam
      </button>

      <Drawer
        isvisible={openDrawer}
        width="40%"
        toggle={() => setOpenDrawer((prev) => !prev)}
      >
        <NewTreaty setOpenDrawer={setOpenDrawer} />
      </Drawer>
    </Fragment>
  );
};

export default CreateTreatyPrgrams;
