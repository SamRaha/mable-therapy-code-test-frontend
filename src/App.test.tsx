// src/App.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";
import * as useSearchHook from "./hooks/useSearch"; // Ensure the path is correct

// Mock the useSearch hook before importing the App component
jest.mock("./hooks/useSearch", () => ({
    useSearch: jest.fn(),
}));

describe("App", () => {
    beforeEach(() => {
        // Reset the mock before each test
        (useSearchHook.useSearch as jest.Mock).mockReset();
    });

    it("shows loading text when loading", () => {
        (useSearchHook.useSearch as jest.Mock).mockReturnValue({ data: [], loading: true, error: null });
        render(<App />);
        expect(screen.getByTestId("loading")).toBeInTheDocument();
    });

    it("displays an error message when there is an error", () => {
        const errorMessage = "Failed to fetch";
        (useSearchHook.useSearch as jest.Mock).mockReturnValue({ data: [], loading: false, error: errorMessage });
        render(<App />);
        expect(screen.getByTestId("error-message")).toHaveTextContent(errorMessage);
    });

    it("renders the repository list when data is fetched successfully", () => {
        const mockData = [{ id: 1, full_name: "repo/name", description: "Test repo", stargazers_count: 42 }];
        (useSearchHook.useSearch as jest.Mock).mockReturnValue({
            data: mockData,
            loading: false,
            error: null,
        });
        render(<App />);
        expect(screen.getByTestId("repository-list")).toBeInTheDocument();
    });
});
