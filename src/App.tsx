import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AnimeSearch from './pages/AnimeSearch';

function App() {
  return (
    <>
      <Navbar />
      <div className='container mx-auto'>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/search' element={<AnimeSearch />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
