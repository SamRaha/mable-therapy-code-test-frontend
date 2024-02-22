import React, { useState, useCallback } from "react";
import styled from "styled-components";
import SearchBar from "./components/SearchBar";
import RepositoryList from "./components/RepositoryList";
import SearchResultsPagination from "./components/SearchResultsPagination";
import { useSearch } from "./hooks/useSearch";

const AppContainer = styled.div`
    padding: 20px;
    max-width: 800px;
    margin: auto;
    width: 100%;
`;

const LoadingText = styled.p`
    color: #0366d6;
    text-align: center;
`;

const ErrorMessage = styled.p`
    color: #d73a49;
    text-align: center;
`;

const App: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [page, setPage] = useState<number>(1);
    const [immediate, setImmediate] = useState<boolean>(false);

    const handleSearch = useCallback((value: string, immediate: boolean = false) => {
        setSearchTerm(value);
        setPage(1); // Reset to page 1 for new searches
        setImmediate(immediate);
    }, []);

    const handlePageChange = useCallback((newPage: number) => {
        setPage(newPage);
        setImmediate(true); // Page changes should bypass debounce
    }, []);

    // Pass the immediate state to useSearch to control debouncing
    const { data, loading, error, totalPages } = useSearch(searchTerm, page, immediate);

    return (
        <AppContainer>
            <SearchBar onSearch={handleSearch} />
            {loading && <LoadingText>Loading...</LoadingText>}
            {error && <ErrorMessage>{error}</ErrorMessage>}
            {!loading && !error && <RepositoryList repositories={data} />}
            <SearchResultsPagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
        </AppContainer>
    );
};

export default App;
