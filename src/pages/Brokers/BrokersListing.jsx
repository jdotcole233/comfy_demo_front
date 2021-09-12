import { chunkArray } from "../../components";
import React, { useState, useEffect } from "react";
import { Fragment } from "react";
import Broker from "./components/Broker";
import Pagination from "react-paginate";
import { useBrokerContext } from "./provider/BrokerProvider";

const BrokersListing = ({}) => {
  const { brokers } = useBrokerContext();
  const [search, setsearch] = useState("");
  const [activePage, setActivePage] = useState(0);
  const [brokersInPages, setBrokersInPages] = useState([]);

  const handleSearch = (event) => {
    const { value } = event.target;
    setsearch(value);

    if (value) {
      const newList = brokers.filter((item) => {
        const itemToSearch = value.toLowerCase();
        const checkingItem = item.re_broker_name.toLowerCase();

        return checkingItem.includes(itemToSearch);
      });

      setBrokersInPages(chunkArray(newList, 8));
    } else {
      setBrokersInPages(chunkArray(brokers, 8));
    }
  };

  useEffect(() => {
    if (brokers) {
      const pages = chunkArray(brokers, 8);
      setBrokersInPages(pages);
    }
  }, [brokers]);

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber.selected);
  };

  return (
    <Fragment>
      <div className="row">
        <div className="col-md-12 d-flex justify-content-end mt-2">
          <div className="col-md-4 mb-2 d-flex justify-content-end">
            <input
              type="text"
              value={search}
              onChange={handleSearch}
              placeholder="search"
              className="form-control"
            />
          </div>
        </div>
      </div>
      <div className="row m-2">
        {brokersInPages[activePage]?.map((broker, key) => (
          <Broker {...{ broker, key }} />
        ))}
      </div>
      <Pagination
        pageClassName="page-item"
        pageLinkClassName="page-link"
        containerClassName="pagination justify-content-end mr-4"
        activeClassName="active"
        initialPage={activePage}
        pageCount={brokersInPages.length}
        itemsCountPerPage={8}
        totalItemsCount={brokers.length}
        pageRangeDisplayed={5}
        nextClassName="page-item"
        previousClassName="page-item"
        nextLinkClassName="page-link"
        previousLinkClassName="page-link"
        disabledClassName=""
        marginPagesDisplayed={5}
        onPageChange={handlePageChange}
      />
    </Fragment>
  );
};

export default BrokersListing;
