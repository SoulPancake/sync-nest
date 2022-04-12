import React from "react";
import Animal from "react-animals";
const Client=({username})=>{
    return (
    <div className="client">
        <Animal rounded dance className="avatar"></Animal>
        <span className="username">{username}</span>
         
   </div>)
};

export default Client;