export const columns = [
    {
      label: "Policy #",
      field: "policy_number",
      sort: "asc",
      width: 100
    },
    {
      label: "Insurance Company",
      field: "insurance_company",
      sort: "asc",
      width: 80

      
    },
    {
      label: "Insured",
      field: "insured",
      sort: "asc",
      width: 200
    },
    {
      label: "Class Of Business",
      field: "cob",
      sort: "asc",
      width: 200

    },
    {
      label: "Sum Insured",
      field: "sum_insured",
      sort: "asc",
      width: 200

    },
    {
      label: "Premium",
      field: "premium",
      sort: "asc",
      width: 200

    },
    {
      label: "Total Participants",
      field: "participants",
      sort: "asc",
      width: 200

    },
    {
      label: "Claim Status",
      field: "claim_status",
      sort: "asc",
      width: 200

    },
    {
      label: "Offer Date",
      field: "offer_date",
      sort: "asc",
      width: 200

    },
    {
      label: "Actions",
      field: "actions",
      sort: "asc",
      width: 200

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