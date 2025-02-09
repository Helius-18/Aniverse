"use client"

import React, { Suspense, useEffect, useState } from 'react'
import { useParams } from 'next/navigation';
import { getAnimeDetails, getEpisodeDetails, getEpisodes } from '@/lib/AnimeHelper';
import AnimeTile from '@/shared/animeTile';
import HLSPlayer from '@/components/HLSPlayer';

const AnimePlayer = () => {
    const params = useParams();
    const slug = params.slug as string;
    const [isloading, setIsLoading] = useState(false);
    const [data, setData] = useState({} as any);
    const [currentEpsd, setCurrentEpsd] = useState(-1);
    const [videoUrl, setVideoUrl] = useState('');

    const fetchAnimeDetails = async () => {
        setIsLoading(true);
        var details = await getAnimeDetails(slug);
        var episodes = await getEpisodes(slug);
        details = {...details , episodes : episodes?.episodes}
        setData(details);
        setIsLoading(false);
        
        setCurrentEpsd(0);
        var response = await getEpisodeDetails(details?.episodes[0]?.episodeId);
        setVideoUrl(response?.sources[0]?.url);
    }

    const playEpisode = async (epsd: number) => {
        setCurrentEpsd(epsd);
        var response = await getEpisodeDetails(data?.episodes[epsd]?.episodeId);
        console.log(response);
        setVideoUrl(response?.sources[0]?.url);
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
                <div className="player bg-black d-flex justify-content-around">
                    {
                        videoUrl?.length!=0 ? <HLSPlayer videoUrl={videoUrl} /> : <></>
                    }
                </div>
                {
                    data?.episodes?.length >= 1
                        ? <div className='mt-3'>
                            <h5>Episodes :</h5>
                            <div className="episodes d-flex flex-wrap gap-2 pt-1">
                                {data?.episodes?.map((episode: any) => (
                                    <div className={((episode?.episodeNo - 1) == currentEpsd) ? 'p-2 rounded bg-primary' : 'p-2 rounded bg-secondary' } style={{ cursor: 'pointer' }} key={episode?.episodeNo} onClick={() => playEpisode(episode?.episodeNo - 1)}>{episode?.episodeNo}</div>
                                ))}
                            </div>
                        </div>
                        : <></>
                }
                <div className='d-flex align-items-center mt-3'>
                    <AnimeTile anime={data?.info || {}} />
                    <div className="details">
                        <h4>{data?.info?.name}</h4>
                        <p>Type : {data?.info?.category}</p>
                        <p>Episodes : {data?.info?.episodes?.eps}</p>
                        <p>{data?.info?.description}</p>
                    </div>
                </div>

                {
                    data?.recommendedAnimes ?
                        <div className='mt-4'>
                            <h5>Recommendations :</h5>
                            <div className="d-flex flex-wrap justify-content-start align-items-start mt-3">
                                {data?.recommendedAnimes?.map((anime: any) => (
                                    <AnimeTile anime={anime} key={anime?.id} />
                                ))}
                            </div>
                        </div> 
                    : <></>
                }
            </div>
    )
}


const AnimePlayerPageWithSuspense = () => (
    <Suspense fallback={<div>Loading anime results...</div>}>
      <AnimePlayer />
    </Suspense>
  );
  
export default AnimePlayerPageWithSuspense;