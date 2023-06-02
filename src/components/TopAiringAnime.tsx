import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import SeasonalTable from './SeasonalTable';

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

const TopAiringAnime: React.FC = () => {
  const [topAnime, setTopAnime] = useState<Anime[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTopAnime = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 350));

        const response = await axios.get(
          `https://api.jikan.moe/v4/top/anime?filter=airing&limit=10`
        );

        const { data } = response.data;
        setTopAnime(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    fetchTopAnime();
  }, []);

  if (isLoading) {
    return (
      <div className='px-2'>
        <h1 className='text-xl font-bold my-3'>Top 10 Airing Anime</h1>
        <div className='overflow-hidden w-full'>
          <table className='w-full divide-y divide-gray-200'>
            <thead className='bg-gray-200'>
              <tr>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Image
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Name
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {Array.from({ length: 10 }).map((_, index) => (
                <tr key={index}>
                  <td className='px-6 py-4'>
                    <Skeleton className='animate-pulse' />
                  </td>
                  <td className='px-6 py-4 text-sm font-medium text-gray-900'>
                    <Skeleton className='animate-pulse' />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className='px-2'>
      <h1 className='text-xl font-bold my-3'>Top 10 Airing Anime</h1>
      <SeasonalTable data={topAnime} />
    </div>
  );
};

export default TopAiringAnime;
