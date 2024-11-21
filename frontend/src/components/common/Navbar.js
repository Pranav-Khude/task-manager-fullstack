// // src/components/common/Navbar.js
// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../../contexts/AuthContext';
// import '../../styles/Navbar.css';

// const Navbar = () => {
//   const { token, logout } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate('/login');
//   };

//   return (
//     <nav className="navbar">
//       <div className="navbar-container">
//         <Link to="/" className="navbar-logo">
//           Task Manager
//         </Link>
//         <div className="nav-menu">
//           {token ? (
//             <div className="nav-links">
//               <Link to="/dashboard" className="nav-link">
//                 Dashboard
//               </Link>
//               <button onClick={handleLogout} className="logout-btn">
//                 Logout
//               </button>
//             </div>
//           ) : (
//             <div className="nav-links">
//               <Link to="/login" className="nav-link">
//                 Login
//               </Link>
//               <Link to="/register" className="nav-link">
//                 Register
//               </Link>
//             </div>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;













// src/components/common/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import '../../styles/Navbar.css';

const Navbar = () => {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div>
          <Link to="/" className="navbar-logo">
            Task Manager
          </Link>
        </div>
        <div className="nav-menu">
          {token ? (
            <div className="nav-links">
              <Link to="/dashboard" className="nav-link">
                Dashboard
              </Link>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </div>
          ) : (
            <div className="nav-links">
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link to="/register" className="nav-link">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;