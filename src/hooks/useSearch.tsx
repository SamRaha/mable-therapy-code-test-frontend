// Updated useSearch hook with sort parameter
import { useState, useEffect } from "react";
import { Repository } from "../types/repository";

const BASE_URL = "https://api.github.com";
const ITEMS_PER_PAGE = 5;

export const useSearch = (searchTerm: string, page: number, sort: string = "best match") => {
    const [data, setData] = useState<Repository[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [totalCount, setTotalCount] = useState<number>(0);

    useEffect(() => {
        if (!searchTerm.trim()) {
            setData([]);
            setTotalPages(0);
            setLoading(false);
            setError(null);
            setTotalCount(0);
            return;
        }

        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const url = `${BASE_URL}/search/repositories?q=${encodeURIComponent(searchTerm)}&sort=${sort}&per_page=${ITEMS_PER_PAGE}&page=${page}`;
                const response = await fetch(url, {
                    headers: {
                        Accept: "application/vnd.github.v3+json",
                    },
                });

                if (!response.ok) {
                    throw new Error(`[${response.status}] Network response was not ok`);
                }

                const result = await response.json();
                if (result.total_count === 0) {
                    setError("No results found. Please refine your search.");
                    setData([]);
                    setTotalPages(0);
                    setTotalCount(0);
                } else {
                    setTotalCount(result.total_count);
                    setData(
                        result.items.map((item: any) => ({
                            id: item.id,
                            full_name: item.full_name,
                            description: item.description,
                            stargazers_count: item.stargazers_count,
                            forks_count: item.forks_count,
                            updated_at: item.updated_at,
                            html_url: item.html_url,
                        }))
                    );
                    setTotalPages(Math.ceil(result.total_count / ITEMS_PER_PAGE));
                }
            } catch (error) {
                console.error("Error fetching data: ", error);
                if (error instanceof Error) {
                    const message = error.message.includes("[404]")
                        ? "Repository not found. Please refine your search."
                        : error.message.includes("[403]")
                        ? "Rate limit exceeded. Please try again later."
                        : "An unexpected error occurred. Please try again.";
                    setError(message);
                } else {
                    setError("Failed to fetch data. Please try again.");
                }
                setData([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [searchTerm, page, sort]);

    return { data, loading, error, totalPages, totalCount };
};
