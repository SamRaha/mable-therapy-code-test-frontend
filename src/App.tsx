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
import SortSelect from "./components/SortSelect";
import LocationListener from "./Utils/LocationListener";

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
    padding: 20px 0 0 0;
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
    const [sort, setSort] = useState<string>("");
    const [favourites, setFavourites] = useLocalStorage<Repository[]>("favourites", []);

    const handleSearch = useCallback(
        (value: string) => {
            setSearchTerm(value);
            setPage(1);
        },
        [setSearchTerm, setPage]
    );

    const handlePageChange = useCallback(
        (newPage: number) => {
            setPage(newPage);
        },
        [setPage]
    );

    const handleSortChange = useCallback(
        (event: React.ChangeEvent<HTMLSelectElement>) => {
            setSort(event.target.value);
            setPage(1);
        },
        [setSort, setPage]
    );

    const resetState = useCallback(() => {
        setSearchTerm("");
        setPage(1);
    }, [setSearchTerm, setPage]);

    const { data, loading, error, totalPages, totalCount } = useSearch(searchTerm, page, sort);
    const showResults = useMemo(() => !loading && !error && data.length > 0, [data, loading, error]);

    return (
        <Router>
            <Navbar />
            <LocationListener onLocationChange={resetState} />
            <Routes>
                <Route path="/favourites" element={<Favourites favourites={favourites} onFavourites={setFavourites} />} />
                <Route
                    path="/"
                    element={
                        <Container>
                            <SearchBar onSearch={handleSearch} />
                            {showResults || data.length > 0 ? <SortSelect totalCount={totalCount} sort={sort} onSortChange={handleSortChange} /> : null}
                            <Results>
                                {loading ? (
                                    <LoadingContainer data-testid="loading">
                                        <LoadingWheel />
                                    </LoadingContainer>
                                ) : null}
                                {error && <ErrorMessage data-testid="error-message">{error}</ErrorMessage>}

                                {showResults ? <RepositoryList repositories={data} favourites={favourites} onFavourites={setFavourites} data-testid="repository-list" /> : null}
                            </Results>
                            <div className="space-24" />
                            {showResults || data.length > 0 ? <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} /> : null}
                        </Container>
                    }
                />
            </Routes>
        </Router>
    );
};

export default App;
