import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await axios.post("http://localhost:4000/api/user/login",{
      email,
      password
    });

    if(res.data.success){
      
      if(res.data.role === "admin"){
        localStorage.setItem("adminToken", res.data.token);
        navigate("/");   // ✅ FIX
      }else{
        alert("Not Admin ❌");
      }

    }else{
      alert(res.data.message);
    }
  }

  return (
    <div style={{textAlign:"center",marginTop:"100px"}}>
      <h2>Admin Login 🔐</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)} /><br/><br/>
        <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} /><br/><br/>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login;