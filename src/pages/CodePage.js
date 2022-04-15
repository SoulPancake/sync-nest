import React, { useState,useRef,useEffect } from "react";
import ACTIONS from "../Actions";
import toast from "react-hot-toast";
import Client from '../components/Client'
import Editor from "../components/Editor";
import { initSocket } from '../socket';
import { useLocation,
         useNavigate,
         Navigate,
         useParams 
        } from "react-router-dom";



const CodePage=()=>{
    let loadingGif = require("../assets/gif2.gif");
    const [showLoadingVideo,setShowElement] = useState(true)
    useEffect(()=>{
      setTimeout(function() {
        setShowElement(false)
           }, 1000);
         },
     [])

   const socketRef=useRef(null);
   const codeRef = useRef(null);


   const location=useLocation();
   const reactNavigator=useNavigate();
   const { nestID }=useParams();
   const [clients,setClients]=useState([]);
   
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


         //Listening for the event in which a new user has joined the NEST

         socketRef.current.on(
            ACTIONS.JOINED,
            ({ clients, username, socketId }) => {
                if (username !== location.state?.username) {
                    toast.success(`${username} joined the nest.`);
                    // console.log(`${username} joined`);
                }else{
                    toast.success(`Welcome to the nest!`)
                }
                

                setClients(clients);
                socketRef.current.emit(ACTIONS.SYNC_CODE, {
                    code: codeRef.current,
                    socketId,
                });   
               
            }
        );


        //Listening for disconnected users

        socketRef.current.on(
            ACTIONS.DISCONNECTED,
            ({ socketId, username }) => {
                toast(`${username} left the nest.`,
                     {
                        icon: '👏',
                         style: {
                         borderRadius: '10px',
                         background: 'green',
                          color: '#eee',
                         },
                        }
                    );
                
                setClients((prev) => {
                    return prev.filter(
                        (client) => client.socketId !== socketId
                    );
                });
            }
        );

        

           

      
       };
       init();
       return () => {
        socketRef.current.disconnect();
        socketRef.current.off(ACTIONS.JOINED);
        socketRef.current.off(ACTIONS.DISCONNECTED);
        
    };
   },[]);



   
    

    if(!location.state){
        return <Navigate to="/"/>
    }

    async function copyNestID() {
        try {
            await navigator.clipboard.writeText(nestID);
            toast.success('Room ID has been copied to your clipboard');
        } catch (err) {
            toast.error('Could not copy the Room ID');
            console.error(err);
        }
    }
    function leaveRoom() {
        reactNavigator('/');
    }

    

    return <div>
        {showLoadingVideo?<img src={loadingGif} id="loading-gif" alt="Welcome!" />:<></>}
        {!showLoadingVideo?<div className="mainWrap">
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

                        <button className="btn copyBtn" onClick={copyNestID}>
                             Copy Nest ID
                        </button>
                        <button className="btn leaveBtn" onClick={leaveRoom}>
                             Leave Nest
                        </button>
                </div>   

            <div className="editorWrap">
                <Editor 
                socketRef={socketRef}
                nestID={nestID}
                onCodeChange={(code) => {
                    codeRef.current = code;
                }}/>
            </div>
    </div>:<></>}
        
          </div>
    
};

export default CodePage;