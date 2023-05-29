import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

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

const TopAnimeList: React.FC = () => {
  const [topAnime, setTopAnime] = useState<Anime[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchTopAnime = async () => {
      try {
        const response = await axios.get(
          `https://api.jikan.moe/v4/top/anime?page=${currentPage}&limit=25`
        );
        const { data, pagination } = response.data;
        setTopAnime(data);
        setTotalPages(pagination.last_visible_page);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTopAnime();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const renderPagination = () => {
    const paginationRange = 5; // Maximum number of pages to display at a time
    const halfRange = Math.floor(paginationRange / 2);
    let start = Math.max(currentPage - halfRange, 1);
    const end = Math.min(start + paginationRange - 1, totalPages);

    if (end - start < paginationRange - 1) {
      start = Math.max(end - paginationRange + 1, 1);
    }

    return Array.from(
      { length: end - start + 1 },
      (_, index) => index + start
    ).map((page) => (
      <button
        key={page}
        onClick={() => handlePageChange(page)}
        className={`-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium ${
          currentPage === page
            ? 'text-indigo-600 hover:bg-indigo-50'
            : 'text-gray-500 hover:bg-gray-50'
        }`}
      >
        {page}
      </button>
    ));
  };

  return (
    <div className='px-2'>
      <h1 className='text-2xl font-bold my-4'>Top Anime</h1>
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
            {topAnime.map((anime) => (
              <tr key={anime.mal_id}>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                  {anime.rank}
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
                  {anime.aired.string}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                  {anime.episodes}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                  {anime.score}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className='flex justify-center mt-4'>
        <nav
          className='relative z-0 inline-flex rounded-md shadow-sm -space-x-px mb-3'
          aria-label='Pagination'
        >
          {/* Previous button code */}
          {currentPage > 1 && (
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              className='relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'
            >
              <span className='sr-only'>Previous</span>
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
          )}
          {renderPagination()}
          {/* Next button code */}
          {currentPage < totalPages && (
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className='relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'
            >
              <span className='sr-only'>Next</span>
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          )}
        </nav>
      </div>
    </div>
  );
};

export default TopAnimeList;
