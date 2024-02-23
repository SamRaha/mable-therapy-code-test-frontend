import React, { useCallback, useMemo, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import styled from "styled-components";
import "./App.css";
import LoadingWheel from "./components/Loadingwheel";
import Navbar from "./components/Navbar";
import Pagination from "./components/Pagination";
import RepositoryList from "./components/RepositoryList";
import SearchBar from "./components/SearchBar";
import useLocalStorage from "./hooks/useLocalStorage";
import { useSearch } from "./hooks/useSearch";
import Favourites from "./pages/Favourites";
import { Repository } from "./types/repository";

const Container = styled.div`
    max-width: 800px;
    margin: auto;
    width: 100%;
    padding: 12px;
    box-sizing: border-box;
`;

const LoadingContainer = styled.div`
    display: flex;
    justify-content: center;
    margin: 20px 0 0 0;
`;

const ErrorMessage = styled.p`
    color: #d73a49;
    text-align: center;
    margin: 20px 0 0 0;
`;

const Results = styled.div`
    height: 505px;
`;

const App: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [page, setPage] = useState<number>(1);
    const [immediate, setImmediate] = useState<boolean>(false);
    const [favourites, setFavourites] = useLocalStorage<Repository[]>("favourites", []);

    const handleSearch = useCallback(
        (value: string, immediate: boolean = false) => {
            setSearchTerm(value);
            setPage(1);
            setImmediate(immediate);
        },
        [setSearchTerm, setPage, setImmediate]
    );

    const handlePageChange = useCallback(
        (newPage: number) => {
            setPage(newPage);
            setImmediate(true);
        },
        [setPage, setImmediate]
    );

    const { data, loading, error, totalPages } = useSearch(searchTerm, page, immediate);
    const showResults = useMemo(() => !loading && !error && data.length > 0, [data, loading, error]);

    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/favourites" element={<Favourites favourites={favourites} onFavourites={setFavourites} />} />
                <Route
                    path="/"
                    element={
                        <Container>
                            <SearchBar onSearch={handleSearch} />
                            <Results>
                                {loading ? (
                                    <LoadingContainer>
                                        <LoadingWheel />
                                    </LoadingContainer>
                                ) : null}
                                {error ? <ErrorMessage>{error}</ErrorMessage> : null}
                                {showResults ? <RepositoryList repositories={data} onFavourites={setFavourites} favourites={favourites} /> : null}
                            </Results>
                            <div className="space-24" />
                            {showResults ? <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} /> : null}
                        </Container>
                    }
                />
            </Routes>
        </Router>
    );
};

export default App;
