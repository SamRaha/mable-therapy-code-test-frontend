// src/hooks/useSearch.ts
import { useState, useEffect } from "react";

interface Repository {
    id: number;
    full_name: string;
    description: string; // Ensure this is included
    stargazers_count: number; // Ensure this is included
}

const BASE_URL = "https://api.github.com";

export const useSearch = (searchTerm: string) => {
    const [data, setData] = useState<Repository[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const handler = setTimeout(() => {
            if (searchTerm) {
                setLoading(true);
                setError(null);
                fetch(`${BASE_URL}/search/repositories?q=${searchTerm}`)
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error("Network response was not ok");
                        }
                        return response.json();
                    })
                    .then((result) => {
                        setData(
                            result.items.map((item: any) => ({
                                id: item.id,
                                full_name: item.full_name,
                                description: item.description, // Map description
                                stargazers_count: item.stargazers_count, // Map stargazers_count
                            }))
                        );
                    })
                    .catch((error) => {
                        console.error("Error fetching data: ", error);
                        setError("Failed to fetch data. Please try again.");
                        setData([]);
                    })
                    .finally(() => {
                        setLoading(false);
                    });
            } else {
                setData([]);
                setError(null);
            }
        }, 300);

        return () => clearTimeout(handler);
    }, [searchTerm]);

    return { data, loading, error };
};
