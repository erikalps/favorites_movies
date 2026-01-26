import Home from './pages/Home/Home'
import Favorites from './pages/Favorites/Favorites'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.scss'
import Details from './pages/Details/Details'
import { MovieProvider } from './context/MovieContext'


function App() {
  return (
    <MovieProvider>
      <BrowserRouter>
        <nav>
          <Link to="/">Home</Link> | <Link to="/favorites">Favorites</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/favorites" element={<Favorites />}></Route>
          <Route path="/movie/:id" element={<Details />} />

        </Routes>
      </BrowserRouter>
    </MovieProvider>
  )
}

export default App;
