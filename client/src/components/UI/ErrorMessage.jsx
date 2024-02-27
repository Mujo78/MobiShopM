import React from "react";

const ErrorMessage = ({ textError }) => {
  return (
    <div className="mt-1" style={{ height: "1rem", fontSize: "0.8rem" }}>
      {textError?.message && (
        <p className=" text-danger">{textError.message}</p>
      )}
    </div>
  );
};

export default ErrorMessage;
