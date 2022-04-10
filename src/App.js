
import './App.css';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CodePage from './pages/CodePage';

function App() {

  const [showLoadingVideo,setShowElement] = React.useState(true)
  useEffect(()=>{
    setTimeout(function() {
      setShowElement(false)
         }, 5000);
       },
   [])

  let loadingGif = require("./assets/gif.gif");
  return (
    

    <div className="App">
      
      {showLoadingVideo?<img src={loadingGif} id="loading-gif" alt="Welcome!" />:<></>} 
      {!showLoadingVideo?
      <div>
      <BrowserRouter>
        <Routes>
             <Route 
               path="/" 
               element={<HomePage/>} ></Route>
             <Route 
                path="/editor/:nestID" 
                element={<CodePage/>} ></Route>
        </Routes>
      </BrowserRouter>
      </div>
      :<></>} 
      
      
    </div>
  );
}

export default App;
