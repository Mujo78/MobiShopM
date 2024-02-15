import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

export default function CustomAlert({ children }) {
  return (
    <Alert
      variant="secondary"
      className="d-flex align-items-center justify-content-between"
      role="alert"
    >
      <span className="mx-auto">
        <strong>{children}</strong>
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
