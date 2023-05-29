import React from 'react';

type Anime = {
  mal_id: number;
  rank: number;
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
};

type AnimeTableProps = {
  data: Anime[];
};

const AnimeTable: React.FC<AnimeTableProps> = ({ data }) => {
  return (
    <div className='overflow-x-auto w-full'>
      <table className='min-w-full divide-y divide-gray-200'>
        <thead className='bg-gray-100'>
          <tr>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Rank
            </th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Image
            </th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Name
            </th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Date Aired
            </th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Episodes
            </th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Score
            </th>
          </tr>
        </thead>
        <tbody className='bg-white divide-y divide-gray-200'>
          {data.map((anime) => (
            <tr key={anime.mal_id}>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                {anime.rank || 'N/A'}
              </td>
              <td className='px-6 py-4 whitespace-nowrap'>
                {anime.images.jpg &&
                anime.images.jpg.image_url.endsWith('.jpg') ? (
                  <img
                    src={anime.images.jpg.image_url}
                    alt={anime.title}
                    className='w-16 h-auto object-cover rounded-lg'
                  />
                ) : (
                  <p className='text-red-500'>Invalid image URL</p>
                )}
              </td>
              <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                {anime.title}
              </td>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                {anime.aired.string || 'N/A'}
              </td>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                {anime.episodes || 'N/A'}
              </td>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                {anime.score || 'N/A'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AnimeTable;
