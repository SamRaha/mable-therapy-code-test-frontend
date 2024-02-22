import React from "react";
import styled from "styled-components";

const PaginationContainer = styled.nav`
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

const SearchResultsPagination: React.FC<SearchResultsPaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const pageNumbers: PageNumber[] = [];
    for (let i = 1; i <= totalPages; i++) {
        if (i === currentPage || i === 1 || i === totalPages || (i >= currentPage - 2 && i <= currentPage + 2)) {
            pageNumbers.push(i);
        } else if (i === currentPage - 3 || i === currentPage + 3) {
            pageNumbers.push("...");
        }
    }

    return (
        <PaginationContainer>
            <PageButton onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
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
            <PageButton onClick={() => onPageChange(currentPage + 1)} disabled={currentPage >= totalPages}>
                Next
            </PageButton>
        </PaginationContainer>
    );
};

export default SearchResultsPagination;
