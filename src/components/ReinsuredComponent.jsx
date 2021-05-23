import React from "react";

const ReinsuredComponent = ({ name }) => (
  <span>
    {name}
    <sup className="text-danger ml-2 font-weight-bold">RETRO</sup>
  </span>
);

export default ReinsuredComponent;
