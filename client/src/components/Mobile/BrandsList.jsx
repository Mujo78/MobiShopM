import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { useNavigate, useParams } from "react-router-dom";

const BrandsList = ({ brands }) => {
  const { brandId } = useParams();
  const navigate = useNavigate();

  const navigateToBrand = (id) => {
    navigate(`/models/${id}`);
  };

  return (
    <ListGroup className="d-flex gap-2 p-0 flex-column w-100">
      {brands?.map((n) => (
        <ListGroup.Item
          key={n.id}
          onClick={() => navigateToBrand(n.id)}
          className={`${
            parseInt(brandId) === n.id && "bg-custom"
          } w-100 list-group-item-model text-center border-top-0 border-start-0 border-end-0`}
        >
          {n.name}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default BrandsList;
