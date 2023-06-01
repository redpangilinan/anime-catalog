import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import AnimeTable from '../components/AnimeTable';
import { useSearchParams } from 'react-router-dom';

type Anime = {
  mal_id: number;
  rank: number;
  popularity: number;
  title: string;
  images: {
    jpg: {
      image_url: string;
    };
  };
  aired: {
    string: string;
  };
  episodes: number;
  score: number;
  type: string;
};

const AnimeSearch: React.FC = () => {
  const [searchResults, setSearchResults] = useState<Anime[]>([]);
  const [params, setParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(params.get('q') || '');

  const handleSearch = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://api.jikan.moe/v4/anime?q=${searchTerm}&sfw`
      );
      const { data } = response.data;
      setParams({ q: searchTerm });
      setSearchResults(data);
    } catch (error) {
      console.log(error);
    }
  }, [searchTerm, setParams]);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      handleSearch();
    }, 350);

    return () => {
      clearTimeout(delay);
    };
  }, [params, handleSearch]);

  return (
    <div className='px-2'>
      <h1 className='text-2xl font-bold my-4'>Anime Search</h1>
      <div className='flex justify-center space-x-4 mb-4'>
        <input
          type='text'
          placeholder='Enter anime name'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyUp={handleKeyPress}
          className='px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
        />
        <button
          onClick={handleSearch}
          className='px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500'
        >
          Search
        </button>
      </div>

      {searchResults.length > 0 ? (
        <AnimeTable data={searchResults} type='rank' />
      ) : (
        <p className='text-center'>No results found.</p>
      )}
    </div>
  );
};

export default AnimeSearch;
