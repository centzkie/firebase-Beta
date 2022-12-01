import React from "react";
import Table from "react-bootstrap/Table";
import { useState, useEffect } from "react";
import { collection,query,orderBy, onSnapshot, serverTimestamp} from "firebase/firestore";
import {db} from "../../../firebase-config"
import { async } from "@firebase/util";
// import { motion } from "framer-motion";

// const actionBtn = {
//   margin: "4px 8px",
//   padding: "0 10px",
//   borderRadius: "5px",
//   fontSize: "1.1rem",
// };
export default function HistoryDBTBL() {
  const [userData, setUserData] = useState([]);
  const userCollection3 = collection(db, "history");

  useEffect(() => {
    viewTable();
  },[]);

  const viewTable = async () => {
    const q = query(userCollection3, orderBy("timestamp", "asc"));
    const unsub = onSnapshot(q, (snapshot) =>
      setUserData(snapshot.docs.map((doc)=> ({...doc.data(),id: doc.id})))
    );
    console.log("Render");
    return unsub;
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
            <th>Date</th>
          </tr>
        </thead>
        <tbody className="align-middle">
        {userData.map((queue, index) => (
          <tr>
            <td>{queue.ID}</td>
            <td>{queue.Transaction}</td>
            <td>{queue.Name}</td>
            <td>{queue.Email}</td>
            <td>{queue.Date}</td>
          </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
