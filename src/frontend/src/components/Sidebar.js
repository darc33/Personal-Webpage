import React from "react";
import {FaLinkedin, FaGithub, FaBehance, FaTwitter, FaFacebook, FaInstagram, FaTiktok, FaYoutube} from "react-icons/fa"
import {SiCredly} from "react-icons/si"
import "./Sidebar.css";

const Sidebar = () => {
    return (
        <div className="sidebar">
            <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="link-icon">
                <FaLinkedin size={24}/>
            </a>
            <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="link-icon">
                <FaGithub size={24}/>
            </a>
            <a href="https://www.behance.net/" target="_blank" rel="noopener noreferrer" className="link-icon">
                <FaBehance size={24}/>
            </a>
            <a href="https://www.credly.com/" target="_blank" rel="noopener noreferrer" className="link-icon">
                <SiCredly size={24}/>
            </a>
            <a href="https://youtube.com/" target="_blank" rel="noopener noreferrer" className="link-icon">
                <FaYoutube size={24}/>
            </a>
            <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" className="link-icon">
                <FaInstagram size={24}/>
            </a>
            <a href="https://x.com/" target="_blank" rel="noopener noreferrer" className="link-icon">
                <FaTwitter size={24}/>
            </a>
            <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" className="link-icon">
                <FaFacebook size={24}/>
            </a>
            <a href="https://tiktok.com/" target="_blank" rel="noopener noreferrer" className="link-icon">
                <FaTiktok size={24}/>
            </a>
            
        </div>
    );
};

export default Sidebar;