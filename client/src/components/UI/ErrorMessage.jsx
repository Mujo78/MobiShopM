import React from "react";

const ErrorMessage = ({ textError }) => {
  return (
    <div className="mt-1" style={{ height: "1rem", fontSize: "0.8rem" }}>
      {textError && (
        <p id="errorMessage" className="text-danger">
          {textError.message ?? textError.msg}
        </p>
      )}
    </div>
  );
};

export default ErrorMessage;
