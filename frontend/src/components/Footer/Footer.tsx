// import React from 'react';

import "./footer.css";

//icons
import { ImAppleinc } from "react-icons/im";
import {
  FaGooglePlay,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <div>
      <div className="footer">
        <div className="footer_left">
          <h2 className="text-3xl font-semibold text-white">RTSHolidays.com</h2>
          <div className="flex-footer">
            <div className="flex-footer-col">
              <p className="footer-text-gray footer-text-custom">
                Total Free Customer Care
              </p>
              <h6 className="footer-text-white">+9158573860</h6>
            </div>
            <div className="flex-footer-col">
              <p className="footer-text-gray footer-text-custom">
                Nee Live Support?
              </p>
              <h6 className="footer-text-white">vipinpatidar.netlify.com</h6>
            </div>
          </div>
          <div className="flex-footer-col">
            <h6 className="footer-text-white footer-text-social">Apps</h6>
            <div className="flex-footer">
              <div className="flex-footer app">
                <ImAppleinc className="icon" />
                <div className="flex-footer-col">
                  <p className="footer-text-gray">Download on the</p>
                  <h6 className="footer-text-white">Apple Store</h6>
                </div>
              </div>
              <div className="flex-footer app">
                <FaGooglePlay className="icon" />
                <div className="flex-footer-col">
                  <p className="footer-text-gray">Get it on</p>
                  <h6 className="footer-text-white">Google Store</h6>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-footer-col">
            <h6 className="footer-text-white footer-text-social">
              Follow us on social media
            </h6>
            <div className="flex-footer">
              <a className="social-icon">
                <FaFacebookF className="icon" />
              </a>
              <a className="social-icon">
                <FaTwitter className="icon" />
              </a>
              <a className="social-icon">
                <FaInstagram className="icon" />
              </a>
              <a className="social-icon">
                <FaLinkedinIn className="icon" />
              </a>
            </div>
          </div>
        </div>
        <div className="footer_right">
          <div>
            <h6 className="footer-text-white footer-text-social">
              Keep Yourself Up to Date
            </h6>
            <div className="footer_input">
              <input
                type="email"
                name="name"
                placeholder="Enter Your Email..."
                id="name"
              />
              <button className="hover:text-blue-600">Subscribe</button>
            </div>
          </div>
          <div className="flex-footer footer-text-links">
            <div>
              <h6 className="footer-text-white footer-text-social">
                Popular Search
              </h6>
              <div className="links-flex">
                <p className="footer-text-gray footer-text-underline">
                  Apartment for Rent
                </p>
                <p className="footer-text-gray footer-text-underline">
                  Apartment Low to hide
                </p>
                <p className="footer-text-gray footer-text-underline">
                  Offices for Buy
                </p>
                <p className="footer-text-gray footer-text-underline">
                  Offices for Rent
                </p>
              </div>
            </div>
            <div>
              <h6 className="footer-text-white footer-text-social">
                Quick Links
              </h6>
              <div className="links-flex">
                <p className="footer-text-gray footer-text-underline">
                  Terms of Use
                </p>
                <p className="footer-text-gray footer-text-underline">
                  Privacy Policy
                </p>
                <p className="footer-text-gray footer-text-underline">
                  Our Services
                </p>
                <p className="footer-text-gray footer-text-underline">
                  Contact Support
                </p>
                <p className="footer-text-gray footer-text-underline">FAQs</p>
              </div>
            </div>
            <div>
              <h6 className="footer-text-white footer-text-social">Discover</h6>
              <div className="links-flex">
                <p className="footer-text-gray footer-text-underline">Miami</p>
                <p className="footer-text-gray footer-text-underline">
                  Los Angeles
                </p>
                <p className="footer-text-gray footer-text-underline">
                  Chicago
                </p>
                <p className="footer-text-gray footer-text-underline">
                  New York
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
