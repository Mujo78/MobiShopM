import Pagination from "react-bootstrap/Pagination";
import { useQueryParams } from "../hooks/useQueryParams";

export default function Paginate(props) {
  let pages = [];
  const query = useQueryParams();

  for (let index = 1; index <= props.numOfPages; index++) {
    pages.push(index);
  }

  return (
    <Pagination>
      <Pagination.First className="ms-2" />
      <Pagination.Prev className="ms-2" />
      {pages.map((n) => (
        <Pagination.Item
          className="ms-2"
          style={{ backgroundColor: "#219aeb" }}
          key={n}
          onClick={() => {
            query.set("page", n);
          }}
          active={props.currentPage === n ? true : false}
        >
          {n}
        </Pagination.Item>
      ))}
      <Pagination.Next className="ms-2" />
      <Pagination.Last className="ms-2" />
    </Pagination>
  );
}
