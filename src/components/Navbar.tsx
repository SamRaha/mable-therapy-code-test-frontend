import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import LogoSrc from "../assets/mable-logo.webp";

const Container = styled.div`
    display: flex;
    height: 70px;
    justify-content: space-between;
    padding: 9px;
    background-color: #383e5b;
    align-items: center;
`;

const LinkContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Logo = styled.img`
    width: 181px;
    height: 57.75px;
    &:hover {
        opacity: 80%;
    }
`;

const StyledLink = styled(Link)`
    color: white;
    font-size: 16px;
    margin: 0 12px;
    text-decoration: none;

    &:hover {
        opacity: 80%;
    }
`;

const Navbar: React.FC = () => {
    return (
        <Container>
            <Link to="/">
                <Logo src={LogoSrc} alt="Mable Therapy logo" />
            </Link>
            <LinkContainer>
                <StyledLink to="/">Home</StyledLink>
                <StyledLink to="/favourites">Favourites</StyledLink>
            </LinkContainer>
        </Container>
    );
};

export default Navbar;
