import React, { useState } from "react";

const CodePage=()=>{
   const [clients,setClients]=useState([
       {socketId:1,username:'Anurag Bee'},
       {socketId:2,username:'Guthrie Govan'}
    ]);



    return <div className="mainWrap">
<div className="aside">
    <div className="asideInner">
        <div className="asideLogo">
            <img src="/SyncNest.png" alt="Sync Nest Logo" className="codePageLogo"></img>
        </div>
        <h3>Connected</h3>
        <div className="clientsList">
          {
              clients.map(client=>(
                  <Client key={client.socketId} username={client.username}/>
              ))
          }
        </div>
    </div>
</div>
<div className="editorWrap">
    Editor goes here..
</div>
    </div>
};

export default CodePage;