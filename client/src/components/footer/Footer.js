import React from 'react'
import "./footer.css";

import fb from '../../asserts/SocialIcons/facebook.png'
import instagram from '../../asserts/SocialIcons/instagram.png'
import linkedin from '../../asserts/SocialIcons/linkedin.png'
import twitter from '../../asserts/SocialIcons/twitter.png'

const Footer = () => {
  return (
    <>
      <footer>
        <div class="content">
          <div class="left box">
            <div class="topic">Quick Navigations</div>
            <div><a href="/about_us">About Us</a></div>
            <div><a href="/contact_us">Contact Us</a></div>

          </div>
          <div class="middle box">
            <div class="topic">Subscribe us</div>
            <form >
              <input type="text" placeholder="Enter email address" />
              <input type="submit" name="" value="Send" />
            </form>
          </div>
          <div class="right box">
            <div class="topic">Follow us</div>
            <center>
              <div class="media-icons">
                <a href="#"><img className='icn' src={fb} /></a>
                <a href="#"><img className='icn' src={instagram} /></a>
                <a href="#"><img className='icn' src={linkedin} /></a>
                <a href="#"><img className='icn' src={twitter} /></a>
              </div>
            </center>
          </div>
        </div>
        <div class="bottom">
          <p>Copyright © 2022 QUICK HEALTH All Rights Reserved</p>
        </div>
      </footer>
    </>
  )
}

export default Footer