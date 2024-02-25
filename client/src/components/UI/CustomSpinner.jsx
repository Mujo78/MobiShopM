import React from "react";
import Spinner from "react-bootstrap/esm/Spinner";

const CustomSpinner = ({ size }) => {
  return (
    <div className="w-100 mt-3 d-flex justify-content-center">
      <Spinner size={size} />
    </div>
  );
};

export default CustomSpinner;
