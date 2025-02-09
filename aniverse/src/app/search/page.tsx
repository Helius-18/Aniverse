"use client"

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { searchAnime } from "@/lib/AnimeHelper";
import { useRouter } from 'next/navigation';
import AnimeTile from "@/shared/animeTile";

const SearchPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isloading, setIsLoading] = useState(false);
    const [results, setResults] = useState<any[]>([]);
    const [data, setData] = useState({} as any);
    const searchParams = useSearchParams();

    const fetchAnimeList = async (query: string) => {
        setIsLoading(true);
        const data = await searchAnime(query);        
        // setData(data);
        setResults(data?.animes || []);
        setIsLoading(false);
    }

    const onPageChange = async (pageNumber: number | undefined) => {
        setIsLoading(true);
        const data = await searchAnime(searchQuery, pageNumber);
        // setData(data);
        setResults(data?.results || []);
        setIsLoading(false);
    }

    useEffect(() => {
        const query = searchParams.get('q') || '';
        setSearchQuery(query);
        fetchAnimeList(query);
    }, [searchParams]);

    return (
        <div>
            {isloading ?
                <div className="d-flex w-100 justify-content-center pt-5">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
                : <div className="p-3">
                    {
                        (data?.currentPage && data?.totalPages)
                        ? <div>
                            <h5>Page {data?.currentPage} of {data?.totalPages}</h5>
                        </div>
                        : <></>
                    }
                    <div className="d-flex flex-wrap justify-content-start align-items-start mt-3">
                        {results?.map((anime) => (
                            <AnimeTile anime={anime} key={anime?.id} />
                        ))}
                    </div>

                    {
                        (data?.currentPage && data?.totalPages)
                            ? <div className="d-flex w-100 justify-content-center mt-2">
                                <div className="pagination d-flex align-items-center gap-3">
                                    <button
                                        onClick={() => onPageChange(data?.currentPage - 1)}
                                        disabled={data?.currentPage === 1}
                                        className="btn btn-secondary"
                                    >
                                        Previous
                                    </button>
                                    <span>
                                        Page {data?.currentPage} of {data?.totalPages}
                                    </span>
                                    <button
                                        onClick={() => onPageChange(data?.currentPage + 1)}
                                        disabled={data?.currentPage === data?.totalPages}
                                        className="btn btn-secondary"
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                            : <></>
                    }
                </div>
            }
        </div>
    );
}

export default SearchPage;
