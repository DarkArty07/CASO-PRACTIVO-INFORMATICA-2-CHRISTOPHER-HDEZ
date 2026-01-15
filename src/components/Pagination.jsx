import React from 'react';

function Pagination({ currentPage, totalPages, onPageChange }) {
    return (
        <div className="pagination">
            <button
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
            >
                Anterior
            </button>

            <span>Página {currentPage} de {totalPages}</span>

            <button
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
            >
                Siguiente
            </button>
        </div>
    );
}

export default Pagination;
