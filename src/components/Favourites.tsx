// src/components/Favorites.tsx
import React from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import RepositoryList from "./RepositoryList"; // Make sure to import RepositoryList

interface Repository {
    id: number;
    full_name: string;
    description: string;
    stargazers_count: number;
    html_url: string; // URL to the repository
}

interface RepositoryListProps {
    repositories: Repository[];
    "data-testid"?: string;
}

const Favorites: React.FC = () => {
    // Fetch favourites from local storage
    const [favourites] = useLocalStorage<RepositoryListProps["repositories"]>("favourites", []);
    console.log("favourites: ", favourites);

    return (
        <div>
            <h2>Favorites</h2>
            <RepositoryList repositories={favourites} />
        </div>
    );
};

export default Favorites;
