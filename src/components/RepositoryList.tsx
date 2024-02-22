// src/components/RepositoryList.tsx
import React from "react";
import styled from "styled-components";

export const RepoList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
`;

export const RepoItem = styled.li`
    padding: 10px;
    border-bottom: 1px solid #e1e4e8;
    &:last-child {
        border-bottom: none;
    }
`;

export const RepoName = styled.h2`
    font-size: 16px;
    color: #0366d6;
    margin: 0 0 8px 0;
    cursor: pointer;
    &:hover {
        text-decoration: underline;
    }
`;

export const RepoDescription = styled.p`
    font-size: 14px;
    color: #586069;
    margin: 0 0 8px 0;
`;

export const StarCount = styled.span`
    display: inline-block;
    margin-right: 10px;
    font-size: 12px;
    color: #586069;
    &::before {
        content: "⭐ ";
    }
`;

interface Repository {
    id: number;
    full_name: string;
    description: string;
    stargazers_count: number;
}

interface RepositoryListProps {
    repositories: Repository[];
}

const RepositoryList: React.FC<RepositoryListProps> = ({ repositories }) => {
    return (
        <RepoList>
            {repositories.map((repo) => (
                <RepoItem key={repo.id}>
                    <RepoName>{repo.full_name}</RepoName>
                    <RepoDescription>{repo.description ? repo.description : "No description"}</RepoDescription>
                    <StarCount>{repo.stargazers_count}</StarCount>
                </RepoItem>
            ))}
        </RepoList>
    );
};

export default RepositoryList;
