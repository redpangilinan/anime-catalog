import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Rankings from './pages/Rankings';
import Popular from './pages/Popular';
import AnimeSearch from './pages/AnimeSearch';
import AnimeDetails from './pages/AnimeDetails'; // Import AnimeDetails component

function App() {
  return (
    <div className='flex flex-col min-h-screen'>
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
