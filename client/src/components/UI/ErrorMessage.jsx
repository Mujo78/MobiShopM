import React from "react";

const ErrorMessage = ({ textError }) => {
  return (
    <div className="mt-1" style={{ height: "fit-content", fontSize: "0.8rem" }}>
      {textError && (
        <p id="errorMessage" className="text-danger mb-0">
          {textError.message ?? textError.msg}
        </p>
      )}
    </div>
  );
};

export default ErrorMessage;
