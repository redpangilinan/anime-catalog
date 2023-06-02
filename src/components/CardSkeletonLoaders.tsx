import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

type HeaderProp = {
  title: string;
};

const CardSkeletonLoaders: React.FC<HeaderProp> = ({ title }) => {
  return (
    <div>
      <h4 className='text-lg font-bold mt-4 mb-2'>{title}</h4>
      <div className='grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5 gap-3'>
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className='block react-loading-skeleton rounded-lg bg-white shadow-md dark:bg-neutral-700'
          >
            <div className='relative overflow-hidden bg-cover bg-no-repeat h-52'>
              <Skeleton className='animate-pulse' height='100%' />
            </div>
            <div className='p-3'>
              <Skeleton className='animate-pulse' />
              <div className='m-2' />
              <Skeleton className='animate-pulse' />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardSkeletonLoaders;
