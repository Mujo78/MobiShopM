import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBrandFn } from "../../features/Mobiles/api";
import { useAuth } from "../../context/AuthContext";
import { useBrands } from "../../features/Mobiles/useBrands";
import { formatDate } from "../../util";
import Container from "react-bootstrap/esm/Container";
import Table from "react-bootstrap/esm/Table";
import Spinner from "react-bootstrap/esm/Spinner";
import Button from "react-bootstrap/esm/Button";
import Alert from "react-bootstrap/esm/Alert";
import Modal from "react-bootstrap/esm/Modal";
import { toast } from "react-toastify";

const BrandsOverview = () => {
  const [show, setShow] = useState(false);
  const [brand, setBrand] = useState();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: brands, isFetching, isError } = useBrands();

  const { mutate } = useMutation({
    mutationKey: ["deleteBrand"],
    mutationFn: async (brandId) => {
      const token = user.token;
      await deleteBrandFn(token, brandId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("brands");
      setShow(false);
      toast.success("Successfully deleted brand!");
    },
    onError: () => {
      setShow(false);
      toast.error("Something went wrong, please try again later!");
    },
  });

  const handleShowDeleteModal = (brandData) => {
    setBrand(brandData);
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  const deleteBrand = () => {
    if (brand.brandId) {
      mutate(brand.brandId);
    }
  };

  return (
    <Container className="w-100 p-0">
      {isFetching ? (
        <div className="d-flex w-100 justify-content-center align-items-center">
          <Spinner />
        </div>
      ) : brands ? (
        brands.length > 0 ? (
          <Table hover size="sm">
            <thead>
              <tr>
                <th className="d-none d-sm-table-cell">No.</th>
                <th>Name</th>
                <th className="d-none d-sm-table-cell">Created At</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {brands.map((m) => (
                <tr key={m.id}>
                  <td className="d-none d-sm-table-cell">{m.id}</td>
                  <td>{m.name}</td>
                  <td className="d-none d-sm-table-cell">
                    {formatDate(m.createdAt)}
                  </td>
                  <td>
                    <Button
                      onClick={() =>
                        handleShowDeleteModal({
                          brandId: m.id,
                          brandName: m.name,
                        })
                      }
                      variant="danger"
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <Alert variant="info">There are no brands, add some!</Alert>
        )
      ) : (
        isError && <Alert>Something went wrong, please try again later!</Alert>
      )}
      {show && (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Delete: {brand?.brandName}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete <strong> {brand?.brandName}</strong>{" "}
            ? <br /> By deleting brand, you will also delete all mobiles from
            your store, are you still sure?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="danger" onClick={deleteBrand}>
              Delete Brand
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  );
};

export default BrandsOverview;
