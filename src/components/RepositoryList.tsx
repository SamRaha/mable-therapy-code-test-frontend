import React from "react";
import styled from "styled-components";
import { Repository } from "../types/repository";
import StarSrc from "../assets/star-solid.svg";
import ForkSrc from "../assets/code-fork-solid.svg";
import FavouriteTrueSrc from "../assets/favourite-true.svg";
import FavouriteFalseSrc from "../assets/favourite-false.svg";

const Container = styled.ul`
    list-style: none;
    padding: 12px;
    margin: 0;
    height: 100%;
    background-color: white;
    border-radius: 1.5rem;
`;

const RepoItem = styled.li`
    padding: 10px;
    border-bottom: 1px solid #e1e4e8;

    &:last-child {
        border-bottom: none;
    }
    height: 80px;
`;

const RepoName = styled.h2`
    font-size: 16px;
    color: #0366d6;
    margin: 0 0 6px 0;
    cursor: pointer;
    &:hover {
        text-decoration: underline;
    }
`;

const RepoDescription = styled.p`
    font-size: 14px;
    color: #586069;
    margin: 0 0 6px 0;
`;

const StarIcon = styled.img`
    width: 14px;
    margin: 0 3px 0 0;
`;
const ForkIcon = styled.img`
    width: 12px;
    margin: 0 3px 0 0;
`;
const StarCount = styled.span`
    display: inline-block;
    font-size: 12px;
    color: #586069;
`;

const FavouriteButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    display: inline-flex;
    align-items: center;
`;

const FavouriteImage = styled.img`
    width: 16px;
    height: 16px;
`;
const FavouriteButtonText = styled.span`
    margin-left: 6px;
    font-size: 13px;
    color: #0366d6;
`;

const ForksCount = styled.span`
    display: inline-block;
    font-size: 12px;
    color: #586069;
`;

const UpdatedAt = styled.span`
    display: inline-block;
    font-size: 12px;
    color: #586069;
`;

const InfoContainer = styled.div`
    display: flex;
    align-items: center;
`;
interface RepositoryListProps {
    repositories: Repository[];
    "data-testid"?: string;
    favourites: Repository[];
    onFavourites: (value: Repository[] | ((val: Repository[]) => Repository[])) => void;
}

const RepositoryList: React.FC<RepositoryListProps> = ({ repositories, "data-testid": dataTestId, favourites, onFavourites }) => {
    const toggleFavourite = (repo: Repository) => {
        const isFavourite = favourites.some((f) => f.id === repo.id);
        onFavourites(isFavourite ? favourites.filter((f) => f.id !== repo.id) : [...favourites, repo]);
    };

    return (
        <Container data-testid={dataTestId}>
            {repositories.map((repo) => (
                <RepoItem key={repo.id}>
                    <div>
                        <RepoName onClick={() => window.open(repo.html_url, "_blank")}>{repo.full_name}</RepoName>
                        <RepoDescription className="ellipsis">{repo.description ? repo.description : "No description"}</RepoDescription>
                    </div>
                    <InfoContainer>
                        <StarIcon src={StarSrc} alt="Star" />
                        <StarCount>{repo.stargazers_count}</StarCount>
                        <div className="space-24" />
                        <ForkIcon src={ForkSrc} alt="Fork" />
                        <ForksCount>{repo.forks_count}</ForksCount>
                        <div className="space-24" />
                        <UpdatedAt>{new Date(repo.updated_at).toLocaleDateString()}</UpdatedAt>
                        <div className="space-24" />
                        <FavouriteButton onClick={() => toggleFavourite(repo)}>
                            <FavouriteImage
                                src={favourites.some((f) => f.id === repo.id) ? FavouriteTrueSrc : FavouriteFalseSrc}
                                alt={favourites.some((f) => f.id === repo.id) ? "Favourited" : "Favourite"}
                            />
                            <FavouriteButtonText>{favourites.some((f) => f.id === repo.id) ? "Favourited" : "Favourite"}</FavouriteButtonText>
                        </FavouriteButton>
                    </InfoContainer>
                </RepoItem>
            ))}
        </Container>
    );
};

export default RepositoryList;
