import { Datatable } from "../../../components";
import { useAuth } from "../../../context/AuthContext";
import { deleteAccessRoles } from "../../../layout/adminRoutes";
import React, { useMemo } from "react";
import { useState } from "react";
import { associatesColumns } from "./columns";

const InsurerDetailBrokerAssociates = ({ treaty }) => {
  const { user } = useAuth();
  const [toggle, setToggle] = useState(false);
  const handleRemoveAssociate = () => {};
  const rows = useMemo(() => {
    if (treaty && treaty.treaty_to_broker_associates) {
      return treaty.treaty_to_broker_associates.map((associate) => ({
        ...associate,
        ...associate.broker_associate,
        ...associate.broker_associate.re_broker,
        rep_phone: [
          associate.broker_associate.re_broker_assoc_primary_phone,
          associate.broker_associate.re_broker_assoc_secondary_phone,
        ].join(","),
        rep_name: `${associate?.broker_associate?.re_broker_assoc_first_name} ${associate?.broker_associate?.re_broker_assoc_last_name}`,
        key: associate.re_broker_associate_id,
        email_status: (
          <span
            style={{ letterSpacing: 3 }}
            className={`badge badge-soft-${
              associate.sent_status === "UNSENT" ? "danger" : "success"
            }`}
          >
            {associate.sent_status}
          </span>
        ),
        actions: (
          <button
            disabled={
              ![...deleteAccessRoles, "Broking Officer"].includes(
                user?.position
              )
            }
            onClick={() => handleRemoveAssociate(associate)}
            className="btn "
          >
            <i className="bx bx-trash text-danger"></i>
          </button>
        ),
      }));
    }
    return [];
  }, [treaty]);

  console.log("rows", rows);
  return (
    <div className="card">
      <div className="col-md-12 d-flex justify-content-between card-body">
        <span className="card-title">Effected with (Broker Associates)</span>
        <button onClick={() => setToggle(prev => !prev)} className="btn">
            {toggle ? "close":"Expand"}
        </button>
      </div>
      {toggle && <div className="card-body col-md-12">
        <Datatable columns={associatesColumns} data={rows} />
      </div>}
    </div>
  );
};

export default InsurerDetailBrokerAssociates;
