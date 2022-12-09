import React from "react";
import { Table } from "react-bootstrap";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { collection, doc, getDoc,query,orderBy, deleteDoc, onSnapshot, serverTimestamp, addDoc} from "firebase/firestore";
import {db} from "../../../firebase-config"
import { async } from "@firebase/util";

export default function AnnouncementDBTBL() {

  const [userData, setUserData] = useState([]);
  const userCollection = collection(db, "announcement");

  useEffect(() => {
    viewTable();
  },[]);

  const viewTable = async () => {
    const q = query(userCollection, orderBy("timestamp", "asc"));
    const unsub = onSnapshot(q, (snapshot) =>
      setUserData(snapshot.docs.map((doc)=> ({...doc.data(),id: doc.id})))
    );
    console.log("render");
    return unsub;
  } 

  const deleteAnnouncement = async (id)=>{
    if(window.confirm("Are you sure you want remove this announcement ?")){
      const userDoc = doc(db, "announcement", id)
      await deleteDoc(userDoc);
      viewTable();
    } 
  }


  return (
    <div>
      <Table striped bordered>
        <thead className="text-center" style={{ backgroundColor: "#FFD700" }}>
          <tr>
            <th>Announcements</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="align-middle">
        {userData.map((queue, index) => (
          <tr>
            <td>{queue.update}</td>
            <td>
              <motion.button
                type="button"
                className="transaction btn btn-danger"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick = {()=>{deleteAnnouncement(queue.id)}}
                // style={actionBtn}
              >
                delete
              </motion.button>
            </td>
          </tr>
          ))
          }
        </tbody>
      </Table>
    </div>
  );
}
