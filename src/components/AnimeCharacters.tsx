import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

type Characters = {
  character: {
    mal_id: number;
    url: string;
    images: {
      jpg: {
        image_url: string;
      };
    };
    name: string;
  };
  role: string;
};

const AnimeCharacters: React.FC = () => {
  const { animeId } = useParams();
  const [characters, setCharacters] = useState<Characters[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCharacterDetails = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const response = await axios.get(
          `https://api.jikan.moe/v4/anime/${animeId}/characters`
        );
        setCharacters(response.data.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching character details:', error);
        setIsLoading(false);
      }
    };

    fetchCharacterDetails();
  }, [animeId]);

  const toggleShowAll = () => {
    setShowAll((prevShowAll) => !prevShowAll);
  };

  if (isLoading) {
    return (
      <div>
        <h4 className='text-lg font-bold mt-4 mb-2'>Characters</h4>
        <p>Loading...</p>
      </div>
    );
  }

  if (characters.length === 0) {
    return (
      <div>
        <h4 className='text-lg font-bold mt-4 mb-2'>Characters</h4>
        <p>No characters.</p>
      </div>
    );
  }

  return (
    <>
      <h4 className='text-lg font-bold mt-4 mb-2'>Characters</h4>
      <div className='grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5 gap-3'>
        {(showAll ? characters : characters.slice(0, 5)).map((char) => (
          <div
            key={char.character.mal_id}
            className='block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700'
          >
            <div className='relative overflow-hidden bg-cover bg-no-repeat h-52'>
              <img
                className='rounded-t-lg'
                src={char.character.images.jpg.image_url}
                alt={char.character.name}
                width='100%'
              />
            </div>
            <div className='p-3'>
              <h5 className='mb-1 font-medium leading-tight text-neutral-800 dark:text-neutral-50'>
                {char.character.name}
              </h5>
              <p className='text-base text-neutral-600 dark:text-neutral-200'>
                {char.role}
              </p>
            </div>
          </div>
        ))}
      </div>
      {characters.length > 5 && (
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

export default AnimeCharacters;
