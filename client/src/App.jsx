import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/navbar'
import Home from './pages/home'
import SentimentResult from './components/sentiment'

function App() {

  return (
    <>
    <div>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/result' element={<SentimentResult/>}/>
        
      </Routes>
    </div>
    </>
  )
}

export default App
