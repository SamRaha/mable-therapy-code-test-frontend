// src/components/RepositoryList.tsx
import React from "react";
import styled from "styled-components";
import useLocalStorage from "../hooks/useLocalStorage";

export const Container = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    height: 100%;
`;

export const RepoItem = styled.li`
    padding: 10px;
    border-bottom: 1px solid #e1e4e8;

    &:last-child {
        border-bottom: none;
    }
    height: 85px;
`;

export const RepoName = styled.h2`
    font-size: 16px;
    color: #0366d6;
    margin: 0 0 6px 0;
    cursor: pointer;
    &:hover {
        text-decoration: underline;
    }
`;

export const RepoDescription = styled.p`
    font-size: 14px;
    color: #586069;
    margin: 0 0 6px 0;
`;

export const StarCount = styled.span`
    display: inline-block;
    margin: 0 12px 0 0;
    font-size: 12px;
    color: #586069;
    &::before {
        content: "⭐ ";
    }
`;

export interface Repository {
    id: number;
    full_name: string;
    description: string;
    stargazers_count: number;
    html_url: string; // Ensure this is included if you're using it
}

const FavoriteButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    color: #0366d6;

    &:hover {
        text-decoration: underline;
    }
`;

interface RepositoryListProps {
    repositories: Repository[];
    "data-testid"?: string;
    setFavorites?: (value: Repository[] | ((val: Repository[]) => Repository[])) => void; // Optional prop
}

const RepositoryList: React.FC<RepositoryListProps> = ({ repositories, "data-testid": testId }) => {
    const [favourites, setFavourites] = useLocalStorage<Repository[]>("favourites", []);

    const toggleFavorite = (repo: Repository) => {
        setFavourites((currentFavourites) => {
            const isFavourite = currentFavourites.some((f) => f.id === repo.id);
            if (isFavourite) {
                return currentFavourites.filter((f) => f.id !== repo.id);
            } else {
                return [...currentFavourites, repo];
            }
        });
    };

    return (
        <Container>
            {repositories.map((repo) => (
                <RepoItem key={repo.id}>
                    <RepoName onClick={() => window.open(repo.html_url, "_blank")}>{repo.full_name}</RepoName>
                    <RepoDescription>{repo.description ? repo.description : "No description"}</RepoDescription>
                    <StarCount>{repo.stargazers_count}</StarCount>
                    <FavoriteButton onClick={() => toggleFavorite(repo)}>{favourites.some((f) => f.id === repo.id) ? "Unfavourite" : "Favorite"}</FavoriteButton>
                </RepoItem>
            ))}
        </Container>
    );
};

export default RepositoryList;
