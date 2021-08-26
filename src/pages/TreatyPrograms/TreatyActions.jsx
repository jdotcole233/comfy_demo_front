import React, { Fragment, useState } from "react";
import { BsEye, BsTrash } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { BottomDrawer, Drawer, Prompt } from "../../components";
import DeleteTreaty from "./DeleteTreaty";
import EditTreaty from "./EditTreaty";
import NewDeduction from "./NewDeduction";
import ViewDeductions from "./ViewDeductions";

const TreatyActions = ({ treaty }) => {
  const [openDeductions, setOpenDeductions] = useState(false);
  const [openEditTreaty, setOpenEditTreaty] = useState(false);
  const [deletePrompt, setDeletePrompt] = useState(false);
  const [addnewDeduction, setAddnewDeduction] = useState(false);
  const toggleViewDeductions = () => setOpenDeductions((prev) => !prev);
  const toggleEditTreaty = () => setOpenEditTreaty((prev) => !prev);
  const toggleAddDeduction = () => setAddnewDeduction((prev) => !prev);

  const addNewDeduction = () => {
    // setOpenDeductions(prev => !prev);
    setAddnewDeduction(true);
  };

  const closeEverything = () => {
    // setOpenDeductions(false);
    setAddnewDeduction(false);
  };

  return (
    <Fragment>
      <div className="d-flex font-size-20">
        {/* <Link to="/admin/treaty-programs/overview" data-toggle="tooltip" data-placement="top" title="Open Treaty" className="flex-fill text-white link-hover p-1 d-flex justify-content-center align-items-center">
                    <VscOpenPreview size={18} />
                </Link> */}
        <div
          onClick={toggleEditTreaty}
          data-toggle="tooltip"
          data-placement="top"
          title="Edit Treaty"
          className="flex-fill d-flex link-hover p-1 justify-content-center align-items-center"
        >
          <FiEdit size={18} />
        </div>
        <div
          data-toggle="tooltip"
          onClick={() => setDeletePrompt((prev) => !prev)}
          data-placement="top"
          title="Delete Treaty"
          className="flex-fill d-flex link-hover p-1 justify-content-center align-items-center"
        >
          <BsTrash size={18} />
        </div>
        <div
          onClick={toggleViewDeductions}
          data-toggle="tooltip"
          data-placement="top"
          title="View Treaty Deductions"
          className="flex-fill d-flex link-hover p-1 justify-content-center align-items-center"
        >
          <BsEye size={18} />
        </div>
      </div>

      <BottomDrawer
        isvisible={openDeductions}
        height="70%"
        toggle={toggleViewDeductions}
      >
        <ViewDeductions
          treaty={treaty}
          setOpenDeductions={addNewDeduction}
          deductions={treaty?.treaty_associate_deductions}
        />
      </BottomDrawer>

      <Prompt
        isvisible={deletePrompt}
        toggle={() => setDeletePrompt((prev) => !prev)}
      >
        <DeleteTreaty
          onClose={() => setDeletePrompt(false)}
          id={treaty?.treaty_program_id}
        />
      </Prompt>

      <Drawer isvisible={openEditTreaty} width="40%" toggle={toggleEditTreaty}>
        <EditTreaty treaty={treaty} setOpenDeductions={setOpenEditTreaty} />
      </Drawer>

      <Drawer
        isvisible={addnewDeduction}
        width="40%"
        toggle={toggleAddDeduction}
      >
        <NewDeduction treaty={treaty} close={closeEverything} />
      </Drawer>
    </Fragment>
  );
};

export default TreatyActions;
