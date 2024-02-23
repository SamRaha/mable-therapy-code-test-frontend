export interface Repository {
    id: number;
    full_name: string;
    description: string;
    stargazers_count: number;
    forks_count: number; // Added
    updated_at: string; // Added
    html_url: string;
}
