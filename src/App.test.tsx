// src/__tests__/App.test.jsx
import React from "react";
import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";
import * as useSearchHook from "./hooks/useSearch";

// Mock components
jest.mock("../components/SearchBar", () => () => <input data-testid="search-bar" />);
jest.mock("../components/RepositoryList", () => () => <div data-testid="repository-list"></div>);

describe("App component", () => {
    // Mock useSearch hook before each test
    beforeEach(() => {
        jest.spyOn(useSearchHook, "useSearch").mockReturnValue({
            data: [],
            loading: false,
            error: null,
        });
    });

    it("renders the search bar", () => {
        render(<App />);
        expect(screen.getByTestId("search-bar")).toBeInTheDocument();
    });

    it("shows loading text when loading", () => {
        useSearchHook.useSearch.mockReturnValue({ data: [], loading: true, error: null });
        render(<App />);
        expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });

    it("displays an error message when there is an error", () => {
        const errorMessage = "Failed to fetch";
        useSearchHook.useSearch.mockReturnValue({ data: [], loading: false, error: errorMessage });
        render(<App />);
        expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });

    it("renders the repository list when data is fetched successfully", () => {
        useSearchHook.useSearch.mockReturnValue({
            data: [{ id: 1, full_name: "repo/name", description: "Test repo", stargazers_count: 42 }],
            loading: false,
            error: null,
        });
        render(<App />);
        expect(screen.getByTestId("repository-list")).toBeInTheDocument();
    });
});
