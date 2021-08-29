export const columns = [
  {
    label: "Ref#",
    field: "treaty_reference",
  },
  {
    label: "Treaty Program",
    field: "treaty_program",
  },
  {
    label: "Reinsured",
    field: "reinsured",
  },
  {
    label: "Created By",
    field: "employee",
  },
  {
    label: "Period",
    field: "period",
  },
  {
    label: "Payment Status",
    field: "treaty_payment_status",
  },
  {
    label: "Actions",
    field: "actions",
  },
]


export const claimsColumns = [
  {
    label: "Claim Amount (100%)",
    field: "claim_amount"
  },
  {
    label: "Claim Date",
    field: "claim_date"
  },
  {
    label: "Created at",
    field: "created_at"
  },
  {
    label: "Actions",
    field: "actions"
  },
];

export const makeClaimPreview = [
  {
    label: "Policy Number",
    field: "policy_number"
  },
  {
    label: "Claim Number",
    field: "claim_number"
  },
  {
    label: "Date of Loss",
    field: "date_of_loss"
  },
  {
    label: "Insured",
    field: "insured_name"
  },
  {
    label: "Claim Paid",
    field: "claim_paid"
  },
  {
    label: "Layer Number",
    field: "layer_number"
  },
  {
    label: "Actions",
    field: "actions"
  },
];

export const distributionsColumns = [
  {
    label: "Reinsurer",
    field: "reinsurer"
  },
  {
    label: "Claim Amount (100%)",
    field: "claim_amount"
  },
  {
    label: "Participating %",
    field: "percentage"
  },
  {
    label: "Actual Claim",
    field: "actual_claim"
  },
  {
    label: "Created On",
    field: "created_at"
  },
  {
    label: "Actions",
    field: "actions"
  },
]

export const acceptedColumns = [
  {
    provided: "",
    accepted: "Policy Number"
  },
  {
    provided: "",
    accepted: "Claim Number"
  },
  {
    provided: "",
    accepted: "Insured Name"
  },
  {
    provided: "",
    accepted: "Date of Loss"
  },
  {
    provided: "",
    accepted: "Claim Paid"
  },
  {
    provided: "",
    accepted: "Expected deductible"
  },
]

export const treatyClaimsClaimsColumns = [
  {
    label: "Policy Number",
    field: "policy_number"
  },
  {
    label: "Claim Number",
    field: "claim_number"
  },
  {
    label: "Insured",
    field: "insured_name"
  },
  {
    label: "Date of Loss",
    field: "date_of_loss"
  },
  {
    label: "Claim Paid",
    field: "claim_paid"
  },
  {
    label: "Actions",
    field: "actions"
  },
];