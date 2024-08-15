import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-10">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
       
        <div>
          <h3 className="text-lg font-semibold mb-4">Company Name</h3>
          <p className="text-gray-400 mb-4">
            House#88 
          </p>
          <p className="text-gray-400">Email: dilawarjahangir2@gmail.com</p>
          <p className="text-gray-400">Phone: +923219348946</p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul>
            <li className="mb-2">
              <Link to="/" className="text-gray-400 hover:text-white">
                Home
              </Link>
            </li>
            <li className="mb-2">
              <Link to="/all-news" className="text-gray-400 hover:text-white">
                About Us
              </Link>
            </li>
            <li className="mb-2">
              <Link to="/all-functions" className="text-gray-400 hover:text-white">
                All Functions
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="https://www.facebook.com/dilawar.jahangir" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              <FaFacebook size={24} />
            </a>
            <a href="https://github.com/dilawarjahangir"  rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              <FaGithub size={24} />
            </a>
            <a href="https://www.instagram.com/dilawar._.jahangir/" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              <FaInstagram size={24} />
            </a>
          </div>
        </div>
      </div>
      <div className="text-center text-gray-500 mt-8">
        &copy; {new Date().getFullYear()} Dilawar. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
