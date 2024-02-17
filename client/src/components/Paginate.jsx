import Pagination from "react-bootstrap/Pagination";
import { useState } from "react";

export default function Paginate({
  numOfPages,
  currentPage,
  isPreviousData,
  handleNavigate,
}) {
  const [pageNum, setPageNum] = useState(currentPage || 1);
  const pageRange = 5;
  const startPage = Math.max(1, pageNum - pageRange);
  const endPage = Math.min(numOfPages, pageNum + pageRange);

  const pagesToDisplay = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  const handleChangePage = (page) => {
    setPageNum(page);
    handleNavigate(page);
  };

  return (
    <Pagination>
      {pageNum > 1 && (
        <Pagination.Prev
          onClick={() => handleChangePage(pageNum - 1)}
          className="ms-2"
          disabled={currentPage === 1 || isPreviousData}
        />
      )}
      {pagesToDisplay.map((n) => (
        <Pagination.Item
          className="ms-2 bg-custom rounded"
          key={n}
          onClick={() => {
            handleChangePage(n);
          }}
          active={currentPage === n ? true : false}
        >
          {n}
        </Pagination.Item>
      ))}
      {pageNum < numOfPages && (
        <Pagination.Next
          onClick={() => handleChangePage(pageNum + 1)}
          className="ms-2"
          disabled={currentPage === numOfPages || isPreviousData}
        />
      )}
    </Pagination>
  );
}
