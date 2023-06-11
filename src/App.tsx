import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Rankings from './pages/Rankings';
import Popular from './pages/Popular';
import AnimeSearch from './pages/AnimeSearch';
import AnimeDetails from './pages/AnimeDetails';

function App() {
  return (
    <div className='flex flex-col min-h-screen'>
      <Helmet>
        <title>Anime Catalog</title>
        <meta
          name='description'
          content='Anime Catalog is a simple anime library that utilizes the Jikan API.'
        />
        <meta
          name='keywords'
          content='anime catalog, anime library, anime series, anime shows, anime recommendations, anime rankings, popular anime, anime'
        />
        <meta name='author' content='Red Pangilinan' />
        <link rel='canonical' href='https://anime-catalog-rho.vercel.app/' />
        <meta property='og:title' content='Anime Catalog' />
        <meta
          property='og:description'
          content='Anime Catalog is a simple anime library that utilizes the Jikan API.'
        />
        <meta property='og:type' content='website' />
        <meta
          property='og:url'
          content='https://anime-catalog-rho.vercel.app/'
        />
        <meta property='og:image' content='/public/header.webp' />
        <meta property='og:image:alt' content='Anime Catalog' />
        <meta property='og:site_name' content='Anime Catalog' />
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:title' content='Anime Catalog' />
        <meta
          name='twitter:description'
          content='Anime Catalog is a simple anime library that utilizes the Jikan API.'
        />
        <meta name='twitter:image' content='/public/header.webp' />
      </Helmet>

      <Navbar />
      <div className='flex-grow container mx-auto'>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/rankings' element={<Rankings />} />
            <Route path='/popular' element={<Popular />} />
            <Route path='/search' element={<AnimeSearch />} />
            <Route path='/anime/:animeId' element={<AnimeDetails />} />
          </Routes>
        </BrowserRouter>
      </div>
      <Footer />
    </div>
  );
}

export default App;
