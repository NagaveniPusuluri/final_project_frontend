import React, { useState } from 'react'
import './App.css'
import Intro from './Components/Intro'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Login from './Components/Login'
import Signup from './Components/Signup'
import Main from './Components/Main'
import Landing from './Components/Landing'
import { ChatbotProvider } from './Context/ChatbotContext'
function App() {

  return (
    <ChatbotProvider>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Intro/>} />
      <Route path="/login" element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/main' element={<Main/>}/>
      <Route path='/landing' element={<Landing/>}/>
    </Routes>
    
    </BrowserRouter>
    </ChatbotProvider>
  
  )
}

export default App
