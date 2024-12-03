import React from "react";
import { useVerify } from "../features/User/useVerify";
import Button from "react-bootstrap/esm/Button";
import CustomSpinner from "../components/UI/CustomSpinner";
import { useNavigate } from "react-router-dom";

const EmailVerification = () => {
  const navigate = useNavigate();
  const { verify, isPending } = useVerify();

  const handleNavigate = () => {
    navigate("/contact");
  };

  return (
    <div className="flex-grow-1">
      <div className="h-100 p-3 d-flex gap-3 flex-column justify-content-center align-items-center">
        <h1>Email Verification Page</h1>
        <p>
          Welcome to the MobiShopM! Before we get started, please confirm your
          email address with the button below.
        </p>
        <div className="custom-responsive-width d-flex flex-column gap-3 align-items-center">
          <Button
            variant="success"
            className="py-2 custom-responsive-width"
            disabled={isPending}
            onClick={verify}
          >
            {isPending ? (
              <CustomSpinner size="xs" />
            ) : (
              "Verify My Email Address"
            )}
          </Button>

          <Button
            variant="light"
            className="py-2 custom-responsive-width"
            onClick={handleNavigate}
          >
            Any problems? Contact Support
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
