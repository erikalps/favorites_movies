import Home from './pages/Home/Home'
import Favorites from './pages/Favorites/Favorites'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css'


function App() {
  return (
    <>
      <BrowserRouter>
          <nav>
            <Link to="/">Home</Link> | <Link to="/favorites">Favorites</Link>
          </nav>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/favorites" element={<Favorites />}></Route>
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
