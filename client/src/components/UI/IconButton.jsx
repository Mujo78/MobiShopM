import React from "react";
import Button from "react-bootstrap/esm/Button";

const IconButton = ({ children, size, onClick, variant }) => {
  return (
    <Button
      variant={variant}
      onClick={onClick}
      size={size}
      className="icon-btn bg-transparent border-0"
    >
      {children}
    </Button>
  );
};

export default IconButton;
