import React, { useEffect, useState } from 'react';
import axios from 'axios';
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

  useEffect(() => {
    const fetchTopAnime = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 350));

        const response = await axios.get(
          `https://api.jikan.moe/v4/top/anime?filter=airing&limit=10`
        );

        const { data } = response.data;
        setTopAnime(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTopAnime();
  }, []);

  return (
    <div className='px-2'>
      <h1 className='text-xl font-bold my-3'>Top 10 Airing Anime</h1>
      <SeasonalTable data={topAnime} />
    </div>
  );
};

export default TopAiringAnime;
