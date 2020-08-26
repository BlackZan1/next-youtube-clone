import { useCallback, useState } from "react";

import { searchAPI } from "../services/api";

export default function useSearch() {
    const [results, setResults] = useState([]);
    const [isFetching, setFetching] = useState(true);

    const search = useCallback(async (value) => {
        setFetching(true);

        const res = await searchAPI.find(value);

        setResults(res.search.items);
        setFetching(false);
    })

    return {
        search,
        results,
        isFetching
    }
}