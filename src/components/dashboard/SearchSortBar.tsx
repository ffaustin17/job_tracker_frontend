import { ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";

type SearchSortBarProps = {
    searchTerm: string;
    sortOption: string;
    onSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onSortChange: (e: ChangeEvent<HTMLSelectElement>) => void;
};

export default function SearchSortBar({
    searchTerm,
    sortOption,
    onSearchChange,
    onSortChange
} : SearchSortBarProps){

    const navigate = useNavigate();

    return (
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <input
                type="text"
                placeholder="Search for job titles"
                className="px-4 py-2 rounded-md bg-slate-800 text-white w-full md:w-1/2 focus:outline-none"
                value={searchTerm}
                onChange={onSearchChange}
            />

            <div className="flex gap-3 items-center">
                <select
                    title="Job sorting options"
                    value={sortOption}
                    onChange={onSortChange}
                    className="px-3 py-2 bg-slate-800 text-white rounded-md"
                >
                <option value="date">Sort by Date</option>
                <option value="alpha">Sort Alphabetically</option>
                </select>

                <button
                    onClick={() => navigate("/create-job")}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition text-sm cursor-pointer"
                >
                + New Job Application
                </button>
            </div>
        </div>
    )
}