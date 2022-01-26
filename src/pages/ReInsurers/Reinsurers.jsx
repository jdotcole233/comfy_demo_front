import React, { useState, useEffect, useContext } from 'react'
import ReInsurer from './Re-Insurer'
import { Drawer, Loader, chunkArray } from '../../components';
import AddReInsurer from './AddReInsurer';
import AddAssociate from './AddAssociate';
import Pagination from 'react-paginate'
import { useQuery } from "@apollo/client"
import { REINSURERS } from '../../graphql/queries';
import { create_reinsurer_access } from '../../layout/adminRoutes';
import { AuthContext } from '../../context/AuthContext';

function ReInsurers() {
    const { data, loading } = useQuery(REINSURERS, { fetchPolicy: "network-only" });
    const [reinsurers, setReinsurers] = useState([]);
    const [selectedReinsurer, setSelectedReinsurer] = useState(null)
    const [activePage, setActivePage] = useState(0)
    const [reinsurersInPages, setReinsurersInPages] = useState([])
    const [search, setsearch] = useState("")
    const { state: ctx } = useContext(AuthContext)


    const handleSearch = event => {
        const { value } = event.target;
        setsearch(value);

        if (value) {
            const newList = reinsurers.filter(item => {
                const itemToSearch = value.toLowerCase();
                const checkingItem = item.re_company_name.toLowerCase();

                return checkingItem.includes(itemToSearch);
            })

            setReinsurersInPages(chunkArray(newList, 8))
        } else {
            setReinsurersInPages(chunkArray(reinsurers, 8))
        }
    }

    useEffect(() => {
        if (data) {
            setReinsurers(data.reinsurers);
            const pages = chunkArray(data.reinsurers, 8);
            setReinsurersInPages(pages);
        }
    }, [data])

    const [showAddReInsurer, setshowAddReInsurer] = useState(false);
    const [showAddAssociate, setshowAddAssociate] = useState(false)

    //handle open add associate drawer with particular reinsurer data
    const handleOpenAddAssociate = (data, flag) => {
        setSelectedReinsurer(data);
        setshowAddAssociate(flag);
    }

    const handlePageChange = pageNumber => {
        setActivePage(pageNumber.selected);
    }

    if (loading) {
        return <Loader />
    }

    return (
        <div className="page-content">
            <div className="col-xl-12 mt-">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card mini-stats-wid">
                            <div className="card-body">
                                <div className="media">
                                    <div className="media-body">
                                        <p className="text-muted font-weight-medium">Total number of Re-Insurers</p>
                                        <h4 className="mb-0">{reinsurers.length}</h4>
                                    </div>

                                    <div className="mini-stat-icon avatar-sm  bg-success align-self-center">
                                        <span className="avatar-title bg-success">
                                            <i className="bx bx-copy-alt font-size-24"></i>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6">
                        <h3>Re-Insurers List</h3>
                    </div>
                    <div className="col-md-6" style={{ display: 'flex', justifyContent: "flex-end" }}>
                        {create_reinsurer_access.includes(ctx?.user?.user_role?.position) && <button onClick={() => setshowAddReInsurer(!0)} className="btn  btn-sm btn-success">Add Re-Insurer</button>}
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12 d-flex justify-content-end mt-2">
                    <div className="col-md-4 mb-2 d-flex justify-content-end">
                        <input type="text" value={search} onChange={handleSearch} placeholder="search" className="form-control" />
                    </div>
                </div>



            </div>
            {reinsurersInPages.length ? <div className="row m-2">
                {reinsurersInPages[activePage].map((el, id) => <ReInsurer key={id} openAssociateModal={handleOpenAddAssociate} data={el} />)}
            </div> : ""}

            <Pagination
                pageClassName="page-item"
                pageLinkClassName="page-link"
                containerClassName="pagination justify-content-end mr-4"
                activeClassName="active"
                initialPage={activePage}
                pageCount={reinsurersInPages.length}
                itemsCountPerPage={8}
                totalItemsCount={reinsurers.length}
                pageRangeDisplayed={5}
                nextClassName="page-item"
                previousClassName="page-item"
                nextLinkClassName="page-link"
                previousLinkClassName="page-link"
                disabledClassName=""
                marginPagesDisplayed={5}
                onPageChange={handlePageChange}
            />
            {/*Drawer for add Reinsurer */}
            <Drawer width="40%" isvisible={showAddReInsurer} toggle={() => setshowAddReInsurer(!!0)}>
                <AddReInsurer toggle={() => setshowAddReInsurer(!!0)} closed={!showAddReInsurer} />
            </Drawer>
            <Drawer width="40%" isvisible={showAddAssociate} toggle={() => setshowAddAssociate(!!0)}>
                <AddAssociate details={selectedReinsurer} toggle={() => setshowAddAssociate(!!0)} />
            </Drawer>
        </div>
    )
}

export default ReInsurers
