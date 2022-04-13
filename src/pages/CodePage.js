import React, { useState,useRef,useEffect } from "react";
import ACTIONS from "../Actions";
import toast from "react-hot-toast";
import Client from '../components/Client'
import Editor from "../components/Editor";
import { initSocket } from '../socket';
import { useLocation,useNavigate,Navigate,useParams } from "react-router-dom";
const CodePage=()=>{

   const socketRef=useRef(null);


   const location=useLocation();
   const reactNavigator=useNavigate();
   const { nestID }=useParams();

   
   useEffect(()=>{
       const init=async()=>{
         socketRef.current=await initSocket();
         socketRef.current.on('connect_error', (err) => handleErrors(err));
         socketRef.current.on('connect_failed', (err) => handleErrors(err));

            function handleErrors(e) {
                console.log('socket error', e);
                toast.error('Socket connection failed, try again later.');
                reactNavigator('/');
            }

         socketRef.current.emit(ACTIONS.JOIN,{
             nestID,
             username:location.state?.username,
         });
       };
       init();
   },[]);

   const [clients,setClients]=useState([
       {socketId:1,username:'Anurag'},
       {socketId:2,username:'Guthrie'},
       {socketId:3,username:'Yngwie'},
       {socketId:4,username:'Micheal'},
    ]);
    

    if(!location.state){
        return <Navigate to="/"/>
    }
  

    

    return <div className="mainWrap">
               <div className="aside">
                        <div className="asideInner">
                                <div className="asideLogo">
                                    <img src="/SyncNest.png" alt="Sync Nest Logo" className="codePageLogo"></img>
                                </div>
                                <hr className="conn"></hr>
                                <h3 >Connected</h3>
                                <div className="clientsList">
                                {
                                     clients.map((client)=>(
                                    <Client key={client.socketId} username={client.username}  />))
                                }
                                </div>
                        </div>

                        <button className="btn copyBtn">
                             Copy Nest ID
                        </button>
                        <button className="btn leaveBtn">
                             Leave Nest
                        </button>
                </div>   

            <div className="editorWrap">
                <Editor />
            </div>
    </div>
    
};

export default CodePage;