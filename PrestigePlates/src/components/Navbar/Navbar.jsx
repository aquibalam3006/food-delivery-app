import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'
import { toast } from "react-toastify";

const Navbar = ({ setShowLogin }) => {

  const [menu, setMenu] = useState("Home");
  const [showMenu, setShowMenu] = useState(false); // 🔥 hamburger state

  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    setToken("");
    navigate("/");
  }

  return (
    <div className='navbar'>

      <Link to={'/'}>
        <img src={assets.logo} alt="" className="logo" />
      </Link>

      {/* 🔥 DESKTOP MENU */}
      <ul className={`navbar-menu ${showMenu ? "active-menu" : ""}`}>
        <Link to='/' onClick={() => { setMenu("Home"); setShowMenu(false); }} className={menu === "Home" ? "active" : ""}>Home</Link>
        <a href='#explore-menu' onClick={() => { setMenu("Menu"); setShowMenu(false); }}>Menu</a>
        <a href='#app-download' onClick={() => { setMenu("Mobile-App"); setShowMenu(false); }}>Mobile-App</a>
        <a href='#footer' onClick={() => { setMenu("Contact-Us"); setShowMenu(false); }}>Contact-Us</a>
      </ul>

      {/* 🔥 RIGHT SIDE */}
      <div className="navbar-right">

        {/* 🔥 HAMBURGER ICON */}
        <img 
          src={assets.menu_icon} 
          alt="" 
          className='hamburger'
          onClick={() => setShowMenu(!showMenu)}
        />

        <img src={assets.search_icon} alt="" />

        <div className="navbar-search_icon">
          {token ? (
            <Link to='/cart'>
              <img src={assets.basket_icon} alt="" />
            </Link>
          ) : (
            <img
              src={assets.basket_icon}
              alt=""
              onClick={() => {
                toast.error("Please login first 🔐");
                setShowLogin(true);
              }}
              style={{ cursor: "pointer" }}
            />
          )}
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>

        {!token ? (
          <button onClick={() => setShowLogin(true)}>Sign in</button>
        ) : (
          <div className='navbar-profile'>
            <img src={assets.profile_icon} alt="" />
            <ul className='nav-profile-dropdown'>
              <li>
                <img src={assets.bag_icon} alt="" />
                <p onClick={() => navigate('/myorders')}>Orders</p>
              </li>
              <hr />
              <li onClick={logout}>
                <img src={assets.logout_icon} alt="" />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}

      </div>
    </div>
  )
}

export default Navbar