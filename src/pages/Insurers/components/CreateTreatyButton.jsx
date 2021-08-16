import React, { useState } from "react";
import { Drawer } from "../../../components";
import CreateTreatyForm from "./CreateTreatyForm";

const CreateTreatyButton = ({ insurer, refetch }) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpenDrawer(!openDrawer)}
        className="btn btn-primary waves-effect waves-light btn-sm mr-1"
      >
        Create Treaty <i className="mdi mdi-arrow-right ml-1"></i>
      </button>
      <Drawer
        isvisible={openDrawer}
        toggle={() => setOpenDrawer(!openDrawer)}
        width="40%"
      >
        {openDrawer && (
          <CreateTreatyForm
            refetch={refetch}
            insurer={insurer}
            setOpenDrawer={setOpenDrawer}
          />
        )}
      </Drawer>
    </>
  );
};

export default CreateTreatyButton;
