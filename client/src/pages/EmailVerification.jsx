import React from "react";
import { useVerify } from "../features/User/useVerify";
import Button from "react-bootstrap/esm/Button";
import CustomSpinner from "../components/UI/CustomSpinner";
import { Link, useParams } from "react-router-dom";

const EmailVerification = () => {
  const { token } = useParams();
  const { verify, isPending } = useVerify();

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
            onClick={() => verify(token)}
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
            onClick={() => console.log("object")}
          >
            Resend verification email
          </Button>

          <Link className="text-secondary" to="/contact">
            Any problems? Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
