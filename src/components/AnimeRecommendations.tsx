import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';

type Entries = {
  entry: {
    mal_id: number;
    url: string;
    images: {
      jpg: {
        image_url: string;
      };
    };
    title: string;
  };
};

const AnimeRecommendations: React.FC = () => {
  const { animeId } = useParams();
  const [entries, setEntries] = useState<Entries[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchentryacterDetails = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        const response = await axios.get(
          `https://api.jikan.moe/v4/anime/${animeId}/recommendations`
        );
        setEntries(response.data.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching entryacter details:', error);
        setIsLoading(false);
      }
    };

    fetchentryacterDetails();
  }, [animeId]);

  const toggleShowAll = () => {
    setShowAll((prevShowAll) => !prevShowAll);
  };

  if (isLoading) {
    return (
      <div>
        <h4 className='text-lg font-bold mt-4 mb-2'>Recommendations</h4>
        <p>Loading...</p>
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <div>
        <h4 className='text-lg font-bold mt-4 mb-2'>Recommendations</h4>
        <p>No recommendations.</p>
      </div>
    );
  }

  return (
    <>
      <h4 className='text-lg font-bold mt-4 mb-2'>Recommendations</h4>
      <div className='grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5 gap-3'>
        {(showAll ? entries : entries.slice(0, 5)).map((entry) => (
          <div
            key={entry.entry.mal_id}
            className='block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700'
          >
            <div className='relative overflow-hidden bg-cover bg-no-repeat h-52'>
              <Link to={`/anime/${entry.entry.mal_id}`}>
                <img
                  className='rounded-t-lg'
                  src={entry.entry.images.jpg.image_url}
                  alt={entry.entry.title}
                  width='100%'
                />
              </Link>
            </div>
            <div className='p-3'>
              <h5 className='mb-1 font-medium leading-tight text-neutral-800 dark:text-neutral-50 line-clamp-2'>
                <Link to={`/anime/${entry.entry.mal_id}`}>
                  {entry.entry.title}
                </Link>
              </h5>
            </div>
          </div>
        ))}
      </div>
      {entries.length > 5 && (
        <div className='p-3 flex justify-center sm:justify-end'>
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
    </>
  );
};

export default AnimeRecommendations;
