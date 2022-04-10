
import './App.css';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
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
      <h1>Hello Welcome to Sync Nest</h1>
      {showLoadingVideo?<img src={loadingGif} alt="Welcome!" />:<></>} 
      
    </div>
  );
}

export default App;
