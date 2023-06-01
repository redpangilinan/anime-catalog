import { useEffect } from 'react';
import TopAnimeList from '../components/TopAnimeList';

const Popular = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <TopAnimeList type='popularity' />;
};

export default Popular;
