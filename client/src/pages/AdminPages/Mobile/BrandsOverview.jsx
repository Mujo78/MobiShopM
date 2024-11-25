import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBrandFn } from "../../../features/Mobiles/api";
import { useBrands } from "../../../features/Mobiles/useBrands";
import Container from "react-bootstrap/esm/Container";
import Table from "react-bootstrap/esm/Table";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/esm/Modal";
import { toast } from "react-toastify";
import CustomSpinner from "../../../components/UI/CustomSpinner";
import CustomAlert from "../../../components/UI/Alert";
import { formatDate } from "../../../helpers/utils";

const BrandsOverview = () => {
  const [show, setShow] = useState(false);
  const [brand, setBrand] = useState();
  const queryClient = useQueryClient();

  const { data: brands, isFetching, isError } = useBrands();

  const { mutate } = useMutation({
    mutationKey: ["deleteBrand"],
    mutationFn: deleteBrandFn,
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
        <CustomSpinner />
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
          <CustomAlert variant="info">
            There are no brands, add some!
          </CustomAlert>
        )
      ) : (
        isError && (
          <CustomAlert variant="danger">
            Something went wrong, please try again later!
          </CustomAlert>
        )
      )}
      {show && (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Delete: {brand?.brandName}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete <strong> {brand?.brandName}</strong>{" "}
            ? <br /> By deleting brand, you will also delete all of its mobiles
            from your store, are you still sure?
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="light"
              className="me-auto border"
              onClick={handleClose}
            >
              Close
            </Button>
            <Button variant="danger" onClick={deleteBrand}>
              Confirm
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  );
};

export default BrandsOverview;
