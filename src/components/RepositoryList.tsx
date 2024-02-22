// src/components/RepositoryList.tsx
import React from "react";
import styled from "styled-components";

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

const FavoriteButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    color: #0366d6;

    &:hover {
        text-decoration: underline;
    }
`;

interface Repository {
    id: number;
    full_name: string;
    description: string;
    stargazers_count: number;
    html_url: string;
}

interface RepositoryListProps {
    repositories: Repository[];
    "data-testid"?: string;
    favourites: Repository[]; // Now required as prop
    setFavourites: (value: Repository[] | ((val: Repository[]) => Repository[])) => void; // Now required as prop
}

const RepositoryList: React.FC<RepositoryListProps> = ({ repositories, favourites, setFavourites }) => {
    const toggleFavorite = (repo: Repository) => {
        const isFavourite = favourites.some((f) => f.id === repo.id);
        setFavourites(isFavourite ? favourites.filter((f) => f.id !== repo.id) : [...favourites, repo]);
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
