import { useState } from "react";
import { Link } from "react-router-dom";

import DarkModeToggle from "./DarkModeToggle";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
  const { state } = useAuthContext();
  const { logout } = useLogout();
  const [open, setOpen] = useState(false);

  const clickHandler = (e: React.MouseEvent) => {
    setOpen((prevState) => !prevState);
  };
  const closeMenuHandler = () => {
    setOpen(false);
  };

  const logoutHandler = () => {
    setOpen(false);
    logout();
  };

  return (
    <nav className="bg-violet-400 text-white">
      <div className="relative container max-w-7xl mx-auto py-1">
        <div className="flex items-center justify-between mx-6 lg:mx-0">
          <div className="flex items-center ">
            <Link to={`/`}>
              <div className="flex items-center">
                <h1 className="text-4xl my-3">Trippy</h1>
              </div>
            </Link>
          </div>

          <DarkModeToggle />
          {/* normal menu */}
          <div className="items-center space-x-12 hidden lg:flex">
            <Link to="/" className="hover:underline">
              Home
            </Link>
            {!state.user && (
              <>
                <Link to="/login" className="hover:underline">
                  Login
                </Link>
                <Link to="/signup">
                  <button className="bg-[#b9b9b9] px-6 py-2 rounded-full hover:bg-opacity-90">
                    Sign up
                  </button>
                </Link>
              </>
            )}
            {state.user && (
              <>
                <Link to="/mytrips" className="hover:underline">
                  My trips
                </Link>
                <Link to="/login">
                  <button
                    onClick={logout}
                    className="bg-gray-500 px-6 py-2 rounded-full hover:bg-opacity-90"
                  >
                    Logout
                  </button>
                </Link>
              </>
            )}
          </div>
          {/* mobile menu */}
          <div
            onClick={clickHandler}
            className={`lg:hidden  ${open ? "open" : ""}`}
          >
            <button
              id="menu-button"
              type="button"
              className="hamburger z-40 focus:outline-none"
            >
              <span className="hamburger-top border border-b border-b-veryDarkViolet"></span>
              <span className="hamburger-middle border border-b border-b-veryDarkViolet"></span>
              <span className="hamburger-bottom border border-b border-b-veryDarkViolet"></span>
            </button>
          </div>
        </div>
        <div
          className={`absolute shadow-lg  bg-white rounded-lg left-10 right-10 top-[71px] z-10  transition-all duration-300 dark:bg-gray-700 dark:text-white ${
            open ? "block" : "hidden"
          } `}
        >
          <div className="flex flex-col w-full py-10 text-center text-gray-600 space-y-4 px-6 dark:text-white">
            <Link onClick={closeMenuHandler} to="/" className="hover:underline">
              Home
            </Link>
            {!state.user && (
              <>
                <Link
                  onClick={closeMenuHandler}
                  to="/login"
                  className="hover:underline"
                >
                  Login
                </Link>
                <Link to="/signup">
                  <button
                    onClick={closeMenuHandler}
                    className="bg-gray-500 px-6 py-2 rounded-full hover:bg-opacity-90 text-white w-full dark:bg-violet-700 dark:hover:bg-violet-600"
                  >
                    Sign up
                  </button>
                </Link>
              </>
            )}
            {state.user && (
              <Link to="/login">
                <button
                  onClick={logoutHandler}
                  className="bg-gray-500 px-6 py-2 rounded-full hover:bg-opacity-90 text-white w-full dark:bg-violet-700 dark:hover:bg-violet-600"
                >
                  Logout
                </button>
              </Link>
            )}
            <div className="border-t-2 border-t-violet-400"></div>
            <Link
              onClick={closeMenuHandler}
              to="/create"
              className="hover:underline"
            >
              Add new trips
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
