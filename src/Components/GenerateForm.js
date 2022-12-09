import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {db} from '../firebase-config'
import { collection, addDoc, serverTimestamp, timestamp, where, query, getDocs } from "firebase/firestore";
//import QueueSuccess from "./QueueSuccess";

function randomNumberInRange(min, max) {
  // 👇️ get number between min (inclusive) and max (inclusive)
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

window.num = "AP" + randomNumberInRange(99,499)

const GenerateForm = () => {
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [transaction,setTransaction] = useState("");
  let filterEmail= ("");
  let filterNum = ("");
  const userCollection = collection(db, "user");
  const [error,setError] = useState(false)
  //let [num, setNum] = useState(randomNumberInRange(100,500));
  const navigate = useNavigate();
  
  const cancel = () => {
    navigate("/");
  };

  const colorReq = {
    color: "red",
  };

  const insert = async () =>{
    if (window.confirm('Are you sure you wish to add this transaction ?')){
      await addDoc(userCollection, {Name: name, Transaction: transaction, Email: email, ID: window.num, timestamp: serverTimestamp()});
      navigate("/generateSuccess")
    }

  }
  
  const createUser = async () => {
    let getNum = query(collection(db, "user"), where("ID", "==", window.num));  // Check if id exist from db
    let querySnapshotNum = await getDocs(getNum);  
    let x = 0;                                                                 
    querySnapshotNum.forEach((doc) => {
    filterNum = (doc.id, " => ", doc.data());
    x++;
    });

    const getEmail = query(collection(db, "user"), where("Email", "==", email)); // CHeck if email exist from db
    const querySnapshot = await getDocs(getEmail);
    let j = 0;
    querySnapshot.forEach((doc) => { 
      filterEmail = (doc.id, " => ", doc.data());
      j++;
    });

    console.log("Email found" + j);
    console.log("ID found" + x);

    if(name.length > 0 && transaction.length > 0 && email.length > 0 ){      // Checking for input text 
      if(j===0 && x!==0){   
        let y = 0;
        do{
          y = 0;
          window.num = "AP" + randomNumberInRange(99,499);                        // Generate new id again 
          getNum = query(collection(db, "user"), where("ID", "==", window.num));  // Check if id exist from db
          querySnapshotNum = await getDocs(getNum);                                                                 
          querySnapshotNum.forEach((doc) => {
            filterNum  = (doc.id, " => ", doc.data());
            y++;
          });
        }while(y===1);
        insert();
      }                                                           
      else if(j===0 && x===0){             // Check if email and id is unique
        insert();                          // then call insert method
      }                         
      else if (j!==0){
        alert("Email already exist");
      }
      else{
        console.log("error");
      }
    } 
  }

  const validation =(e) => {
    if(name.length === 0 || transaction.length === 0 || email.length === 0)
    {
      setError(true)
    }
    e.preventDefault()
  }

  return (
  
    <div className="form">
      
      <h1>Generate Queue Line number</h1>
      <form action="" className="newform" onSubmit={validation}>
        <div className="transactions">
          <label htmlFor="transaction">
            Transaction <span style={colorReq}>*</span>
          </label>
          <select  required name="transactions" id="transactions" on onChange={(e) =>{
              const selectedTransaction=e.target.value;
              setTransaction(selectedTransaction);
          }}>
            <option value="" disabled selected hidden>
              Head of Academic Transactions
            </option>
            <option value="Accreditation of Subjects">Accreditation of Subjects</option>
            <option value="Adding/Changing of Subjects">Adding/Changing of Subjects</option>
            <option value="Overload">Overload</option>
            <option value="Online request for petition">Online request for petition</option>
            <option value="Cross-enrollment">Cross-Enrollment</option>
          </select>
        </div>

        <div className="email">
          <label htmlFor="Email" className="label">
            Email<span style={colorReq}>*</span>
          </label>
          <input 
            type="email" 
            required placeholder="Ex. Juan Cruz@yahoo.com"
            onChange={(e) => {setEmail(e.target.value)}} />
        </div>

        <div className="input-name">
          <label htmlFor="Name" className="label">
            Name<span style={colorReq}>*</span>
          </label>
          <input type="text" 
            required placeholder="Ex. Juan Cruz" 
            onChange={(e) => {setName(e.target.value)}}/>
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
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={createUser}>
            Submit
          </motion.button> 
        </div>
      </form>
    </div>
    
  );
};

export default GenerateForm;
