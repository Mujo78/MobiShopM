import React from "react";
import Button from "react-bootstrap/esm/Button";
import { BsArrowClockwise } from "react-icons/bs";

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="h-100 gap-3 w-100 d-flex flex-column justify-content-center align-items-center mt-5">
      <p className="h5">{error.message}</p>
      <Button
        size="lg"
        onClick={resetErrorBoundary}
        className="bg-white border-0"
      >
        <BsArrowClockwise
          style={{ width: "4rem", height: "4rem", color: "#219aeb" }}
        />
      </Button>
    </div>
  );
}

export default ErrorFallback;
