import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const HomePage=()=>{

    const navigate=useNavigate();
    const [nestID,setNestID]=useState('');
    const [username,setUsername]=useState('');

    const createNewNest=(e)=>{
        e.preventDefault();
        const id=uuidv4();
        setNestID(id); //This will assign new unique ID to nestID
        
        toast.success('Created a new Nest')
    };

    const joinNest=()=>{
        
      if(!nestID || !username){
          toast.error('Both nest ID and username required')
          return
      }else{
        //We need to redirect using react-router
        
        navigate(`/editor/${nestID}`,{
            state:{
                username,

            },
        });
      }
    };

    const handleEnterKey=(e)=>{
      
       if(e.code==='Enter'){
         joinNest();
       }
    };

    return <div className="homePageWrapper">
        <div className="formWrapper">
                <img src="/SyncNest.png" alt="Sync Nest Logo" className="homeScreenLogo"></img>
                <h1 className="mainLabel">
                    Paste Invitation Nest ID
                </h1>
                <div className="inputGroup">
                       <input 
                        type="text"
                        className="inputBox"
                        placeholder="Nest ID"
                        onChange={(e)=>setNestID(e.target.value)}
                        value={nestID}
                        onKeyUp={handleEnterKey}
                       />
                        <input 
                        type="text"
                        className="inputBox"
                        placeholder="Username"
                        onChange={(e)=>setUsername(e.target.value)}
                        value={username}
                        onKeyUp={handleEnterKey}
                        />

                       <button onClick={joinNest} className="btn joinBtn">Join</button>
                       <span className="createInfo">If you don't have an invite, create &nbsp;
                       <a onClick={createNewNest} href="" className="createNewBtn">new Nest</a></span>
                </div>
        </div>
        <footer className="footer">
            <h4>By&nbsp;<a href="https://github.com/Anuragkillswitch">
            Anurag Bandyopadhyay
                </a></h4>
        </footer>
    </div>
};

export default HomePage;