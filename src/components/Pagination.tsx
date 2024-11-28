import React from 'react';
import './Pagination.css';

function Pagination({ recordsPerPage, totalRecords, paginate, currentPage }) {
    const pageNumbers = [];
    const totalPages = Math.ceil(totalRecords / recordsPerPage);
    const maxPageNumbersToShow = 5;
    const startPage = Math.max(1, currentPage - Math.floor(maxPageNumbersToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPageNumbersToShow - 1);

    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    return (
        <nav aria-label="Project Pagination">
            <ul className="pagination">
                <li>
                    <button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        aria-label="Previous Page"
                    >
                        &laquo;
                    </button>
                </li>
                {pageNumbers.map((number) => (
                    <li key={number}>
                        <button
                            onClick={() => paginate(number)}
                            className={currentPage === number ? 'active' : ''}
                            aria-label={`Go to page ${number}`}
                        >
                            {number}
                        </button>
                    </li>
                ))}
                <li>
                    <button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        aria-label="Next Page"
                    >
                        &raquo;
                    </button>
                </li>
            </ul>
        </nav>
    );
}

export default Pagination;
