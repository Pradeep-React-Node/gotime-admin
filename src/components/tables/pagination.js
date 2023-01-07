import _ from "lodash";
import React, { useEffect } from "react";

const TablePagination = ({
  gotoPage,
  previousPage,
  nextPage,
  canPreviousPage,
  canNextPage,
  pageIndex,
  pageSize,
  setPageSize,
  pageCount,
  pageOptions,
}) => {
  useEffect(() => {
    if (pageIndex + 1 > pageOptions?.length) {
      gotoPage(0);
    }
  });
  return (
    <div
      className="pagination flex-row justify-content-between align-items-center d-flex"
      style={{ display: "flex", justifyContent: "space-between" }}
    >
      <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-end">
          <li
            className={`page-item ${!canPreviousPage ? "disabled" : ""}`}
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            <a class="page-link" href="javascript:void(0)" tabindex="-1">
              Previous
            </a>
          </li>

          {_.times(pageOptions.length, (index) => {
            return (
              <li
                className={`page-item ${pageIndex === index ? "disabled" : ""}`}
                onClick={() => gotoPage(index)}
              >
                <a class="page-link" href="javascript:void(0)">
                  {index + 1}
                </a>
              </li>
            );
          })}

          <li
            className={`page-item ${!canNextPage ? "disabled" : ""}`}
            onClick={() => nextPage()}
          >
            <a class="page-link" href="javascript:void(0)">
              Next
            </a>
          </li>
        </ul>
      </nav>

      {/* <select
        value={pageSize}
        onChange={(e) => {
          setPageSize(Number(e.target.value));
        }}
        class="form-select"
        aria-label="Default select example"
      >
        {[5, 10, 20, 30, 40, 50].map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            Show {pageSize}
          </option>
        ))}
      </select> */}
    </div>
  );
};

export default TablePagination;
