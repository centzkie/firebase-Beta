import Table from "react-bootstrap/Table";
import { useState, useEffect } from "react";
import { collection,doc, docs, getDocs,query,orderBy, deleteDoc, onSnapshot, Timestamp} from "firebase/firestore";
import {db} from "../../firebase-config"
import { async } from "@firebase/util";

const center = {
  textAlign: "center",
};

export function NowServing() {
  const [userData, setUserData] = useState([]);
  const [currentPage, setCurrentPost] = useState(1);
  const postPerPage = 2;
  const [filter,setFilter] = useState(0);

  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentPost = userData.slice(firstPostIndex, lastPostIndex);

  useEffect(() => {
    viewTable();
  },[]);

  const viewTable = async () => {
    const userCollection = collection(db, "nowserving");
    const q = query(userCollection, orderBy("timestamp", "asc"));
    const unsub = onSnapshot(q, (snapshot) =>
      setUserData(snapshot.docs.map((doc)=> ({...doc.data(),id: doc.id})))
    );
    console.log("Render");
    return unsub;
  } 

  return (
    <Table striped bordered style={center}>
      <thead>
        <tr>
          <th style={{ backgroundColor: "#800000", color: "white" }}>
            Queue Line Number
          </th>
        </tr>
      </thead>
      <tbody>
      {currentPost.map((queue, index) => (
          <tr>
            <td>{queue.ID}</td>
            <td>{queue.Name}</td>
          </tr>
          ))}
      </tbody>
    </Table>
  );
}
