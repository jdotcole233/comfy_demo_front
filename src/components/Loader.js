import React from "react";

export default () => (
  <div className="page-content">
    <div
      style={{
        height: 600,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <img src={require("../assets/visal-sm-logo.png")} alt="" height="40" />
      <div className="spinner-border text-primary m-1" role="status">
        <span className="sr-only">Loading...</span>
      </div>
      <h6 className="text-primary">Loading ...</h6>
    </div>
  </div>
);
