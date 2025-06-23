import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './pages/Home'
import Edit from './pages/Edit';
import Create from './pages/Create';
import Read from './pages/Read';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element= {<Home/>}/>
        <Route path='/create' element= {<Create/>}/>
        <Route path='/edit/:id' element= {<Edit/>}/>
        <Route path='/read/:id' element={<Read/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
