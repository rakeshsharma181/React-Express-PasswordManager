
import './App.css'
import Manager from './components/Manager'
import Navbar from './components/Navbar'
import { Route,Routes } from 'react-router-dom'

function App() {

  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/' element = {<Manager/>} ></Route>
      </Routes>
    </>
  )
}

export default App
