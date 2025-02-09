"use client"
import { getHomeDetails } from '@/lib/AnimeHelper'
import AnimeTile from '@/shared/animeTile';
import React, { useEffect, useState } from 'react'

const Home = () => {
  const [data, setData] = useState({} as any);

  const fetchHomeDetails = async () => {
    var response = await getHomeDetails();
    console.log(response);
    setData(response);
  }

  useEffect(() => {
    fetchHomeDetails();
  }, [])
  return (
    <div className='p-3'>
      {data ?
        <div>
          <h5>Trending :</h5>
          <div className="d-flex flex-wrap justify-content-start align-items-start mt-3">
            {data?.trendingAnimes?.map((anime: any) => (
              <AnimeTile anime={anime} key={anime?.id} />
            ))}
          </div>
        </div>
        : <></>}
    </div>
  )
}

export default Home