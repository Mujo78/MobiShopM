import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

export default function CustomAlert({
  children,
  variant,
  bold,
  closeButton,
  fromTop,
}) {
  return (
    <Alert
      variant={variant ?? "info"}
      className={`d-flex text-center align-items-center justify-content-between mt-${fromTop}`}
      role="alert"
    >
      <span className={`mx-auto ${bold ? "fw-bold" : "fw-medium"}`}>
        {children}
      </span>

      {closeButton && (
        <Button
          variant="light"
          type="button"
          className="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
        />
      )}
    </Alert>
  );
}
