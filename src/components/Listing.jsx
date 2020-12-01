import React from 'react'
import { Datatable } from '.'

const Listing = ({ columns, title, rows, loading, entries = 5 }) => {
    return (
        <div>
            <Datatable columns={columns} data={rows} entries={entries} />
        </div>
    )
}

export default Listing
