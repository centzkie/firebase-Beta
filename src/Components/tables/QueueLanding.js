import Table from "react-bootstrap/Table";
import { useState, useEffect } from "react";
import { collection,doc, docs, getDocs,query,orderBy, deleteDoc, onSnapshot, Timestamp} from "firebase/firestore";
import {db} from "../../firebase-config"
import { async } from "@firebase/util";

const center = {
  textAlign: "center",
};

export function QueueLanding() {
  // table with table limit and pagination button
  const [userData, setUserData] = useState([]);
  const [currentPage, setCurrentPost] = useState(1);
  const postPerPage = 5;
  const [filter,setFilter] = useState(0);
  let pages = [];

  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentPost = userData.slice(firstPostIndex, lastPostIndex);

  useEffect(() => {
    viewTable();
  },[]);

  const viewTable = async () => {
    const userCollection = collection(db, "user");
    const q = query(userCollection, orderBy("timestamp", "asc"));
    const unsub = onSnapshot(q, (snapshot) =>
      setUserData(snapshot.docs.map((doc)=> ({...doc.data(),id: doc.id})))
    );
    console.log("Render");
    return unsub;
  } 

  for (let i = 1; i <= Math.ceil(userData.length / postPerPage); i++) {
    pages.push(i);
  }

  return (
    <div>
      <form>
      <Table striped bordered style={center}>
        <thead>
          <tr>
            <th style={{ backgroundColor: "#FFD700" }}>Queue Line Number</th>
            <th style={{ backgroundColor: "#FFD700" }}>Name</th>
          </tr>
        </thead>
        <tbody>
          {currentPost.map((queue, index) => (
            <tr key={index}>
              <td>{queue.ID}</td>
              <td>{queue.Name}</td>
          </tr>
          ))}
        </tbody>
      </Table>
      <nav className="d-flex justify-content-center">
        <ul className="pagination">
          {pages.map((page, index) => (
            <li
              className={
                page === currentPage ? "page-item active" : "page-item"
              }
              key={index}
            >
              <p className="page-link" onClick={() => setCurrentPost(page)}>
                {page}
              </p>
            </li>
          ))}
        </ul>
      </nav>
      </form>
    </div>
  );
}
