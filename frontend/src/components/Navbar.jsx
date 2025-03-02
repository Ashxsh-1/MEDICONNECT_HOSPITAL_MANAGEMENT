import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../main";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const handleLogout = async () => {
    await axios
      .get("http://localhost:4000/api/v1/user/patient/logout", {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setIsAuthenticated(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const navigateTo = useNavigate();

  const goToLogin = () => {
    navigateTo("/login");
  };

  //Dark and Light Mode
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "valentine"
  );

  const handleToggle = () => {
    if (theme === "valentine") {
      setTheme("synthwave");
    } else {
      setTheme("valentine");
    }
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme");
    document.querySelector("html").setAttribute("data-theme", localTheme);
  }, [theme]);

  return (
    <>
      <nav className={"container"}>
        <div className="logo">
          <img src="/logo.png" alt="logo" className="logo-img" />
        </div>
        <div className={show ? "navLinks showmenu " : "navLinks"}>
          <div className="links">
            <Link to={"/"} onClick={() => setShow(!show)}>
              <button
                type="button"
                className="!text-white !bg-gradient-to-br !from-purple-600 !to-blue-500 !hover:bg-gradient-to-bl !focus:ring-4 !focus:outline-none !focus:ring-blue-300 !dark:focus:ring-blue-800 !font-medium !rounded-lg !text-sm !px-5 !py-2.5 text-center me-2 mb-2"
              >
                Home
              </button>
            </Link>
            <Link to={"/appointment"} onClick={() => setShow(!show)}>
            <button
                type="button"
                className="!text-white !bg-gradient-to-br !from-purple-600 !to-blue-500 !hover:bg-gradient-to-bl !focus:ring-4 !focus:outline-none !focus:ring-blue-300 !dark:focus:ring-blue-800 !font-medium !rounded-lg !text-sm !px-5 !py-2.5 text-center me-2 mb-2"
              >
                Appointment
              </button>
            </Link>
            <Link to={"/about"} onClick={() => setShow(!show)}>
            <button
                type="button"
                className="!text-white !bg-gradient-to-br !from-purple-600 !to-blue-500 !hover:bg-gradient-to-bl !focus:ring-4 !focus:outline-none !focus:ring-blue-300 !dark:focus:ring-blue-800 !font-medium !rounded-lg !text-sm !px-5 !py-2.5 text-center me-2 mb-2"
              >
                About Us
              </button>
            </Link>
          </div>

          <label className="swap swap-rotate overflow-hidden">
            {/* this hidden checkbox controls the state */}
            <input
              type="checkbox"
              onChange={handleToggle}
              onClick={() => {
                setTimeout(() => {
                  setShow(!show);
                }, 1000); // 1000 milliseconds = 1 second
              }}
              checked={theme === "valentine" ? false : true}
            />

            {/* sun icon */}
            <svg
              className="swap-on h-10 w-10 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>

            {/* moon icon */}
            <svg
              className="swap-off h-10 w-10 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
            </svg>
          </label>

          {isAuthenticated ? (
            <button
            type="button"
            className="!text-white !bg-gradient-to-br !from-purple-600 !to-blue-500 !hover:bg-gradient-to-bl !focus:ring-4 !focus:outline-none !focus:ring-blue-300 !dark:focus:ring-blue-800 !font-medium !rounded-lg !text-sm !px-5 !py-2.5 text-center me-2 mb-2" onClick={handleLogout}
          >
            LOGOUT
          </button>
          ) : (
            <button
                type="button"
                className="!text-white !bg-gradient-to-br !from-purple-600 !to-blue-500 !hover:bg-gradient-to-bl !focus:ring-4 !focus:outline-none !focus:ring-blue-300 !dark:focus:ring-blue-800 !font-medium !rounded-lg !text-sm !px-5 !py-2.5 text-center me-2 mb-2" onClick={goToLogin}
              >
                LOGIN
              </button>
          )}
        </div>
        <div className="hamburger" onClick={() => setShow(!show)}>
          <GiHamburgerMenu />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
