import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

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

const Animeentries: React.FC = () => {
  const { animeId } = useParams();
  const [entries, setEntries] = useState<Entries[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchentryacterDetails = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        const response = await fetch(
          `https://api.jikan.moe/v4/anime/${animeId}/recommendations`
        );
        const data = await response.json();
        setEntries(data.data);
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
      <div className='flex justify-between mt-4 mb-2'>
        <h4 className='text-lg font-bold'>Recommendations</h4>
        {entries.length > 5 && (
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
        {(showAll ? entries : entries.slice(0, 5)).map((entry) => (
          <div
            key={entry.entry.mal_id}
            className='block rounded-lg w-40 bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700'
          >
            <div className='relative overflow-hidden bg-cover bg-no-repeat h-56'>
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
              <h5 className='mb-1 font-medium leading-tight text-neutral-800 dark:text-neutral-50'>
                <Link to={`/anime/${entry.entry.mal_id}`}>
                  {entry.entry.title}
                </Link>
              </h5>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Animeentries;
