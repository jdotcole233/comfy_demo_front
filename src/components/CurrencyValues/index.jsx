import React from 'react';


export default ({ data }) => {
    return (
        <table className="table mt-1 table-bordered border-primary">
            <thead>
                <tr>
                    <th>GHC</th>
                    <th>USD</th>
                    <th>EUR</th>
                    <th>GBP</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th>{data?.total_cedis || 0.00}</th>
                    <th>{data?.total_dollar || 0.00}</th>
                    <th>{data?.total_euros || 0.00}</th>
                    <th>{data?.total_pounds || 0.00}</th>
                </tr>
            </tbody>
        </table>
    )
}