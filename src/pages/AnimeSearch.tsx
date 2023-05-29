import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Anime {
  mal_id: number;
  title: string;
  image_url: string;
}

const AnimeSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [animeResults, setAnimeResults] = useState<Anime[]>([]);

  useEffect(() => {
    const searchAnime = async () => {
      try {
        const response = await axios.get(
          `https://api.jikan.moe/v4/anime?q=${searchTerm}&sfw`
        );
        const results: Anime[] = response.data.results;
        setAnimeResults(results);
      } catch (error) {
        console.error('Error searching anime:', error);
      }
    };

    const delaySearch = setTimeout(() => {
      if (searchTerm) {
        searchAnime();
      } else {
        setAnimeResults([]);
      }
    }, 500);

    return () => clearTimeout(delaySearch);
  }, [searchTerm]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchTerm(query);
  };

  return (
    <div className='container mx-auto p-4'>
      <input
        type='text'
        placeholder='Search for anime...'
        className='w-full rounded border border-gray-300 p-2 mb-4'
        value={searchTerm}
        onChange={handleSearch}
      />

      <div className='grid grid-cols-3 gap-4'>
        {animeResults.map((anime: Anime) => (
          <div
            key={anime.mal_id}
            className='border border-gray-300 rounded p-4'
          >
            <img src={anime.image_url} alt={anime.title} className='mb-2' />
            <p>{anime.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimeSearch;
