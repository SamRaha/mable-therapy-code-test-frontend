import React from "react";
import RepositoryList from "../components/RepositoryList";
import styled from "styled-components";
import { Repository } from "../types/repository";

const Container = styled.div`
    padding: 20px;
    max-width: 800px;
    margin: auto;
    width: 100%;
    box-sizing: border-box;
`;

interface FavouritesProps {
    favourites: Repository[];
    onFavourites: (value: Repository[] | ((val: Repository[]) => Repository[])) => void;
}

const Favourites: React.FC<FavouritesProps> = ({ favourites, onFavourites }) => {
    return (
        <Container>
            <h2>Favourites</h2>
            {favourites?.length ? <RepositoryList repositories={favourites} favourites={favourites} onFavourites={onFavourites} /> : <p>You currently have no saved favourites</p>}
        </Container>
    );
};

export default Favourites;
