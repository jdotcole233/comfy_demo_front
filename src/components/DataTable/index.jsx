/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { MDBDataTable } from "mdbreact";
import $ from "jquery";
import { memo } from "react";
$.DataTable = require("datatables.net");

const Table = ({ data = [], columns, ref, ...rest }) => {
  return (
    <MDBDataTable
      {...rest}
      ref={ref}
      bordered
      responsive
      searchingLabel="Search"
      data={{ columns, rows: data }}
      theadColor="success"
      className=""
    />
  );
};

export default memo(Table);
