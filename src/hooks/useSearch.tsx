// src/hooks/useSearch.tsx
import { useState, useEffect } from "react";
import { Repository } from "../types/repository";

const BASE_URL = "https://api.github.com";
const ITEMS_PER_PAGE = 5;
const DEBOUNCE_DELAY = 300; // milliseconds

export const useSearch = (searchTerm: string, page: number, immediate: boolean) => {
    const [data, setData] = useState<Repository[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [totalPages, setTotalPages] = useState<number>(0);

    useEffect(() => {
        const fetchData = async () => {
            if (!searchTerm) {
                setData([]);
                setTotalPages(0);
                setLoading(false);
                return;
            }

            setLoading(true);
            setError(null);

            try {
                const response = await fetch(`${BASE_URL}/search/repositories?q=${encodeURIComponent(searchTerm)}&per_page=${ITEMS_PER_PAGE}&page=${page}`, {
                    headers: {
                        Accept: "application/vnd.github.v3+json",
                    },
                });

                if (!response.ok) throw new Error("Network response was not ok");

                const result = await response.json();
                setData(
                    result.items.map((item: any) => ({
                        id: item.id,
                        full_name: item.full_name,
                        description: item.description,
                        stargazers_count: item.stargazers_count,
                        html_url: item.html_url,
                    }))
                );
                const totalCount = result.total_count;
                setTotalPages(Math.ceil(totalCount / ITEMS_PER_PAGE));
            } catch (error) {
                console.error("Error fetching data: ", error);
                setError("Failed to fetch data. Please try again.");
                setData([]);
            } finally {
                setLoading(false);
            }
        };

        if (immediate) {
            fetchData();
        } else {
            const timerId = setTimeout(() => fetchData(), DEBOUNCE_DELAY);
            return () => clearTimeout(timerId);
        }
    }, [searchTerm, page, immediate]);

    return { data, loading, error, totalPages };
};
