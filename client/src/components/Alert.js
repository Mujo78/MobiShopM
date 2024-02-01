import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

export default function CustomAlert() {
  return (
    <Alert
      variant="secondary"
      className="d-flex align-items-center justify-content-between"
      role="alert"
    >
      <span className="mx-auto">
        <strong>
          Unbeatable deals and amazing discounts, shop now and save big!
        </strong>
      </span>
      <Button
        variant="light"
        type="button"
        className="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
      ></Button>
    </Alert>
  );
}
