import React from 'react';
import { Link } from 'react-router-dom';

type Anime = {
  mal_id: number;
  rank: number;
  popularity: number;
  title: string;
  images: {
    webp: {
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

type AnimeTableProps = {
  data: Anime[];
};

const AnimeTable: React.FC<AnimeTableProps> = ({ data }) => {
  return (
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
          {data.map((anime) => (
            <tr key={anime.mal_id}>
              <td className='px-6 py-4'>
                {anime.images.webp &&
                anime.images.webp.image_url.endsWith('.webp') ? (
                  <img
                    src={anime.images.webp.image_url}
                    alt={anime.title}
                    className='w-16 h-auto object-cover rounded-lg'
                  />
                ) : (
                  <p>N/A</p>
                )}
              </td>
              <td className='px-6 py-4 text-sm font-medium text-gray-900'>
                <Link
                  to={`/anime/${anime.mal_id}`}
                  className='max-w-xs overflow-hidden inline-block truncate'
                >
                  {anime.title}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AnimeTable;
