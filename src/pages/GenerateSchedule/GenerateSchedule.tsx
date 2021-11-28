import { useState } from "react";
import React from "react";
import { PageHeader, Tabs } from "../../components";
import { lazy } from "react";

const PaymentTransferSchedule = lazy(
  () => import("../BrokerGeneratePaymentSchedule")
);
const PaymentAllocationSchedule = lazy(
  () => import("../PaymentAllocationSchedule")
);
const PaymentAllocation = lazy(() => import("../PaymentAllocation"));

interface Props {}

const tabs = [
  {
    label: "Premium transfer schedule",
    value: "pts",
  },
  {
    label: "Payment allocation schedule ",
    value: "pas",
  },
  {
    label: "Payment Allocation",
    value: "pa",
  },
];

const GenerateSchedule = (props: Props) => {
  const [tab, setTab] = useState("pts");

  return (
    <div className="page-content">
      <PageHeader
        name="Generate Schedule"
        url="/admin/insurers-details/recent/"
        base="Broker session"
      />
      <div className="row p-4">
        <div className="col-md-12">
          <Tabs activeTab="pts" onChange={(vale) => setTab(vale)} tabs={tabs} />
        </div>

        <div className="col-md-12">
          {tab === "pts" && <PaymentTransferSchedule />}
        </div>
        <div className="col-md-12">
          {tab === "pas" && <PaymentAllocationSchedule />}
        </div>
        <div className="col-md-12">{tab === "pa" && <PaymentAllocation />}</div>
      </div>
    </div>
  );
};

export default GenerateSchedule;
