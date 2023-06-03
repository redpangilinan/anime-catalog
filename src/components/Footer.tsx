export default function Footer() {
  return (
    <footer className='bg-white rounded-lg border mt-4'>
      <div className='w-full max-w-screen-xl mx-auto p-4 md:py-8'>
        <div className='sm:flex sm:items-center sm:justify-between'>
          <a href='/'>
            <h2 className='text-2xl font-bold'>AnimeCatalog</h2>
          </a>
          <ul className='flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0'>
            <li>
              <a href='/' className='mr-4 hover:underline md:mr-6 '>
                Home
              </a>
            </li>
            <li>
              <a href='/rankings' className='mr-4 hover:underline md:mr-6 '>
                Rankings
              </a>
            </li>
            <li>
              <a href='/popular' className='mr-4 hover:underline md:mr-6 '>
                Popular
              </a>
            </li>
            <li>
              <a href='/search' className='mr-4 hover:underline md:mr-6'>
                Search
              </a>
            </li>
          </ul>
        </div>
        <hr className='my-6 border-gray-200 sm:mx-auto lg:my-8' />
        <span className='block text-sm text-gray-500 sm:text-center'>
          © 2023{' '}
          <a href='/' className='hover:underline'>
            AnimeCatalog
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}
