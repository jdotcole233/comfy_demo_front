import React, { Fragment, useState } from "react";
import { Drawer } from "../../../components";
import AllocateSettings from "../AllocateSettings";

const PagePermissionItem = ({ name, role }) => {
  const [showDrawer, setShowDrawer] = useState(false);

  const handleToggleDrawer = () => setShowDrawer((prev) => !prev);

  return (
    <Fragment>
      <tr>
        {/* <td>

                </td> */}
        <td>
          <h5 class="text-truncate font-size-14">
            <a class="text-dark" href="/projects-list">
              {name}
            </a>
          </h5>
          <p class="text-muted mb-0">It will be as simple as Occidental</p>
        </td>

        <td>
          <div class="dropdown">
            <button
              onClick={handleToggleDrawer}
              aria-haspopup="true"
              class="card-drop btn"
              aria-expanded="false"
            >
              <i class="mdi mdi-account-cog-outline font-size-18"></i>
            </button>
            <button
              onClick={null}
              aria-haspopup="true"
              class="card-drop btn"
              aria-expanded="false"
            >
              <i class="bx bx-trash text-danger font-size-18"></i>
            </button>
          </div>
        </td>
      </tr>

      <Drawer isvisible={showDrawer} toggle={handleToggleDrawer} width="40%">
        <AllocateSettings role={role} />
      </Drawer>
    </Fragment>
  );
};

export default PagePermissionItem;
