import React, { useState, useEffect, useContext } from 'react'
import Insurer from './Insurer'
import { Drawer, Loader, chunkArray } from '../../components';
import AddInsurer from './AddInsurer';
import AddManager from './AddManager';
import Pagination from 'react-paginate'
import { create_insurer_access } from '../../layout/adminRoutes';
import { AuthContext } from '../../context/AuthContext';
import { useInsurer } from '../../context/InsurerProvider';

function Insurers() {
    const { state } = useContext(AuthContext)
    const { insurers, loading, associates } = useInsurer();
    // const [insurers, setInsurers] = useState([]);
    const [showAddInsurer, setshowAddInsurer] = useState(false);
    const [showAddManager, setshowAddManager] = useState(false);
    const [activePage, setActivePage] = useState(0)
    const [insurersInPages, setInsurersInPages] = useState([])
    const [selectedInsurer, setSelectedInsurer] = useState(null)
    const [search, setsearch] = useState("")


    const handleSearch = event => {
        const { value } = event.target;
        setsearch(value);

        if (value) {
            const newList = insurers.filter(item => {
                const itemToSearch = value.toLowerCase();
                const checkingItem = item.insurer_company_name.toLowerCase();

                return checkingItem.includes(itemToSearch);
            })

            setInsurersInPages(chunkArray(newList, 8))
        } else {
            setInsurersInPages(chunkArray(insurers, 8))
        }
    }


    useEffect(() => {
        if (insurers) {
            const pages = chunkArray(insurers, 8);
            setInsurersInPages(pages)
        }
    }, [insurers])

    const handlePageChange = pageNumber => {
        setActivePage(pageNumber.selected);
    }

    const handleShowAddManger = (data, flag) => {
        setSelectedInsurer(data);
        setshowAddManager(flag)
    }

    if (loading) {
        return <Loader />
    }


    return (
        <div className="page-content">
            <div className="col-xl-12 mt-">
                <div className="row">
                    <div className="col-md-6">
                        <div className="card mini-stats-wid">
                            <div className="card-body">
                                <div className="media">
                                    <div className="media-body">
                                        <p className="text-muted font-weight-medium">Total number of Insurers</p>
                                        <h4 className="mb-0">{insurers.length}</h4>
                                    </div>

                                    <div className="mini-stat-icon avatar-sm rounded-circle bg-primary align-self-center">
                                        <span className="avatar-title">
                                            <i className="bx bx-copy-alt font-size-24"></i>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card mini-stats-wid">
                            <div className="card-body">
                                <div className="media">
                                    <div className="media-body">
                                        <p className="text-muted font-weight-medium">Total number of Associates</p>
                                        <h4 className="mb-0">{associates}</h4>
                                    </div>

                                    <div className="avatar-sm rounded-circle bg-primary align-self-center mini-stat-icon">
                                        <span className="avatar-title rounded-circle bg-primary">
                                            <i className="bx bx-archive-in font-size-24"></i>
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
                        <h3>Insurers List</h3>
                    </div>
                    <div className="col-md-6" style={{ display: 'flex', justifyContent: "flex-end" }}>
                        {create_insurer_access.includes(state?.user?.position) && <button onClick={() => setshowAddInsurer(!0)} className="btn btn-rounded btn-primary">Add Insurer</button>}
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

            {loading && <Loader />}
            {insurersInPages.length ? <div className="row m-2">
                {insurersInPages[activePage].map((el, id) => <Insurer key={id} openManagerDrawer={handleShowAddManger} data={el} />)}
            </div> : ""}

            <Pagination
                pageClassName="page-item"
                pageLinkClassName="page-link"
                containerClassName="pagination justify-content-end mr-4"
                activeClassName="active"
                initialPage={activePage}
                pageCount={insurersInPages.length}
                itemsCountPerPage={8}
                totalItemsCount={insurers.length}
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
            <Drawer width="40%" isvisible={showAddInsurer} toggle={() => setshowAddInsurer(!!0)}>
                <AddInsurer toggle={() => setshowAddInsurer(!!0)} closed={!showAddInsurer} />
            </Drawer>
            <Drawer width="40%" isvisible={showAddManager} toggle={() => setshowAddManager(!!0)}>
                <AddManager closed={showAddManager} details={selectedInsurer} toggle={() => setshowAddManager(!!0)} />
            </Drawer>
        </div>
    )
}

export default Insurers
