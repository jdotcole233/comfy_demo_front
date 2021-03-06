import React, { useMemo, useState } from "react";
import Treaty from "./Treaty";
import Pagination from "react-paginate";
import { useTreatyPrograms } from "../../context/TreatyProgramsProvider";
import { chunkArray } from "../../components";
import InsurersFilter from "./components/InsurersFilter";

const TreatyListing = () => {
  const { treatyPrograms, search, handleSearch, handleFilter } = useTreatyPrograms();
  const [activePage, setActivePage] = useState(0);

  const pages = useMemo(() => {
    if (treatyPrograms) {
      const pages = chunkArray(treatyPrograms, 6);
      return pages;
    }
    return [];
  }, [treatyPrograms]);

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber.selected);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="w-100 d-flex  mt-2">
          <div className="col-md-8">
            <div className="form-group">
              {/* <label htmlFor="insurersFilter">Filter by Insurer(s)</label> */}
              <InsurersFilter onChange={(value) => value ? handleFilter(value?.map(el => el.value)) : null} />
            </div>
          </div>
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
      <div className="mt-3 row d-flex">
        {pages[activePage]?.map((_, index) => (
          <Treaty key={index} treaty={_} />
        ))}
        {!pages[activePage] && <div className="col-md-12 text-lg">No treaties found</div>}
      </div>
      <Pagination
        pageClassName="page-item"
        pageLinkClassName="page-link"
        containerClassName="pagination justify-content-end mr-4"
        activeClassName="active"
        initialPage={activePage}
        pageCount={pages.length}
        itemsCountPerPage={6}
        totalItemsCount={pages.length}
        pageRangeDisplayed={5}
        nextClassName="page-item"
        previousClassName="page-item"
        nextLinkClassName="page-link"
        previousLinkClassName="page-link"
        disabledClassName=""
        marginPagesDisplayed={5}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default TreatyListing;
