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

const Favorites: React.FC<FavouritesProps> = ({ favourites, onFavourites }) => {
    return (
        <Container>
            <h2>Favorites</h2>

            <RepositoryList repositories={favourites} favourites={favourites} onFavourites={onFavourites} />
        </Container>
    );
};

export default Favorites;
