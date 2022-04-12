import React, { useState } from "react";
import Client from '../components/Client'
import Editor from "../components/Editor";


const CodePage=()=>{
   const [clients,setClients]=useState([
       {socketId:1,username:'Anurag'},
       {socketId:2,username:'Guthrie'},
       {socketId:3,username:'Yngwie'},
       {socketId:4,username:'Micheal'},
    ]);
 


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