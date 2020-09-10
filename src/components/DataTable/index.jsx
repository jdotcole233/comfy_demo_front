/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { MDBDataTable } from 'mdbreact'
import $ from "jquery";
$.DataTable = require("datatables.net");

const Table = React.memo(({ data, columns, ref, ...rest }) => {
    return (
        <MDBDataTable  {...rest} ref={ref} bordered responsive data={{ columns, rows: data }} />
    )
})

export default Table
