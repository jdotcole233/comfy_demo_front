import { Fragment, useState } from "react";
import React from "react";

type TabProps = {
  label: string;
  value: string;
};

interface Props {
  activeTab: string;
  tabs: TabProps[];
  onChange: (tab: string) => void;
}

const Tabs = ({ tabs, ...props }: Props) => {
  const [_tab, setTab] = useState(() => props.activeTab || tabs[0].value);

  const handleChange = (tab: string) => {
    setTab(tab);
    props.onChange(tab);
  };

  return (
    <Fragment>
      <div className="row mb-3">
        <div className="d-flex w-auto justify-content-between">
          <ul className="nav nav-tabs nav-tabs-custom kek-nav-items-pointer">
            {tabs?.map((tab) => (
              <li onClick={() => handleChange(tab.value)} className="nav-item">
                <span
                  className={`nav-link ${_tab === tab.value ? "active" : ""}`}
                >
                  {tab.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Fragment>
  );
};

export default Tabs;
