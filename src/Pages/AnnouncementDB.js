import React from "react";
import Sidepanel from "../Components/Sidepanel";
import Signout from "../Components/AdminSignOutbtn";
import { motion } from "framer-motion";
import AnnouncementDBTBL from "../Components/tables/AdminTables/AnnouncementDBTBL";
import { useState} from "react";
import {db} from "../firebase-config"
import { collection,serverTimestamp, addDoc} from "firebase/firestore";


const AnnouncementDB = () => {
  const [newAnnounce, setNewAnnounce] = useState("");
  const userCollection = collection(db, "announcement");

  const addAnnounce = async() => {
    
    if(newAnnounce.length !== 0){
      if (window.confirm('Are you sure you wish to add this announcement ?')){
        await addDoc(userCollection, {
          update: newAnnounce,
          timestamp: serverTimestamp()
        });
        setNewAnnounce ("");
      }
    }
    else{
      alert("Please fill the form");
    }
    
  }

  return (
    <div className="announcement">
      <Sidepanel />
      <div className="announcementContent">
        <div className="title">
          <h1>Announcement</h1>
        </div>
        <form action="">
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            placeholder="Announcement..."
            onChange={(e) => {setNewAnnounce(e.target.value)}}
            value = {newAnnounce}
          ></textarea>
          <div className="button">
            <motion.button
              type="button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick = {addAnnounce}
            >
              Announce
            </motion.button>
          </div>
        </form>
        <div className="table">
          <AnnouncementDBTBL />
        </div>
      </div>
      <div className="signOut">
        <Signout />
      </div>
    </div>
  );
};

export default AnnouncementDB;