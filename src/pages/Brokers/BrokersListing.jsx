import React, { useState } from "react";
import { Fragment } from "react";
import Broker from "./components/Broker";

const BrokersListing = ({ brokers }) => {
  const [search, setsearch] = useState("");
  const [activePage, setActivePage] = useState(0);

  const handleSearch = (event) => {
    const { value } = event.target;
    setsearch(value);

    if (value) {
      const newList = brokers.filter((item) => {
        const itemToSearch = value.toLowerCase();
        const checkingItem = item.broker_company_name.toLowerCase();

        return checkingItem.includes(itemToSearch);
      });

      setInsurersInPages(chunkArray(newList, 8));
    } else {
      setInsurersInPages(chunkArray(insurers, 8));
    }
  };

  useEffect(() => {
    if (insurers) {
      const pages = chunkArray(insurers, 8);
      setInsurersInPages(pages);
    }
  }, [insurers]);

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
              //   value={search}
              //   onChange={handleSearch}
              placeholder="search"
              className="form-control"
            />
          </div>
        </div>
      </div>
      <div className="row m-2">
        <Broker />
      </div>
    </Fragment>
  );
};

export default BrokersListing;
