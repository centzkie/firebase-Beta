import React from "react";
import Table from "react-bootstrap/Table";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { collection, doc, getDoc,query,orderBy, deleteDoc, onSnapshot, serverTimestamp, addDoc} from "firebase/firestore";
import {db} from "../../../firebase-config"
import { async } from "@firebase/util";

const actionBtn = {
  margin: "4px 8px",
  padding: "0 10px",
  borderRadius: "5px",
  fontSize: "1.1rem",
};
export default function MainDBQueueQL() {
  const [userData, setUserData] = useState([]);
  const [currentPage, setCurrentPost] = useState(1);
  const postPerPage = 2;

  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentPost = userData.slice(firstPostIndex, lastPostIndex);

  const userCollection = collection(db, "user");
  const userCollection2 = collection(db, "nowserving");

  useEffect(() => {
    viewTable();
    moveUser();
  },[]);

  const viewTable = async () => {
    const q = query(userCollection, orderBy("timestamp", "asc"));
    const unsub = onSnapshot(q, (snapshot) =>
      setUserData(snapshot.docs.map((doc)=> ({...doc.data(),id: doc.id})))
    );
    console.log("Render");
    return unsub;
  } 

  const deleteUser = async(email) => {
    const userDoc = doc(db, "user", email)
    await deleteDoc(userDoc);
    viewTable();
  }

  const moveUser = async (id) => {
    console.log("The id to edit:" + id);
    const docRef = doc(db, "user", id);
    const snapshot = await getDoc(docRef);
    await addDoc(userCollection2, {Name: snapshot.data().Name, Transaction: snapshot.data().Transaction, Email: snapshot.data().Email, ID: snapshot.data().ID, timestamp: serverTimestamp()});
    
    deleteUser(id);
  } 

  const addUser = async(id) => {
    moveUser(id);
  }

  return (
    <div>
      <Table striped bordered className="text-center">
        <thead style={{ backgroundColor: "#FFD700" }}>
          <tr>
            <th>Queue Line Number</th>
            <th>Transactions</th>
            <th>Name</th>
            <th>Email</th>
            <th colspan="2">Actions</th>
          </tr>
        </thead>
        <tbody className="align-middle">
        {currentPost.map((queue, index) => (
          <tr>
            <td>{queue.ID}</td>
            <td>{queue.Transaction}</td>
            <td>{queue.Name}</td>
            <td>{queue.Email}</td>
            <td>
              <motion.button
                type="button"
                className="transaction btn btn-primary"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                style={actionBtn}
                onClick={()=>{addUser(queue.id)}}
              >
                Admit
              </motion.button>
              <motion.button
                type="button"
                className="transaction btn btn-danger"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                style={actionBtn}
                onClick={()=>{deleteUser(queue.id)}}
              >
                Deny
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
