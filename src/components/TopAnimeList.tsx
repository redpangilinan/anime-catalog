import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import AnimeTable from './AnimeTable';

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
  type: string;
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
      <AnimeTable data={topAnime} />

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
              <span className='px-2'>
                <FontAwesomeIcon icon={faArrowLeft} />
              </span>
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
