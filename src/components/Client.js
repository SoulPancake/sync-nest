import React from "react";
import Animal from "react-animals";
const Client=({username})=>{
    return (
    <div className="client">
        <div className="animal"><Animal dance size="100%" className="avatar"></Animal></div>
        
        <span className="username">{username}</span>
         
   </div>)
};

export default Client;