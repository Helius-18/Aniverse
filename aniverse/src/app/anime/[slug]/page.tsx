"use client"

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation';
import { getAnimeDetails, getEpisodeDetails } from '@/lib/AnimeHelper';
import AnimeTile from '@/shared/animeTile';

const AnimePlayer = () => {
    const params = useParams();
    const slug = params.slug as string;
    const [isloading, setIsLoading] = useState(false);
    const [data, setData] = useState({} as any);
    const [currentEpsd, setCurrentEpsd] = useState(0);

    const fetchAnimeDetails = async () => {
        setIsLoading(true);
        var data = await getAnimeDetails(slug);
        setData(data);
        console.log(data);
        // var response = await getEpisodeDetails(data?.episodes[0]?.id);
        // console.log(response);
        setIsLoading(false);
    }

    const playEpisode = async (epsd: number) => {
        var response = await getEpisodeDetails(data?.episodes[epsd]?.id);
        console.log(response);
    }

    useEffect(() => {
        fetchAnimeDetails();
    }, [slug])
    return (
        isloading
            ? <div className="d-flex w-100 justify-content-center pt-5">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
            : <div className='p-3'>
                <div className="player">

                </div>
                {
                    data?.episodes?.length > 1
                        ? <div>
                            <h5>Episodes :</h5>
                            <div className="episodes d-flex flex-wrap gap-2 pt-1">
                                {data?.episodes?.map((episode: any) => (
                                    <div className='p-2 bg-secondary rounded' style={{ cursor: 'pointer' }} key={episode?.id} onClick={() => playEpisode(episode?.number - 1)}>{episode?.number}</div>
                                ))}
                            </div>
                        </div>
                        : <></>
                }
                <div className='d-flex align-items-center mt-3'>
                    <AnimeTile anime={data || {}} />
                    <div className="details">
                        <h4>{data?.title}</h4>
                        <p>Type : {data?.type}</p>
                        <p>Episodes : {data?.episodes?.length}</p>
                        <p>{data?.description}</p>
                    </div>
                </div>

                {
                    data?.recommendations ?
                        <div className='mt-4'>
                            <h5>Recommendations :</h5>
                            <div className="d-flex flex-wrap justify-content-start align-items-start mt-3">
                                {data?.recommendations?.map((anime: any) => (
                                    <AnimeTile anime={anime} key={anime?.id} />
                                ))}
                            </div>
                        </div> 
                    : <></>
                }
            </div>
    )
}

export default AnimePlayer