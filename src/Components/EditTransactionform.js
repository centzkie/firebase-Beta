import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
// import { GoSearch } from "react-icons/go";

const EditTransactionform = () => {
  const navigate = useNavigate();
  const cancel = () => {
    navigate("/");
  };

  const colorReq = {
    color: "red",
  };

  return (
    <div>
      <div className="editForm">
        <h1>Edit Transaction</h1>
        <form action="" className="newform">
          <div className="email">
            <label htmlFor="Email" className="label">
              Email<span style={colorReq}>*</span>
            </label>
            <input
              type="search"
              className="txtemail"
              required
              placeholder="Ex. Juan Cruz@yahoo.com"
            />
            {/* <GoSearch className="search" /> */}
          </div>
          <div className="transactions">
            <label htmlFor="transaction">
              Transaction <span style={colorReq}>*</span>
            </label>
            <select name="transactions" id="transactions" required>
              <option value="" disabled selected hidden>
                Head of Academic Transactions
              </option>
              <option value="1">Accreditation of Subjects</option>
              <option value="2">Adding/Changing of Subjects</option>
              <option value="3">Overload</option>
              <option value="4">Online request for petition</option>
              <option value="5">Cross-Enrollment</option>
            </select>
          </div>

          <div className="input-name">
            <label htmlFor="Name" className="label">
              Name<span style={colorReq}>*</span>
            </label>
            <input type="text" placeholder="Ex. Juan Cruz" required />
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
              // onClick={}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              Update
            </motion.button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTransactionform;
