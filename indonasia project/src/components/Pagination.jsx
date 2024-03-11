import React, { useEffect } from "react";

function Pagination({ totalPost, postPerPage, currentPage, setCurrentPageNo }) {
  
  const totalPageLength = Math.ceil(totalPost / postPerPage);
  return (
    <div>
      <nav aria-label="Page navigation">
        <ul className="pagination d-flex justify-content-center mt-4">
          <li
            className={`page-item  ${
              currentPage == 1 ? "disabled active" : ""
            }`}
          >
            <a
              className="page-link"
              href="#"
              aria-label="Previous"
              onClick={() => setCurrentPageNo((pre) => pre - 1)}
            >
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>

            <li
              className={`page-item  `}
            >
              <a className="page-link" href="#">
                {currentPage}
              </a>
            </li>
            <li
              className={`page-item  `}
            >
              <a className="page-link" href="#">
                of
              </a>
            </li>
              <li
              className={`page-item  `}
            >
              <a className="page-link" href="#">
                {totalPageLength}
              </a>
            </li>

          <li className="page-item">
            <a
              className="page-link"
              href="#"
              aria-label="Next"
              onClick={
                currentPage > totalPageLength - 1
                  ? () => setCurrentPageNo(1)
                  : () => setCurrentPageNo((pre) => pre + 1)
              }
            >
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Pagination;
