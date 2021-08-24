import React, { useState, useEffect } from "react";
import Employee from "./Employee";
import { Drawer, Loader, chunkArray, NoData } from "../../components";
import AddEmployee from "./AddEmployee";
import Pagination from "react-paginate";
import { useEmployee } from "../../context/EmployeeProvider";
import EmployeesActivityLogs from "./components/EmployeesActivityLogs";

export default () => {
  const { employees, loading, length } = useEmployee();
  const [employeesInPages, setEmployeesInPages] = useState([]);
  const [activePage, setActivePage] = useState(0);
  const [search, setSearch] = useState("");

  const handleChange = (event) => {
    const { value } = event.target;
    setSearch(value);

    if (value && activePage <= employeesInPages.length - 1) {
      const newList = employees.filter((item) => {
        const itemToSearch = value.toLowerCase();
        const name =
          `${item.employee_first_name.toLowerCase()}${item.employee_last_name.toLowerCase()}`.toLowerCase();
        return name.includes(itemToSearch);
      });

      setEmployeesInPages(chunkArray(newList, 6));
    } else {
      setEmployeesInPages(chunkArray(employees, 6));
    }
  };

  useEffect(() => {
    if (employees) {
      const pages = chunkArray(employees, 6);
      setEmployeesInPages(pages);
    }
  }, [employees]);
  const [showAddInsurer, setshowAddInsurer] = useState(false);
  const [showAddAssociate, setshowAddAssociate] = useState(false);
  const [selectedEmployee, setselectedEmployee] = useState(null);

  const handleShowEmployee = (employee) => {
    setselectedEmployee(employee);
    setshowAddAssociate(true);
  };

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber.selected);
  };

  return (
    <>
      {loading && <Loader />}
      {!loading && (
        <div className="page-content">
          <div className="col-xl-12 mt-">
            <div className="row">
              <div className="col-md-12">
                <div className="card mini-stats-wid">
                  <div className="card-body">
                    <div className="media">
                      <div className="media-body">
                        <p className="text-muted font-weight-medium">
                          Total number of Employees
                        </p>
                        <h4 className="mb-0">{length}</h4>
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
            </div>
          </div>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-6">
                <h3>Employees</h3>
                <EmployeesActivityLogs />
              </div>
              <div
                className="col-md-6"
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                <button
                  onClick={() => setshowAddInsurer(!0)}
                  className="btn btn-rounded btn-sm w-md btn-primary"
                >
                  Add Employee
                </button>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 d-flex justify-content-end mt-2">
              <div className="col-md-4 mb-2 d-flex justify-content-end">
                <input
                  type="text"
                  value={search}
                  onChange={handleChange}
                  placeholder="search"
                  className="form-control"
                />
              </div>
            </div>
          </div>

          <div className="row m-2">
            {employeesInPages.length ? (
              employeesInPages[
                employeesInPages.length <= activePage
                  ? activePage - 1
                  : activePage
              ].map((el, id) => (
                <Employee
                  key={id}
                  openViewEmployee={handleShowEmployee}
                  data={el}
                />
              ))
            ) : (
              <NoData />
            )}
          </div>

          <Pagination
            pageClassName="page-item"
            pageLinkClassName="page-link"
            containerClassName="pagination justify-content-end mr-4"
            activeClassName="active"
            initialPage={activePage}
            pageCount={employeesInPages.length}
            itemsCountPerPage={8}
            totalItemsCount={length}
            pageRangeDisplayed={5}
            nextClassName="page-item"
            previousClassName="page-item"
            nextLinkClassName="page-link"
            previousLinkClassName="page-link"
            disabledClassName=""
            marginPagesDisplayed={5}
            onPageChange={handlePageChange}
          />

          {/* Drawer for adding Employee */}
          <Drawer
            width="40%"
            isvisible={showAddInsurer}
            toggle={() => setshowAddInsurer(!!0)}
          >
            <AddEmployee toggle={() => setshowAddInsurer(!!0)} />
          </Drawer>
          <Drawer
            width="40%"
            isvisible={showAddAssociate}
            toggle={() => setshowAddAssociate(!!0)}
          >
            <AddEmployee
              editing={showAddAssociate}
              employee={selectedEmployee}
              toggle={() => setshowAddAssociate(!!0)}
            />
          </Drawer>
        </div>
      )}
    </>
  );
};
