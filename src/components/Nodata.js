import React from "react";
import NoDataSVGImage from "../assets/undraw_empty_xct9.svg";

export default () => (
  <div
    style={{
      display: "flex",
      flexDirection:"column",
      justifyContent: "center",
      alignItems: "center",
      height: 400,
      width: "100%",
    }}
  >
    <img src={NoDataSVGImage} height={150} width={150} alt="" />
    <h6>Sorry found nothing</h6>
  </div>
);
