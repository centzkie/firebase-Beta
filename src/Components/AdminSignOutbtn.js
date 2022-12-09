import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { AiOutlinePoweroff } from "react-icons/ai";
import { Outlet, Navigate } from "react-router-dom";  


const PrivateRoutes = () =>{
  let auth = {'token': window.authentication}

  return(
      auth.token ? <Outlet/> : <Navigate to="/admin"/>
  )
}

const AdminSignOutbtn = () => {
  const navigate = useNavigate();

  const logOut =()=>{
    PrivateRoutes();
    window.authentication = false;
    navigate("/admin");
  }
  return (
    <motion.div
      className="signout"
      whileHover={{ scale: 1.4, rotate: -360 }}
      whileTap={{ scale: 0.9 }}
      onClick={logOut}
    >
      <AiOutlinePoweroff />
    </motion.div>
  );
};

export default AdminSignOutbtn;
