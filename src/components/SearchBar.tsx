// src/components/SearchBar.tsx
import React, { useState } from "react";
import styled from "styled-components";

const StyledContainer = styled.div`
    margin: 20px 0;
    display: flex;
    justify-content: center;
`;

const StyledInput = styled.input`
    padding: 10px;
    width: 100%;
    max-width: 600px; // Adjust based on your preference
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;

    &:focus {
        outline: none;
        border-color: #0366d6;
        box-shadow: 0 0 0 2px rgba(3, 102, 214, 0.3);
    }

    &::placeholder {
        color: #ccc;
    }
`;

interface SearchBarProps {
    onSearch: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [inputValue, setInputValue] = useState<string>("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
        // Implement a debounce function or delay here if you want to reduce API calls
        onSearch(event.target.value);
    };

    return (
        <StyledContainer>
            <StyledInput type="text" value={inputValue} onChange={handleChange} placeholder="Search for GitHub repositories" data-testid="search-input" />
        </StyledContainer>
    );
};

export default SearchBar;
