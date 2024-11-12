import React from "react";
import Spinner from "react-bootstrap/esm/Spinner";

const CustomSpinner = ({ size }) => {
  return (
    <div className="w-100 h-100 d-flex justify-content-center align-items-center">
      <Spinner size={size} />
    </div>
  );
};

export default CustomSpinner;
