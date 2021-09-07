import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CHANGE_INSURER_PAGE_TYPE } from "../../../redux/types/InsurerTypes";

const InsurerDetialsTopBar = () => {
  const dispatch = useDispatch();
  const type = useSelector((state) => state.insurer.type);
  const granted = useSelector((state) => state.app.granted);

  const changePageType = (_type) => {
    dispatch({
      type: CHANGE_INSURER_PAGE_TYPE,
      payload: _type,
    });
  };

  return (
    <Fragment>
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-flex align-items-center justify-content-between">
            <h4 className="mb-0 font-size-18">Inusrer Details</h4>

            <div className="page-title-right row">
              {granted && (
                <div className="btn-group mr-4">
                  <div
                    onClick={() => changePageType("Fac")}
                    className={`btn ${
                      type !== "Fac" ? "btn-secondary" : "btn-primary"
                    } w-lg btn-sm`}
                  >
                    <span className="bx bx-archive-in mr-4"></span>
                    Facultative
                  </div>
                  <div
                    onClick={() => changePageType("Treaty")}
                    className={`btn ${
                      type !== "Treaty" ? "btn-secondary" : "btn-primary"
                    } w-lg btn-sm`}
                  >
                    <span className="bx bx-receipt mr-4"></span>
                    Treaty
                  </div>
                </div>
              )}
              <ol className="breadcrumb m-0">
                <li className="breadcrumb-item">
                  <Link to="/admin/insurers">Insurers</Link>
                </li>
                <li className="breadcrumb-item active">Profile</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default InsurerDetialsTopBar;
