import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {db} from '../firebase-config'
import {collection, deleteDoc, query, doc, getDocs, where} from "firebase/firestore";
import {useState} from "react";

const EditTransactionform = () => {

  let [search,setSearch] = useState("");
  let [name,setName] = useState("");
  let [transaction,setTransaction] = useState("");
  let filters = ("");

  const navigate = useNavigate();
  const cancel = () => {
    navigate("/");
  };

  const colorReq = {
    color: "red",
  };

  const handleSubmit=(e)=>{
    e.preventDefault();
  }

  const clearForm = ()=>{
    setName("");
    setTransaction("");
    setSearch("");
  }

  const searchUser = async () => {
    const q = query(collection(db, "user"), where("Email", "==", search));
    const querySnapshot = await getDocs(q);
    let j = 0;
    querySnapshot.forEach((doc) => {
      filters = (doc.id, " => ", doc.data());
      j++;
    });
    if(j===0){
      alert("Email not found");
      clearForm();
    }else{
      setName(filters.Name);
      setTransaction(filters.Transaction);
      console.log("Email Exist");
    }
  }

  const deleteUser = async()=>{
    const q = query(collection(db, "user"), where("Email", "==", search));
    let x = 0;
      const querySnapshot = await getDocs(q);
      let docID = '';
      querySnapshot.forEach((doc) => {
        docID = doc.id;
        x++;
      });
    if(x!==0){
      const userDoc = doc(db, "user", docID)
      if (window.confirm('Are you sure you wish to delete this transaction ?')){
        await deleteDoc(userDoc);   
        alert("Delete success")
        clearForm();
      }
    
    }
    else if(x===0 && search.length >0){
      alert("Invalid email");
    }  
  }
  
  /*   update function
  const updateUser = async() =>{
    if(transaction.length !==0 || name.length !== 0){
      const q = query(collection(db, "user"), where("Email", "==", search));
      const querySnapshot = await getDocs(q);
      let docID = '';
      querySnapshot.forEach((doc) => {
        docID = doc.id;
      });
      const user = doc(db, "user", docID);
      await updateDoc(user, {
        Transaction: transaction,
        Name: name,
      });
      alert("Update successfully")
      setName("");
      setTransaction("");
    }else{
      console.log("Please fill up the form");
    }
    setName("");
    setTransaction("");
    setSearch("");
  } */

  return (
    <div>
      <div className="editForm">
        <h1>View Transaction</h1>
        <form action="" className="newform" onSubmit={handleSubmit}>
          <div className="email">
            <label htmlFor="Email" className="label">
              Email<span style={colorReq}>*</span>
            </label>
            <input
              onChange={(e) => {setSearch(e.target.value)}}
              type="search"
              className="txtemail"
              required
              placeholder="Ex. Juan Cruz@yahoo.com"
              id = 'ref'
              value = {search}
            />
            <button
            type="search"
            onClick={searchUser}
            >Search</button>
     
            {/* <GoSearch className="search" /> */}
          </div>
          <div className="transactions">
            <label htmlFor="transaction">
              Transaction <span style={colorReq}>*</span>
            </label>
            <input type="text" disabled = {true} placeholder = "Transaction"required Value = {transaction} 
            onChange={(e) => setTransaction(e.target.value)}/>
          </div>

          <div className="input-name">
            <label htmlFor="Name" className="label">
              Name<span style={colorReq}>*</span>
            </label>
            <input type="text" disabled = {true} placeholder="Juan Cruz" required Value = {name} 
            onChange={(e) => setName(e.target.value)}/>
          </div>

          <div className="generateQLNbtn">
            <motion.button
              type="button"
              onClick={cancel}
              className="cancel"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              Cancel
            </motion.button>

            <motion.button
              type="submit"
              className="submit"
              onClick={deleteUser}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              Delete
            </motion.button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTransactionform;
