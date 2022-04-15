
import './App.css';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CodePage from './pages/CodePage';
import { Toaster } from 'react-hot-toast';

function App() {

  const [showLoadingVideo,setShowElement] = useState(true)
  useEffect(()=>{
    setTimeout(function() {
      setShowElement(false)
         }, 1800);
       },
   [])

  let loadingGif = require("./assets/gif.gif");
  return (
    

    <div className="App">
      
      {showLoadingVideo?<img src={loadingGif} id="loading-gif" alt="Welcome!" />:<></>} 
      {!showLoadingVideo?
      <>
      <div>
        <Toaster position='top-right'
        toastOptions={{
          success:{
            theme:{
              primary:'#ff6545'
            }
          }
        }}>

        </Toaster>
      </div>
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
      </>
      
      
      :<></>} 
      
      
    </div>
  );
}

export default App;
