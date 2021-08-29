import React, { useMemo } from 'react'
import { useSelector } from 'react-redux';
import { Datatable } from '../../../components';
import { managersColumn } from '../dummy'
import ManagerButtons from './ManagerButtons';

const InsurerDetailsManagers = ({ refetch }) => {
    const { insurer } = useSelector(state => state.insurer);


    const managers = useMemo(() => {
        if (insurer) {
            const list = [];
            insurer.insurer_associates.map((manager, i) => {
                const row = {
                    name: `${manager.assoc_first_name} ${manager.assoc_last_name}`,
                    phone: `${manager.assoc_primary_phonenumber}, ${manager.assoc_secondary_phonenumber}`,
                    email: `${manager.assoc_email}`,
                    actions: <ManagerButtons refetch={refetch} manager={manager} insurer={insurer} />,
                }
                list.push(row);
                return insurer;
            })
            return list
        }
    }, [insurer, refetch])

    return (
        <div className="col-md-12">
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title mb-4">Managers</h4>
                    <Datatable btn hover striped responsive bordered data={managers} columns={managersColumn} />
                </div>
            </div>
        </div>
    )
}

export default InsurerDetailsManagers
