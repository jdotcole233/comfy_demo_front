
export default {
  columns: [
    {
      label: "Policy #",
      field: "name",
      sort: "asc",
    },
    {
      label: "Class of Business",
      field: "cob",
      sort: "asc",
    },
    {
      label: "Insured",
      field: "insured",
      sort: "asc",
    },
    {
      label: "Sum Insured",
      field: "sum_insured",
      sort: "asc",
    },
    {
      label: "Fac. Sum Insured",
      field: "f_sum_insured",
      sort: "asc",
    },
    {
      label: "Comission (%)",
      field: "comission",
      sort: "asc",
    },
    {
      label: "Offer Status",
      field: "offer_status",
      sort: "asc",
    },
    {
      label: "END",
      field: "endorsements",
      sort: "asc",
    },
    {
      label: "Payment Status",
      field: "payment_status",
      sort: "asc",
    },
    {
      label: "Offer Date",
      field: "offer_date",
      sort: "asc",
    },
    {
      label: "Actions",
      field: "salary",
      sort: "asc",
    },
  ],
};

export const paymentsColumns = [
  {
    label: "Payment Type",
    field: "type",
  },
  {
    label: "Bank Name",
    field: "bank_name",
  },
  {
    label: "Beneficiary Bank Name",
    field: "beneficiary_bank",
  },
  {
    label: "Payment Amt",
    field: "payment_amount",
  },
  {
    label: "Payment Date",
    field: "created_at",
  },
  {
    label: "Last Payment Upate",
    field: "updated_at",
  },
  {
    label: "Actions",
    field: "actions",
  },
];

export const managersColumn = [
  {
    label: "Name",
    field: "name",
  },
  {
    label: "Phone number(s)",
    field: "phone",
  },
  {
    label: "Email",
    field: "email",
  },
  {
    label: "Actions",
    field: "actions",
  },
];


export const buildPayload = (data = []) => {
  const details = data.map((el) => ({
    offer_participant_payment_id: el.offer_participant_id,
    paid_details: JSON.stringify({
      payment_type: el.payment_type,
      payment_from: {
        cheque_number: el.cheque_number ? el.cheque_number : "N/A",
        bank_name: el.bank_name,
      },
      payment_to: el.b_bank_name ? el.b_bank_name : "N/A",
    }),
    payment_comment: el.comment || "-",
  }));

  return details;
};