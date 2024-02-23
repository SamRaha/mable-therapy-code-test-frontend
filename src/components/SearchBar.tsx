import React, { useState } from "react";
import styled from "styled-components";

const StyledContainer = styled.div`
    margin: 12px 0;
    display: flex;
    justify-content: center;
`;

const StyledInput = styled.input`
    padding: 10px;
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;

    &:focus {
        outline: none;
        border-color: #0366d6;
        box-shadow: 0 0 0 2px rgba(3, 102, 214, 0.3);
    }

    &::placeholder {
        color: #7a7a7a;
    }
`;

interface SearchBarProps {
    onSearch: (searchTerm: string, immediate?: boolean) => void;
}

const DEBOUNCE_DELAY = 300; // milliseconds

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [inputValue, setInputValue] = useState<string>("");
    const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setInputValue(value);

        if (timer) {
            clearTimeout(timer);
        }

        const newTimer = setTimeout(() => {
            onSearch(value);
        }, DEBOUNCE_DELAY);

        setTimer(newTimer);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            if (timer) {
                clearTimeout(timer);
            }
            onSearch(inputValue, true);
        }
    };

    return (
        <StyledContainer>
            <StyledInput type="text" value={inputValue} onChange={handleChange} onKeyDown={handleKeyDown} placeholder="Search for GitHub repositories" />
        </StyledContainer>
    );
};

export default SearchBar;
