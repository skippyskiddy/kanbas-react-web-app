import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { useLocation } from 'react-router-dom';
import { FaUser, FaTachometerAlt, FaBook, FaCalendar, FaEnvelope, FaHistory, FaPaintBrush, FaUsers, FaQuestionCircle } from 'react-icons/fa';

const KanbasNavigation = () => {
    const location = useLocation();
  
    const links = [
    { to: "/Kanbas/Account", icon: <FaUser style={{ color: 'white' }}  />, text: "Account" },
    { to: "/Kanbas/Dashboard", icon: <FaTachometerAlt />, text: "Dashboard" },
    { to: "/Kanbas/Courses", icon: <FaBook />, text: "Courses" },
    { to: "/Kanbas/Calendar", icon: <FaCalendar />, text: "Calendar" },
    { to: "#", icon: <FaEnvelope />, text: "Inbox" },
    { to: "#", icon: <FaHistory />, text: "History" },
    { to: "#", icon: <FaPaintBrush />, text: "Studio" },
    { to: "#", icon: <FaUsers />, text: "Commons" },
    { to: "#", icon: <FaQuestionCircle />, text: "Help" },
  ];


    return (
      <div className="d-flex wd-kanbas-navigation">
        <div className="py-2">
            <img src="/images/nlogo.png" alt="Northeastern Logo" className="img-fluid" />
        </div>
        <ul className="nav flex-column mb-auto">
          {links.map((link, index) => (
            <li key={index} className={`nav-item ${location.pathname.startsWith(link.to) ? 'wd-active' : ''}`}>
              <Link className="nav-link" to={link.to}>
                {link.icon} {link.text}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  

export default KanbasNavigation;
