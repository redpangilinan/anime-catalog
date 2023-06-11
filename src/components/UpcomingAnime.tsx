import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

type Entries = {
  mal_id: number;
  url: string;
  images: {
    webp: {
      image_url: string;
    };
  };
  title: string;
};

const SeasonalAnime: React.FC = () => {
  const [entries, setEntries] = useState<Entries[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchentryacterDetails = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        const response = await axios.get(
          `https://api.jikan.moe/v4/seasons/upcoming`
        );
        setEntries(response.data.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching entryacter details:', error);
        setIsLoading(false);
      }
    };

    fetchentryacterDetails();
  }, []);

  const toggleShowAll = () => {
    setShowAll((prevShowAll) => !prevShowAll);
  };

  if (isLoading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <div>
        <h4 className='text-lg font-bold mt-4 mb-2'>Upcoming Anime</h4>
        <p>No upcoming anime.</p>
      </div>
    );
  }

  return (
    <>
      <div className='flex justify-between mt-4 mb-2'>
        <h4 className='text-lg font-bold'>Upcoming Anime</h4>
        {entries.length > 10 && (
          <div>
            {showAll ? (
              <button
                className='text-sm text-neutral-600 dark:text-neutral-200 underline'
                onClick={toggleShowAll}
              >
                Show Less
              </button>
            ) : (
              <button
                className='text-sm text-neutral-600 dark:text-neutral-200 underline'
                onClick={toggleShowAll}
              >
                Show More
              </button>
            )}
          </div>
        )}
      </div>
      <div className='flex flex-wrap gap-3'>
        {(showAll ? entries : entries.slice(0, 10)).map((entry) => (
          <div
            key={entry.mal_id}
            className='block rounded-lg w-52 bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700'
          >
            <div className='relative overflow-hidden bg-cover bg-no-repeat h-72'>
              <Link to={`/anime/${entry.mal_id}`}>
                <img
                  className='rounded-t-lg'
                  src={entry.images.webp.image_url}
                  alt={entry.title}
                  width='100%'
                />
              </Link>
            </div>
            <div className='p-3'>
              <h5 className='mb-1 font-medium leading-tight text-neutral-800 dark:text-neutral-50 line-clamp-2'>
                <Link to={`/anime/${entry.mal_id}`}>{entry.title}</Link>
              </h5>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default SeasonalAnime;
