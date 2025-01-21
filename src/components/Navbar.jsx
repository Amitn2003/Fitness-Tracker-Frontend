// // import React, { useEffect, useState } from "react";
// // import { Link, useNavigate , NavLink} from "react-router-dom";
// // import { useAuth } from "../hooks/useAuth"

// // const Navbar = () => {
// //   const {  logout } = useAuth();
// //   const navigate = useNavigate();
// //   const [user, setUser] = useState(null);

// //   // Check if user data and token exist in localStorage on initial render
// //   useEffect(() => {
// //     const storedUser = JSON.parse(localStorage.getItem("user"));
// //     if (storedUser) {
// //       setUser(storedUser); // Set user state from localStorage
// //     }
// //   }, []);


// //   const handleLogout = () => {
// //     // Remove user and token from localStorage
// //     localStorage.removeItem("user");
// //     localStorage.removeItem("jwt");

// //     // Call logout function from custom hook
// //     logout();

// //     // Reset the user state
// //     setUser(null);

// //     // Redirect to login page
// //     navigate("/login");
// //   };

// //   // <nav className="bg-gray-800 text-white px-6 py-4 shadow-md">
// //   //   <div className="flex justify-between items-center">
// //   //     {/* Logo */}
// //   // <div className="flex items-center space-x-2">
// //   // <Link to="/" className="">
// //   // <img 
// //   //     src="/logo.png" 
// //   //     alt="Logo image" 
// //   //     className="h-9 w-auto" 
// //   //   />
// //   //     </Link>
    
// //   //     {/* Logo */}
// //   //     <Link to="/" className="text-2xl font-bold">
// //   //       Fitz
// //   //     </Link>
// //   //     </div>

// //   //     {/* Links */}
// //   //     <div className="flex items-center space-x-6">
// //   //       {user ? (
// //   //         <>
// //   //           <Link to="/dashboard" className="hover:text-gray-300">
// //   //             Dashboard
// //   //           </Link>
// //   //           <Link to="/workout-history" className="hover:text-gray-300">
// //   //             Workouts
// //   //           </Link>
// //   //           <Link to="/routines" className="hover:text-gray-300">
// //   //             Routines
// //   //           </Link>
// //   //           <Link to="/profile" className="hover:text-gray-300 flex items-center space-x-2">
// //   //             <i className="fas fa-user text-lg"></i> {/* Profile Icon */}
// //   //           </Link>
// //   //           <Link to="/settings" className="hover:text-gray-300 flex items-center space-x-2">
// //   //             <i className="fas fa-cog text-lg"></i> {/* Settings Icon */}
// //   //           </Link>
// //   //           {/* <button
// //   //             onClick={handleLogout}
// //   //             className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
// //   //           >
// //   //             Logout
// //   //           </button> */}
// //   //         </>
// //   //       ) : (
// //   //         <>
// //   //           <Link to="/login" className="hover:text-gray-300">
// //   //             Login
// //   //           </Link>
// //   //           <Link to="/register" className="hover:text-gray-300">
// //   //             Register
// //   //           </Link>
// //   //         </>
// //   //       )}
// //   //     </div>
// //   //   </div>
// //   // </nav>
// //   return (
// //     <nav className="bg-gray-800 text-white px-6 py-4 shadow-md">
// //       <div className="flex justify-between items-center">
// //         {/* Logo */}
// //         <div className="flex items-center space-x-2">
// //           <NavLink to="/" className="">
// //             <img
// //               src="/logo.png"
// //               alt="Logo image"
// //               className="h-9 w-auto"
// //             />
// //           </NavLink>

// //           {/* Logo Text */}
// //           <NavLink to="/" className="text-2xl font-bold">
// //             Fitz
// //           </NavLink>
// //         </div>

// //         {/* Links */}
// //         <div className="flex items-center space-x-6">
// //           {user ? (
// //             <>
// //               <NavLink
// //                 to="/dashboard"
// //                 className="hover:text-gray-300"
// //                 activeClassName="text-gray-300 font-bold"
// //               >
// //                 Dashboard
// //               </NavLink>
// //               <NavLink
// //                 to="/workout-history"
// //                 className="hover:text-gray-300"
// //                 activeClassName="text-gray-300 font-bold"
// //               >
// //                 Workouts
// //               </NavLink>
// //               <NavLink
// //                 to="/routines"
// //                 className="hover:text-gray-300"
// //                 activeClassName="text-gray-300 font-bold"
// //               >
// //                 Routines
// //               </NavLink>
// //               <NavLink
// //                 to="/profile"
// //                 className="hover:text-gray-300 flex items-center space-x-2"
// //                 activeClassName="text-gray-300 font-bold"
// //               >
// //                 <i className="fas fa-user text-lg"></i> {/* Profile Icon */}
// //               </NavLink>
// //               <NavLink
// //                 to="/settings"
// //                 className="hover:text-gray-300 flex items-center space-x-2"
// //                 activeClassName="text-gray-300 font-bold"
// //               >
// //                 <i className="fas fa-cog text-lg"></i> {/* Settings Icon */}
// //               </NavLink>
// //               {/* <button
// //                 onClick={handleLogout}
// //                 className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
// //               >
// //                 Logout
// //               </button> */}
// //             </>
// //           ) : (
// //             <>
// //               <NavLink
// //                 to="/login"
// //                 className="hover:text-gray-300"
// //                 activeClassName="text-gray-300 font-bold"
// //               >
// //                 Login
// //               </NavLink>
// //               <NavLink
// //                 to="/register"
// //                 className="hover:text-gray-300"
// //                 activeClassName="text-gray-300 font-bold"
// //               >
// //                 Register
// //               </NavLink>
// //             </>
// //           )}
// //         </div>
// //       </div>
// //       </nav>
// //   );
// // };

// // export default Navbar;


import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Navbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Check if user data and token exist in localStorage on initial render
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser); // Set user state from localStorage
    }
  }, []);

  const handleLogout = () => {
    // Remove user and token from localStorage
    localStorage.removeItem("user");
    localStorage.removeItem("jwt");

    // Call logout function from custom hook
    logout();

    // Reset the user state
    setUser(null);

    // Redirect to login page
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 text-white px-6 py-4 shadow-md sticky top-0 z-50">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <NavLink to="/" className="">
            <img src="/logo.png" alt="Logo image" className="h-9 w-auto" />
          </NavLink>

          {/* Logo Text */}
          <NavLink to="/" className="text-2xl font-bold">
            Fitz
          </NavLink>
        </div>

        {/* Links */}
        <div className="flex items-center space-x-6">
          {user ? (
            <>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive ? "text-gray-300 font-bold" : "hover:text-gray-300"
                }
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/workout-history"
                className={({ isActive }) =>
                  isActive ? "text-gray-300 font-bold" : "hover:text-gray-300"
                }
              >
                Workouts
              </NavLink>
              <NavLink
                to="/routines"
                className={({ isActive }) =>
                  isActive ? "text-gray-300 font-bold" : "hover:text-gray-300"
                }
              >
                Routines
              </NavLink>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  isActive ? "text-gray-300 font-bold" : "hover:text-gray-300"
                }
                activeClassName="text-gray-300 font-bold"
              >
                <i className="fas fa-user text-lg"></i> {/* Profile Icon */}
              </NavLink>
              <NavLink
                to="/settings"
                className={({ isActive }) =>
                  isActive ? "text-gray-300 font-bold" : "hover:text-gray-300"
                }
              >
                <i className="fas fa-cog text-lg"></i> {/* Settings Icon */}
              </NavLink>
              {/* Logout button */}
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? "text-gray-300 font-bold" : "hover:text-gray-300"
                }
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  isActive ? "text-gray-300 font-bold" : "hover:text-gray-300"
                }
              >
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

// import React, { useEffect, useState } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import { useAuth } from "../hooks/useAuth";

// const Navbar = () => {
//   const { logout } = useAuth();
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);
//   const [showNavbar, setShowNavbar] = useState(true); // State to manage visibility
//   const [lastScrollY, setLastScrollY] = useState(0); // Track last scroll position

//   // Check if user data and token exist in localStorage on initial render
//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     if (storedUser) {
//       setUser(storedUser); // Set user state from localStorage
//     }
//   }, []);

//   // Handle scroll event to hide/show navbar
//   const handleScroll = () => {
//     if (window.scrollY > lastScrollY) {
//       // Scrolling down
//       setShowNavbar(false);
//     } else {
//       // Scrolling up
//       setShowNavbar(true);
//     }

//     // Update last scroll position
//     setLastScrollY(window.scrollY);
//   };

//   useEffect(() => {
//     // Attach scroll event listener
//     window.addEventListener("scroll", handleScroll);

//     // Cleanup event listener on component unmount
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, [lastScrollY]);

//   const handleLogout = () => {
//     // Remove user and token from localStorage
//     localStorage.removeItem("user");
//     localStorage.removeItem("jwt");

//     // Call logout function from custom hook
//     logout();

//     // Reset the user state
//     setUser(null);

//     // Redirect to login page
//     navigate("/login");
//   };

//   return (
//     <nav
//       className={`bg-gray-800 text-white px-6 py-4 shadow-md sticky top-0 z-50 transition-transform duration-300 ${
//         showNavbar ? "transform translate-y-0" : "transform -translate-y-full"
//       }`}
//     >
//       <div className="flex justify-between items-center">
//         {/* Logo */}
//         <div className="flex items-center space-x-2">
//           <NavLink to="/" className="">
//             <img src="/logo.png" alt="Logo image" className="h-9 w-auto" />
//           </NavLink>

//           {/* Logo Text */}
//           <NavLink to="/" className="text-2xl font-bold">
//             Fitz
//           </NavLink>
//         </div>

//         {/* Links */}
//         <div className="flex items-center space-x-6">
//           {user ? (
//             <>
//               <NavLink
//                 to="/dashboard"
//                 className={({ isActive }) =>
//                   isActive ? "text-gray-300 font-bold" : "hover:text-gray-300"
//                 }
//               >
//                 Dashboard
//               </NavLink>
//               <NavLink
//                 to="/workout-history"
//                 className={({ isActive }) =>
//                   isActive ? "text-gray-300 font-bold" : "hover:text-gray-300"
//                 }
//               >
//                 Workouts
//               </NavLink>
//               <NavLink
//                 to="/routines"
//                 className={({ isActive }) =>
//                   isActive ? "text-gray-300 font-bold" : "hover:text-gray-300"
//                 }
//               >
//                 Routines
//               </NavLink>
//               <NavLink
//                 to="/profile"
//                 className={({ isActive }) =>
//                   isActive ? "text-gray-300 font-bold" : "hover:text-gray-300"
//                 }
//               >
//                 <i className="fas fa-user text-lg"></i> {/* Profile Icon */}
//               </NavLink>
//               <NavLink
//                 to="/settings"
//                 className={({ isActive }) =>
//                   isActive ? "text-gray-300 font-bold" : "hover:text-gray-300"
//                 }
//               >
//                 <i className="fas fa-cog text-lg"></i> {/* Settings Icon */}
//               </NavLink>
//               {/* Logout button */}
//               <button
//                 onClick={handleLogout}
//                 className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
//               >
//                 Logout
//               </button>
//             </>
//           ) : (
//             <>
//               <NavLink
//                 to="/login"
//                 className={({ isActive }) =>
//                   isActive ? "text-gray-300 font-bold" : "hover:text-gray-300"
//                 }
//               >
//                 Login
//               </NavLink>
//               <NavLink
//                 to="/register"
//                 className={({ isActive }) =>
//                   isActive ? "text-gray-300 font-bold" : "hover:text-gray-300"
//                 }
//               >
//                 Register
//               </NavLink>
//             </>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
