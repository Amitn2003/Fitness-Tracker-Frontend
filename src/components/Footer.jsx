// import { useNavigate } from 'react-router-dom';

function Footer() {
//   const navigate = useNavigate();

  // Function to handle navigation
  const handleNavigation = (path) => {
    // navigate(path);
  };

    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Left Section: Links */}
        <div className="mb-4 md:mb-0">
          <h5 className="text-lg font-semibold mb-2">Quick Links</h5>
          <ul className="space-y-2">
            <li>
              <button 
                onClick={() => handleNavigation('/about')} 
                className="hover:text-gray-300"
              >
                About Us
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleNavigation('/contact')} 
                className="hover:text-gray-300"
              >
                Contact
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleNavigation('/privacy-policy')} 
                className="hover:text-gray-300"
              >
                Privacy Policy
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleNavigation('/terms-of-service')} 
                className="hover:text-gray-300"
              >
                Terms of Service
              </button>
            </li>
          </ul>
        </div>

        {/* Center Section: Social Media */}
        <div className="mb-4 md:mb-0">
          <h5 className="text-lg font-semibold mb-2">Follow Us</h5>
          <div className="flex space-x-4">
            {/* Replace the links with actual social media profiles */}
            <button
              onClick={() => window.open('https://facebook.com', '_blank')}
              className="hover:text-gray-300"
            >
              <i className="fab fa-facebook-square text-xl"></i>
            </button>
            <button
              onClick={() => window.open('https://twitter.com', '_blank')}
              className="hover:text-gray-300"
            >
              <i className="fab fa-twitter text-xl"></i>
            </button>
            <button
              onClick={() => window.open('https://instagram.com', '_blank')}
              className="hover:text-gray-300"
            >
              <i className="fab fa-instagram text-xl"></i>
            </button>
            <button
              onClick={() => window.open('https://linkedin.com', '_blank')}
              className="hover:text-gray-300"
            >
              <i className="fab fa-linkedin text-xl"></i>
            </button>
          </div>
        </div>

        {/* Right Section: Contact Info */}
        <div className="text-center md:text-right">
          <h5 className="text-lg font-semibold mb-2">Contact Us</h5>
          <p className="text-sm">
            Email: <span className="text-blue-400">amitn1909@gmail.com</span>
          </p>
          <p className="text-sm">
            Phone: <span className="text-blue-400">+1 (234) 567-890</span>
          </p>
        </div>
      </div>

      {/* Bottom Section: Copyright */}
      <div className="border-t border-gray-700 pt-4 mt-6 text-center">
        <p className="text-sm">
          &copy; 2025 Fitz. All rights reserved.
        </p>
      </div>
    </footer>
  return (
    <footer className="bg-gray-800 text-white py-6 mt-auto">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center md:items-start">
        {/* Left Section: Quick Links */}
        <div className="mb-6 md:mb-0 flex flex-col items-center md:items-start text-center md:text-left md:w-1/3">
          <h5 className="text-lg font-semibold mb-4">Quick Links</h5>
          <ul className="space-y-2 md:space-y-0 md:space-x-6 flex flex-col md:flex-row items-center md:items-start">
            <li>
              <button 
                onClick={() => handleNavigation('/about')} 
                className="hover:text-gray-300 transition duration-200 ease-in-out"
              >
                About Us
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleNavigation('/contact')} 
                className="hover:text-gray-300 transition duration-200 ease-in-out"
              >
                Contact
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleNavigation('/privacy-policy')} 
                className="hover:text-gray-300 transition duration-200 ease-in-out"
              >
                Privacy Policy
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleNavigation('/terms-of-service')} 
                className="hover:text-gray-300 transition duration-200 ease-in-out"
              >
                Terms of Service
              </button>
            </li>
          </ul>
        </div>

        {/* Center Section: Follow Us */}
        <div className="mb-6 md:mb-0 flex flex-col items-center md:items-start md:w-1/3">
          <h5 className="text-lg font-semibold mb-4">Follow Us</h5>
          <div className="flex space-x-4 mb-4">
            <button
              onClick={() => window.open('https://facebook.com', '_blank')}
              className="hover:text-gray-300 text-xl transition duration-200 ease-in-out"
            >
              <i className="fab fa-facebook-square"></i>
            </button>
            <button
              onClick={() => window.open('https://twitter.com', '_blank')}
              className="hover:text-gray-300 text-xl transition duration-200 ease-in-out"
            >
              <i className="fab fa-twitter"></i>
            </button>
            <button
              onClick={() => window.open('https://instagram.com', '_blank')}
              className="hover:text-gray-300 text-xl transition duration-200 ease-in-out"
            >
              <i className="fab fa-instagram"></i>
            </button>
            <button
              onClick={() => window.open('https://linkedin.com', '_blank')}
              className="hover:text-gray-300 text-xl transition duration-200 ease-in-out"
            >
              <i className="fab fa-linkedin"></i>
            </button>
          </div>

          {/* Add additional social media buttons if required */}
          <div className="flex space-x-4">
            <button
              onClick={() => window.open('https://youtube.com', '_blank')}
              className="hover:text-gray-300 text-xl transition duration-200 ease-in-out"
            >
              <i className="fab fa-youtube"></i>
            </button>
            <button
              onClick={() => window.open('https://pinterest.com', '_blank')}
              className="hover:text-gray-300 text-xl transition duration-200 ease-in-out"
            >
              <i className="fab fa-pinterest"></i>
            </button>
          </div>
        </div>

        {/* Right Section: Contact Info */}
        <div className="text-center md:text-right mt-6 md:mt-0 md:w-1/3">
          <h5 className="text-lg font-semibold mb-2">Contact Us</h5>
          <p className="text-sm">
            Email: <span className="text-blue-400">amitn1909@gmail.com</span>
          </p>
          <p className="text-sm">
            Phone: <span className="text-blue-400">+1 (234) 567-890</span>
          </p>
        </div>
      </div>

      {/* Bottom Section: Copyright */}
      <div className="border-t border-gray-700 pt-4 mt-6 text-center">
        <p className="text-sm">
          &copy; 2025 Fitz. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
