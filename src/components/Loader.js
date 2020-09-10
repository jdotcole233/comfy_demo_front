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
      <div className="spinner-border text-dark m-1" role="status">
        <span className="sr-only">Loading...</span>
      </div>
      <h6>Loading ...</h6>
    </div>
  </div>
);
