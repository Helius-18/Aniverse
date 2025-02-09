"use client"
import React from 'react'
import { useRouter } from 'next/navigation';

const AnimeTile = ({anime} : any) => {
    const router = useRouter();

    const openAnime = (animeId: string) => {
        router.push(`/anime/${animeId}`)
    }

    return (
        <div className="d-flex flex-column justify-content-center text-center p-3" key={anime?.id} style={{ cursor: 'pointer' }} onClick={() => openAnime(anime?.id)}>
            <img src={anime?.img} alt={anime?.name} width={150} height={200} className="rounded" />
            <div
                style={{
                    width: '15vh',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis'
                }}
            >
                {anime?.name}
            </div>
        </div>
    )
}

export default AnimeTile