// src/components/Favorites.tsx
import React from "react";
import RepositoryList from "./RepositoryList";

interface Repository {
    id: number;
    full_name: string;
    description: string;
    stargazers_count: number;
    html_url: string;
}

interface FavouritesProps {
    favourites: Repository[]; // Passed from the parent component
    setFavourites: (value: Repository[] | ((val: Repository[]) => Repository[])) => void; // Passed from the parent component
}

const Favorites: React.FC<FavouritesProps> = ({ favourites, setFavourites }) => {
    return (
        <div>
            <h2>Favorites</h2>
            <RepositoryList repositories={favourites} favourites={favourites} setFavourites={setFavourites} />
        </div>
    );
};

export default Favorites;
