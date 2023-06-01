import SeasonalAnime from '../components/SeasonalAnime';
import TopAiringAnime from '../components/TopAiringAnime';

const Home = () => {
  return (
    <div className='px-4 pb-5'>
      <div className='grid gap-1 lg:gap-4 grid-cols-1 lg:grid-cols-3'>
        <div className='col-span-2'>
          <div>
            <SeasonalAnime type='now' />
            <SeasonalAnime type='upcoming' />
          </div>
        </div>
        <div className='col-span-1'>
          <TopAiringAnime />
        </div>
      </div>
    </div>
  );
};

export default Home;
