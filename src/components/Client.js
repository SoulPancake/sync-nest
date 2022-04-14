import React from "react";
import Animal from "react-animals";
const Client=({username})=>{
    return (
    <div className="client">
        <Animal dance size="100%" className="avatar"></Animal>
        
        <span className="username">{username}</span>
         
   </div>)
};

export default Client;