import React from "react";
import { Selector } from "../../../components";
import { useInsurers } from "../../Insurers/hooks/useInsurers";

interface Props {
  onChange: (value: any[]) => void;
}

const InsurersFilter = (props: Props) => {
  const { loading, insurers } = useInsurers();
  return (
    <>
      <Selector
        placeholder="Filter by Insurer(s)"
        isMulti
        isLoading={loading}
        options={insurers?.map((insurer) => ({
          value: insurer?.insurer_id,
          label: insurer?.insurer_company_name,
        }))}
        onChange={props.onChange}
      />
    </>
  );
};

export default InsurersFilter;
