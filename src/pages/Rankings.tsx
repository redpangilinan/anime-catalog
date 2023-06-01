import { useEffect } from 'react';
import TopAnimeList from '../components/TopAnimeList';

const Rankings = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <TopAnimeList type='rank' />;
};

export default Rankings;
