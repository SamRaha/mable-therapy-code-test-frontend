import React, { useState } from "react";
import styled from "styled-components";
import SearchBar from "./components/SearchBar";
import { useSearch } from "./hooks/useSearch";
import RepositoryList from "./components/RepositoryList";

const AppContainer = styled.div`
    padding: 20px;
    max-width: 800px;
    margin: auto;
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
    const { data, loading, error } = useSearch(searchTerm);

    return (
        <AppContainer>
            <SearchBar onSearch={setSearchTerm} />
            {loading && <LoadingText data-testid="loading">Loading...</LoadingText>}
            {error && <ErrorMessage data-testid="error-message">{error}</ErrorMessage>}
            {!loading && !error && <RepositoryList repositories={data} data-testid="repository-list" />}
        </AppContainer>
    );
};

export default App;
