import React from "react";

const HomePage=()=>{
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
                        placeholder="Nest ID"/>
                        <input 
                        type="text"
                        className="inputBox"
                        placeholder="Username"/>

                       <button className="btn joinBtn">Join</button>
                       <span className="createInfo">If you don't have an invite, create &nbsp;
                       <a href="" className="createNewBtn">new Nest</a></span>
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