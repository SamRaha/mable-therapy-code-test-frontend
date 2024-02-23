import React from "react";
import styled from "styled-components";
import formatLargeNumber from "../Utils/JSutils";

// Define prop types for the component
interface SortSelectProps {
    sort: string;
    totalCount: number;
    onSortChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Container = styled.div`
    display: flex;
    align-items: center;
    margin: 0 0 6px 22px;
`;

const StyledSelect = styled.select`
    padding: 6px 10px 6px 3px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: white;
    font-size: 12px;
    &:focus {
        outline: none;
        border-color: #0366d6;
    }
`;
const Count = styled.p`
    font-weight: 600;
    font-size: 16px;
`;

const Label = styled.span`
    font-size: 14px;
    font-weight: 600;
`;

const SortSelect: React.FC<SortSelectProps> = ({ sort, totalCount, onSortChange }) => {
    return (
        <Container>
            <Count>{formatLargeNumber(totalCount)} Results</Count>
            <div className="space-24" />
            <Label>Sort by: </Label>
            <div className="space-6" />
            <StyledSelect value={sort} onChange={onSortChange}>
                <option value="">Best Match</option>
                <option value="stars">Stars</option>
                <option value="forks">Forks</option>
                <option value="updated">Updated</option>
            </StyledSelect>
        </Container>
    );
};

export default SortSelect;
