import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

type Entries = {
  mal_id: number;
  url: string;
  images: {
    jpg: {
      image_url: string;
    };
  };
  title: string;
};

type SeasonalType = {
  type: string;
};

const SeasonalAnime: React.FC<SeasonalType> = ({ type }) => {
  const [entries, setEntries] = useState<Entries[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEntryDetails = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        const response = await axios.get(
          `https://api.jikan.moe/v4/seasons/${type}`
        );
        setEntries(response.data.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching entry details:', error);
        setIsLoading(false);
      }
    };

    fetchEntryDetails();
  }, [type]);

  const toggleShowAll = () => {
    setShowAll((prevShowAll) => !prevShowAll);
  };

  if (isLoading) {
    return (
      <>
        <h1 className='text-xl font-bold mt-5 mb-2'>
          {type === 'now' ? 'Seasonal Anime' : 'Upcoming Anime'}
        </h1>
        <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3'>
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className='block react-loading-skeleton rounded-lg bg-white shadow-md'
            >
              <div className='relative overflow-hidden bg-cover bg-no-repeat h-56 lg:h-72'>
                <Skeleton className='animate-pulse' height='100%' />
              </div>
              <div className='p-3'>
                <Skeleton className='animate-pulse' />
                <div className='m-2' />
                <Skeleton className='animate-pulse' />
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }

  if (entries.length === 0) {
    return (
      <div>
        <h1 className='text-xl font-bold mt-5 mb-2'>
          {type === 'now' ? 'Seasonal Anime' : 'Upcoming Anime'}
        </h1>
        <p>{type === 'now' ? 'No seasonal anime.' : 'No upcoming anime.'}</p>
      </div>
    );
  }

  return (
    <>
      <h1 className='text-xl font-bold mt-5 mb-2'>
        {type === 'now' ? 'Seasonal Anime' : 'Upcoming Anime'}
      </h1>
      <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3'>
        {(showAll ? entries : entries.slice(0, 8)).map((entry) => (
          <div
            key={entry.mal_id}
            className='block rounded-lg bg-white shadow-md'
          >
            <div className='relative overflow-hidden bg-cover bg-no-repeat h-56 lg:h-72'>
              <Link to={`/anime/${entry.mal_id}`}>
                <img
                  className='rounded-t-lg'
                  src={entry.images.jpg.image_url}
                  alt={entry.title}
                  width='100%'
                />
              </Link>
            </div>
            <div className='p-3'>
              <h5 className='mb-1 font-medium leading-tight text-neutral-800 line-clamp-2'>
                <Link to={`/anime/${entry.mal_id}`}>{entry.title}</Link>
              </h5>
            </div>
          </div>
        ))}
      </div>
      {entries.length > 8 && (
        <div className='p-3 flex justify-center sm:justify-end'>
          {showAll ? (
            <button
              className='text-sm text-neutral-600 underline'
              onClick={toggleShowAll}
            >
              Show Less
            </button>
          ) : (
            <button
              className='text-sm text-neutral-600 underline'
              onClick={toggleShowAll}
            >
              Show More
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default SeasonalAnime;
