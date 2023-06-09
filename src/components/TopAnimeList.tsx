import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import AnimeTable from './AnimeTable';

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

type TopType = {
  type: string;
};

const TopAnimeList: React.FC<TopType> = ({ type }) => {
  const [topAnime, setTopAnime] = useState<Anime[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTopAnime = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 350));
        let popular = '';

        if (type === 'popularity') {
          popular = 'filter=bypopularity&';
        }

        const response = await axios.get(
          `https://api.jikan.moe/v4/top/anime?${popular}page=${currentPage}&limit=25`
        );

        const { data, pagination } = response.data;
        setTopAnime(data);
        setTotalPages(pagination.last_visible_page);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    fetchTopAnime();
  }, [currentPage, type]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return (
      <div className='px-2'>
        <h1 className='text-xl font-bold my-4'>
          {type === 'rank' ? 'Highest Rated Anime' : 'Most Popular Anime'}
        </h1>
        <div className='overflow-x-auto w-full'>
          <table className='min-w-full divide-y divide-gray-200'>
            <thead className='bg-gray-200'>
              <tr>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  {type === 'rank' ? 'Rank' : 'Popularity'}
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
              {Array.from({ length: 25 }).map((_, index) => (
                <tr key={index}>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                    <Skeleton className='animate-pulse' width={50} />
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <Skeleton className='animate-pulse' />
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                    <Skeleton className='animate-pulse' />
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                    <Skeleton className='animate-pulse' />
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                    <Skeleton className='animate-pulse' />
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
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
      <h1 className='text-xl font-bold my-4'>
        {type === 'rank' ? 'Highest Rated Anime' : 'Most Popular Anime'}
      </h1>
      <AnimeTable data={topAnime} type={type} />
      <div className='flex justify-center mt-4'>
        <nav
          className='relative z-0 inline-flex rounded-md shadow-sm -space-x-px mb-3'
          aria-label='Pagination'
        >
          {currentPage > 1 && (
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              className='relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'
            >
              <span className='sr-only'>Previous</span>
              <span className='px-2'>
                <FontAwesomeIcon icon={faArrowLeft} />
              </span>
            </button>
          )}
          {renderPagination()}
          {currentPage < totalPages && (
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className='relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'
            >
              <span className='sr-only'>Next</span>
              <span className='px-2'>
                <FontAwesomeIcon icon={faArrowRight} />
              </span>
            </button>
          )}
        </nav>
      </div>
    </div>
  );
};

export default TopAnimeList;
