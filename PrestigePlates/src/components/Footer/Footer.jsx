import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
              <img id='footer-logo' src={assets.logo} alt="" />
              <p>loren Ipsum is a simply dummy text of the printing and typesetting industry.</p>
              <div className="footer-social-icon">
                <img src={assets.facebook_icon} alt="" />
                <img src={assets.twitter_icon} alt="" />
                <img src={assets.linkedin_icon} alt="" />
              </div>
            </div>
            <div className="footer-content-center">
              <h2>COMPANY</h2>
              <ul>
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy</li>
              </ul>
                
            </div>
            <div className="footer-content-right">
              <h2>GET IN TOUCH</h2>
              <ul>
                <li>+1-222-324-234</li>
                <li>contact@tamato.com</li>
              </ul>

            </div>
            
        </div>
        <hr />
        <p className="footer-copyright">Copyright 2024 c tamato.com -All right Reserved.</p>
      
    </div>
  )
}

export default Footer
