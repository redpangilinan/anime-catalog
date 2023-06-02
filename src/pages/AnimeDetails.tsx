import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import AnimeRelations from '../components/AnimeRelations';
import AnimeCharacters from '../components/AnimeCharacters';
import AnimeRecommendations from '../components/AnimeRecommendations';
import CardSkeletonLoaders from '../components/CardSkeletonLoaders';

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
  synopsis: string;
  trailer: {
    youtube_id: string;
  };
  type: string;
  source: string;
  status: string;
  duration: string;
  rating: string;
  popularity: number;
  members: number;
  favorites: number;
  background: string;
  producers: Array<{
    mal_id: number;
    name: string;
  }>;
  genres: Array<{
    mal_id: number;
    name: string;
  }>;
  studios: Array<{
    mal_id: number;
    name: string;
  }>;
};

type Entry = {
  mal_id: number;
  type: string;
  name: string;
  url: string;
};

type AnimeEntry = {
  relation: string;
  entry: Entry[];
};

const AnimeDetails: React.FC = () => {
  const { animeId } = useParams();
  const [anime, setAnime] = useState<Anime | null>(null);
  const [entries, setEntries] = useState<AnimeEntry[]>([]);

  useEffect(() => {
    const fetchAnimeDetails = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 350));
        const response = await fetch(
          `https://api.jikan.moe/v4/anime/${animeId}/full`
        );
        const data = await response.json();
        setAnime(data.data);
        setEntries(data.data.relations);
        window.scrollTo(0, 0);
      } catch (error) {
        console.error('Error fetching anime details:', error);
      }
    };

    fetchAnimeDetails();
  }, [animeId]);

  if (!anime) {
    return (
      <div className='p-6'>
        <h2 className='text-xl font-bold mb-4 text-center lg:text-left'>
          <Skeleton width={300} />
        </h2>
        <div className='flex flex-col lg:flex-row gap-5'>
          <div className='min-w-max'>
            <div className='flex justify-center'>
              <Skeleton className='w-64 h-96 object-cover mb-4' />
            </div>
            <h4 className='text-lg font-bold mb-1'>Genres</h4>
            <div className='grid grid-cols-2 gap-2'>
              {Array.from({ length: 2 }).map((_, index) => (
                <div
                  className='rounded-full dark:bg-blue-900 dark:text-blue-300'
                  key={index}
                >
                  <Skeleton />
                </div>
              ))}
            </div>
            <h4 className='text-lg font-bold mt-4 mb-1'>Information</h4>
            <Skeleton count={7} />
          </div>
          <div className='w-full'>
            <div className='overflow-x-auto w-full'>
              <table className='min-w-full divide-y divide-gray-200 border mb-2'>
                <thead className='bg-gray-200'>
                  <tr>
                    <th className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Rank
                    </th>
                    <th className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Popularity
                    </th>
                    <th className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Favorites
                    </th>
                    <th className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Score
                    </th>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200'>
                  <tr>
                    <td className='p-3 text-center'>
                      <Skeleton />
                    </td>
                    <td className='p-3 text-center'>
                      <Skeleton />
                    </td>
                    <td className='p-3 text-center'>
                      <Skeleton />
                    </td>
                    <td className='p-3 text-center'>
                      <Skeleton />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <h4 className='text-lg font-bold mt-4 mb-1'>Synopsis</h4>
            <p className='text-gray-700'>
              <Skeleton count={6} />
              <Skeleton width='40%' />
            </p>
            <h4 className='text-lg font-bold mt-4 mb-1'>Background</h4>
            <p className='text-gray-700'>
              <Skeleton count={2} />
            </p>
            <h4 className='text-lg font-bold mt-4 mb-1'>Relations</h4>
            <Skeleton count={4} />
            <CardSkeletonLoaders title='Characters' />
            <CardSkeletonLoaders title='Relations' />
          </div>
          <div className='min-w-max'>
            <div>
              <h4 className='text-lg font-bold mb-2 lg:hidden'>Trailer</h4>
              <div className='aspect-w-16 aspect-h-9 mb-4'>
                <Skeleton height={140} width={300} />
              </div>
            </div>
            <h4 className='text-lg font-bold mb-1'>Producers</h4>
            <Skeleton count={2} />
            <h4 className='text-lg font-bold mt-4 mb-1'>Studios</h4>
            <Skeleton />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='p-6'>
      <h2 className='text-xl font-bold mb-4 text-center lg:text-left'>
        {anime.title}
      </h2>
      <div className='flex flex-col lg:flex-row gap-5'>
        <div className='min-w-max'>
          <div className='flex justify-center'>
            <img
              src={anime.images.jpg.image_url}
              alt={anime.title}
              className='w-64 h-96 object-cover mb-4'
            />
          </div>
          <h4 className='text-lg font-bold mb-1'>Genres</h4>
          <div className='grid grid-cols-2 gap-2'>
            {anime.genres.map((genre) => (
              <div
                className='bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300'
                key={genre.mal_id}
              >
                {genre.name}
              </div>
            ))}
          </div>
          <h4 className='text-lg font-bold mt-4 mb-1'>Information</h4>
          <p className='mb-2'>Type: {anime.type}</p>
          <p className='mb-2'>Episodes: {anime.episodes}</p>
          <p className='mb-2'>Status: {anime.status}</p>
          <p className='mb-2'>Aired: {anime.aired.string}</p>
          <p className='mb-2'>Source: {anime.source}</p>
          <p className='mb-2'>Duration: {anime.duration}</p>
          <p className='mb-2'>Rating: {anime.rating}</p>
        </div>
        <div className='w-full'>
          <div className='overflow-x-auto w-full'>
            <table className='min-w-full divide-y divide-gray-200 border mb-2'>
              <thead className='bg-gray-200'>
                <tr>
                  <th className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Rank
                  </th>
                  <th className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Popularity
                  </th>
                  <th className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Favorites
                  </th>
                  <th className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Score
                  </th>
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-gray-200'>
                <tr>
                  <td className='p-3 text-center'>#{anime.rank || 'N/A'}</td>
                  <td className='p-3 text-center'>#{anime.popularity}</td>
                  <td className='p-3 text-center'>{anime.favorites}</td>
                  <td className='p-3 text-center'>
                    <span
                      className={`${
                        typeof anime.score === 'number'
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                      } text-sm font-medium mr-2 px-2.5 py-0.5 rounded`}
                    >
                      {typeof anime.score === 'number'
                        ? anime.score.toFixed(2)
                        : 'N/A'}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <h4 className='text-lg font-bold mt-4 mb-1'>Synopsis</h4>
          <p className='text-gray-700'>{anime.synopsis}</p>
          <h4 className='text-lg font-bold mt-4 mb-1'>Background</h4>
          <p className='text-gray-700'>
            {anime.background ||
              'No background information has been added to this title.'}
          </p>
          <h4 className='text-lg font-bold mt-4 mb-1'>Relations</h4>
          <AnimeRelations data={entries} />
          <AnimeCharacters />
          <AnimeRecommendations />
        </div>
        <div className='min-w-max'>
          {anime.trailer.youtube_id && (
            <div>
              <h4 className='text-lg font-bold mb-2 lg:hidden'>Trailer</h4>
              <div className='aspect-w-16 aspect-h-9 mb-4'>
                <iframe
                  title='Trailer'
                  src={`https://www.youtube.com/embed/${anime.trailer.youtube_id}`}
                  allowFullScreen
                  className='w-full h-full'
                ></iframe>
              </div>
            </div>
          )}
          <h4 className='text-lg font-bold mb-1'>Producers</h4>
          {anime.producers.length > 0 ? (
            <ul>
              {anime.producers.map((producer) => (
                <li key={producer.mal_id}>{producer.name}</li>
              ))}
            </ul>
          ) : (
            <p>No producers available.</p>
          )}

          <h4 className='text-lg font-bold mt-4 mb-1'>Studios</h4>
          {anime.studios.length > 0 ? (
            <ul>
              {anime.studios.map((studio) => (
                <li key={studio.mal_id}>{studio.name}</li>
              ))}
            </ul>
          ) : (
            <p>No studios available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnimeDetails;
