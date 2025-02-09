"use client"
import { getHomeDetails } from '@/lib/AnimeHelper'
import AnimeTile from '@/shared/animeTile';
import React, { useEffect, useState } from 'react'

const Home = () => {
  const [loading, setloading] = useState(false);
  const [data, setData] = useState({} as any);

  const fetchHomeDetails = async () => {
    setloading(true);
    var response = await getHomeDetails();
    console.log(response);
    setData(response);
    setloading(false);
  }

  useEffect(() => {
    fetchHomeDetails();
  }, [])
  return (
    <div className='p-3'>
      {!loading ?
        <div className='d-flex flex-column gap-4'>

          {/* carousel for spotlight animes need to be implemented */}
          {/* <div>
            <div className="d-flex flex-wrap justify-content-start align-items-start mt-3">
              {data?.spotLightAnimes?.map((anime: any) => (
                <AnimeTile anime={anime} key={anime?.id} />
              ))}
            </div>
          </div> */}


          <div>
            <h5>Latest Episodes :</h5>
            <div className="d-flex flex-wrap justify-content-start align-items-start mt-3">
              {data?.latestEpisodes?.map((anime: any) => (
                <AnimeTile anime={anime} key={anime?.id} />
              ))}
            </div>
          </div>

          <div>
            <h5>Trending :</h5>
            <div className="d-flex flex-wrap justify-content-start align-items-start mt-3">
              {data?.trendingAnimes?.map((anime: any) => (
                <AnimeTile anime={anime} key={anime?.id} />
              ))}
            </div>
          </div>

          <div>
            <h5>Most Popular :</h5>
            <div className="d-flex flex-wrap justify-content-start align-items-start mt-3">
              {data?.featuredAnimes?.mostPopularAnimes?.map((anime: any) => (
                <AnimeTile anime={anime} key={anime?.id} />
              ))}
            </div>
          </div>
        </div>
        : <div className="d-flex w-100 justify-content-center pt-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      }
    </div>
  )
}

export default Home