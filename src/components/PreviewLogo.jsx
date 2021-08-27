import React from "react";

function PreviewLogo() {
  return (
    <div className="col-md-12 d-flex justify-content-end ">
      <div className="preview-header-style">
        <img
          className=""
          src={require("../assets/banner.png")}
          alt="kek letter head"
        />
      </div>
    </div>
  );
}

export default PreviewLogo;
