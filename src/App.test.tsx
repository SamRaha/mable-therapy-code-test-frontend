import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import App from "./App";
import * as useSearchHook from "./hooks/useSearch";

jest.mock("./hooks/useSearch", () => ({
    useSearch: jest.fn(),
}));

describe("App", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("shows loading text when loading", async () => {
        (useSearchHook.useSearch as jest.Mock).mockReturnValue({
            data: [],
            loading: true,
            error: null,
            hasNextPage: false,
        });
        render(<App />);
        expect(await screen.findByTestId("loading")).toBeInTheDocument();
    });

    it("displays an error message when there is an error", async () => {
        (useSearchHook.useSearch as jest.Mock).mockReturnValue({
            data: [],
            loading: false,
            error: "Failed to fetch",
            hasNextPage: false,
        });
        render(<App />);
        expect(await screen.findByTestId("error-message")).toHaveTextContent("Failed to fetch");
    });

    it("renders the repository list when data is fetched successfully", async () => {
        (useSearchHook.useSearch as jest.Mock).mockReturnValue({
            data: [{ id: 1, full_name: "repo/name", description: "Test repo", stargazers_count: 42 }],
            loading: false,
            error: null,
            hasNextPage: true,
        });
        render(<App />);
        expect(await screen.findByTestId("repository-list")).toBeInTheDocument();
        expect(screen.getByText("repo/name")).toBeInTheDocument();
    });
});
