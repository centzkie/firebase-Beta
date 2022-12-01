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

export default function MainDBQueueNS() {
  const [userData, setUserData] = useState([]);
  const [currentPage, setCurrentPost] = useState(1);
  const postPerPage = 2;

  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentPost = userData.slice(firstPostIndex, lastPostIndex);
  const current = new Date();
  const [date,setDate] = useState(`${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`);


  const userCollection3 = collection(db, "history");
  const userCollection2 = collection(db, "nowserving");

  useEffect(() => {
    viewTable();
    //moveUser();
  },[]);

  const viewTable = async () => {
    const q = query(userCollection2, orderBy("timestamp", "asc"));
    const unsub = onSnapshot(q, (snapshot) =>
      setUserData(snapshot.docs.map((doc)=> ({...doc.data(),id: doc.id})))
    );
    console.log("Render");
    return unsub;
  } 

  const deleteUser = async(email) => {
    const userDoc = doc(db, "nowserving", email)
    await deleteDoc(userDoc);
    viewTable();
  }

  const moveUser = async (id) => {
    console.log("The id to edit:" + id);
    const docRef = doc(db, "nowserving", id);
    const snapshot = await getDoc(docRef);
    await addDoc(userCollection3, {Name: snapshot.data().Name, Transaction: snapshot.data().Transaction, Email: snapshot.data().Email, ID: snapshot.data().ID, Date: date, timestamp: serverTimestamp()});
    
    deleteUser(id);
  } 

  const addUser = async(id) => {
    moveUser(id);
  }

  return (
    <div>
      <Table striped bordered className="text-center">
        <thead style={{ backgroundColor: "#800000", color: "white" }}>
          <tr>
            <th>Queue Line Number</th>
            <th>Transactions</th>
            <th>Name</th>
            <th>Email</th>
            <th colspan="2">Actions</th>
          </tr>
        </thead>
        <tbody className="align-middle">
        {
          currentPost.map((queue, index) => (
            <tr>
            <td>{queue.ID}</td>
            <td>{queue.Transaction}</td>
            <td>{queue.Name}</td>
            <td>{queue.Email}</td>
            <td>
              <motion.button
                type="button"
                className="transaction btn btn-success"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                style={actionBtn}
                onClick={()=>{addUser(queue.id)}}
              >
                Complete
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
