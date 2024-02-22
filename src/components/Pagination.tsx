import React, { useCallback } from "react";
import styled from "styled-components";

const Container = styled.nav`
    display: flex;
    justify-content: center;
    padding: 10px;
`;

const PageButton = styled.button`
    margin: 0 5px;
    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

interface SearchResultsPaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (newPage: number) => void;
}

type PageNumber = number | "...";

const Pagination: React.FC<SearchResultsPaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const pageNumbers: PageNumber[] = [];
    for (let i = 1; i <= totalPages; i++) {
        if (i === currentPage || i === 1 || i === totalPages || (i >= currentPage - 2 && i <= currentPage + 2)) {
            pageNumbers.push(i);
        } else if (i === currentPage - 3 || i === currentPage + 3) {
            pageNumbers.push("...");
        }
    }

    const handlePrevPage = useCallback(() => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    }, [currentPage, onPageChange]);

    const handleNextPage = useCallback(() => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    }, [currentPage, totalPages, onPageChange]);

    return (
        <Container>
            <PageButton onClick={handlePrevPage} disabled={currentPage === 1}>
                Previous
            </PageButton>
            {pageNumbers.map((number, index) =>
                number === "..." ? (
                    <span key={index}>...</span>
                ) : (
                    <PageButton key={index} onClick={() => onPageChange(number as number)} disabled={number === currentPage}>
                        {number}
                    </PageButton>
                )
            )}
            <PageButton onClick={handleNextPage} disabled={currentPage >= totalPages}>
                Next
            </PageButton>
        </Container>
    );
};

export default Pagination;
